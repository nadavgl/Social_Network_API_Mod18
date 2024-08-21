require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')

const db = require('./config/connection')
const api_routes = require('./routes/api_routes')


const app = express();
const PORT = 3333;

// Create a GET route for every file inside of client

// Attach all client-side cookies to the req.cookies property
app.use(cookieParser())

// Add the JSON middleware / Allow JSON to be attached to req.body
app.use(express.json())

// Load our routes
app.use('/api', api_routes)

// Send back the index.html file for all other requests/routes


db.once('open', () => {
    console.log('Db connection established')
    // Start express server
    app.listen(PORT, () => {
        console.log('Express server started on port', PORT)
    });
})

