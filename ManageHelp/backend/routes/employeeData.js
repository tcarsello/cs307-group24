const express = require('express')
const { EmployeeData, Task } = require('../models/employeeDataModel')
const User = require('../models/userModel')
const Workspace = require('../models/workspaceModel')
//const Task = require('../models/employeeDataModel') //not sure if allowed to double export

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

router.patch('/addtask', async (req, res) => {
    const { mssg, email, name, wid } = req.body
    try {
        const user = await User.getUserByEmail(email)
        if (!user) throw Error('No such user with that email')
        
        const workspace = await Workspace.findOne({_id: wid})
        if (!workspace) throw Error('No such workspace with that id')

        // Update
        const task = await Task.create({creatorName: name, text: mssg, completed: false, assignedTo: user.name})
        const ed = await EmployeeData.findOneAndUpdate({user_id: user._id, workspace_id: wid}, {$push: {tasks: task}})

        // Send email
        //const email_msg = `Your account information has been updated for ${workspace.companyName}<br/>Job Title: ${job_title}<br/>Pay Rate: $${pay_rate}/hr`
        //sendEmail('Account Information Updated | ManageHelp', email_msg, email, process.env.EMAIL_USER, process.env.EMAIL_USER)

        res.status(200).json({msg: "success", data: ed})

    } catch (error) {
        res.status(400).json({error: error.message})
    }

})

router.patch('/markcomplete', async (req, res) => {
    const { cName, wid, aName, tid  } = req.body
    console.log("wid: " + wid)
    console.log("aName: " + aName)
    console.log("tid: " + tid)
    try {
        const user = await User.findOne({name: aName})
        if (!user) throw Error('No such user with that id')
        
        const workspace = await Workspace.findOne({name: aName})
        if (!workspace) throw Error('No such user with that name')

        // Update
        
        const task = await Task.findOneAndUpdate({_id: tid}, {completed: true})
        const newEd = await EmployeeData.findOneAndUpdate()
        console.log("setting " + task.text + " to true")
        // Send email to manager
        const manager = await User.findOne({name: cName})  
        const email_msg = `Your employee ${user.name} has completed the task "${task.text}".`
        sendEmail('Task Complete | ManageHelp', email_msg, manager.email, process.env.EMAIL_USER, process.env.EMAIL_USER)

        const admin = await User.findOne({_id: workspace.owner_id})
        const email2_msg = `Your employee ${user.name} has completed the task "${task.text}".`
        sendEmail('Task Complete | ManageHelp', email2_msg, admin.email, process.env.EMAIL_USER, process.env.EMAIL_USER)

        res.status(200).json({msg: "success", data: task})

    } catch (error) {
        res.status(400).json({error: error.message})
    }

})
module.exports = router