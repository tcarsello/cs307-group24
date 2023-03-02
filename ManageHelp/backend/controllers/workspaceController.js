const Workspace = require('../models/workspaceModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')
const sendEmail = require('../utils/sendEmail')

// get all workspaces
const getWorkspaces = async (req, res) => {
    //display workspaces belonging to the user
    const owner_id = req.user._id
   // const workspaces = await Workspace.find({ owner_id }).sort({createdAt: -1})

    const user = await User.findOne({_id: req.user._id})

    const list_workspaces = []

    const workspaces = await Workspace.find()
    workspaces.forEach (w => {
        if (user.workspaces.includes(w._id)) {
            list_workspaces.push(w)
        }
    })

    res.status(200).json(list_workspaces)
}

// get employees in a workspace
const getEmployees = async (req, res) => {
    
    const { id } = req.params

    console.log('getEmployees params (ID): ' + id)
    const workspace = await Workspace.findById(id)

    if (!workspace) {
        return res.status(404).json({error: 'No workspace found with ID'})
    }
    const list_employees = []

    for (var i = 0; i < workspace.employee_list.length; i++) {
        let userId = workspace.employee_list[i]
        console.log('User ID: ' + userId)
        list_employees.push(await User.findOne({_id: userId}))
    }
    for (var j = 0; j < workspace.manager_list.length; j++) {
        let userId = workspace.manager_list[j]
        list_employees.push(await User.findOne({_id: userId}))
    }

    console.log('Employee List: ' + list_employees)

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
        return res.status(400).json({error: 'Please fill in all fields'})
    }
    // add doc to db
    try {
        //TODO: edit in joinCode
        const owner_id = req.user._id
        const workspace = await Workspace.create({companyName, joinCode, owner_id, employee_list: [], manager_list: []})

        User.findOneAndUpdate({_id: req.user._id}, {$push: {workspaces: workspace._id}}, (err, doc) => {
            console.log("Added workspace of id:" + workspace._id + " to user with id: " + req.user._id + " ")
        })

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

    const workspace = await Workspace.findOneAndUpdate({joinCode: code}, {$push: {employee_list: req.user._id}})

    if (!workspace) {
        return res.status(404).json({error: "No such workspace"})
    }

    const user = await User.findOneAndUpdate({_id: req.user._id}, {$push : {workspaces: workspace._id}})

    res.status(200).json(workspace);

}

const removeUser = async (req, res) => {

    const { email } = req.body
    const { id } = req.params

    let workspace = await Workspace.findOne({_id: id})

    const user = await User.findOneAndUpdate({email: email}, {$pull: {workspaces: {$in: [workspace._id]}} })
    workspace = await Workspace.findOneAndUpdate({_id: id}, {$pull: {employee_list: {$in: [user._id]}}})
    if (!user) {
        res.status(400).json({error: 'No such user'})
    }

    sendEmail('ManageHelp | Removed From Workspace', `You have been removed from the following workspace: ${workspace.companyName}`, email, process.env.EMAIL_USER, process.env.EMAIL_USER)

    res.status(200).json({message: 'User removed'})

}

module.exports = {
    getWorkspaces,
    getWorkspace,
    createWorkspace,
    deleteWorkspace,
    updateWorkspace,
    joinWorkspace,
    removeUser,
    getEmployees
}