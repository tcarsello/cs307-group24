const User = require('../models/userModel')
const sendEmail = require('../utils/sendEmail')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({_id: id}, process.env.SECRET, { expiresIn: '1d' })
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const changePassword = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.changePassword(email, password)
        res.status(200).json({message: "change password worked"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const resetPassword = async (req, res) => {

    const {email} = req.body

    let new_pass = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 10) {
      new_pass += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    try {

        const user = await User.resetPassword(email, new_pass)

        await sendEmail("ManageHelp | Password Reset", "<p>Your new password is: " + new_pass + "</p>", email, process.env.EMAIL_USER, process.env.EMAIL_USER)

        res.status(200).json({message: "reset worked"})

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

module.exports = { signupUser, loginUser, changePassword, resetPassword }