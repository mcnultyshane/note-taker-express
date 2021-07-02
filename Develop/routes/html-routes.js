// // Dependencies
// const fs = require('fs');
// const path = require('path');
// const notes = require('../db/db')

// module.exports = app => {
//         // View Routes
//         // -------------------------------------------------------------      
//         // On Load Page-> Start with index.html
//         app.get('/', (req, res) =>
//             res.sendFile(path.join(__dirname, '/public/index.html')));

//         // Notes html page and the 'url' for the page.
//         app.get('/notes', (req, res) =>
//             res.sendFile(path.join(__dirname, '/public/notes.html')));


//         // API Routes
//         // -------------------------------------------------------
//         // setup api get

//         app.route('/api/notes')
//             .get(function (req, res) {
//                 res.json(notes)
//             })
//             // setup api post
//             .post(function (req, res) {
//                     let jsonPath = path.join(__dirname, "/db/db.json");
//                     let newNotes = req.body;
//                     let newId = 99;
//                     // Loop through array to find highest ID
//                     for (let i = 0; i < notes.length; i++) {
//                         const singleNote = notes[i];

//                         if (singleNote.id > newID) {
//                             newId = singleNote.id;

//                         }
//                     }
//                     // Assign ID to new Note
//                     newNotes.id = newId + 1;

//                     // Push to the db.json
//                     notes.push(newNotes);

//                     // write db. json file
//                     fs.writeFile(jsonPath, JSON.stringify(notes), err => {
//                         if (err) {
//                             return console.log(err);

//                         }
//                         console.log("Your note was saved");
//                     });
//                     res.json(newNotes)

//                     }
//     }

        // app.get('api/notes:id', (req, res) => {
        //     notes.splice(req.params.id, 1);
        //     updateDb()
        // });
        // Delete note?

        // fs.readFile(notes, 'utf8', (err, data) => {

        //     if (err) throw err;

        //     let notes = JSON.parse(data);