const mongoose = require("mongoose");
const {
  meditationFeelings,
  meditationPractices,
  meditationPlaces,
  meditationGoals,
  meditationTools,
  meditationChallenges,
  meditationImpacts,
  meditationWith,
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
    meditationFeelings: {
      type: String,
      enum: meditationFeelings,
      required: false,
    },
    meditationPractices: {
      type: String,
      enum: meditationPractices,
      required: false,
    },
    meditationPlaces: { type: String, enum: meditationPlaces, required: false },
    meditationGoals: { type: String, enum: meditationGoals, required: false },
    meditationTools: { type: String, enum: meditationTools, required: false },
    meditationChallenges: {
      type: String,
      enum: meditationChallenges,
      required: false,
    },
    meditationImpacts: {
      type: String,
      enum: meditationImpacts,
      required: false,
    },
    meditationWith: { type: String, enum: meditationWith, required: false },
  },
  { timestamps: true }
);

const matchUserModel = mongoose.model("MatchUser", matchUserSchema);

module.exports = matchUserModel;
