const express = require('express');
const toDoRouter = express.Router();

// Setup PG to connect to database
const pg = require('pg'); // Node module that will connect to postgres
const Pool = pg.Pool;
const config = {
    database: 'weekend-to-do-app', // name of your database
    host: 'localhost', // where is your database?
    port: 5432, // port for the database
    max: 10, // how many connections at one time?
    idleTimeoutMillis: 30000 // 30 second time out
} // end object

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
    console.log('In GET route');
    // The query we want to run
    const query = 'SELECT * FROM "tasks";';
    pool.query(query).then((results) => {
        console.log(results);
        res.send(results.rows); // result.rows is an Array of tasks
    }).catch((error) => {
        console.log('Error making GET', error);
        res.sendStatus(500);
    }); // end query pool
}); // END GET ROUTE

// Setup POST
toDoRouter.post('/', (req, res) => {
    console.log('in POST');
    const taskToSend = req.body; // This the data we sent
    console.log('In POST route - product:', taskToSend);
    const query = 'INSERT INTO "tasks" ("task", "notes", "status") VALUES ($1, $2, $3);';
    // $ with index (e.g. $1) will help improve the security of your db
    // Avoids SQL injection -- see bobby drop table comic
    pool.query(query, [taskToSend.task, taskToSend.notes, taskToSend.status]).then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error in POST', error);
        res.sendStatus(500);
    }); // end query pool
}); // END POST ROUTE

/*
// Setup PUT 
toDoRouter.put('/:id', function (req, res) {
    let id = req.params.id;
    const taskToUpdate = req.body; // This the data we sent
    const query = 'UPDATE FROM “tasks” SET “status” = ‘Complete' WHERE "id" = 1;';
    pool.query(query, [taskToUpdate.id, taskToUpdate.tasks, taskToUpdate.notes, taskToUpdate.status])
        .then((result) => {
            console.log(result);
            res.sendStatus(201);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        }) // end query pool
}) // END PUT ROUTE
*/

toDoRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log(`id made it to server ${id}`);
    pool.query(`DELETE FROM "tasks" WHERE id = $1;`, [id])
        .then((results) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        }) // end query pool
}) // END DELETE ROUTE


module.exports = toDoRouter;