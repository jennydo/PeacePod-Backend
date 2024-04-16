const express = require('express')
const { getComments, getComment, createComment, deleteComment, updateComment } = require('../controllers/comments-controller');

const commentsRouter = express.Router();

// get all comments for specific post
commentsRouter.get('/:postId', getComments);
// get specific comment by comment id
commentsRouter.get('/:commentId', getComment);
// create comment for specific post
commentsRouter.post('/:postId/:userId', createComment);
// delete specific comment by id
commentsRouter.delete('/:commentId', deleteComment);
// update comment body for specific comment
commentsRouter.patch('/:commentId', updateComment);

module.exports = commentsRouter;