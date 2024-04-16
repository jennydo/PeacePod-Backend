const express = require('express')
const { createReaction, deleteReaction,countReactions, getUsersReacted, isReacted } = require('../controllers/reactions-controller');

const reactionsRouter = express.Router();

// get all users who reacted to a post
reactionsRouter.get('/:postId/users', getUsersReacted);
// get total number of reactions for a post
reactionsRouter.get('/:postId/total', countReactions);
// create a reaction to a post by a specific user
reactionsRouter.post('/:postId/:userId', createReaction);
// delete a reaction to a post by a specific user
reactionsRouter.delete('/:postId/:userId', deleteReaction);
// check if a user has reacted to a post
reactionsRouter.get('/:postId/:userId/isReacted', isReacted);

module.exports = reactionsRouter;
