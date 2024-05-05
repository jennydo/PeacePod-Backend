const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node')

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

const spotifyLogin = async (req, res) => {
  const {code} = req.body;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  })

  spotifyApi.authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
      })
    })
    .catch(err => {
        res.status(400).json({ error: err.message })
    })
}

const refreshToken = async (req, res) => {
  const {refreshToken} = req.body;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      // console.log('The access token has been refreshed!', data.body)
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
}

module.exports = { getAccessToken, spotifyLogin, refreshToken}