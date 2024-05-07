// const express = require('express');
// const SpotifyWebApi = require('spotify-web-api-node')

// const spotifyLogin = async (req, res) => {
//   const {code} = req.body;
//   const spotifyApi = new SpotifyWebApi({
//     redirectUri: process.env.REDIRECT_URI,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET
//   })

//   spotifyApi.authorizationCodeGrant(code)
//     .then(data => {
//       res.json({
//         accessToken: data.body.access_token,
//         refreshToken: data.body.refresh_token,
//         expiresIn: data.body.expires_in
//       })
//     })
//     .catch(err => {
//         res.status(400).json({ error: err.message })
//     })
// }

// const refreshToken = async (req, res) => {
//   const {refreshToken} = req.body;
//   const spotifyApi = new SpotifyWebApi({
//     redirectUri: process.env.REDIRECT_URI,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     refreshToken
//   })

//   spotifyApi
//     .refreshAccessToken()
//     .then(data => {
//       // console.log('The access token has been refreshed!', data.body)
//       res.json({
//         accessToken: data.body.accessToken,
//         expiresIn: data.body.expiresIn,
//       })
//     })
//     .catch(err => {
//       console.log(err)
//       res.sendStatus(400)
//     })
// }

// module.exports = {spotifyLogin, refreshToken}