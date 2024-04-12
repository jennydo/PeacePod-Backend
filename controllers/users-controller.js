const User = require('../models/users-model')
const mongoose = require('mongoose')

// get all users
const getUsers = async(req, res) => {
    const users = await User.find()
    res.json(users)
}

const findUser = async(req, res) => {
    const userId = req.params.userId
    const user = await User.findById(userId)

    if (user) {
        res.json(user)
    } else {
        res.sendStatus(404)
    }
}

// note feedback from Khoa: passward should be encrypted
const createUser = async(req, res) => {
    const newUser = req.body
    const savedUser = await User.create(newUser)
    res.json(savedUser)
}

// todo may have to handle errors later
// add validation for signUp
const signUp = async(req, res) => {
    const user = req.body
    const existingUser = await User.findOne({username: user.username})
    if (existingUser) {
        res.sendStatus(403)
        return
    }
    const savedUser = await user.save()
    res.status(201).json(savedUser)
}


const logIn = async(req, res) => {
    const credentials = req.body
    const existingUser = await User.findOne({
        username: credentials.username, 
        password: credentials.password})

    if (existingUser) {
        res.json(existingUser)
    } else {
        res.sendStatus(403)
    }
}

module.exports = {getUsers, findUser, createUser, signUp, logIn}