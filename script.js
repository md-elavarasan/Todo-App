const addButton = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

loadTasks();

addButton.addEventListener('click', addTask);

function addTask() {
    const task = taskInput.value.trim();

    if (task) {
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task }),
        })
        .then(response => response.json())
        .then(data => {
            createTaskElement(data.task, data.id);
            taskInput.value = '';
        })
        .catch(error => console.error('Error adding task:', error));
    } else {
        alert('Please enter a task!');
    }
}

function createTaskElement(task, id) {
    const listItem = document.createElement('li');
    listItem.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteTask';

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            taskList.removeChild(listItem);
        })
        .catch(error => console.error('Error deleting task:', error));
    });
}

function loadTasks() {
    fetch('http://localhost:3000/tasks')
    .then(response => response.json())
    .then(tasks => {
        tasks.forEach(task => {
            createTaskElement(task.task, task.id);
        });
    })
    .catch(error => console.error('Error loading tasks:', error));
}
