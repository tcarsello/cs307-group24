const express = require('express')
const router = express.Router()

const {
    createDayOffRequest,
    approveDayOffRequest,
    rejectDayOffRequest,
    getAllByWorkspace,
} = require('../controllers/dayOffRequestController')

router.post('/', createDayOffRequest)
router.post('/approve/:id', approveDayOffRequest)
router.post('/reject/:id', rejectDayOffRequest)

router.get('/:id', getAllByWorkspace)

module.exports = router