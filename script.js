// Access elements
let formSubmit = document.querySelector('#submit');
let form = document.querySelector('#input-form');
let toDoList = document.querySelector('#toDoListSection');
let taskContainer = document.querySelector('#toDolistTaskContainer');
let addTaskButton = document.querySelector('#addButton');
let deleteIcon = document.createElement('span');

// ++++++++++ SESSION MANAGEMENT ++++++++++

// Function to check cookies and manage login form visibility
function checkCookie() {
    let username = getCookie('username');
    let email = getCookie('email');

    if (username && email) {
        form.classList.add('formhide');
        toDoList.classList.remove('toDolistHide');
        toDoList.classList.add('toDolistShow');
    } else {
        form.classList.remove('formhide');
        toDoList.classList.add('toDolistHide');
    }
}

// +++++++ Set and Get Cookies ++++++++

function setCookie(name, value, hours) {
    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()}`;
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// ++++++++++ FORM SUBMIT EVENT +++++++++++

formSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    if (username && email) {
        // Set cookies with a 5-hour expiration
        setCookie('username', username, 5);
        setCookie('email', email, 5);

        // Hide the login form and show the to-do list
        form.classList.add('formhide');
        toDoList.classList.remove('toDolistHide');
        toDoList.classList.add('toDolistShow');
    } else {
        alert("Please provide both username and email!");
    }
}, false);

// Call checkCookie on page load to manage form visibility
checkCookie();

// ++++++++++ TASK MANAGEMENT ++++++++++

// Add new task in UL
function addNewItem() {
    let newTaskContent = document.querySelector('#taskInput').value;
    if (newTaskContent === '') {
        alert('You must add something!');
    } else {
        let taskLi = document.createElement('li');
        taskLi.classList.add('task-row');

        let newTask = document.createElement('div');
        newTask.classList.add('TaskContent-container');
        newTask.textContent = newTaskContent;

        let icons = document.createElement('div');
        icons.classList.add('icon-container');
        icons.innerHTML =   `<ion-icon name="checkmark-done-circle" id="completed"></ion-icon> 
                            <ion-icon name="trash-outline" id="delete"></ion-icon>`;

        taskLi.appendChild(newTask);
        taskLi.appendChild(icons);
        taskContainer.appendChild(taskLi);

        // Clear input field
        document.querySelector('#taskInput').value = '';
        saveData();
    }
}

addTaskButton.addEventListener('click', addNewItem, false);

// Event delegation for delete and complete actions
taskContainer.addEventListener('click', function (e) {
    if (e.target.id === 'delete') {
        // Delete task
        e.target.closest('li').remove();
        saveData();
    } else if (e.target.id === 'completed') {
        // Mark task as completed
        e.target.closest('li').classList.toggle('completedTask');
        saveData();
    }
}, false);

// ++++++++++ SAVE AND SHOW TASKS ++++++++++

function saveData() {
    localStorage.setItem('data', taskContainer.innerHTML);
}

function showTask() {
    taskContainer.innerHTML = localStorage.getItem('data') || '';
}
showTask();
