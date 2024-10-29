const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require("cors");

const app = express()
const port = 3000
app.use(cors());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("database Connected!!!"))
    .catch((error) => console.log("here is the error: " + error))

