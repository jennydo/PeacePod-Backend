const express = require("express");
const matchUserRouter = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getMatchUsers,
  getMatchUser,
  createMatchUser,
  updateMatchUser,
  deleteMatchUser,
  deleteAllMatchUsers,
  fetchMatchPairs,
  getUserMatchPair,
} = require("../controllers/match-user-controller");

matchUserRouter.use(requireAuth);
matchUserRouter.get("/", getMatchUsers);
matchUserRouter.post('/matchingPairs', fetchMatchPairs);
matchUserRouter.get('/matchingPairs', getUserMatchPair);
matchUserRouter.get("/:userId", getMatchUser);
matchUserRouter.post("/", createMatchUser);
matchUserRouter.patch("/:userId", updateMatchUser);
matchUserRouter.delete("/:userId", deleteMatchUser);
matchUserRouter.delete('/', deleteAllMatchUsers)

module.exports = matchUserRouter;
