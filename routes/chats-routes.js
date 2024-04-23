const express = require('express')
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require('../controllers/chats-controller');
const requireAuth = require('../middleware/requireAuth');

const chatsRouter = express.Router();
chatsRouter.use(requireAuth);

chatsRouter.route("/").post(protect, accessChat);
chatsRouter.route("/").get(protect, fetchChats);
chatsRouter.route("/group").post(protect, createGroupChat);
chatsRouter.route("/rename").put(protect, renameGroup);
chatsRouter.route("/groupremove").put(protect, removeFromGroup);
chatsRouter.route("/groupadd").put(protect, addToGroup);


modules.export = chatsRouter


