const Post = require('../models/posts-model');
const mongoose = require('mongoose');

const Comment = require('../models/comments-model');
const promptsConstants = require('../constants/prompts')
const PromptIndex = require('../models/promptIndex');
const Prompt = require('../models/prompt-model');
const { generatePrompt } = require('../utils/apis/openaiUtils');

// @route GET /api/posts
// @desc get all posts and sort by createdAt in descending order
// @access Public
const getPosts = async (req, res) => {
    let posts;
    try {
        posts = await Post.find({}).sort({createdAt: -1}).populate('userId', 'username avatar avatarData');
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while trying to retrieve the posts." });
    }

    if (!posts || posts.length === 0) {
        return res.status(404).json({ error: "No posts found." });
    }

    res.status(200).json(posts);
}

// @route GET /api/posts/:postId
// @desc get post by id
// @access Public
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
        post = await Post.findById(id).populate('userId', 'username avatar avatarData');
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while trying to retrieve the post." });
    }

    if (!post) {
        return res.status(404).json({ error: "Post not found." });
    }

    res.status(200).json(post);
}

// @route POST /api/posts
// @desc create a new normal post
// @access Public
const createPost = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const userId = req.user._id

    const {title, content, isPrompt } = req.body;

    if (!userId || !title || !content || isPrompt === undefined) {
        return res.status(400).json({ error: "Missing fields" });
    }

    let post;
    try {
        post = await Post.create({ userId, title, content, isPrompt });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(201).json(post);
}

// @route POST /api/posts/prompt
// @desc get a new prompt post and make current prompt normal post
// @access Public
const getPrompt = async (req, res) => {   

    const { userId } = req.body

    if (!userId)
    {
        return res.status(404).json({ error: "userId is required"})
    }

    try {
        /// New format with OpenAI
        const currentPrompt = await Prompt.findOne({})

        /// If after delete all the prompts, there are no prompt left in the DB -> need to create one here
        if (!currentPrompt)
        {
            /// New format with OpenAI
            await generatePrompt()
            const newPrompt = await Prompt.findOne({})

            return res.status(201).json(newPrompt)
        }       
        
        /// Else if there is any prompt in DB, get from DB
        return res.status(201).json(currentPrompt)
    } catch (error) {
        return res.status(404).json({ error })
    }
}

/// Olf format getPrompt
// // @route POST /api/posts/prompt
// // @desc get a new prompt post and make current prompt normal post
// // @access Public
// const getPrompt = async (req, res) => {   

//     const { userId } = req.body

//     if (!userId)
//     {
//         return res.status(404).json({ error: "userId is required"})
//     }

//     try {
//         /// Old format with constants and index
//         // const currentPrompt = await Post.findOne({ isPrompt: true })

//         /// If after delete all the prompts, there are no prompt left in the DB -> need to create one here
//         if (!currentPrompt)
//         {
            // // Old format, constants and idx
            // const idxObj = await PromptIndex.find()
            // const idx = idxObj[0].current
            // const promptContent = promptsConstants[idx]
            // const newPrompt = await Post.create({ userId, title: "Prompt of the day", content: promptContent, isPrompt: true })

//             return res.status(201).json(newPrompt)
//         }       
        
//         /// Else if there is any prompt in DB, get from DB
//         return res.status(201).json(currentPrompt)
//     } catch (error) {
//         return res.status(404).json({ error })
//     }
// }

// @route PATCH /api/posts/:postId
// @desc update a post by id
// @access Public
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

// @route DELETE /api/posts/:postId
// @desc delete a post by id
// @access Public
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

    // /// For debugging - Nam Nguyen
    // await Post.deleteMany({ isPrompt: true })

    res.status(200).json(post);
}

// @route DELETE /posts/prompt
// @desc delete all current prompts
// @access Public
const clearPrompts = async (req, res) => {
    const title = "Prompt of the day"

    const deletedPrompts = await Post.deleteMany({ title })

    if (!deletedPrompts)
        return res.status(404).json({ error: "Cannot delete all prompts"})
    return res.status(201).json(deletedPrompts)
}



module.exports = { getPosts, getPost, createPost, deletePost, updatePost, getPrompt, clearPrompts }