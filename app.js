const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors')

const usersRouter = require('./routes/users-routes')


const app = express()
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.json())

app.use('/api/users', usersRouter);

const MONGO_URI = 'mongodb+srv://peacepod:peacepod@cluster0.cxattxq.mongodb.net/' // process.env.MONGO_URI;
mongoose.connect(MONGO_URI);

app.listen(process.env.PORT || 4000);