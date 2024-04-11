const Reaction = require('../models/reactions-model');
const mongoose = require('mongoose');

// Create a new reaction on specified post
const createReaction = async (req, res) => {
    return res.status(501).json({ error: "Not implemented." });
}

// Delete a reaction by its id
const deleteReaction = async (req, res) => {
    return res.status(501).json({ error: "Not implemented." });
}

// Count the number of reactions on a post
const countReactions = async (req, res) => {
    return res.status(501).json({ error: "Not implemented." });
}

// Get all users who reacted to a post
const getUsersReacted = async (req, res) => {
    return res.status(501).json({ error: "Not implemented." });
}

module.exports = { createReaction, deleteReaction, countReactions, getUsersReacted };
