const Post = require('../models/posts-model');
const mongoose = require('mongoose');

const Comment = require('../models/comments-model');
const promptsConstants = require('../constants/prompts')
const PromptIndex = require('../models/promptIndex');


// Find all posts and sort them by createdAt in descending order
const getPosts = async (req, res) => {
    let posts;
    try {
        posts = await Post.find({}).sort({createdAt: -1});
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while trying to retrieve the posts." });
    }

    if (!posts || posts.length === 0) {
        return res.status(404).json({ error: "No posts found." });
    }

    res.status(200).json(posts);
}

// Find a post by its id
const getPost = async (req, res) => {
    if (!req.params.postId) {
        return res.status(400).json({ error: "Post not found." });
    }

    const id = req.params.postId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Post not found." });
    }

    let post;
    try {
        post = await Post.findById(id);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while trying to retrieve the post." });
    }

    if (!post) {
        return res.status(404).json({ error: "Post not found." });
    }

    res.status(200).json(post);
}

// Create a new post
const createPost = async (req, res) => {
    // 
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Your post creation has error" });
    }

    const {userId, title, content, isPrompt } = req.body;

    if (!userId || !title || !content || isPrompt === undefined) {
        return res.status(400).json({ error: "Your post creation has error" });
    }

    let post;
    try {
        post = await Post.create({ userId, title, content, isPrompt });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(201).json(post);
}

// Delete a post by its id
// params: postId
const deletePost = async (req, res) => {
    if (!req.params.postId) {
        return res.status(400).json({ error: "Post not found." });
    }
    const id = req.params.postId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Post not found." });
    }

    let post;
    try {
        // Delete all comments associated with the post
        await Comment.deleteMany({ postId: id });
        post = await Post.findOneAndDelete({ _id: id });
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while trying to delete the post." });
    }

    if (!post) {
        return res.status(404).json({ error: "Post not found." });
    }

    res.status(200).json(post);
}

// Update a post by its id
const updatePost = async (req, res) => {
    if (!req.params.postId) {
        return res.status(400).json({ error: "Post not found." });
    }

    const id = req.params.postId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Post not found." });
    }

    // Check if the request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Update data is required." });
    }

    let post;
    try {
        post = await Post.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while trying to update the post." });
    }

    if (!post) {
        return res.status(404).json({ error: "Post not found." });
    }

    res.status(200).json(post);
}

/// GET /posts/prompt
const getPrompt = async (req, res) => {

    const idxObj = await PromptIndex.find()
    const idx = idxObj[0].current

    const prompt = promptsConstants[idx]

    // console.log("update idx of ", updateIdx)
    res.json(prompt)
}

const getNewPrompt = async () => {
    const idxObj = await PromptIndex.find()
    const idx = idxObj[0].current

    const updateIdx = await PromptIndex.findOneAndUpdate({ current: idx }, { current: (idx + 1) % promptsConstants.length})

    console.log(updateIdx)
}

module.exports = { getPosts, getPost, createPost, deletePost, updatePost, getPrompt, getNewPrompt }