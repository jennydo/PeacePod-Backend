const mongoose = require('mongoose')

const messageSchema = mongoose.Schema(
    {
        sender: { type: mongoose.Types.ObjectId, ref: "User", required: true},
        content: { type: String, trim: true, required: true},
        chat: { type: mongoose.Types.ObjectId, ref: "Chat", required: true},
        isRead: { type: Boolean }
    }, { timestamps: true}
)

const Message = mongoose.model("Message", messageSchema)
module.exports = Message