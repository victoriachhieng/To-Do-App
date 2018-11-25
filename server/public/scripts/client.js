console.log('js');

$(document).ready(handleReady);

function handleReady() {
    console.log('in handleReady');
    // Set up click listeners
    handleClickListeners();
    // load existing koalas on page load
    getTasks();
} // end handleReady


function handleClickListeners() {
    $('#addTaskBtn').on('click', function () {
        console.log('in handleClickListeners');
        // using an object
        let taskToSend = {
            task: $(`#taskIn`).val(),
            notes: $(`#notesIn`).val(),
            status: $(`#statusIn`).val()
        }; // end object
        // call saveTask with new object
        saveTask(taskToSend);
    });
} // end handleClickListners

function getTasks() {
    console.log('in getTasks');
    // ajax call to server to get tasks
    $.ajax({
        method: `GET`,
        url: `/todoapp`
    }).then(function (response) {
        appendToDom(response);
    }) // end ajax
} // end getTasks

//POST
function saveTask(newTask) {
    console.log('in saveTask', newTask);
    // ajax call to server to add task
    $.ajax({
        method: 'POST',
        url: '/todoapp',
        data: newTask //object being sent
    }).then(function (response) {
        console.log('back from POST with', response);
    }).catch(function (error) {
        console.log('error with POST', error);
    }) // end ajax
    // clear inputs
    $(`#taskIn`).val('');
    $(`#notesIn`).val('');
    $(`#statusIn`).val('');
} // end saveTask


// AUXILLARY FUNCTIONS

function appendToDom(tasks) {
    console.log('in appendToDom');
    $("#viewTasks").empty();
    for (let task of tasks) {
        let el = $(`<tr> </tr>`);
        el.data('task', tasks);
        el.append(`
      <td>${task.task}</td>
      <td>${task.notes}</td>
      <td>${task.status}</td>
    `);
        $("#viewTasks").append(el);
    } // end for loop
} // end appendToDom
