const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./apis/user');
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

//connection event accepting request.
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


// This line tells Express to parse incoming request bodies with JSON data.When set to { extended: true }, it allows for parsing of nested objects within the JSON payload.
// This is especially useful for API endpoints that expect JSON data in the body of POST, PUT, or PATCH requests.
app.use(bodyParser.json({ extended: true }));
//This line configures the app to parse URL-encoded data (e.g., form submissions).
// The { extended: true } option allows parsing of more complex, nested data structures using the qs library.If set to false, it uses the default querystring library, which does not support nested structures.
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", (express.json()), user)

// const locationSchema = new mongoose.Schema({
//     lat: Number,
//     lng: Number,
// });
// const Location = mongoose.model('Location', locationSchema);



app.post('/api/save-location', async (req, res) => {
    try {
        console.log(req.body);
        // const newLocation = new Location(req.body);
        // await newLocation.save();
        // res.status(201).json(newLocation);
    } catch (error) {
        console.log("here is the error" + error);

        res.status(500).json({ message: error.message });
    }
});


function notifyNewGame(message) {
    io.emit('newGame', { message });
}

app.post('/api/create-game', async (req, res) => {
    try {
        console.log("here i am");
        notifyNewGame('A new game has been created! Join now.');
        res.status(200).json({ message: "successfully sent notification !!!" })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// app.get('/locations', async (req, res) => {
//     try {
//         const locations = await Location.find();
//         res.json(locations);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });