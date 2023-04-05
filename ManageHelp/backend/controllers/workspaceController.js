const Workspace = require('../models/workspaceModel')
const User = require('../models/userModel')
const Announcement = require('../models/announcementModel')
const mongoose = require('mongoose')
const sendEmail = require('../utils/sendEmail')

// get all workspaces
const getWorkspaces = async (req, res) => {
    //display workspaces belonging to the user
    const owner_id = req.user._id
    const owned_workspaces = await Workspace.find({ owner_id }).sort({createdAt: -1})

    const user = await User.findOne({_id: req.user._id})

    const list_workspaces = []

    const workspaces = await Workspace.find()
    workspaces.forEach (w => {
        if (user.workspaces.includes(w._id)) {
            list_workspaces.push(w)
        }
    })
    owned_workspaces.forEach(w => {
        list_workspaces.push(w)
    })

    res.status(200).json(list_workspaces)
}

// get employees in a workspace
const getEmployees = async (req, res) => {
    
    const { id } = req.params
    const workspace = await Workspace.findById(id)

    if (!workspace) {
        return res.status(404).json({error: 'No workspace found with ID'})
    }
    const list_employees = []

    for (var i = 0; i < workspace.employee_list.length; i++) {
        let userId = workspace.employee_list[i]
        list_employees.push(await User.findOne({_id: userId}))
    }
    for (var j = 0; j < workspace.manager_list.length; j++) {
        let userId = workspace.manager_list[j]
        list_employees.push(await User.findOne({_id: userId}))
    }

    return res.status(200).json(list_employees)
}

// get a single workspace
const getWorkspace = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workspace'})
    }
    const workspace = await Workspace.findById(id)
    if (!workspace) {
        return res.status(404).json({error: 'No such workspace'})
    }

    res.status(200).json(workspace)
}

// create a new workspace
const createWorkspace = async (req, res) => {
    const {companyName, joinCode} = req.body

    let emptyFields = []
    if (!companyName) {
        emptyFields.push('companyName')
    }
    if (!joinCode) {
        emptyFields.push('joinCode')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }
    const checkCodeExists = await Workspace.findOne({joinCode: joinCode})
    if (checkCodeExists) {
        return res.status(400).json({error: 'JoinCode unavailable, please try a new one', emptyFields})
    }
    // add doc to db
    try {
        const owner_id = req.user._id
        const workspace = await Workspace.create({companyName, joinCode, owner_id, employee_list: [], manager_list: [], announcement_list: []})
        //add workspace to users list
        User.findOneAndUpdate({_id: req.user._id}, {$push: {workspaces: workspace._id}})

        res.status(200).json(workspace)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a  workspace
const deleteWorkspace = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workspace'})
    }

    const workspace = await Workspace.findOneAndDelete({_id: id})

    if (!workspace) {
        return res.status(404).json({error: 'No such workspace'})
    }

    res.status(200).json(workspace)
}

// update a workspace
const updateWorkspace = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workspace'})
    }
    const workspace = await Workspace.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!workspace) {
        return res.status(404).json({error: 'No such workspace'})
    }

    res.status(200).json(workspace)
}

// Join a workspace
const joinWorkspace = async (req, res) => {

    const code = parseInt(req.body.join_code)
    let emptyFields = []
    if (!code) {
        emptyFields.push('joinCode')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in joinCode', emptyFields})
    }
    const workspace = await Workspace.findOneAndUpdate({joinCode: code}, {$push: {employee_list: req.user._id}})

    if (!workspace) {
        return res.status(404).json({error: "No such workspace", emptyFields})
    }

    if (workspace.employee_list.includes(req.user._id)) {
        return res.status(400).json({error: 'Can not join same workspace more than once!', emptyFields})
    }

    const user = await User.findOneAndUpdate({_id: req.user._id}, {$push : {workspaces: workspace._id}})

    res.status(200).json(workspace);

}

const removeUser = async (req, res) => {

    const { email } = req.body
    const { id } = req.params

    let workspace = await Workspace.findOne({_id: id})

    const user = await User.findOneAndUpdate({email: email}, {$pull: {workspaces: {$in: [workspace._id]}} })
    workspace = await Workspace.findOneAndUpdate({_id: id}, {$pull: {employee_list: {$in: [user._id]}, manager_list: {$in: [user._id]}}})
    if (!user) {
        res.status(400).json({error: 'No such user'})
    }

    sendEmail('ManageHelp | Removed From Workspace', `You have been removed from the following workspace: ${workspace.companyName}`, email, process.env.EMAIL_USER, process.env.EMAIL_USER)

    res.status(200).json({message: 'User removed'})

}

const promoteUser = async (req, res) => {

    try {

        const { id } = req.params
        const { email } = req.body

        let workspace = await Workspace.findOne({_id: id})
        if (!workspace) throw Error('No such workspace')

        const user = await User.getUserByEmail(email)
        if (!user) throw Error('No such user')

        // Update

        workspace = await Workspace.findOneAndUpdate({_id: id}, {$pull: {employee_list: {$in: [user._id]}}, $push: {manager_list: user._id}})
        sendEmail('Promotion | ManageHelp', `You have been promoted to a Manager for Workspace: ${workspace.companyName}<br />You now have scheduling permissions for this workspace.`, user.email, process.env.EMAIL_USER, process.env.EMAIL_USER)

        // Success status

        res.status(200).json({msg: 'Success', data: workspace})

    } catch (error) {
        res.status(400).json({error: error})
    }

}

const demoteUser = async (req, res) => {

    try {

        const { id } = req.params
        const { email } = req.body
        

        let workspace = await Workspace.findOne({_id: id})
        if (!workspace) throw Error('No such workspace')
        

        const user = await User.getUserByEmail(email)
        if (!user) throw Error('No such user')
        

        // Update

        workspace = await Workspace.findOneAndUpdate({_id: id}, {$pull: {manager_list: {$in: [user._id]}}, $push: {employee_list: user._id}})
        sendEmail('Demotion | ManageHelp', `You have been demoted to an Employee for Workspace: ${workspace.companyName}<br/>You no longer have scheduling permissions for this workspace.`, user.email, process.env.EMAIL_USER, process.env.EMAIL_USER)

        // Success status

        res.status(200).json({msg: 'Success', data: workspace})

    } catch (error) {
        res.status(400).json({error: error})
    }

}

// create a new workspace
const createAnnouncement= async (req, res) => {
    console.log('hit')
    const {mssg, wid, mode, pin} = req.body //mode is whether to notify or not

    let emptyFields = []
    if (!mssg) {
        emptyFields.push('message')
    }
    if (!pin) {
        pin = 1
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in mssg', emptyFields})
    }
    // add doc to db
    try {
        const creator = await User.findOne({_id: req.user._id})
        const announcement = await Announcement.create({creator_id: creator._id, creatorName: creator.name, reason: mssg, status: pin})
        //add announcement to workspace
        const ws = Workspace.findOneAndUpdate({_id: wid}, {$push: {announcement_list: announcement}})
        if (mode === 'notify') {
            ws.employee_list.forEach(emp => 
                sendEmail('Announcement | ManageHelp', `New Manager Announcment in: ${ws.companyName}<br/>${mssg}`, emp.email, process.env.EMAIL_USER, process.env.EMAIL_USER))
        }

        res.status(200).json(announcement)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getWorkspaces,
    getWorkspace,
    createWorkspace,
    deleteWorkspace,
    updateWorkspace,
    joinWorkspace,
    removeUser,
    promoteUser,
    demoteUser,
    getEmployees,
    createAnnouncement
}