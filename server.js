// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json')
const uuid = require('uuid');
const {
    request
} = require('http');

console.log(notes);
// The Express App
const app = express();
// Setup initial port
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

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    console.log(req.params.id);
    const id =req.params.id;
    let found
    notes.forEach(n => {
        if (id == n.id) {
            n = found;
            return res.json(found)
        }
    })
    return res.json(false)
})

// setup api post
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    if (notes.length === 0) {
        newNote.id = 1
    } else {
        newNote.id = (notes[notes.length - 1].id + 1)
    }
    notes.push(newNote);
    let jsonNotes = JSON.stringify(notes)
    fs.writeFile('./db/db.json', jsonNotes, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Success!");
    })
    res.json(true)
});
// delete a note based on id

app.delete("/api/notes/:id", (req, res) => {
    // let jsonFilePath = path.join(__dirname, notes)
    let id = req.params.id;
    console.log(req.params.id);
    let found;
    notes.forEach((n, index) => {
        if (id == n.id) {
            notes.splice(index, 1)
            const notesCopy = notes.slice();
            let jsonNotes = JSON.stringify(notesCopy)
            fs.writeFileSync('./db/db.json', jsonNotes, function (err) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log("Success!");
                }
            })
        }
    })
 res.json(true);
});


// Express Listening.  Setting ups server
app.listen(PORT, () => {
    console.log(`App listening on PORT; ${PORT}`);
});