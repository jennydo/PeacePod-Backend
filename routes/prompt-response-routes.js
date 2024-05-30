const express = require("express");

const promptResponseRouter = express.Router();
const {
  getPromptResponses,
  getPromptResponse,
  createPromptResponse,
  deletePromptResponse,
  updatePromptResponse,
} = require("../controllers/prompt-response-controller");
const requireAuth = require("../middleware/requireAuth");

promptResponseRouter.use(requireAuth)

promptResponseRouter.get('/prompt/:promptId', getPromptResponses)
promptResponseRouter.get('/:responseId', getPromptResponse)
promptResponseRouter.post('/:promptId', createPromptResponse)
promptResponseRouter.patch('/:responseId', updatePromptResponse)
promptResponseRouter.delete('/:responseId', deletePromptResponse)

module.exports = promptResponseRouter;
