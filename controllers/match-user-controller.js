const MatchUser = require("../models/match-user-model");
const User = require("../models/users-model");
const mongoose = require("mongoose");

// @route GET /matchUsers
// @description: Find all matchUsers and sort them by createdAt in descending order
// @access Private
const getMatchUsers = async (req, res) => {
  try {
    const matchUsers = await MatchUser.find({})
      //   .populate("userId")
      .sort({ createdAt: -1 });
    return res.status(201).json(matchUsers);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

// @route GET /matchUsers/:userId
// @description: get a specific matchUser by its id
// @params: user id
// @access Private
const getMatchUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ error: "User id is required" });

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Not a valid matchUser id." });
  }

  let matchUser;
  try {
    matchUser = await MatchUser.findById(userId)
      .populate("userId", "username avatar email")
      .populate("promptId");

    if (!matchUser) {
      return res.status(404).json({ error: "MatchUser not found." });
    }

    return res.status(200).json(matchUser);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

// @route GET /matchUsers/getMatch
// @description: Construct matches for users
// @access: Private
const matching = async (req, res) => {
    ///// Later call K-clusters from Flask services

    return res.status(201).json("Chat Matching Algo")
}

// @route POST /matchUsers
// @description: create a new matchUser
// @body: content
// @access Private
const createMatchUser = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const {
    userId,
  } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "UserId cannot be empty" });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  /// Convert age to age range
  let ageRange;
  if (user.age >= 10 && user.age < 20) {
    ageRange = "10-20";
  } else if (user.age >= 20 && user.age < 30) {
    ageRange = "20-30";
  } else if (user.age >= 30 && user.age < 40) {
    ageRange = "30-40";
  } else if (user.age >= 40 && user.age < 50) {
    ageRange = "40-50";
  } else {
    ageRange = "50+";
  }

  try {
    const matchUser = await MatchUser.findOne({ userId });

    /// If there exists match user with this user id, update, not creating new
    if (matchUser) {
      const updateMatchUser = await MatchUser.findOneAndUpdate(
        { userId },
        {
          ...req.body,
          ageRange,
        },
        { new: true }
      );

      console.log("In create match user, but update current", updateMatchUser);
      return res.status(201).json(updateMatchUser);
    }

    /// Currently no match user with this user id
    const newMatchUser = await MatchUser.create({
      ...req.body,
      ageRange,
    });

    return res.status(200).json(newMatchUser);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

// @route DELETE /matchUsers/:userId
// @description: delete a specific matchUser by its id
// @params: matchUserId
// @access Private
const deleteMatchUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ error: "Prompt id is required" });

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "MatchUser not found." });
  }

  try {
    const matchUser = await MatchUser.findByIdAndDelete(userId);
    if (!matchUser) {
      return res.status(404).json({ error: "MatchUser not found." });
    }
    return res.status(200).json(matchUser);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

// @route PATCH /matchUsers/:userId
// @description: update a specific matchUser by its id
// @params: matchUserId
// @access Private
const updateMatchUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ error: "User id is required" });

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Not a valid user id" });
  }

  try {
    const matchUser = await MatchUser.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (!matchUser) {
      return res.status(404).json({ error: "MatchUser not found." });
    }

    return res.status(200).json(matchUser);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

// @route DELETE /matchUsers
// @description: delete all match users in DB
// @access Private
const deleteAllMatchUsers = async (req, res) => {
  try {
    const deleted = await MatchUser.deleteMany({});
    return res.status(201).json(deleted);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  getMatchUsers,
  getMatchUser,
  createMatchUser,
  deleteMatchUser,
  updateMatchUser,
  deleteAllMatchUsers,
  matching
};
