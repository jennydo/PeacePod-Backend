const dotenv = require("dotenv");
const env = dotenv.config();
if (env.error) {
  throw new Error("Failed to load the .env file!");
}

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const socket = require("socket.io");

/// node-cron for task scheduling
const cron = require("node-cron");
const getNewPrompt = require("./utils/getDailyPrompt");

// create routes
const usersRouter = require('./routes/users-routes')
const quotesTipsRouter = require('./routes/quotes-tips-routes')
const postsRouter = require('./routes/posts-routes')
const commentsRouter = require('./routes/comments-routes')
const reactionsRouter = require('./routes/reactions-routes');
const meditationRouter = require('./routes/meditation-routes')
const chatsRouter = require("./routes/chats-routes");
const messagesRouter = require("./routes/messages-routes");
const spotifyRouter = require('./routes/spotify-routes')
const voiceRouter = require("./routes/voice-routes");
const cloudinaryRouter = require('./routes/cloudinary-routes');
const { generatePrompt } = require("./utils/apis/openaiUtils");

// create express app
const app = express();

// middleware: parse incoming JSON data
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// test route to check if backend is connected
app.get("/", (req, res) => {
  res.status(200).json({ message: "Connected to Backend!" });
});

// use routes
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter)
app.use('/api/reactions', reactionsRouter)
app.use('/api/quotestips', quotesTipsRouter)
app.use('/api/meditation', meditationRouter)

app.use("/api/chats", chatsRouter);
app.use("/api/messages", messagesRouter);

app.use('/api/spotify', spotifyRouter)
app.use('/api/cloudinary', cloudinaryRouter)
//app.use('/api/voice', voiceRouter)

/// Get daily prompt
/// For final results, set to "0 0 * * * " (run at every 00:00). 
/// Currently runs every 15 minutes for better testing
cron.schedule("0 */15 * * *", () => {
  // getNewPrompt();
  generatePrompt()
});

// For developing purposes, run every 5 seconds
// cron.schedule("*/5 * * * * *", () => {
//     generatePrompt()
// })


// connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => {
    const server = app.listen(process.env.PORT || 4000);
    console.log("Connected to DB and listening on port 4000");
    // Socket
    // Socket setup (server)
    const io = socket(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("Connected to socket.io");
      socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
      });

      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
      });
      socket.on("typing", (room) => socket.in(room).emit("typing"));
      socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

      socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;

          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });

      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });

// io.on('connection', (socket) => {

//     console.log('made socket connection', socket.id);

//     // Handle chat event
//     socket.on('chat', (data) => {
//         io.sockets.emit('chat', data);
//     });

//     // Handle typing event
//     socket.on('typing', (data) => {
//         socket.broadcast.emit('typing', data);
//     })

// });