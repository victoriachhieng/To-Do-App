$(document).ready(handleReady);

function handleReady() {
    // Set up click listeners
    $('#addTaskBtn').on('click', handleAddBtn);
    $('#viewTask').on('click', '.deleteBtn', handleDelete);
    // Get data
    getTasks();
} // end handleReady

function handleAddBtn() {
    console.log('in handleAddBtn');
    // get user input and put in an object
    let taskToSend = {
        task: $(`#taskIn`).val(),
        notes: $(`#notesIn`).val(),
        status: $(`#statusIn`).val()
    } // end taskToSend
    $.ajax({
        method: 'POST',
        url: '/todoapp',
        data: taskToSend
    }).then(function (response) {
        //database is updated, need to update DOM
        getTasks();
    }).catch(function (error) {
        console.log(error);
        alert('Something went wrong in POST');
    }) // end POST ajax
} // end handleAddBtn

function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/todoapp'
    }).then(function (response) {
        console.log('getTasks - response', response);
        //Append tasks
        appendToDom(response);
    }).catch(function (error) {
        console.log('getTasks - error', error);
        alert('something went wrong in GET')
    }) // end GET ajax
} // end getTasks 

function appendToDom(tasks) {
    console.log('in appendToDom');
    $("#viewTask").empty();
    for (let task of tasks) {
        let $tr = $(`<tr> </tr>`);
        $tr.append(`
      <td>${task.id}</td>
      <td>${task.task}</td>
      <td>${task.notes}</td>
      <td>${task.status}</td>
      <td><button class="completeBtn">Complete</button></td>
      <td><button class="deleteBtn">Delete</button></td>
    `); // end append
        // attach data to row, need for delete
        $tr.data('id', task.id);
        $("#viewTask").append($tr);
    } // end for loop 
} // end appendToDom


function handleDelete() {
    console.log('in handleDelete');
    let id = $(this).parent().parent().data('id');
    console.log(`in handleDelete, ${id}`);
    $.ajax({
        method: 'DELETE',
        url: `/todoapp/${id}`
    }).then(function (response) {
        getTasks();
    }) // end DELETE ajax
} // end handleDelete
