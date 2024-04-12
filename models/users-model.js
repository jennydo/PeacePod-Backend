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
    interests: [{ type: String, enum: usersInterests, required: true }],
    avatar: {
        type: String, 
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    }
})

const usersModel = mongoose.model('User', usersSchema)

module.exports = usersModel