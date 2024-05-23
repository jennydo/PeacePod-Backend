const express = require('express')
const { createMeditationAudio, getAllAudio, getAudio, createSession, getUserSession, getUserLastSession } = require('../controllers/meditation-controller')
const requireAuth = require('../middleware/requireAuth')

const meditationRouter = express.Router()

meditationRouter.use(requireAuth)

/// get a meditation session
//meditationRouter.post('/sessions', getSession)
meditationRouter.post('/audios', createMeditationAudio)
meditationRouter.get('/audios', getAllAudio)
meditationRouter.get('/audios/:audioId', getAudio)
meditationRouter.post('/sessions', createSession)
meditationRouter.get('/sessions', getUserSession)
meditationRouter.get('/sessions/last', getUserLastSession)


module.exports = meditationRouter