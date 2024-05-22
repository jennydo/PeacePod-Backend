const mongoose = require('mongoose')

const promptSchema = mongoose.Schema({
    content: {
        type: String,
        require: true
    }
}, { timestamps: true })

const promptModel = mongoose.model("Prompt", promptSchema)
module.exports = promptModel