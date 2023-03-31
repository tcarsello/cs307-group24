const express = require('express')

// import controller functions
const {createNewShiftRequest , getEmpShiftRequests , getManShiftRequests, getListShiftRequests } = require('../controllers/shiftRequestController')

const router = express.Router()

// POST a new shift request
router.post('/', createNewShiftRequest)

// GET a list of shift request for employee
router.get('/employee/:email/:workspace', getEmpShiftRequests)

// GET a list of shift request for manager
router.get('/manager/:workspace', getManShiftRequests)

// GET a list of other shift request
router.get('/other/:id', getListShiftRequests)

module.exports = router