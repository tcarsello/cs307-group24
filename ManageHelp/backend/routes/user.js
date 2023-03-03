/**
 * Routes file for signup and login functionality
 * 
 * Created by Matt Hiatt
 * 
 * Last updated: February 21 by Matt Hiatt
 */
const express = require('express')

// import controller functions
const {signupUser, loginUser, changePassword, resetPassword, getUser, getUserWithID, setRestrictions } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

router.post('/resetpassword', resetPassword)

router.post('/changepassword', changePassword)

router.get('/:email', getUser)

router.patch('/setrestrictions', setRestrictions)

//router.get('/getWithID/:id', getUserWithID)

module.exports = router