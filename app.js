const dotenv = require('dotenv');
const env = dotenv.config();
if (env.error) {
    throw new Error("Failed to load the .env file!");
}

const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors');
const socket = require('socket.io')

/// node-cron for task scheduling
const cron = require('node-cron')
const getNewPrompt = require('./utils/getDailyPrompt')

// create routes
const usersRouter = require('./routes/users-routes')
const quotesTipsRouter = require('./routes/quotes-tips-routes')
const postsRouter = require('./routes/posts-routes')
const commentsRouter = require('./routes/comments-routes')
const reactionsRouter = require('./routes/reactions-routes');
const chatsRouter = require('./routes/chats-routes');
const messagesRouter = require('./routes/messages-routes');

// create express app
const app = express()

// middleware: parse incoming JSON data
app.use(cors({
    origin: "*"
}))

app.use(express.json())

// test route to check if backend is connected
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected to Backend!' });
});


// use routes
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter)
app.use('/api/reactions', reactionsRouter)
app.use('/api/quotestips', quotesTipsRouter)
app.use('/api/chats', chatsRouter)
app.use('/api/messages', messagesRouter)

/// Get daily prompt
cron.schedule("0 */15 * * *", () => {
    getNewPrompt()
})

// connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => {
        const server = app.listen(process.env.PORT || 4000);
        console.log('Connected to DB and listening on port 4000')
        const io = socket(server)
        io.on("connection", () => {
            console.log("Connected to socket.io")
        })
    }
    )
    .catch((error) => {
        console.log(error)
    })