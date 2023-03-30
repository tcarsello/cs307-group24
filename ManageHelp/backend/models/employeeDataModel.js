const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeeDataSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    workspace_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    job_title: {
        type: String,
        required: true,
        default: 'Employee'
    },
    pay_rate: {
        type: Number,
        required: true,
        default: 0.00
    },
    weekly_hours_worked: {
        type: Number,
        required: true,
        default: 6.00
    },
    total_weekly_pay: {
        type: Number, 
        required: true,
    }
    
})

employeeDataSchema.statics.createNew = async function (user_id, workspace_id, job_title, pay_rate, weekly_hours_worked, total_weekly_pay) {

    if (!user_id) throw Error("must give user id")
    if (!workspace_id) throw Error('must give workspace id')
    if (!job_title) throw Error('must give job title')
    if (!pay_rate) throw Error('must give pay rate')

    const edm = await this.create({user_id: user_id, workspace_id: workspace_id, job_title: job_title, pay_rate: pay_rate, weekly_hours_worked: weekly_hours_worked, total_weekly_pay: total_weekly_pay})

    return edm

}

employeeDataSchema.statics.findOrCreate = async function (user_id, workspace_id) {

    let edm = await this.findOne({user_id: user_id, workspace_id: workspace_id})
    if (!edm) {
        edm = await this.createNew(user_id, workspace_id, 'No Title Yet', 1)
    }

    return edm

}

module.exports = mongoose.model('EmployeeData', employeeDataSchema)