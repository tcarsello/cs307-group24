const Shift = require('../models/shiftModel')
const Schedule = require('../models/scheduleModel')
const User = require('../models/userModel')
const Workspace = require('../models/workspaceModel')

const mongoose = require('mongoose')
const sendEmail = require('../utils/sendEmail')

// POST / | Create a new schedule
const createSchedule = async (req, res) => {
    const {workspace_id, date, published} = req.body

    try {

        const schedule = await Schedule.createSchedule(workspace_id, date, published)
        if (!schedule) console.log('Failed to create schedule')

        // Email Owner

        const wksp = await Workspace.findOne({_id: schedule.workspace_id})
        const owner = await User.findOne({_id: wksp.owner_id})
        sendEmail("ManageHelp | Schedule Created", `<p>A new schedule has been created on: ${wksp.companyName}</p>`, owner.email, process.env.EMAIL_USER, process.env.EMAIL_USER)

        // Email Managers
        wksp.manager_list.forEach((user_id) => {

            User.findOne({_id: user_id}).then((manager) => {
                sendEmail("ManageHelp | Schedule Created", `<p>A new schedule has been created on: ${wksp.companyName}</p>`, manager.email, process.env.EMAIL_USER, process.env.EMAIL_USER)
            })

        })

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

        // Email Owner

        const wksp = await Workspace.findOne({_id: schedule.workspace_id})
        const owner = await User.findOne({_id: wksp.owner_id})
        sendEmail("ManageHelp | Schedule Deleted", `<p>A new schedule has been deleted on: ${wksp.companyName}</p>`, owner.email, process.env.EMAIL_USER, process.env.EMAIL_USER)

        // Email Managers
        wksp.manager_list.forEach((user_id) => {

            User.findOne({_id: user_id}).then((manager) => {
                sendEmail("ManageHelp | Schedule Deleted", `<p>A new schedule has been deleted on: ${wksp.companyName}</p>`, manager.email, process.env.EMAIL_USER, process.env.EMAIL_USER)
            })

        })

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

        // Email Owner

        const wksp = await Workspace.findOne({_id: schedule.workspace_id})
        const owner = await User.findOne({_id: wksp.owner_id})
        sendEmail("ManageHelp | Schedule Created", `<p>A new schedule has been updated on: ${wksp.companyName}</p>`, owner.email, process.env.EMAIL_USER, process.env.EMAIL_USER)

        // Email Managers
        wksp.manager_list.forEach((user_id) => {

            User.findOne({_id: user_id}).then((manager) => {
                sendEmail("ManageHelp | Schedule Created", `<p>A new schedule has been updated on: ${wksp.companyName}</p>`, manager.email, process.env.EMAIL_USER, process.env.EMAIL_USER)
            })

        })

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

        const wksp = await Workspace.findOne({_id: schedule.workspace_id})
        const owner = await User.findOne({_id: wksp.owner_id})
        sendEmail("ManageHelp | Schedule Created", `<p>A new schedule has been updated on: ${wksp.companyName}</p>`, owner.email, process.env.EMAIL_USER, process.env.EMAIL_USER)

        // Email Managers
        wksp.manager_list.forEach((user_id) => {

            User.findOne({_id: user_id}).then((manager) => {
                sendEmail("ManageHelp | Schedule Created", `<p>A new schedule has been updated on: ${wksp.companyName}</p>`, manager.email, process.env.EMAIL_USER, process.env.EMAIL_USER)
            })

        })

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

        const wksp = await Workspace.findOne({_id: schedule.workspace_id})
        const owner = await User.findOne({_id: wksp.owner_id})
        sendEmail("ManageHelp | Schedule Created", `<p>A new schedule has been updated on: ${wksp.companyName}</p>`, owner.email, process.env.EMAIL_USER, process.env.EMAIL_USER)

        // Email Managers
        wksp.manager_list.forEach((user_id) => {

            User.findOne({_id: user_id}).then((manager) => {
                sendEmail("ManageHelp | Schedule Created", `<p>A new schedule has been updated on: ${wksp.companyName}</p>`, manager.email, process.env.EMAIL_USER, process.env.EMAIL_USER)
            })

        })

        res.status(200).json(schedule)

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const getByWorkspaceDate = async(req, res) => {

    const {id} = req.params
    const {date} = req.body
    console.log(`${id} ${date}`)

    try {

        const schedule = await Schedule.findOne({workspace_id: id, date: date})

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
    removeShift,
    getByWorkspaceDate
}