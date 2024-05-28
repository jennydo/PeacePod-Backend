const express = require('express')
const { createReaction, deleteReaction,countReactions, getUsersReacted, isReacted } = require('../controllers/reactions-controller');
const requireAuth = require('../middleware/requireAuth');

const reactionsRouter = express.Router();

reactionsRouter.use(requireAuth);

// get all users who reacted to a post
reactionsRouter.get('/users/:postId', getUsersReacted);
// get total number of reactions for a post
reactionsRouter.get('/total/:postId', countReactions);
// create a reaction to a post by a specific user
reactionsRouter.post('/:postId', createReaction);
// delete a reaction to a post by a specific user
reactionsRouter.delete('/:postId', deleteReaction);
// check if a user has reacted to a post
reactionsRouter.get('/isReacted/:postId', isReacted);


module.exports = reactionsRouter;