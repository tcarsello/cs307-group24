const mongoose = require('mongoose')

const Schema = mongoose.Schema

const announcement = new Schema({
    creator_id: {
        required: true,
        type: Schema.Types.ObjectId,
    },
    creatorName: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    status: {
        required: true,
        type: Number,
        default: 2, // 1=pin, 2=nopin
    },
    managerOnly: {
        required: true,
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Announcement', announcement)