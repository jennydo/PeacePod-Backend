const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = require('./users-model')
const Reaction = require('./users-model')
const Post = require('./posts-model')

const commentSchema = new Schema({
    "userId": {
        type: Schema.Types.ObjectId, ref: User
    },
    "postId": {
        type: Schema.Types.ObjectId, ref: Post
    },
    "body": {
        type: String,
        required: true
    },
    "reactions": [{ type: Schema.Types.ObjectId, ref: Reaction }]
}, {timestamps: true}
)

const commentModel = mongoose.model('Comment', commentSchema);
module.exports = commentModel;
