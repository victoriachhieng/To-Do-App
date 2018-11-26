$(document).ready(handleReady);

function handleReady() {
    // Set up click listeners
    $('#addTaskBtn').on('click', handleAddBtn);
    $('#viewTask').on('click', '.deleteBtn', handleDelete)
    $('#viewTask').on('click', '.completeBtn', handleComplete);
    // $('#viewTask').on('click', '.completeBtn', handleSwap);
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
    // empty inputs
    $(`#taskIn`).val('');
    $(`#notesIn`).val('');
    $(`#statusIn`).val('');
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
      <td class="bg-primary">${task.id}</td>
      <td class="bg-light">${task.task}</td>
      <td class="bg-primary">${task.notes}</td>
      <td class="bg-light">${task.status}</td>
      <td><button class="completeBtn gray">Complete</button><input type="checkbox" id="checMarkBtn"></td>
      <td><button class="deleteBtn red">Delete</button></td>
      alert()
    `); // end append
        $(".completeBtn").click(function () {
        $(".completeBtn").addClass('button-clicked');
        });
        // attach data to row, need for delete
        $tr.data('id', task.id);
        $("#viewTask").append($tr);
        if (task.status === 'Complete'){
            $tr.css('background-color', 'green');
        }
    } // end for loop 
} // end appendToDom

// function handleSwap(){
//     console.log('in handleSwap');
//     let swap = $('.completeBtn').toggleClass('green');
// } // end handleSwap

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

function handleComplete() {
    console.log('in handleComplete');
    let id = $(this).parent().parent().data('id');
    console.log(`in handleComplete, ${id}`);
    $.ajax({
        method: 'PUT',
        url: `/todoapp/${id}`
    }).then(function (response) {
        getTasks();
    }) // end UPDATE ajax
} // end handleComplete