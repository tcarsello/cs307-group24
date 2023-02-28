const Workspace = require('../models/workspaceModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

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
        //TODO: edit in joinCode
        const owner_id = req.user._id
        const workspace = await Workspace.create({companyName, joinCode, owner_id, employee_list: []})

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

module.exports = {
    getWorkspaces,
    getWorkspace,
    createWorkspace,
    deleteWorkspace,
    updateWorkspace,
    joinWorkspace
}