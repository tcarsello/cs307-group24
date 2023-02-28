const express = require('express')
const sendEmail = require('../utils/sendEmail')

const router = express.Router()

router.post('/', async (req, res) => {
    console.log('post request invite')

    const {email, joincode} = req.body
    console.log(email)
    try {

        const invite_msg = "You have been invited to join a ManageHelp Workspace. Use joincode: " + joincode + " to join"

        await sendEmail("ManageHelp | Invitation", invite_msg, email, process.env.EMAIL_USER, process.env.EMAIL_USER)
        res.status(200).json({success: true, message: 'invite sent'})

    } catch (error) {
        res.status(400).json(error.messsage)
    }

})

module.exports = router