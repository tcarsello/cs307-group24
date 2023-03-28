const DayOffRequest = require('../models/dayOffRequest')

const mongoose = require('mongoose')

// POST /api/dor
const createDayOffRequest = async (req, res) => {
    const {employee_id, workspace_id, date} = req.body

    try {

        const dor = await DayOffRequest.createNew(employee_id, workspace_id, date)
        if (!dor) console.log('Failed to create day off request')

        res.status(200).json(dor)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createDayOffRequest,
}