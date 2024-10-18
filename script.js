
const addButton = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

loadTasks();


addButton.addEventListener('click', addTask);


function addTask() {
    const task = taskInput.value.trim();

    if (task) {
        createTaskElement(task);
        taskInput.value = '';
        saveTasks();
    } else {
        alert('Please enter a task!');
    }
}


function createTaskElement(task) {
    const listItem = document.createElement('li');
    listItem.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteTask';

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);


    deleteButton.addEventListener('click', () => {
        taskList.removeChild(listItem);
        saveTasks();
    });
}


function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach((listItem) => {
        tasks.push(listItem.textContent.replace('Delete', '').trim());
    });

    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (storedTasks) {
        storedTasks.forEach((task) => {
            createTaskElement(task);
        });
    }
}