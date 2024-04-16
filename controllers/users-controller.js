const User = require('../models/users-model')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

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

const signUp = async(req, res) => {
    const { username, email, password, pronounce, gender, sexualOrientation, location, interests } = req.body
    
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

        const newUser = await User.create({username, email, password: hash, pronounce, gender, sexualOrientation, location, interests})
        const token = createToken(newUser._id)
        res.status(201).json({username, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


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
        const token = createToken(user._id)
        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {getUsers, findUser, signUp, logIn}