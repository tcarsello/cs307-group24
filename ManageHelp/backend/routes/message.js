const express = require('express')
const sendEmail = require('../utils/sendEmail')
const User = require('../models/userModel')
const Workspace = require('../models/workspaceModel')

const router = express.Router()

router.post('/', async (req, res) => {

    const {email, emailContents} = req.body
    try {

        // Check if user exists with given email
        const user = await User.getUserByEmail(email)

        let msg = emailContents;

        await sendEmail("ManageHelp | Manager Message", msg, email, process.env.EMAIL_USER, process.env.EMAIL_USER)
        res.status(200).json({success: true, message: 'Message sent'})

    } catch (error) {
        res.status(400).json(error.messsage)
    }

})

module.exports = router