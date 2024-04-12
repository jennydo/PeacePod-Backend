const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promptSchema = new Schema({
    "content": [{ type: String, required: false }]
})

const promptModel = mongoose.model('Prompt', promptSchema);
module.exports = promptModel;