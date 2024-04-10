const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./users-model')

const reactionSchema = new Schema({
    usersReacted: [{ type: Schema.Types.ObjectId, ref: User }],
    reactableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
}, { timestamps: true });

const reactionsModel = mongoose.model('Reaction', reactionSchema);
module.exports = reactionsModel;