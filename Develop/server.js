// Dependencies
const express = require('express');
const path = require('path');
// const fs = require('fs');

// The Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Setting up Data Parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
// Link to assets
app.use(express.static('public'))

require('./routes/html-routes')(app)

// Express Listening.  Setting ups server
app.listen(PORT, () => {
    console.log(`App listening on PORT; ${PORT}`);
});