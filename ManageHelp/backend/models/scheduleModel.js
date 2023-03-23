const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ScheduleSchema = new Schema({

    workspace_id: {
        type: String,
        required: true,
    },

    week_date: {
        type: Date,
        required: true,
    },

    shift_list: {
        type: Array,
        required: true,
    },

}, {timestamps: true})

module.exports = mongoose.model('Schedule', ScheduleSchema)