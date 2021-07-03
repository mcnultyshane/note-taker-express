// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db');
const uuid = require('uuid');

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

app.route('/api/notes')
    .get(function (req, res) {
        // fetch the notes array database
        res.json(notes)
    })

// setup api post
    .post(function (req, res) {
            let jsonPath = path.join(__dirname, "/db/db.json");
            let newNote = req.body;
            console.log("this is line 48:" + newNote);
            // let newId = 99;
            // // Loop through array to find highest ID
            // for (let i = 0; i < notes.length; i++) {
            //     let singleNote = notes[i];

            //     if (singleNote.id > newID) {
            //         newId = singleNote.id;

            //     }
            // }
            // // Assign ID to new Note
            // newNote.id = newId + 1;

            // Push to the db.json
            notes.push(newNote);
            console.log("this is line 64 " + notes);
            // write db. json file
            fs.writeFile(jsonPath, JSON.stringify(notes), err => {
                if (err) {
                    return console.log("this is line 66 error;" + err);

                }
                console.log("Your note was saved");
            });
            res.json(newNotes)
            

        });
// delete a note based on id

app.delete("/api/notes/:id", function(req, res){
    let jsonFilePath = path.join (__dirname, "/db/db.json")

    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == req.params.id) {
            notes.splice(i, 1);
            break;
        }
        
    }
    fs.writeFileSync(jsonFilePath, JSON.stringify(notes), function (err){

        if (err) {
            return console.log(err);
        } else {
            console.log("Your note has been removed from list.");
        }
    })
    res.json(notes);
})


// Express Listening.  Setting ups server
app.listen(PORT, () => {
    console.log(`App listening on PORT; ${PORT}`);
});