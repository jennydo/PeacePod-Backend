const mongoose = require('mongoose')

const meditationAudioSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {type: String, required: true, default: 'New Audio'},
    isFavorite: {type: Boolean, required: true, default: false},
    duration: { type: String, required: true},
    mood: { type: String, required: true},
    tone: { type: String, required: true},
    extraNote: { type: String},
    audio: {type: String}
})

const meditationAudioModel = mongoose.model('MeditationAudio', meditationAudioSchema)

module.exports = meditationAudioModel