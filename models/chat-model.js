const mongoose = require('mongoose')

const chatModel = mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        users: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            required: true }], 
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },
        // isActive: { type: Boolean }
    }, { timestamps: true }
)

const Chat = mongoose.model("Chat", chatModel)
module.exports = Chat