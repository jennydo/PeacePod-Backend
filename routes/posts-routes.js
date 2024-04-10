const express = require('express')
const { getPost, getAllPosts, createPost, deletePost, updatePost } = require('../controllers/posts-controller');

const postsRouter = express.Router();

postsRouter.get('/', getAllPosts);
postsRouter.get('/:postId', getPost);
postsRouter.post('/', createPost);
postsRouter.delete('/:postId', deletePost);
postsRouter.patch('/:postId', updatePost);

module.exports = postsRouter;