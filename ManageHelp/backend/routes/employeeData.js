const express = require('express')
const EmployeeData = require('../models/employeeDataModel')
const User = require('../models/userModel')
const Workspace = require('../models/workspaceModel')

const sendEmail = require('../utils/sendEmail')

const router = express.Router()

router.get('/:workspace_id/:user_id', async (req, res) => {

    try{

        const {workspace_id, user_id} = req.params

        const user = User.findOne({_id: user_id})
        const workspace = Workspace.findOne({_id: workspace_id})
        if (!user) {
            throw Error('No such user')
        }
        if (!workspace) {
            throw Error('No such workspace')
        }

        const ed = await EmployeeData.findOrCreate(workspace_id, user_id)

        res.status(200).json(ed)

    } catch (error) {
        res.status(400).json({error: error.message})
    } 

})

router.get('/:workspace_id', async (req, res) => {

    try{
 
        const {workspace_id} = req.params

        const workspace = Workspace.findOne({_id: workspace_id})
        if (!workspace) {
            throw Error('No such workspace')
        }

        const ed = await EmployeeData.findByWorkspace(workspace_id)

        res.status(200).json(ed)

    } catch (error) {
        res.status(400).json({error: error.message})
    } 

})

router.patch('/update', async (req, res) => {

    try {

        const {email, workspace_id, job_title, pay_rate} = req.body
        
        const user = await User.getUserByEmail(email)
        if (!user) throw Error('No such user with that email')
        
        const workspace = await Workspace.findOne({_id: workspace_id})
        if (!workspace) throw Error('No such workspace with that id')

        // Update
        let ed = await EmployeeData.findOrCreate(user._id, workspace_id)
        ed = await EmployeeData.findOneAndUpdate({user_id: user._id, workspace_id: workspace_id}, {job_title: job_title, pay_rate: pay_rate})

        // Send email
        const email_msg = `Your account information has been updated for ${workspace.companyName}<br/>Job Title: ${job_title}<br/>Pay Rate: $${pay_rate}/hr`
        sendEmail('Account Information Updated | ManageHelp', email_msg, email, process.env.EMAIL_USER, process.env.EMAIL_USER)

        res.status(200).json({msg: "success", data: ed})

    } catch (error) {
        res.status(400).json({error: error.message})
    }

})

router.patch('/updatePoints', async (req, res) => {

    try {
        console.log("test")
        const {email, workspace_id, points} = req.body
        var standing = ""

        const user = await User.getUserByEmail(email)
        if (!user) throw Error('No such user with that email')
        
        const workspace = await Workspace.findOne({_id: workspace_id})
        if (!workspace) throw Error('No such workspace with that id')

        // Update
        let ed = await EmployeeData.findOrCreate(user._id, workspace_id)
        ed = await EmployeeData.findOneAndUpdate({user_id: user._id, workspace_id: workspace_id}, {points: points})

        if (points >= 5) {
            standing = "Bad Standing"
        }
        else {
            standing = "Good Standing"
        }
        // Send email
        const email_msg = `Your points have been updated for ${workspace.companyName}<br/>Points: ${points}<br/>Employee Standing: ${standing}`
        const email_msg5 = 'You have exceeded 5 points. This will be your first warning'
        const email_msg10 = 'You have exceeded 10 points. This will be your second and final warning'
        const email_msg15 = 'You have reached the maximum amount of points allowed and will now be removed from this workspace'
        //console.log(standing)
        //console.log(points)
        //console.log(email)
        //console.log(email_msg)
        sendEmail('Points Updated | ManageHelp', email_msg, email, process.env.EMAIL_USER, process.env.EMAIL_USER)
        if (points == 5) {
            sendEmail('Points Warning | ManageHelp', email_msg5, email, process.env.EMAIL_USER, process.env.EMAIL_USER)
        }
        if (points == 10) {
            sendEmail('Points Warning | ManageHelp', email_msg10, email, process.env.EMAIL_USER, process.env.EMAIL_USER)
        }
        if (points == 15) {
            sendEmail('Points Warning | ManageHelp', email_msg15, email, process.env.EMAIL_USER, process.env.EMAIL_USER)
        }


        res.status(200).json({msg: "success", data: ed})

    } catch (error) {
        res.status(400).json({error: error.message})
    }

})

module.exports = router