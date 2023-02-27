const express = require('express')
const sendEmail = require('../utils/sendEmail')

const router = express.Router()

router.post("/", async (req, res) => {
    console.log("post request email")

    const {email, subject, message} = req.body
    try {

        const send_to = email
        const sent_from = process.env.EMAIL_USER
        const reply_to = email

        await sendEmail(subject, message, send_to, sent_from, reply_to)
        res.status(200).json({success: true, message: "Email sent"})

    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router