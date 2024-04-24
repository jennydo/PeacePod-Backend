const express = require('express')
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require('../controllers/chats-controller');
const requireAuth = require('../middleware/requireAuth');

const chatsRouter = express.Router();
chatsRouter.use(requireAuth);

chatsRouter.post("/", accessChat);
chatsRouter.get("/", fetchChats);
chatsRouter.post("/group", createGroupChat);
chatsRouter.put("/rename", renameGroup);
chatsRouter.put("/groupremove", removeFromGroup);
chatsRouter.put("/groupadd", addToGroup);


module.exports = chatsRouter


