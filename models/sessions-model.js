const mongoose = require("mongoose");

const sessionsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uploadedBackgrounds: {
    type: [String],
    required: true,
  },
  lastBackground: {
    type: String,
    required: true,
  },
  meditationAudio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MeditationAudio",
  },
  music: {
    type: String,
  },
  isPlayingAudio: {
    type: Boolean,
    required: true,
  },
});

const sessionsModel = mongoose.model("Session", sessionsSchema);

module.exports = sessionsModel;
