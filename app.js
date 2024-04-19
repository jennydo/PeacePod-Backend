const dotenv = require('dotenv');
const env = dotenv.config();
if (env.error) {
    throw new Error("Failed to load the .env file!");
}

const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors');
const socket = require('socket.io');
const http = require('http');


// create routes
const usersRouter = require('./routes/users-routes')
const quotesTipsRouter = require('./routes/quotes-tips-routes')
const postsRouter = require('./routes/posts-routes')
const commentsRouter = require('./routes/comments-routes')
const reactionsRouter = require('./routes/reactions-routes')

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

// connect to MongoDB
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


// Socket
// Socket setup (server)
const server = http.createServer(app);
var io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })

});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// const server = createServer(app);
// const io = socket(server);

// // event connection. function(client socket)
// io.on('connection', (socket) => {
//     console.log('connected')

//     socket.on('chat', (data) => {
//         // emit sent data to all client sockets
//         io.sockets.emit('chat', data)
//     })
    
// });

// // server.js
// const server = http.createServer(app);
// const io = socket(server);

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Handle chat messages
//   socket.on('chat message', (message) => {
//     console.log('Message:', message);
//     // Broadcast the message to all connected clients
//     io.emit('chat message', message);
//   });

//   // Handle disconnect
//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

