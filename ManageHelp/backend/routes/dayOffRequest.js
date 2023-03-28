const express = require('express')
const router = express.Router()

const {
    createDayOffRequest,
} = require('../controllers/dayOffRequestController')

router.post('/', createDayOffRequest)

module.exports = router