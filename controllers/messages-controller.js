const Message = require("../models/message-model");
const Chat = require('../models/chat-model')

const sendMessage = async (req, res) => {
    const { content, chatId } = req.body

    if (!content || !chatId) {
        return res.status(400).json({ error: "Invalid data passed into request." });
    }

    var newMessage = {
        sender: req.user._id,
        content, 
        chat: chatId
    }

    try {
        var message = await Message.create(newMessage)
        message = await message.populate("sender", "username avatar")
        // message = await message.populate("chat")
        // message = await User.populate(message, {
        //     path: "chat.users",
        //     select: "username avatar email"
        // })

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message
        })

        res.json(message)
    } catch (error) {
        res.status(400).json({ error: "Error creating new message." })
    }
}

const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate('sender', 'username avatar email')
            .populate('chat')

        res.json(messages)
    } catch (error) {
        res.status(400).json({error: "Error fetching messages."})
    }
}

module.exports = { sendMessage, getAllMessages }