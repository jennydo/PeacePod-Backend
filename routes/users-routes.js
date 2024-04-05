const express = require('express')
const usersRouter = express.Router()
const {findUser, signUp, logIn} = require('../controllers/users-controller')

usersRouter.get('/findUser/:userId', findUser)
usersRouter.post('/signUp', signUp)
usersRouter.post('/logIn', logIn)

module.exports = usersRouter

