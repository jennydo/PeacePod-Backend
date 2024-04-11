const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reactionSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const reactionsModel = mongoose.model('Reaction', reactionSchema);
module.exports = reactionsModel;