const express = require('express')
const usersRouter = express.Router()
const {findUser, createUser, signUp, logIn} = require('../controllers/users-controller')

usersRouter.get('/findUser/:userId', findUser)
usersRouter.post('/createUser', createUser)
usersRouter.post('/signUp', signUp)
usersRouter.post('/logIn', logIn)

module.exports = usersRouter

