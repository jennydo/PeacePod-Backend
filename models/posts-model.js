const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    "userId": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    "title": {
        type: String,
        required: true
    },
    "content": {
        type: String,
        required: true
    },
    "isPrompt": {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

const postsModel = mongoose.model('Post', postSchema);
module.exports = postsModel;