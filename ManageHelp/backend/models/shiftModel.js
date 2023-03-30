const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ShiftSchema = new Schema({

    employee_id: {
        type: String,
        required: true,
    },

    workspace_id: {
        type: String,
        required: true,
    },

    schedule_id: {
        type: String,
        required: true,
    },  

    date: {
        type: Date,
        required: true,
    },

    start_time: {
        type: Date,
        required: true,
    },

    end_time: {
        type: Date,
        required: true,
    },

    role: {
        type: String,
        required: true,
    },

    published: {
        type: Boolean,
        required: true,
    }

}, {timestamps: true})

ShiftSchema.statics.createShift = async function (employee_id, workspace_id, schedule_id, date, start_time, end_time, role, published) {

    if (!employee_id) throw Error('Specify employee_id')
    if (!workspace_id) throw Error('Specify workspace_id')
    if (!schedule_id) throw Error('Specify schedule_id')
    if (!date) throw Error('Specify date')
    if (!start_time) throw Error('Specify start_time')
    if (!end_time) throw Error('Specify end_time')
    if (!role) throw Error('Specify role')
    if (!published) throw Error('Specify published')

    const date_conv = new Date(date)
    const start_time_conv = start_time
    const end_time_conv = end_time

    const shift = await this.create({employee_id, workspace_id, schedule_id, date: date_conv, start_time: start_time_conv, end_time: end_time_conv, role, published})

    return shift

}

module.exports = mongoose.model('Shift', ShiftSchema)