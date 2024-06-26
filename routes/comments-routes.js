const express = require('express')
const { getComments, getComment, createComment, deleteComment, updateComment } = require('../controllers/comments-controller');
const requireAuth = require('../middleware/requireAuth');

const commentsRouter = express.Router();

commentsRouter.use(requireAuth);
// get all comments for specific post/comment
commentsRouter.get('/post/:postId', getComments);
// get specific comment by id
commentsRouter.get('/:commentId', getComment);
// create comment for specific post
commentsRouter.post('/:postId', createComment);
// delete specific comment by id
commentsRouter.delete('/:commentId', deleteComment);
// update comment body for specific comment
commentsRouter.patch('/:commentId', updateComment);

module.exports = commentsRouter;