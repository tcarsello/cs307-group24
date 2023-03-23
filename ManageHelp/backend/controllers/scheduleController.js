const Shift = require('../models/shiftModel')
const User = require('../models/userModel')
const Workspace = require('../models/workspaceModel')

const mongoose = require('mongoose')
const sendEmail = require('../utils/sendEmail')

const createSchedule = async (req, res) => {}

const deleteSchedule = async (req, res) => {}

const patchSchedule = async (req, res) => {}

const getByID = async (req, res) => {}

const getAllByWorkspace = async (req, res) => {}

const addShift = async (req, res) => {}

const removeShift = async(req, res) => {}

module.exports = {
    createSchedule,
    deleteSchedule,
    patchSchedule,
    getByID,
    getAllByWorkspace,
    addShift,
    removeShift
}