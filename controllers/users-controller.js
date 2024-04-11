const User = require('../models/users-model')
const mongoose = require('mongoose')

const findUser = async(req, res) => {
    const userId = req.params.userId
    const user = await User.findById(userId)

    if (user) {
        res.json(user)
    } else {
        return res.status(404).json({ error: "User not found"})
    }
}

// note feedback from Khoa: passward should be encrypted
// using brcypt package
const createUser = async(req, res) => {
    const newUser = req.body
    const savedUser = await User.create(newUser)
    res.json(savedUser)
}

// todo may have to handle errors later
// add validation for signUp
const signUp = async(req, res) => {
    const { username } = req.body
    const existingUser = await User.findOne({ username })

    if (existingUser) {
        return res.status(403).json({ error: "Username already exists"})
    }
    
    /// Change later based on schema
    const newUser = req.body

    try {
        const savedUser = await User.create(newUser)
        if (!savedUser)
            return res.status(404).json({ error: "Error occurs while saving new user"})
        return res.status(200).json(savedUser)
    } catch (error) {

        return res.status(500).json({ error })
    }
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

module.exports = {findUser, createUser, signUp, logIn}