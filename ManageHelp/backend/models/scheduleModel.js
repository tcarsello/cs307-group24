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

    published: {
        type: Boolean,
        required: true
    }

}, {timestamps: true})

ScheduleSchema.statics.createSchedule = async function (workspace_id, week_date, published) {

    if (!workspace_id) throw new Error('Must specify workspace_id')
    if (!week_date) throw new Error('Must specify week_date')

    const date_conv = new Date(week_date)

    const schedule = await this.create({workspace_id: workspace_id, week_date: date_conv, shift_list: [], published: published})

    return schedule

}

module.exports = mongoose.model('Schedule', ScheduleSchema)