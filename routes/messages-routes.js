const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messages-controller");
const requireAuth = require('../middleware/requireAuth');

const messagesRouter = express.Router();
messagesRouter.use(requireAuth);


messagesRouter.route("/:chatId").get(allMessages);
messagesRouter.route("/").post(sendMessage);

module.exports = messagesRouter;