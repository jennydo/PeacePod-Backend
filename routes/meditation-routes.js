const express = require('express')
const { createMeditationAudio, getAllAudio, getUserAllAudio, getAudio, createSession, getUserSession, getUserLastSession } = require('../controllers/meditation-controller')


const meditationRouter = express.Router()

/// get a meditation session
meditationRouter.post('/audios', createMeditationAudio)
meditationRouter.get('/audios', getAllAudio)
meditationRouter.get('/audios/user', getUserAllAudio)
meditationRouter.get('/audios/:audioId', getAudio)
meditationRouter.post('/sessions', createSession)
meditationRouter.get('/sessions', getUserSession)
meditationRouter.get('/sessions/last', getUserLastSession)


module.exports = meditationRouter