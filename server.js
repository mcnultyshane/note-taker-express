// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db');
const uuid = require('uuid');
const { request } = require('http');

console.log(notes);
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

app.get('/api/notes', (req, res) => {
    console.log("\n\nExecuting GET notes request");
    let data = JSON.parse(fs.readFileSync('/db/db.json', 'utf-8'));
    console.log('\nGET request - Returning notes data: ' + JSON.stringify(data));

    // fetch the notes array database
    res.json(data)

})


// setup api post
app.post('/api/notes', (req, res) => {
    let jsonPath = path.join(__dirname, "/db/db.json");
    let newNote = req.body;

    newNote.id = uuid();
    let data = JSON.parse(fs.readFileSync('/db/db.json', 'utf-8'));
    // Push to the db.json
    data.push(newNote);

    // write db. json file
    fs.writeFile(jsonPath, JSON.stringify(data), err => {
        if (err) {
            return console.log("this is line 66 error;" + err);

        }
        console.log("Your note was saved");
    });
    res.json(data)


});
// delete a note based on id

app.delete("/api/notes/:id", (req, res) => {
    let jsonFilePath = path.join(__dirname, "/db/db.json")
    let noteId = request.params.id.toString();
    console.log(`\n\nDELETE note request for noteId: ${noteId}`);
    // filter data to get notes except the one to delete
    const newData = data.filter( note => note.id.toString() !== noteId );

    fs.writeFileSync(jsonFilePath, JSON.stringify(newData), function (err) {

        if (err) {
            return console.log(err);
        } else {
            console.log(`\nSuccessfully deleted note with id : ${noteId}`);
        }
    })
    res.json(newData);
});


// Express Listening.  Setting ups server
app.listen(PORT, () => {
    console.log(`App listening on PORT; ${PORT}`);
});