/**
 * Routes file for signup and login functionality
 * 
 * Created by Matt Hiatt
 * 
 * Last updated: February 21 by Matt Hiatt
 */
const express = require('express')

// import controller functions
const {signupUser, loginUser, resetPassword } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

router.post('/resetpassword', resetPassword)

module.exports = router