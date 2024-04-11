const express = require('express')
const { createReaction, deleteReaction, countReactions, getUsersReacted } = require('../controllers/reactions-controller');

const reactionsRouter = express.Router();

reactionsRouter.get('/users/:reactionId', getUsersReacted);
reactionsRouter.get('/total/:reactionId', countReactions);
// add a reaction to a post
reactionsRouter.post('/:postId', createReaction);
reactionsRouter.delete('/:reactionId', deleteReaction);

module.exports = reactionsRouter;