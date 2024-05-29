const PromptResponse = require("../models/prompt-response-model");
const mongoose = require("mongoose");

// @route GET /promptReponses/prompt/:promptId
// @description: Find all promptResponses and sort them by createdAt in descending order for a specific prompt
// @params: prompt id
// @access Private
const getPromptResponses = async (req, res) => {
  const { promptId } = req.params;

  if (!promptId)
    return res.status(400).json({ error: "Prompt id is required" });

  let promptResponses;
  try {
    promptResponses = await PromptResponse.find({ promptId: promptId })
      .populate("userId", "username avatar email")
      .populate("promptId")
      .sort({ createdAt: 1 }); // populate the userId field with the User object
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while trying to retrieve the promptResponses.",
    });
  }

  res.status(200).json(promptResponses);
};

// @route GET /promptReponses/:responseId
// @description: get a specific promptResponse by its id
// @params: prompt response id
// @access Private
const getPromptResponse = async (req, res) => {
  const { promptId } = req.params;

  if (!promptId)
    return res.status(400).json({ error: "Prompt id is required" });

  if (!mongoose.Types.ObjectId.isValid(promptId)) {
    return res.status(400).json({ error: "Not a valid promptResponseing id." });
  }

  let promptResponse;
  try {
    promptResponse = await PromptResponse.findById(promptId)
      .populate("userId", "username avatar email")
      .populate("promptId");
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while trying to retrieve the promptResponse.",
    });
  }

  if (!promptResponse) {
    return res.status(404).json({ error: "PromptResponse not found." });
  }

  res.status(200).json(promptResponse);
};

// @route POST /promptReponses/:promptId
// @description: create a new promptResponse for a specific post
// @params: promptId
// @access Private
const createPromptResponse = async (req, res) => {
  const { promptId } = req.params.promptId;

  if (!promptId)
    return res.status(400).json({ error: "Prompt id is required" });

  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ error: "Your promptResponse creation has error" });
  }

  const { userId, content } = req.body;

  if (!userId || !content) {
    return res.status(400).json({ error: "Missing fields" });
  }

  let promptResponse;
  try {
    promptResponse = await PromptResponse.create({
      userId,
      promptId,
      content,
    });
    promptResponse = await promptResponse
      .populate("userId")
      .populate("promptId");
    return res.status(200).json(promptResponse);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while trying to create the promptResponse.",
    });
  }
};

// @route DELETE /promptReponses/:promptId
// @description: delete a specific promptResponse by its id
// @params: promptResponseId
// @access Private
const deletePromptResponse = async (req, res) => {
  const { promptId } = req.params.promptId;

  if (!promptId)
    return res.status(400).json({ error: "Prompt id is required" });

  if (!mongoose.Types.ObjectId.isValid(promptId)) {
    return res.status(400).json({ error: "PromptResponse not found." });
  }

  let promptResponse;
  try {
    promptResponse = await PromptResponse.findByIdAndDelete(promptId);
    if (!promptResponse) {
      return res.status(404).json({ error: "PromptResponse not found." });
    }
    return res.status(200).json(promptResponse);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while trying to delete the promptResponse.",
    });
  }
};

// @route PATCH /promptReponses/:promptId
// @description: update a specific promptResponse by its id
// @params: promptResponseId
// @access Private
const updatePromptResponse = async (req, res) => {
  const { promptId } = req.params.promptId;

  if (!promptId)
    return res.status(400).json({ error: "Prompt id is required" });

  if (!mongoose.Types.ObjectId.isValid(promptId)) {
    return res.status(400).json({ error: "PromptResponse not found." });
  }

  let promptResponse;
  try {
    promptResponse = await PromptResponse.findByIdAndUpdate(
      promptId,
      req.body,
      {
        new: true,
      }
    );

    if (!promptResponse) {
      return res.status(404).json({ error: "PromptResponse not found." });
    }

    return res.status(200).json(promptResponse);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while trying to update the promptResponse.",
    });
  }
};

module.exports = {
  getPromptResponses,
  getPromptResponse,
  createPromptResponse,
  deletePromptResponse,
  updatePromptResponse,
};