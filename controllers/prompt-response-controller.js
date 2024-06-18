const Prompt = require("../models/prompt-model");
const PromptResponse = require("../models/prompt-response-model");
const mongoose = require("mongoose");

// @route GET /promptReponses/prompt/:promptId
// @description: Find all promptResponses and sort them by createdAt in descending order for a specific prompt
// @params: prompt id
// @access Private
const getPromptResponses = async (req, res) => {
  const { promptId } = req.params;

  const userId = req.user._id

  if (!promptId)
    return res.status(400).json({ error: "Prompt id is required" });

  let promptResponses;
  try {
    promptResponses = await PromptResponse.find({ promptId, userId })
      // .populate("userId", "username avatar email")
      // .populate("promptId")
      .sort({ createdAt: 1 });
    return res.status(201).json(promptResponses);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

// @route GET /promptReponses/:responseId
// @description: get a specific promptResponse by its id
// @params: prompt response id
// @access Private
const getPromptResponse = async (req, res) => {
  const { responseId } = req.params;

  if (!responseId)
    return res.status(400).json({ error: "Prompt response id is required" });

  if (!mongoose.Types.ObjectId.isValid(responseId)) {
    return res.status(400).json({ error: "Not a valid promptResponseing id." });
  }

  let promptResponse;
  try {
    promptResponse = await PromptResponse.findById(responseId)
      .populate("userId", "username avatar email")
      .populate("promptId");

    if (!promptResponse) {
      return res.status(404).json({ error: "PromptResponse not found." });
    }

    return res.status(200).json(promptResponse);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

// @route POST /promptReponses/:promptId
// @description: create a new promptResponse for a specific post
// @params: promptId
// @body: content
// @access Private
const createPromptResponse = async (req, res) => {
  const { promptId } = req.params;

  if (!promptId)
    return res.status(400).json({ error: "Prompt id is required" });

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const userId = req.user._id;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Response content cannot be empty" });
  }

  const prompt = await Prompt.findById(promptId);

  if (!prompt) return res.status(400).json({ error: "Prompt not found" });

  let promptResponse;
  try {
    promptResponse = await PromptResponse.create({
      userId,
      promptId,
      content,
    });

    // promptResponse = await promptResponse.populate("userId")
    // promptResponse = await promptResponse.populate("promptId")

    return res.status(200).json(promptResponse);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

// @route DELETE /promptReponses/:responseId
// @description: delete a specific promptResponse by its id
// @params: promptResponseId
// @access Private
const deletePromptResponse = async (req, res) => {
  const { responseId } = req.params;

  if (!responseId)
    return res.status(400).json({ error: "Prompt id is required" });

  if (!mongoose.Types.ObjectId.isValid(responseId)) {
    return res.status(400).json({ error: "PromptResponse not found." });
  }

  let promptResponse;
  try {
    promptResponse = await PromptResponse.findByIdAndDelete(responseId);
    if (!promptResponse) {
      return res.status(404).json({ error: "PromptResponse not found." });
    }
    return res.status(200).json(promptResponse);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

// @route PATCH /promptReponses/:responseId
// @description: update a specific promptResponse by its id
// @params: promptResponseId
// @access Private
const updatePromptResponse = async (req, res) => {
  const { responseId } = req.params;

  if (!responseId)
    return res.status(400).json({ error: "Prompt id is required" });

  if (!mongoose.Types.ObjectId.isValid(responseId)) {
    return res.status(400).json({ error: "PromptResponse not found." });
  }

  let promptResponse;
  try {
    promptResponse = await PromptResponse.findByIdAndUpdate(
      responseId,
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
      error,
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
