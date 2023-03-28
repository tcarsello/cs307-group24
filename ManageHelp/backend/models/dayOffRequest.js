const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dayOffRequestSchema = new Schema({
    employee_id: {
        required: true,
        type: Schema.Types.ObjectId,
    },
    workspace_id: {
        required: true,
        type: Schema.Types.ObjectId,
    },
    date: {
        required:  true,
        type: Date,
    },
    reason: {
        type: String
    },
    status: {
        required: true,
        type: Number,
        default: 0, // 0=pending, 1=approved, 2=rejected
    }
})

dayOffRequestSchema.statics.createNew = async function (eid, wid, day, r) {
    if (!eid) throw Error("Must specify employee_id")
    if (!wid) throw Error("Must specify workspace_id")
    if (!day) throw Error("Must specify date")

    const dor = await this.create({employee_id: eid, workspace_id: wid, date: day, status: 0, reason: r})

    return dor
}

module.exports = mongoose.model('DayOffRequest', dayOffRequestSchema)