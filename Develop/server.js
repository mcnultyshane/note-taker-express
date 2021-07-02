
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
// app.use(expect.json());

require('./routes/html-routes.js')(app)

app.listen(PORT, () => {
    console.log(`App listening on PORT; ${PORT}`);
});