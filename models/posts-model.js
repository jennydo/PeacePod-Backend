const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    // "avatar": {
    //     type: String,
    //     required: true
    // },
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
    }
    // "comments": {
    //     type: Comment,
    //     required: false
    // },
    // "reactions": {
    //     type: Reaction, 
    //     required: false
    // }
}, { timestamps: true })

const postsModel = mongoose.model('Post', postSchema);
module.exports = postsModel;