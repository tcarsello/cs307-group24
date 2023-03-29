const express = require('express')

// import controller functions
const {createNewShiftRequest , getShiftRequests , getListShiftRequests } = require('../controllers/shiftRequestController')

const router = express.Router()

// POST a new shift request
router.post('/', createNewShiftRequest)

// GET a list of shift request
router.get('/:email', getShiftRequests)

// GET a list of other shift request
router.get('/other/:id', getListShiftRequests)

module.exports = router