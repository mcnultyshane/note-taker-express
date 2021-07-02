// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db')

// The Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Setting up Data Parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Link to assets
app.use(express.static('public'))

// turning off and moved the items to this page.
// require('./routes/html-routes')(app)

// On Load Page-> Start with index.html
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html')));

// Notes html page and the 'url' for the page.
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html')));


// Express Listening.  Setting ups server
app.listen(PORT, () => {
    console.log(`App listening on PORT; ${PORT}`);
});