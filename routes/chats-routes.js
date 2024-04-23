const express = require('express')
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require('../controllers/chats-controller');
const requireAuth = require('../middleware/requireAuth');

const chatsRouter = express.Router();
chatsRouter.use(requireAuth);

chatsRouter.route("/").post(accessChat);
chatsRouter.route("/").get(fetchChats);
chatsRouter.route("/group").post(createGroupChat);
chatsRouter.route("/rename").put(renameGroup);
chatsRouter.route("/groupremove").put(removeFromGroup);
chatsRouter.route("/groupadd").put(addToGroup);


module.exports = chatsRouter


