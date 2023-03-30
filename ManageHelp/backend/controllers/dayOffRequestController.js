const DayOffRequest = require('../models/dayOffRequest')
const User = require('../models/userModel')
const Workspace = require('../models/workspaceModel')

const mongoose = require('mongoose')
const sendEmail = require('../utils/sendEmail')

// POST /api/dor
const createDayOffRequest = async (req, res) => {
    const {employee_email, workspace_id, date, reason} = req.body

    try {

        const user = await User.getUserByEmail(employee_email)
        

        const dor = await DayOffRequest.createNew(user._id, workspace_id, user.name, date, reason)
        if (!dor) {
            console.log('Failed to create day off request')
            throw Error('Failed to create day off request')
        }

        // Email requester
        sendEmail('ManageHelp | Day Off Request Submitted', `<p>You have submitted a Day-Off Request for ${date}</p><p>Reason: ${reason}</p><p>A manager will review your request and approve/reject it. You will receive an email notification when this occurs.</p>`, employee_email, process.env.EMAIL_USER, process.env.EMAIL_USER)

        // Email owner
        const workspace = await Workspace.findOne({_id: workspace_id})
        const owner = await User.findOne({_id: workspace.owner_id})
        sendEmail('ManageHelp | New Day Off Request', `<p>The user ${employee_email} has requested off on: ${date}</p><p>Reason: ${reason}</p><p>Request ID: ${dor._id}</p>`, owner.email, process.env.EMAIL_USER, process.env.EMAIL_USER)

        // Email managers
        workspace.manager_list.forEach((user_id) => {

            User.findOne({_id: user_id}).then((manager) => {
                sendEmail('ManageHelp | New Day Off Request', `<p>The user ${employee_email} has requested off on: ${date}</p><p>Reason: ${reason}</p><p>Request ID: ${dor._id}</p>`, manager.email, process.env.EMAIL_USER, process.env.EMAIL_USER)
            })

        })

        res.status(200).json(dor)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const approveDayOffRequest = async (req, res) => {

    const { id } = req.params

    try {

        const dor = await DayOffRequest.findOneAndUpdate({_id: id}, {status: 1})
        
        const user = await User.findOne({_id: dor.employee_id})
        sendEmail('ManageHelp | Day Off Approved', `<p>Your Day-Off Request for ${dor.date} has been approved!</p>`, user.email, process.env.EMAIL_USER, process.env.EMAIL_USER)

        res.status(200).json(dor)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const rejectDayOffRequest = async (req, res) => {
    
    const { id } = req.params

    try {

        const dor = await DayOffRequest.findOneAndUpdate({_id: id}, {status: 2})

        const user = await User.findOne({_id: dor.employee_id})
        sendEmail('ManageHelp | Day Off Rejected', `<p>Your Day-Off Request for ${dor.date} has been rejected!</p>`, user.email, process.env.EMAIL_USER, process.env.EMAIL_USER)

        res.status(200).json(dor)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const getAllByWorkspace = async (req, res) => {
    const { id } = req.params
    try {
        const list = await DayOffRequest.find({workspace_id: id})
        res.status(200).json(list)
    } catch (error) {
        console.log("error during dayoff request")
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createDayOffRequest,
    approveDayOffRequest,
    rejectDayOffRequest,
    getAllByWorkspace,
}