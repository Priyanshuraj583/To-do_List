const taskInput=document.getElementById('taskInput');
const addTaskButton=document.getElementById('addTaskButton')
const taskList=document.getElementById('taskList')
const clearTasksButton = document.getElementById('clearTasksButton');
const bgColorPicker = document.getElementById('bgColorPicker');


function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        tasks.push({
            text: item.querySelector('.task').innerText,
            completed: item.classList.contains('completed'),
            date:item.querySelector('.date').innerText
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text, task.completed,task.date);
    });
}
function addTask(taskText, completed = false,date) {
    const li = document.createElement('li');
    li.className = `todo-item ${completed ? 'completed' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    const span = document.createElement('span');
    span.className = 'task';
    span.innerText = taskText;
    
    const span1 = document.createElement('span');
    span1.className='date'
    span1.innerText=date;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(span1);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    saveTasks();
}
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText,false,new Date().toLocaleString());
        taskInput.value = '';
    }
    else{
        alert("Write Something to Add Task")
    }
});
clearTasksButton.addEventListener('click', () => {
    taskList.innerHTML = '';
    saveTasks();
});

bgColorPicker.addEventListener('input', () => {
    document.querySelector('.container').style.backgroundColor = bgColorPicker.value;
    localStorage.setItem('bgColor', bgColorPicker.value);
});


function loadBackgroundColor() {
    const bgColor = localStorage.getItem('bgColor');
    if (bgColor) {
        document.querySelector('.container').style.backgroundColor = bgColor;
        bgColorPicker.value = bgColor;
    }
}

//on every initialization
loadTasks();
loadBackgroundColor();