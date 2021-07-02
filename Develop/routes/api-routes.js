const { restart } = require('nodemon');
const tableData = require('../db/db.json');
const savedData = require('../db/note-data');

module.exports = function (app) {
    app.get('/api/tables', function (req, res){
        restart.json(tableData);
    });
    app.get('/api/notes', function (req, res){
        restart.json(savedData);
    });

}

