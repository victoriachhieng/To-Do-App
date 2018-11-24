// Require
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;

// USES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// GET
app.get('/todo', (req, res) => {
    console.log('in GET route');
    res.send('HELLO');
}); // END GET ROUTE

// Start listening for requests on a specific port
app.listen(PORT, () => {
    console.log('listening on port', PORT);
}); // end listen