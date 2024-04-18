const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const { sendMessage, getAllMessages } = require('../controllers/messages-controller')

const messagesRouter = express.Router()

messagesRouter.use(requireAuth)
messagesRouter.post('/', sendMessage)
messagesRouter.get('/:chatId', getAllMessages)

module.exports = messagesRouter