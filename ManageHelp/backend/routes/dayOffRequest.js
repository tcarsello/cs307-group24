const express = require('express')
const router = express.Router()

const {
    createDayOffRequest,
    approveDayOffRequest,
    rejectDayOffRequest
} = require('../controllers/dayOffRequestController')

router.post('/', createDayOffRequest)
router.post('/approve/:id', approveDayOffRequest)
router.post('/reject/:id', rejectDayOffRequest)

module.exports = router