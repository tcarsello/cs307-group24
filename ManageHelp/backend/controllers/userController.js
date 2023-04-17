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
        const name = user.name
        const token = createToken(user._id)
        res.status(200).json({email, name, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//signup user
const signupUser = async (req, res) => {
    const { email, password, name } = req.body

    try {
        const user = await User.signup(email, password, name)
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
        sendEmail('ManageHelp | Password Changed', 'Your password has been updated.', email, process.env.EMAIL_USER, process.env.EMAIL_USER)
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

        await sendEmail("ManageHelp | Password Reset", "<p>Your new password is: " + new_pass + "</p><br/><p>You can log in with this password, and change it under 'Settings'</p>", email, process.env.EMAIL_USER, process.env.EMAIL_USER)

        res.status(200).json({message: "reset worked"})

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const getUser = async (req, res) => {
    const { email } = req.params
    try {

        var user = await User.getUserByEmail(email)
        if ( !user)
        {
            user = await User.findOne({_id: email})
        }
        res.status(200).json(user)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateUser = async (req, res) => {
    const userEmail = req.params.email
    const user = await User.findOneAndUpdate({email: userEmail}, {
        ...req.body
    })

    if (!user) {
        console.log('No user found to update with email: ' + userEmail)
        return res.status(404).json({error: 'No such user'})
    }

    res.status(200).json(user)
}

const setRestrictions = async (req, res) => {

    const {restrictions, email} = req.body

    try {

        const user = await User.findOneAndUpdate({email: email}, {restrictions: restrictions})
        console.log(user)

        res.status(200).json({user})

    } catch (error) {
        res.status(400).json({error: error})
    }

}

const getByID = async (req, res) => {

    const {id} = req.params

    try {

        const user = await User.findOne({_id: id})

        res.status(200).json(user)

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

module.exports = { signupUser, loginUser, changePassword, resetPassword, getUser, updateUser, setRestrictions, getByID }