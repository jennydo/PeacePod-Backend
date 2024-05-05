const express = require('express');
const spotifyRouter = express.Router();
const { spotifyLogin, refreshToken } = require('../utils/apis/spotify')

spotifyRouter.post('/login', spotifyLogin)
spotifyRouter.post('/refreshToken', refreshToken)

module.exports = spotifyRouter;