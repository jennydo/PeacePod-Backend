const Comment = require('../models/comments-model');
const mongoose = require('mongoose');

// Find all comments and sort them by createdAt in descending order for a specific post
// params: postId
// returns: comments
const getComments = async (req, res) => {
    if (!req.params.postId) {
        return res.status(400).json({ error: "Post not found." });
    }

    let comments;
    try {
        comments = await Comment.find({postId: req.params.postId}).populate("userId", "username avatar email").sort({createdAt: 1}); // populate the userId field with the User object
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while trying to retrieve the comments." });
    }

    res.status(200).json(comments);
}

// get a specific comment by its id
// params: commentId
// returns: comment
const getComment = async (req, res) => {
    if (!req.params.commentId) {
        return res.status(400).json({ error: "Missing comment id." });
    }

    const id = req.params.commentId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Not a valid commenting id." });
    }

    let comment;
    try {
        comment = await Comment.findById(id).populate("userId", "username avatar email");
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while trying to retrieve the comment." });
    }

    if (!comment) {
        return res.status(404).json({ error: "Comment not found." });
    }

    res.status(200).json(comment);
}

// create a new comment for a specific post
// params: postId
// body: content
// returns: comment
const createComment = async (req, res) => {
    if (!req.params.postId) {
        return res.status(400).json({ error: "Post not found." });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Your comment creation has error" });
    }

    const userId = req.user._id

    const { content } = req.body;

    if (!userId || !content) {
        return res.status(400).json({ error: "Your comment creation has error" });
    }

    let comment;
    try {
        comment = await Comment.create({ userId, postId: req.params.postId, content });
        comment =  await comment.populate("userId")
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while trying to create the comment." });
    }

    res.status(200).json(comment);
}

// delete a specific comment by its id
// params: commentId
// returns: comment deleted
const deleteComment = async (req, res) => {
    if (!req.params.commentId) {
        return res.status(400).json({ error: "Comment not found." });
    }

    const id = req.params.commentId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Comment not found." });
    }

    let comment;
    try {
        comment = await Comment.findByIdAndDelete(id);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while trying to delete the comment." });
    }

    if (!comment) {
        return res.status(404).json({ error: "Comment not found." });
    }

    res.status(200).json(comment);
}

// update a specific comment by its id
// params: commentId
// body: content
// returns: updated comment
const updateComment = async (req, res) => {
    if (!req.params.commentId) {
        return res.status(400).json({ error: "Comment not found." });
    }

    const id = req.params.commentId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Comment not found." });
    }

    let comment;
    try {
        comment = await Comment.findByIdAndUpdate(id, req.body, {new: true});
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while trying to update the comment." });
    }

    if (!comment) {
        return res.status(404).json({ error: "Comment not found." });
    }

    res.status(200).json(comment);
}

module.exports = { getComments, getComment, createComment, deleteComment, updateComment };
