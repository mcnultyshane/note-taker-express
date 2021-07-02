// Dependencies
const fs = require('fs');
const path = require('path');

module.exports = app => {

    fs.readFile('db/db.json', 'utf8', (err, data) => {

        if (err) throw err;

        let notes = JSON.parse(data);

        // API Routes
        // -------------------------------------------------------
        // setup api get
        app.get('/api/notes', (req, res) => {
            res.json(notes)
        });


        // setup api post
        app.post('api/notes', (req, res) => {
            let newNotes = req.body;
            notes.push(newNotes);
            updateDb();
            return console.log(`Added Note: ${newNotes.title}`);
        });

        app.get('api/notes:id', (req, res) => {
            notes.splice(req.params.id, 1);
            updateDb()
        });
        // Delete note?



        // View Routes
        // -------------------------------------------------------------      
        // On Load Page-> Start with index.html
        app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/../public/index.html')));
        
        // Notes html page and the 'url' for the page.
        app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/../public/notes.html')));


        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }
    });
}