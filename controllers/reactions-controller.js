const Reaction = require("../models/reactions-model");
const Post = require("../models/posts-model");
const mongoose = require("mongoose");

// Create a new reaction on specified post
// params: postId
const createReaction = async (req, res) => {
  if (!req.params.postId) {
    return res.status(400).json({ error: "Post not found." });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Your reaction creation has error" });
  }

  const userId = req.user._id;

  if (!userId) {
    return res.status(400).json({ error: "Your user is not authorized." });
  }

  let savedReaction;
  try {
    savedReaction = await Reaction.create({
      userId: userId,
      postId: req.params.postId,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while trying to create the reaction.",
    });
  }

  return res.status(201).json(savedReaction);
};

// Delete a reaction on specified post
// params: postId
// returns: reactionDeleted
const deleteReaction = async (req, res) => {
  if (!req.params.postId) {
    return res.status(400).json({ error: "Post id is required." });
  }

  const post = await Post.findById(req.params.postId);

  if (!post) return res.status(404).json({ error: "Post not found" });

  const userId = req.user._id;

  if (!userId) {
    return res.status(400).json({ error: "Your user is not authorized." });
  }

  let reactionDeleted;
  try {
    reactionDeleted = await Reaction.deleteOne({
      userId,
      postId: req.params.postId,
    });

    return res.status(200).json({ reactionDeleted });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while trying to delete the reaction.",
    });
  }
};

// Count the number of reactions on a post
// params: postId
// returns: count (number)
const countReactions = async (req, res) => {
  if (!req.params.postId) {
    return res.status(400).json({ error: "Post not found." });
  }

  let reactions;
  try {
    reactions = await Reaction.find({ postId: req.params.postId });
    let count = reactions.length;
    return res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while trying to retrieve the reactions.",
    });
  }
};

// Get all users who reacted to a post
// params: postId
// returns: [userId]
const getUsersReacted = async (req, res) => {
  if (!req.params.postId) {
    return res.status(400).json({ error: "Post not found." });
  }

  let reactions;
  try {
    reactions = await Reaction.find({ postId: req.params.postId });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while trying to retrieve the reactions.",
    });
  }

  let users = [];
  for (let reaction of reactions) {
    users.push(reaction.userId);
  }

  return res.status(200).json({ users });
};

// Check if a user has reacted to a post
// params: postId
// returns: boolean
const isReacted = async (req, res) => {
  if (!req.params.postId) {
    return res.status(400).json({ error: "Post id is required." });
  }

  const post = await Post.findById(req.params.postId);

  if (!post) return res.status(404).json({ error: "Post not found" });

  const userId = req.user._id;

  if (!userId) {
    return res.status(400).json({ error: "Your user is not authorized." });
  }

  let reaction;
  try {
    reaction = await Reaction.findOne({ userId, postId: req.params.postId });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while trying to retrieve the reaction.",
    });
  }

  if (reaction) {
    return res.status(200).json(true);
  } else {
    return res.status(200).json(false);
  }
};

module.exports = {
  createReaction,
  deleteReaction,
  countReactions,
  getUsersReacted,
  isReacted,
};
