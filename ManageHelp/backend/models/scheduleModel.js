const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ScheduleSchema = new Schema({

    workspace_id: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    shift_list: {
        type: Array,
        required: true,
    },

    published: {
        type: Boolean,
        required: true
    }

}, {timestamps: true})

ScheduleSchema.statics.createSchedule = async function (workspace_id, date, published) {

    if (!workspace_id) throw new Error('Must specify workspace_id')
    if (!date) throw new Error('Must specify date')

    const date_conv = new Date(date)

    const schedule = await this.create({workspace_id: workspace_id, date: date_conv, shift_list: [], published: published})

    return schedule

}

module.exports = mongoose.model('Schedule', ScheduleSchema)