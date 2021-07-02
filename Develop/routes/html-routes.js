const fs = require('fs');
const path = require('path'); 

module.exports = function (app) {

    fstat.readFile('db/db.json','utf8', (err,data) => {
        if (err) throw err;

        let notes = JSON.parse(data);

        // API Routes
        app.get('/api/notes', (req, res) => res.json(notes));
        
    })

        app.post('api/notes', (req, res) => {
            let newNotes = req.body;
            notes.push(newNotes);
            updateDb();
            return console.log(`Added Note: ${newNotes.title}`);
        })
    
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/../public/notes.html')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/../public/index.html')));
}