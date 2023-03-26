const ShiftRequest = require('../models/shiftRequestModel')
const User = require('../models/userModel')
const sendEmail = require('../utils/sendEmail')

// create new shift request
const createNewShiftRequest = async (req, res) => {
    var { user, date, email } = req.body
    try {
        const requestuser = await User.getUserByEmail(email)
        if (!requestuser) throw Error('No such user')
        const requestemail = requestuser._id;

        const userinfo = await User.getUserByEmail(user.email)
        if (!userinfo) throw Error('No such user')
        email = userinfo._id;

        const existinshiftrequest = await ShiftRequest.findOne({email: userinfo._id , requestdate: date})
        console.log(existinshiftrequest)
        if (existinshiftrequest) {
            return res.status(404).json({error: 'Shift request already exists for given date'})
        }
        
        try {
            const requestdate = date
            const shiftrequest = await ShiftRequest.create({email, requestdate, requestemail})
            //sendEmail('ManageHelp | Request orkspace', `you have requet..  have been removed from the following workspace: ${workspace.companyName}`, email, process.env.EMAIL_USER, process.env.EMAIL_USER)
            res.status(200).json(shiftrequest)
        } catch (error) {
            console.log("error in creating shiftrequest")
            res.status(400).json({error: error.message})
        }
    } catch (error) {
        console.log("error during shiftrequest creation")
        res.status(400).json({error: error.message})
    }
}


const getShiftRequests = async (req, res) => {
    var { id } = req.params

    try {
        const user = await User.getUserByEmail(id)
        if (!user) throw Error('No such user')
        var existinshiftrequests = await ShiftRequest.find({email: user._id})
       
    } catch (error) {
        console.log("error during shiftrequest get")
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
    res.status(200).json(existinshiftrequests)
}

const getListShiftRequests = async (req, res) => {
    var { id } = req.params
    console.log("test223")
    try {
        const user = await User.getUserByEmail(id)
        if (!user) throw Error('No such user')
        var existinshiftrequests = await ShiftRequest.find({requestemail: user._id})
       
    } catch (error) {
        console.log("error during shiftrequest get")
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
    res.status(200).json(existinshiftrequests)
}

module.exports = { createNewShiftRequest , getShiftRequests , getListShiftRequests }