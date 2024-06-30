const MatchUser = require("../models/match-user-model");
const MatchingPairs = require("../models/matching-pairs-model");
const User = require("../models/users-model");
const mongoose = require("mongoose");
const { calculateAge } = require("../utils/calculateAge");
const { ObjectId } = require('mongodb');

// @route GET /matchUsers
// @description: Find all matchUsers and sort them by createdAt in descending order
// @access Private
const getMatchUsers = async (req, res) => {
  try {
    const matchUsers = await MatchUser.find({})
      .populate("userId")
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

// @route GET 
// @description: Construct matches for users
// @access: Private
const fetchMatchPairs = async (req, res) => {
  try {
    const response = await fetch('http://localhost:5002/matchPairs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const matchingPairs = await response.json();

    let pairings;
    try {
      pairings = await MatchingPairs.create({ matchingPairs });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
    pairings = await pairings.populate('matchingPairs');

    return res.status(200).json(pairings);

  } catch (error) {
    console.error('Error fetching match pairs:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

};

// @route GET /matchUsers/matchingPairs/:userId
// @description: get the user that got matched with this user
// @body: this userId
const getUserMatchPair = async (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ error: "User id is required" });

  
  try {
    const lastMatchingPairsObj = await MatchingPairs.findOne().sort({ _id: -1 });
    const lastMatchingPairs = lastMatchingPairsObj['matchingPairs'];

    if (!lastMatchingPairs) {
      return res.status(404).json({ error: "lastMatchingPairs not found." });
    }

    // double check this var to put outside try catch?
    let userMatchPair;
    if (lastMatchingPairs.has(userId)) {
      userMatchPairId = await lastMatchingPairs.get(userId);
      userMatchPair = await User.findById(new ObjectId(userMatchPairId));
    } else {
      return res.status(404).json({ error: "userId not found." });
    }

    return res.status(200).json(userMatchPair);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
}


// @route POST /matchUsers
// @description: create a new matchUser
// @body: content
// @access Private
const createMatchUser = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const userId = req.user._id;

  if (!userId) {
    return res.status(400).json({ error: "UserId cannot be empty" });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const age = calculateAge(user.dob);

  /// Convert age to age range
  let ageRange;
  if (age >= 10 && age < 20) {
    ageRange = "10-20";
  } else if (age >= 20 && age < 30) {
    ageRange = "20-30";
  } else if (age >= 30 && age < 40) {
    ageRange = "30-40";
  } else if (age >= 40 && age < 50) {
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
          userId,
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
  fetchMatchPairs,
  getUserMatchPair
};
