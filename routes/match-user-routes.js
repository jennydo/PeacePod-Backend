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
} = require("../controllers/match-user-controller");

matchUserRouter.use(requireAuth);
matchUserRouter.get("/", getMatchUsers);
matchUserRouter.get("/:userId", getMatchUser);
matchUserRouter.post("/", createMatchUser);
matchUserRouter.patch("/:userId", updateMatchUser);
matchUserRouter.delete("/:userId", deleteMatchUser);
matchUserRouter.delete('/', deleteAllMatchUsers)

module.exports = matchUserRouter;
