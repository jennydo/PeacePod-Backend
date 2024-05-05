const express = require('express');
const spotifyRouter = express.Router();
const { getAccessToken, spotifyLogin, refreshToken } = require('../utils/apis/spotify')

spotifyRouter.post('/login', spotifyLogin)
spotifyRouter.post('/refreshToken', refreshToken)

// spotifyRouter.post('/getAccessToken', async (req, res) => {
//     try {
//     const accessToken = await getAccessToken();
//     res.json({ accessToken });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

module.exports = spotifyRouter;