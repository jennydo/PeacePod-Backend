const express = require("express");
const matchUserRouter = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getMatchUsers,
  getMatchUser,
  createMatchUser,
  updateMatchUser,
  deleteMatchUser,
} = require("../controllers/match-user-controller");

matchUserRouter.use(requireAuth);
matchUserRouter.get("/", getMatchUsers);
matchUserRouter.get("/:userId", getMatchUser);
matchUserRouter.post("/", createMatchUser);
matchUserRouter.patch("/:userId", updateMatchUser);
matchUserRouter.delete("/:userId", deleteMatchUser);

module.exports = matchUserRouter;
