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
    },
    "postImageUrl": {
        type: String,
        required: true,
        default: 'https://i.pinimg.com/originals/28/7d/cf/287dcf229a8a818b6291b7b2e4d143af.png'
    }
}, { timestamps: true })

const postsModel = mongoose.model('Post', postSchema);
module.exports = postsModel;