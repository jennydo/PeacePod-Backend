const mongoose = require('mongoose')

const promptResponseSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    promptId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prompt',
        required: true 
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

const promptResponseModel = mongoose.model('PromptResponse', promptResponseSchema)

module.exports = promptResponseModel