const express = require('express')

const {
    createDayOffRequest,
    approveDayOffRequest,
    rejectDayOffRequest,
    getAllByWorkspace,
} = require('../controllers/dayOffRequestController')

const router = express.Router()

router.post('/', createDayOffRequest)
router.post('/approve/:id', approveDayOffRequest)
router.post('/reject/:id', rejectDayOffRequest)

router.get('/:id', getAllByWorkspace)

module.exports = router