const express = require('express')
const { createMeditationAudio, getAllAudio, getAudio, createSession, getUserSession, getUserLastSession, updateAudio } = require('../controllers/meditation-controller')
//testing TextToAudio
const {convertTextToAudio} = require('../utils/apis/text-to-speech')
const requireAuth = require('../middleware/requireAuth')


const meditationRouter = express.Router()

meditationRouter.use(requireAuth)

/// get a meditation session
//meditationRouter.post('/sessions', getSession)
meditationRouter.post('/audios', createMeditationAudio)
meditationRouter.get('/audios', getAllAudio)
meditationRouter.get('/audios/:audioId', getAudio)
meditationRouter.patch('/audios/:audioId', updateAudio)
meditationRouter.post('/sessions', createSession)
meditationRouter.get('/sessions', getUserSession)
meditationRouter.get('/sessions/last', getUserLastSession)

// Test Text to Audio generation independently
meditationRouter.post('/audios/text-to-audio', convertTextToAudio)

module.exports = meditationRouter