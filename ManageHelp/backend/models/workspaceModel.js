//creates a class-like database structure to be used with workspaces
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workspaceSchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    joinCode: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Workspace', workspaceSchema)