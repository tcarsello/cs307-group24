const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true //stops a user from signing up with an email already associated with an account
    },
    password: {
        type: String,
        required: true
    },
    workspaces: {
        type: Array,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function (email, password) {
    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password too weak')
    }
    
    //check if email exists
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    // generate a salt, hash it together with password, and store it
    const salt = await bcrypt.genSalt(5)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash, workspaces: [] })

    return user
}

//static reset method
userSchema.statics.resetPassword = async function (email, password) {

    // validation
    if (!email) {
        throw Error('Provide account email above!')
    }

    //check if email exists
    const exists = await this.findOne({ email })

    if (!exists) {
        throw Error('Email not in use, try signing up')
    }

    const salt = await bcrypt.genSalt(5)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.findOneAndUpdate({email: email}, {password: hash})

    return user
}

//static change password method
userSchema.statics.changePassword = async function (email, password) {

    // validation
    if (!password) {
        throw Error('Provide new password above!')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password too weak')
    }
    
    
    const salt = await bcrypt.genSalt(5)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.findOneAndUpdate({email: email}, {password: hash})

    return user
}

// static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Email not attached to account, try signing up')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect credientials')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)