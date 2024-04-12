const express = require('express')
const { getPosts, getPost, createPost, deletePost, updatePost, getPrompt } = require('../controllers/posts-controller');

const postsRouter = express.Router();

postsRouter.get('/', getPosts);
///
postsRouter.get('/prompt', getPrompt)
///
postsRouter.get('/:postId', getPost);
postsRouter.post('/', createPost);
postsRouter.delete('/:postId', deletePost);
postsRouter.patch('/:postId', updatePost);

module.exports = postsRouter;