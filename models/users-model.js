const mongoose = require('mongoose')
const { usersGenders, usersInterests, usersPronounces, usersSexualities, usersLocations } = require('../constants/usersConstants')

const usersSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pronounce: { type: String, enum: usersPronounces, required: true },
    gender: { type: String, enum: usersGenders, required: true },
    sexualOrientation: [{ type: String, enum: usersSexualities, required: true }],
    location: { type: String, enum: usersLocations, required: true },
    interests: [{ type: String, enum: usersInterests, required: true }]
}, { collection: 'users' })

const usersModel = mongoose.model('UsersModel', usersSchema)

module.exports = usersModel