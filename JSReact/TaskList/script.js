//App Variables: 
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
  // Load tasks once page is loaded
  document.addEventListener('DOMContentLoaded', getTasks);
  // add tasks
  form.addEventListener('submit', addTask);
  // remove tasks
  taskList.addEventListener('click', removeTask);
  // remove all tasks
  clearBtn.addEventListener('click', removeAllTasks); 
  // filter tasks
  filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();

  if(taskInput.value === '' || taskInput.value === ' ') {
    alert('Add task');
  }

  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  taskList.appendChild(li);

  // save in local storage
  storeTaskInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = '';

}

// Store to LS
const storeTaskInLocalStorage = (task) => {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      //remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((item, index) => {
    if(taskItem.textContent === item) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove all tasks
function removeAllTasks() {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

//filter tasks

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach((item) => {
    const task = item.firstChild.textContent;
    if(task.toLowerCase().indexOf(text) != -1) {
      item.style.display = 'block'; 
    } else {
      item.style.display = 'none';
    }
  })
}
