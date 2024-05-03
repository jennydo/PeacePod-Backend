const express = require('express')
const meditationRouter = express.Router()
const { getSession } = require('../controllers/meditation-controller')

/// get a meditation session
meditationRouter.post('/sessions', getSession)

module.exports = meditationRouter