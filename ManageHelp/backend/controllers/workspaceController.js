const Workspace = require('../models/workspaceModel')
const User = require('../models/userModel')
const Announcement = require('../models/announcementModel')
const employeeData = require('../models/employeeDataModel') //Requires the employee data collection in the database
const mongoose = require('mongoose')
const sendEmail = require('../utils/sendEmail')

// get all workspaces
const getWorkspaces = async (req, res) => {
    console.log("inside get workspaces")
    //display workspaces belonging to the user
    const owner_id = req.user._id
    console.log(req.user._id)
    const owned_workspaces = await Workspace.find({ owner_id }).sort({createdAt: -1})
    console.log(owned_workspaces)

    const user = await User.findOne({_id: req.user._id})

    const list_workspaces = []

    const workspaces = await Workspace.find()
    workspaces.forEach (w => {
        if (user.workspaces.includes(w._id)) {
            list_workspaces.push(w)
        }
    }) 
    owned_workspaces.forEach(w => {
        console.log("added....")
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
        const workspace = await Workspace.create({companyName, joinCode, owner_id, employee_list: [], manager_list: []})
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
    console.log("inside joine workspace")
    console.log(code)
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
    console.log(req.user._id) //The user id for ssharan31@gmail.com
    console.log(workspace._id)
    console.log(workspace.joinCode)
    res.status(200).json(workspace);

}

// Transfer a user from a workspace to another
const transferWorkspace = async (req, res) => {

    console.log("transfer user")
    const {join_code, user_email} = req.body
    console.log(join_code)
    console.log(user_email)

    const user_to_transfer = await User.getUserByEmail(user_email)
    if (!user_to_transfer) throw Error('No such user')
 
    const workspace = await Workspace.findOneAndUpdate({joinCode: join_code}, {$push: {employee_list: user_to_transfer._id}})

    if (!workspace) {
        return res.status(404).json({error: "No such workspace for ", join_code})
    }

    if (workspace.employee_list.includes(user_to_transfer._id)) {
        return res.status(400).json({error: 'Can not join same workspace more than once!', user_email})
    }

    const user = await User.findOneAndUpdate({_id: user_to_transfer._id}, {$push : {workspaces: workspace._id}})
    sendEmail('Workspace Transfer | ManageHelp', `You have been transferred to the following workspace: ${workspace.companyName}<br />`, user_to_transfer.email, process.env.EMAIL_USER, process.env.EMAIL_USER)
    console.log(workspace._id)
    console.log(workspace.joinCode)

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
        const announcement = await Announcement.create({creator_id: creator._id, creatorName: creator.name, text: mssg, status: pin})
        //add announcement to workspace
        const ws = await Workspace.findOneAndUpdate({_id: wid}, {$push: {announcement_list: announcement}}, {new: true})
        if (!ws) {
            return res.status(400).json({error: 'no workspace found with wid'})
        }
        if (mode === 'notify') {
            if (ws.employee_list.length > 0) {
                ws.employee_list.forEach(emp => 
                    sendEmail('Announcement | ManageHelp', `New Manager Announcement in: ${ws.companyName}<br/>${mssg}`, emp.email, process.env.EMAIL_USER, process.env.EMAIL_USER))
            }  
        }

        res.status(200).json(announcement)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get employees in a workspace
const getAnnouncements = async (req, res) => {
    
    const { id } = req.params
    const workspace = await Workspace.findById(id)

    if (!workspace) {
        return res.status(404).json({error: 'No workspace found with ID'})
    }
    const list_announcements = []
    for (var i = 0; i < workspace.announcement_list.length; i++) {
        let announceID = workspace.announcement_list[i]
        list_announcements.push(await Announcement.findById(announceID))
    }

    return res.status(200).json(list_announcements)
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
    transferWorkspace,
    getAnnouncements,
    createAnnouncement
}