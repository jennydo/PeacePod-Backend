const express = require('express')
const { getInsprirationalQuotes } = require('../utils/apis/newsfeed-quotes-tips')

const quotesTipsRouter = express.Router()

quotesTipsRouter.get('/quotes', getInsprirationalQuotes)

module.exports = quotesTipsRouter 