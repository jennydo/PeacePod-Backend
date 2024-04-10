const Post = require('../models/posts-model');
const mongoose = require('mongoose');

// Find all posts and sort them by createdAt in descending order
const getAllPosts = async (req, res) => {
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

    const { title, body, isPrompt } = req.body;

    if (!title || !body || isPrompt === undefined) {
        return res.status(400).json({ error: "Your post creation has error" });
    }

    let post;
    try {
        post = await Post.create({ title, body, isPrompt });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(201).json(post);
}

// Delete a post by its id
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

module.exports = { getAllPosts, getPost, createPost, deletePost, updatePost }