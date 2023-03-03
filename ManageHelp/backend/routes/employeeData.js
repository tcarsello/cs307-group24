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

module.exports = router