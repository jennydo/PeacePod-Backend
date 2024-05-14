const mongoose = require('mongoose')

const voicesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    duration: { type: String, required: true},
    mood: { type: String, required: true},
    tone: { type: String, required: true},
    extraNote: { type: String},
    audio: {type: Audio}
})

const voicesModel = mongoose.model('Voice', voicesSchema)

module.exports = voicesModel