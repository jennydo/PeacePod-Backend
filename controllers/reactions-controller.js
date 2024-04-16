const Reaction = require('../models/reactions-model');

// Create a new reaction on specified post
// params: postId, userId
const createReaction = async (req, res) => {
    if (!req.params.postId) {
        return res.status(400).json({ error: "Post not found." });
    }

    if (!req.params.userId) {
        return res.status(400).json({ error: "User not found." });
    }

    const {postId, userId} = req.params;

    let savedReaction;
    try {
        savedReaction = await Reaction.create({
            userId,
            postId
        });
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while trying to create the reaction." });
    }

    return res.status(201).json(savedReaction);
}

// Delete a reaction on specified post
// params: postId, userId
// returns: reactionDeleted
const deleteReaction = async (req, res) => {
    if (!req.params.postId) {
        return res.status(400).json({ error: "Post not found." });
    }

    if (!req.params.userId) {
        return res.status(400).json({ error: "User not found." });
    }

    const {postId, userId} = req.params;

    let reactionDeleted
    try {
        reactionDeleted = await Reaction.deleteOne({ userId, postId });
    }
    catch (error) {
        return res.status(500).json({ error: "An error occurred while trying to delete the reaction." });
    }

    return res.status(200).json({ reactionDeleted });
}

// Count the number of reactions on a post
// params: postId
// returns: count (number)
const countReactions = async (req, res) => {
    if (!req.params.postId) {
        return res.status(400).json({ error: "Post not found." });
    }

    const {postId} = req.params;

    let reactions;
    try {
        reactions = await Reaction.find({ postId });
        let count = reactions.length;
        return res.status(200).json({ count });
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while trying to retrieve the reactions." });
    }
}

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
        return res.status(500).json({ error: "An error occurred while trying to retrieve the reactions." });
    }

    let users = [];
    for (let reaction of reactions) {
        users.push(reaction.userId);
    }

    return res.status(200).json({ users });
}

// Check if a user has reacted to a post
// params: postId, userId
// returns: boolean
const isReacted = async (req, res) => {
    if (!req.params.postId) {
        return res.status(400).json({ error: "Post not found." });
    }

    if (!req.params.userId) {
        return res.status(400).json({ error: "User not found." });
    }

    const {postId, userId} = req.params;

    if (!userId) {
        return res.status(400).json({ error: "Your reaction check has error - userId" });
    }

    let reaction;
    try {
        // reaction = await Reaction.findOne({ userId, postId: req.params.postId });
        reaction = await Reaction.findOne({ userId, postId });
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while trying to retrieve the reaction." });
    }

    if (reaction) {
        return res.status(200).json(true);
    } else {
        return res.status(200).json(false);
    }
}

module.exports = { createReaction, deleteReaction, countReactions, getUsersReacted, isReacted };
