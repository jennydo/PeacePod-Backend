const asyncHandler = require("express-async-handler");
const Chat = require("../models/chats-model");
const User = require("../models/users-model");
const Message = require("../models/messages-model");

// Create a chat Or Access to One Chat
// assyncHandler helps with async ops and error handling, avoiding repetitive try catch
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  // check if a chat already exists
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } }, // user who login
      { users: { $elemMatch: { $eq: userId } } },       // userId in req body
    ],
  })
    .populate("users", "username avatar pronounce location interests bio")
    .populate("latestMessage");


  // populate chat sender
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "username avatar pronounce location interests bio",
  });



  if (isChat.length > 0) {
    // if chat exists, sends the chat
    res.send(isChat[0]);
  } else {
    // Create a new chat
    var chatData = {
      chatName: "New Matched User",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      // sends the created chat to users
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "username avatar pronounce location interests bio"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const createChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  // Create a new chat
  var chatData = {
    chatName: "New Matched Chat",
    isGroupChat: false,
    users: [req.user._id, userId],
  }

  try {
    const createdChat = await Chat.create(chatData);
    // sends the created chat to users
    const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "username avatar pronounce location interests bio"
    );
    res.status(200).json(FullChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
  
});

// Fetch all chats for user
const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "username avatar pronounce location interests bio")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "username avatar pronounce location interests bio",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteChat = async (req, res) => {
  const { chatId } = req.params;
  console.log('chatId to delete', chatId);
  if (!chatId) {
    return res.status(400).json({ error: "Chat ID is required." });
  }
  try {
    // await Message.deleteMany({ chatId: id });
    const chat = await Chat.findOneAndDelete({ _id: chatId });
    if (!chat) {
      return res.status(404).json({ error: "Chat not found." });
    }
    res.status(200).json({ message: "Chat deleted successfully.", chat });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while trying to delete the chat." });
  }
};

//--------------------------------------GROUP CHAT------------------------------------------------
// Create New Group Chat
const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Rename Group
const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }  // Ensure that the updated document is returned
  ).populate("users", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

// Remove user from Group
const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

// Add user to Group / Leave
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});



module.exports = {
  accessChat,
  fetchChats,
  deleteChat,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
  createChat,
};