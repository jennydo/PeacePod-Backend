const express = require('express');
const voiceRouter = express.Router();
const { convertTextToAudio } = require('../utils/apis/text-to-speech')

voiceRouter.post('/create', convertTextToAudio)

module.exports = voiceRouter;