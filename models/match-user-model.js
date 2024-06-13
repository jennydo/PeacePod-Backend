const mongoose = require("mongoose");
const {
  feelings,
  coreValues,
  gratefulFor,
  practices,
  motivations
} = require("../constants/matchingQuestions");

const matchUserSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ageRange: {
      type: String,
      required: true,
    },
    feeling: {
      type: String,
      enum: feelings,
      required: false,
    },
    coreValue: {
      type: String,
      enum: coreValues,
      required: false,
    },
    gratefulFor: { type: String, enum: gratefulFor, required: false },
    practice: { type: String, enum: practices, required: false },
    motivation: { type: String, enum: motivations, required: false },
  },
  { timestamps: true }
);

const matchUserModel = mongoose.model("MatchUser", matchUserSchema);

module.exports = matchUserModel;
