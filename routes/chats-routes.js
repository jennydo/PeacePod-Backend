const express = require('express')
const { accessChat, fetchChats } = require('../controllers/chats-controller')
const requireAuth = require('../middleware/requireAuth')

const chatsRouter = express.Router()

chatsRouter.use(requireAuth)
chatsRouter.post("/", accessChat)
chatsRouter.get("/", fetchChats)
// chatsRouter.delete("/:chatId", deleteChat)

module.exports = chatsRouter