const express = require('express')
const usersRouter = express.Router()
const {getUsers ,findUser, createUser, signUp, logIn} = require('../controllers/users-controller')

usersRouter.get('/', getUsers)
usersRouter.get('/:userId', findUser)
usersRouter.post('/createUser', createUser)
usersRouter.post('/signUp', signUp)
usersRouter.post('/logIn', logIn)

module.exports = usersRouter

