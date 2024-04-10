const express = require('express')
const { getComments, getComment, createComment, deleteComment, updateComment } = require('../controllers/comments-controller');

const commentsRouter = express.Router();

commentsRouter.get('/', getComments);
commentsRouter.get('/:commentId', getComment);
// create comment for specific post
commentsRouter.post('/:postId', createComment);
commentsRouter.delete('/:commentId', deleteComment);
commentsRouter.patch('/:commentId', updateComment);

module.exports = commentsRouter;