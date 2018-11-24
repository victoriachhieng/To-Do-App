console.log('js');

$(document).ready(handleReady);

function handleReady() {
    console.log('in handleReady');
    // Set up click listeners
    $('#addTaskBtn').on('click', handleClick);
} // end handleReady

function handleClick() {
    console.log('in addTask');
} // end handleClick
