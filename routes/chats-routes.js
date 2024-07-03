const express = require('express')
const { accessChat, fetchChats, deleteChat, createGroupChat, renameGroup, removeFromGroup, addToGroup, createChat } = require('../controllers/chats-controller');
const requireAuth = require('../middleware/requireAuth');

const chatsRouter = express.Router();
chatsRouter.use(requireAuth);

chatsRouter.post("/", accessChat);
chatsRouter.post("/create", createChat);
chatsRouter.get("/", fetchChats);
chatsRouter.delete("/:chatId", deleteChat);
chatsRouter.post("/group", createGroupChat);
chatsRouter.patch("/rename", renameGroup);
chatsRouter.put("/groupremove", removeFromGroup);
chatsRouter.put("/groupadd", addToGroup);


module.exports = chatsRouter


