const Chat = require("../models/chat-model")
const User = require('../models/users-model')

const accessChat = async (req, res) => {
    // check if a chat with this userId exists
    const {userId} = req.body

    if (!userId) {
        console.log("UserId param was not sent with the request.")
        return res.status(400)
    }
    
    var isChat = await Chat.find({
        $and: [
            { users: { $elemMatch: { $eq: req.user._id }}}, // the current user that is logged in 
            { users: { $elemMatch: { $eq: userId }}} // the user we're sending message to 
        ]
    }).populate("users", "username avatar email").populate("latestMessage")

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "username avatar email"
    })

    // check if the chat exists 
    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        // create a new chat 
        var chatData = {
            chatName: "sender",
            users: [req.user._id, userId]
        }

        try {
            const createdChat = await Chat.create(chatData)
            const FullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "username avatar email")
            res.status(200).send(FullChat)
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    
}

const fetchChats = async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id }}})
            .populate("users", "username avatar email")
            .populate("latestMessage")
                .sort( {updatedAt: -1})
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "username avatar email"
                })

            res.status(200).send(results)
            })
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { accessChat, fetchChats }