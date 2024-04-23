const express = require('express')
const usersRouter = express.Router()
const {getUsers ,findUser, signUp, logIn,updateUser, deleteUser} = require('../controllers/users-controller')

usersRouter.get('/', getUsers)
usersRouter.get('/findUser/:userId', findUser)
usersRouter.post('/signUp', signUp)
usersRouter.post('/logIn', logIn)
usersRouter.patch('/:userId', updateUser)
usersRouter.delete('/:userId', deleteUser)

module.exports = usersRouter

