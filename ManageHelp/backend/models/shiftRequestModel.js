const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const shiftRequestSchema = new Schema({
    /*
    Defines the fields in the shift request such as the email of the person sending the request,
    the request date, and the email of the person who the user is sending the request to
    */
    email: {
        type: String,
        required: true,
    },
    requestdate: {
        type: Date,
        required: true,
    },
    requestemail: {
        type: String,
        required: true
    }
})



module.exports = mongoose.model('ShiftRequest', shiftRequestSchema)