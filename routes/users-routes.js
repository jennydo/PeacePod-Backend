const express = require('express')
const usersRouter = express.Router()
const {getUsers ,findUser, signUp, logIn} = require('../controllers/users-controller')

usersRouter.get('/', getUsers)
usersRouter.get('/findUser/:userId', findUser)
usersRouter.post('/signUp', signUp)
usersRouter.post('/logIn', logIn)

module.exports = usersRouter

