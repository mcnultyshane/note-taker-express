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


// API Routes
// -------------------------------------------------------
// setup api get

app.route('/api/notes')
    .get(function (req, res) {
        // fetch the notes array database
        res.json(notes)
    })

// setup api post
    .post(function (req, res) {
            let jsonPath = path.join(__dirname, "/db/db.json");
            let newNotes = req.body;

            let newId = 103;
            // Loop through array to find highest ID
            for (let i = 0; i < notes.length; i++) {
                let singleNote = notes[i];

                if (singleNote.id > newID) {
                    newId = singleNote.id;

                }
            }
            // Assign ID to new Note
            newNotes.id = newId + 1;

            // Push to the db.json
            notes.push(newNotes);

            // write db. json file
            fs.writeFile(jsonPath, JSON.stringify(notes), err => {
                if (err) {
                    return console.log(err);

                }
                console.log("Your note was saved");
            });
            res.json(newNotes)

        });



// Express Listening.  Setting ups server
app.listen(PORT, () => {
    console.log(`App listening on PORT; ${PORT}`);
});