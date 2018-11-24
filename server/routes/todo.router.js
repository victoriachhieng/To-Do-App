const express = require('express');
const toDoRouter = express.Router();
const pg = require('pg'); // Node module that will connect to postgres

// Setup PG to connect to database
const Pool = pg.Pool;
const config = {
    database: 'weekend-to-do-app', // name of your database
    host: 'localhost', // where is your database?
    port: 5432, // port for the database
    max: 10, // how many connections at one time?
    idleTimeoutMillis: 30000 // 30 second time out
}

const pool = new Pool(config);

// Listener setups
pool.on("connect", () => {
    console.log("connected to postgres!!!!");
});

pool.on("error", (error) => {
    console.log("error connecting to postgres database", error);
});

// Setup a GET route to get all tasks from database
toDoRouter.get('/', (req, res) => {
    console.log('in GET route');
    // the query we want to run
    const query = 'SELECT * FROM "tasks";';
    pool.query(query).then((results) => {
        console.log('Got stuff back from database', results);
        res.send(results.row); // results.row is an ARRAY of tasks
    }).catch((error) => {
        console.log('Error making GET', error);
        res.sendStatus(500);
    });
}); // END GET ROUTE

module.exports = toDoRouter;