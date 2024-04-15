const express = require('express')
const { getPosts, getPost, createPost, deletePost, updatePost, getPrompt } = require('../controllers/posts-controller');

const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.get('/:postId', getPost);
postsRouter.post('/', createPost);
postsRouter.post('/prompt', getPrompt)
postsRouter.delete('/:postId', deletePost);
postsRouter.patch('/:postId', updatePost);

module.exports = postsRouter;