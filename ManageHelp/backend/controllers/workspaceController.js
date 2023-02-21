const Workspace = require('../models/workspaceModel')
const mongoose = require('mongoose')

// get all workspaces
const getWorkspaces = async (req, res) => {
    //display workspaces belonging to the user
    const owner_id = req.user._id
    const workspaces = await Workspace.find({ owner_id }).sort({createdAt: -1})

    res.status(200).json(workspaces)
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
        const workspace = await Workspace.create({companyName, joinCode, owner_id})
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

module.exports = {
    getWorkspaces,
    getWorkspace,
    createWorkspace,
    deleteWorkspace,
    updateWorkspace
}