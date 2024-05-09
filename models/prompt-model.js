const mongoose = require('mongoose')

const promptSchema = mongoose.Schema({
    content: {
        type: String,
        require: true
    }
})

const promptModel = mongoose.model("Prompt", promptSchema)
module.exports = promptModel