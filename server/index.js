// importing the important packages
const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");

// imp configs
dotenv.config();

// env variables
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
const PORT = process.env.PORT;

// important initialization
const app = express(); // express app is being declared
const httpServer = createServer(app); // a httpServer is built that will handel its request through express app
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
}); // this creates WebSocket server (Socket.IO) running on top of the HTTP server. it only allows this server

//declaring an array to store users
const users = {};

// middlewares
app.use(cors());

let totalUsers = 0;

// listning websocket services
io.on("connection", (socket) => {
  // io is connection and every user has there own soket to connect
  // console.log("new connection");

//   totalUsers++;             

  // Send total users count to all clients
  io.emit("totalUsers", totalUsers);

  // as soon as any user joines the chat
  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    // console.log(users);
    // console.log(`${user} has joined the chat!`);
    // server tells everyone that user has joined
    totalUsers++;  // Increase only when the user joins properly
    io.emit("totalUsers", totalUsers);
    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: `${users[socket.id]} has joined the chat`,
    });
    // server welcomes the newly joined user
    socket.emit("welcome", {
      user: "Admin",
      message: `welcome to the chat ${users[socket.id]}`,
    });


    // handel incomming message and then broadcast it to all
    socket.on('message',({message,id})=>{
        io.emit('sendMessage', {user:users[id],message, id});    // users[id] is nothing but username in our case 
    })

    // on socket disconnected
    socket.on("disconectIt", () => {
      socket.broadcast.emit("left", {
        user: "Admin",
        message: `${users[socket.id]} has left the chat!`,
      });
      console.log("user left");
    });

    // automatic disconnection
    socket.on("disconnect", () => {
        totalUsers = Math.max(totalUsers - 1, 0);
        io.emit("totalUsers", totalUsers);
        socket.broadcast.emit("left", {
          user: "Admin",
          message: `${users[socket.id]} has left the chat!`,
        });
        delete users[socket.id]; // Optional: Clean up the user when they disconnect
        console.log("user left");
    });



  });
});

// main commands to listen
httpServer.listen(PORT, (req, res) => {
  console.log(`The server is running on the port ${PORT}`);
});
