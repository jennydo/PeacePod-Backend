const Post = require('../models/posts-model');
const mongoose = require('mongoose');

const getPosts = async (req, res) => {
    const posts = await Post.find({}).sort({createdAt: -1});
    res.status(200).json(posts);
}

const getPost = async (req, res) => {
    const id = req.params.postId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "There is no such post."});
    }
    const post = await Post.findById(id);
    if (!post) {
        return res.status(404).json({error: "There is no such post."});
    }
    res.status(200).json(post);
}

const createPost = async (req, res) => {
    const { avatar, title, body, isPrompt } = req.body; // later will add comments and reactions 
    try {
        const post = await Post.create({ avatar, title, body, isPrompt });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({error: error.mssg});
    }
}

const deletePost = async (req, res) => {
    const id = req.params.postId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "There is no such post."});
    }
    const post = await Post.findOneAndDelete({_id: id});
    if (!post) {
        return res.status(404).json({error: "There is no such post."});
    }
    res.status(200).json(post);
}

const updatePost = async (req, res) => {
    const id = req.params.postId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "There is no such post."});
    }
    const post = await Post.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!post) {
        return res.status(404).json({error: "There is no such post."});
    }
    res.status(200).json(post);
}

module.exports = { getPosts, getPost, createPost, deletePost, updatePost }