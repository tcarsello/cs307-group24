const express = require('express')
const sendEmail = require('../utils/sendEmail')
const User = require('../models/userModel')

const router = express.Router()

router.post('/', async (req, res) => {

    const {email, workspaceName, joincode} = req.body
    try {

        // Check if user exists with given email
        const user = await User.getUserByEmail(email)

        let invite_msg = "";

        if (!user) {

            // User does not exist with that email
            invite_msg = `You have been invited to join ${workspaceName} on ManageHelp<br><a href='http://${process.env.HOSTNAME}/Signup'>Sign Up Here!</a><br>Use join code: ${joincode}`

        } else {

            // User exists
            invite_msg = `You have been added to ${workspaceName} on ManageHelp.`

        }

        await sendEmail("ManageHelp | Invitation", invite_msg, email, process.env.EMAIL_USER, process.env.EMAIL_USER)
        res.status(200).json({success: true, message: 'invite sent'})

    } catch (error) {
        res.status(400).json(error.messsage)
    }

})

module.exports = router