const jwt = require('jsonwebtoken')
const User = require('../models/users-model')

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: "Authorization token required."})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findById({_id}).select("_id")
        req.usertoken = token
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: "Request is not authorized."})
    }
}

module.exports = requireAuth