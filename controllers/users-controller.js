const User = require("../models/users-model");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { calculateAge } = require("../utils/calculateAge");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// @route GET /api/users
// @desc get all users
// @access Public
const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(201).json(users);
};

// @route GET /api/users/:userId
// @desc get user by id
// @access Public
const findUser = async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  const age = calculateAge(user.dob);
  if (user) {
    res.status(201).json({ user, age });
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

// @route POST /api/users/signUp
// @desc register a new user
// @access Public
const signUp = async (req, res) => {
  const {
    username,
    email,
    password,
    dob,
    pronounce,
    gender,
    sexualOrientation,
    location,
    interests,
    bio,
  } = req.body;

  try {
    if (
      !email ||
      !password ||
      !username ||
      !pronounce ||
      !gender ||
      !sexualOrientation ||
      !location ||
      !dob
    ) {
      throw Error("All required fields must be filled.");
    }
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid.");
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw Error("Username is already in use.");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("This password is not strong enough.");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const dateOfBirth = new Date(dob);

    const user = await User.create({
      username,
      email,
      password: hash,
      dob: dateOfBirth,
      pronounce,
      gender,
      sexualOrientation,
      location,
      interests,
      bio,
    });
    const token = createToken(user._id);

    const age = calculateAge(dateOfBirth);
    res.status(201).json({ user, token, age });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route GET /api/users/logIn
// @desc Log in
// @access Public
const logIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw Error("All fields must be filled");
    }
    const user = await User.findOne({ username });
    if (!user) {
      throw Error("Incorrect username.");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Incorrect password.");
    }
    const token = createToken(user._id);
    const age = calculateAge(user.dob);
    res.status(200).json({ user, token, age });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route PATCH /api/users/:userId
// @desc Update user
// @access Private
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { avatar, avatarData } = req.body;

  /// Check if request has params userId
  if (!userId) return res.status(404).json({ error: "User id is required." });

  const user = await User.findById(userId);

  /// Check if user exists
  if (!user) return res.status(404).json({ error: "User not found." });

  /// If exits
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    // { ...req.body},
    { avatar: avatar, avatarData: avatarData },
    { new: true }
  );

  if (!updatedUser)
    return res.status(404).json({ error: "Cannot update user." });

  return res.status(201).json(updatedUser);
};

// @route DELETE /api/users/:userId
// @desc Delete user
// @access Private
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(404).json({ error: "Missing user id." });

  const user = await User.findById(userId);

  if (!user) return res.status(404).json({ error: "User not found." });

  const deletedUser = await User.findOneAndDelete({ _id: userId });

  if (!deletedUser)
    return res.status(404).json({ error: "Cannot delete this user." });

  return res.status(201).json(deletedUser);
};

module.exports = { getUsers, findUser, updateUser, deleteUser, signUp, logIn };
