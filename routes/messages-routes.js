const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messages-controller");
const requireAuth = require('../middleware/requireAuth');

const messagesRouter = express.Router();
messagesRouter.use(requireAuth);


messagesRouter.get("/:chatId", allMessages);
messagesRouter.post("/", sendMessage);

module.exports = messagesRouter;