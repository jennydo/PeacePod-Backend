const mongoose = require('mongoose')
const Schema = mongoose.Schema

const promptIdxSchema = Schema({
    "current": { type: Number, required: false }
})

const promptIdxModel = mongoose.model('PromptIdx', promptIdxSchema)
module.exports = promptIdxModel