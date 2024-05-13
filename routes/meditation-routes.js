const express = require('express')
const { getSession, createVoiceSession } = require('../controllers/meditation-controller')


const meditationRouter = express.Router()

/// get a meditation session
meditationRouter.post('/sessions', getSession)
meditationRouter.post('/createVoice', createVoiceSession)

module.exports = meditationRouter