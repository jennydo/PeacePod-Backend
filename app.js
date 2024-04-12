require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors');

const usersRouter = require('./routes/users-routes')
const quotesTipsRouter = require('./routes/quotes-tips-routes')
//const {getInsprirationalQuotes} = require('./utils/apis/newsfeed-quotes-tips')

const app = express()

app.use(cors({
    origin: "*"
}))

app.use(express.json())

app.use('/api/users', usersRouter);
app.use('/api/quotestips', quotesTipsRouter)
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected to Backend!' });
});



const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT || 4000);
        console.log('Connected to DB and listening on port 4000')
    }
    )
    .catch((error) => {
        console.log(error)
    })