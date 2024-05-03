const express = require('express');
const spotifyRouter = express.Router();

const getAccessToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64'))
      },
      body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    if (response.ok) {
        const accessToken = data.access_token;
        console.log('Access token retrieved in backend:', accessToken); 
        return accessToken
    } else {
    throw new Error(data.error || 'Failed to retrieve access token');
    }
    // The response will return an access token valid for 1 hour
};

spotifyRouter.post('/getAccessToken', async (req, res) => {
    try {
    const accessToken = await getAccessToken();
    res.json({ accessToken });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = spotifyRouter;