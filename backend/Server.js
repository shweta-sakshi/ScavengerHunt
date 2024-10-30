const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require("cors");
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

// Enable CORS specifically for Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow requests from this origin
        methods: ["GET", "POST"],
        credentials: true
    }
});

//cros for express.
app.use(cors());

//connection event
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
});

const port = 3000
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// database connection.
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("database Connected!!!"))
    .catch((error) => console.log("here is the error: " + error))

