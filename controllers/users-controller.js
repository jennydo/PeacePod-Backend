const User = require('../models/users-model')
const bcrypt = require('bcrypt')
const validator = require('validator')

// @route GET /api/users
// @desc get all users
// @access Public
const getUsers = async(req, res) => {
    const users = await User.find()
    res.status(201).json(users)
}

// @route GET /api/users/:userId
// @desc get user by id
// @access Public
const findUser = async(req, res) => {
    const userId = req.params.userId
    const user = await User.findById(userId)

    if (user) {
        res.status(201).json(user)
    } else {
        res.status(404).json({ error: "User not found"})
    }
}

// @route POST /api/users/createUser
// @desc create a new user
// @access Public
const createUser = async(req, res) => {
    const newUser = req.body
    const savedUser = await User.create(newUser)
    res.json(savedUser)
}

// @route GET /api/users/signUp
// @desc register a new user
// @access Public
const signUp = async(req, res) => {
    const { username, email, password, pronounce, gender, sexualOrientation, location, interests, avatar } = req.body
    
    try {
        if (!email || !password || !username || !pronounce || !gender || !sexualOrientation || !location ) {
            throw Error('All required fields must be filled.')
        }
        if (!validator.isEmail(email)) {
            throw Error('Email is not valid.')
        }
        const existingUser = await User.findOne({username})
        if (existingUser) {
            throw Error("Username is already in use.")
        }
        if (!validator.isStrongPassword(password)) {
            throw Error("This password is not strong enough.")
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const savedUser = await User.create({username, email, password: hash, pronounce, gender, sexualOrientation, location, interests, avatar})

        res.status(201).json(savedUser)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// @route GET /api/users/logIn
// @desc Log in 
// @access Public
const logIn = async(req, res) => {
    const {username, password} = req.body

    try {
        if (!username || !password) {
            throw Error('All fields must be filled')
        }
        const user = await User.findOne( { username })
        if (!user) {
            throw Error('Incorrect username.')
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            throw Error('Incorrect password.')
        }
        res.status(200).json({username, password})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {getUsers, findUser, createUser, signUp, logIn}