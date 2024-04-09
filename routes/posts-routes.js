const express = require('express')
const { getPosts, getPost, createPost, deletePost, updatePost } = require('../controllers/posts-controller');

const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.get('/:postId', getPost);
postsRouter.post('/', createPost);
postsRouter.delete('/:id', deletePost);
postsRouter.patch('/:postId', updatePost);

module.exports = postsRouter;