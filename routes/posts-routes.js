const express = require('express')
const { getPosts, getPost, createPost, deletePost, updatePost, getPrompt } = require('../controllers/posts-controller');

const postsRouter = express.Router();

// get all posts
postsRouter.get('/', getPosts);
// get a post by id
postsRouter.get('/:postId', getPost);
// create a new post
postsRouter.post('/', createPost);
// get a prompt
postsRouter.post('/prompt', getPrompt)
// delete a post
postsRouter.delete('/:postId', deletePost);
// update a post
postsRouter.patch('/:postId', updatePost);

module.exports = postsRouter;