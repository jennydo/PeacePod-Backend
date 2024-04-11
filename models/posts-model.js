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
    "body": {
        type: String,
        required: true
    },
    "isPrompt": {
        type: Boolean,
        required: true
    },
    "comments": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    "reactions": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reaction'
    }]
}, { timestamps: true })

const postsModel = mongoose.model('Post', postSchema);
module.exports = postsModel;