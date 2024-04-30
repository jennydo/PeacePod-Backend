const express = require('express')
const { getPosts, getPost, createPost, deletePost, updatePost, getPrompt, clearPrompts } = require('../controllers/posts-controller');
const requireAuth = require('../middleware/requireAuth')

const postsRouter = express.Router();

postsRouter.use(requireAuth)

postsRouter.get('/', getPosts);
// get a post by id
postsRouter.get('/:postId', getPost);
// create a new post
postsRouter.post('/', createPost);
// get a prompt
postsRouter.post('/prompt', getPrompt)
postsRouter.delete('/prompt', clearPrompts)
postsRouter.delete('/:postId', deletePost);
// update a post
postsRouter.patch('/:postId', updatePost);

module.exports = postsRouter;