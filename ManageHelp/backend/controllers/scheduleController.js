const Shift = require('../models/shiftModel')
const Schedule = require('../models/scheduleModel')
const User = require('../models/userModel')
const Workspace = require('../models/workspaceModel')

const mongoose = require('mongoose')
const sendEmail = require('../utils/sendEmail')

// POST / | Create a new schedule
const createSchedule = async (req, res) => {
    const {workspace_id, week_date, published} = req.body

    try {

        const schedule = await Schedule.createSchedule(workspace_id, week_date, published)
        if (!schedule) console.log('Failed to create schedule')

        res.status(200).json(schedule)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// DELETE /:id | Delete a schedule by id
const deleteSchedule = async (req, res) => {
    const { id } = req.params

    try {

        const schedule = await Schedule.findOneAndDelete({_id: id})
        if (!schedule) console.log('No such schedule')

        res.status(200).json(schedule)

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// PATCH /:id
const patchSchedule = async (req, res) => {

    const { id } = req.params

    try {

        const schedule = await Schedule.findOneAndUpdate({_id: id}, {...req.body})
        if (!schedule) console.log('No such schedule')

        res.status(200).json(schedule)

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// GET /:id
const getByID = async (req, res) => {
    const { id } = req.params

    try {

        const schedule = await Schedule.findOne({_id: id})
        if (!schedule) console.log('No such schedule')

        res.status(200).json(schedule)

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const getAllByWorkspace = async (req, res) => {
    const { id } = req.params

    try {

        const schedules = await Schedule.find({workspace_id: id})
        if (!schedules) console.log('No schedules for given workspace id')

        res.status(200).json(schedules)
            
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const addShift = async (req, res) => {

    const { id } = req.params
    const { shift_id } = req.body

    try {

        const schedule = await Schedule.findOneAndUpdate({_id: id}, {$push: {shift_list: shift_id}})
        if (!schedule) console.log('No such schedule')

        res.status(200).json(schedule)

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const removeShift = async(req, res) => {

    const { id } = req.params
    const { shift_id } = req.body

    try {

        const schedule = await Schedule.findOneAndUpdate({_id: id}, {$pull: {shift_list: shift_id}})
        if (!schedule) console.log('No such schedule')

        res.status(200).json(schedule)

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

module.exports = {
    createSchedule,
    deleteSchedule,
    patchSchedule,
    getByID,
    getAllByWorkspace,
    addShift,
    removeShift
}