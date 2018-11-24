// Require
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const toDoRouter = require('./routes/todo.router.js');

// USES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// ROUTES
app.use('/todoapp', toDoRouter)

// Start listening for requests on a specific port
app.listen(PORT, () => {
    console.log('listening on port', PORT);
}); // end listen