const mongoose = require('mongoose')

const MatchingPairsSchema = mongoose.Schema({
    matchingPairs: {
        type: Map,
        require: true
    }
}, { timestamps: true })

const MatchingPairsModel = mongoose.model("MatchingPairs", MatchingPairsSchema)
module.exports = MatchingPairsModel