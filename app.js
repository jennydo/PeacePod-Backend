const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors')

const usersRouter = require('./routes/users-routes')
const postsRouter = require('./routes/posts-routes')


const app = express()

app.use(cors({
    origin: "*"
}))

app.use(express.json())

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected to Backend!' });
});

const MONGO_URI = 'mongodb+srv://peacepod:peacepod@cluster0.cxattxq.mongodb.net/' // process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT || 4000);
        console.log('Connected to DB and listening on port 4000')
    }
    )
    .catch((error) => {
        console.log(error)
    })