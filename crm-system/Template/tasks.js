// Example data (replace with actual data handling logic)
let tasksData = [
    { id: 1, title: 'Task A', description: 'Description for task A', dueDate: '2023-06-15' },
    { id: 2, title: 'Task B', description: 'Description for task B', dueDate: '2023-07-01' },
    { id: 3, title: 'Task C', description: 'Description for task C', dueDate: '2023-07-20' }
];

// Function to display tasks
function displayTasks() {
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '';

    tasksData.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Due Date: ${task.dueDate}</p>
            <div class="btn-group">
                <button class="btn" onclick="openEditTaskModal(${task.id})">Edit</button>
                <button class="btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        tasksList.appendChild(taskItem);
    });
}

// Function to open Add Task modal
function openAddTaskModal() {
    document.getElementById('modalTitle').textContent = 'Add Task';
    document.getElementById('taskForm').reset(); // Reset form fields
    document.getElementById('taskId').value = ''; // Ensure taskId is empty
    document.getElementById('taskModal').style.display = 'block';
}

// Function to open Edit Task modal
function openEditTaskModal(id) {
    const task = tasksData.find(task => task.id === id);
    if (task) {
        document.getElementById('modalTitle').textContent = 'Edit Task';
        document.getElementById('taskId').value = task.id;
        document.getElementById('title').value = task.title;
        document.getElementById('description').value = task.description;
        document.getElementById('dueDate').value = task.dueDate;
        document.getElementById('taskModal').style.display = 'block';
    }
}

// Function to close modal
function closeTaskModal() {
    document.getElementById('taskModal').style.display = 'none';
}

// Function to add or edit a task
function saveTask(event) {
    event.preventDefault(); // Prevent form submission

    const id = document.getElementById('taskId').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;

    if (id) {
        // Edit task
        const index = tasksData.findIndex(task => task.id === parseInt(id));
        if (index !== -1) {
            tasksData[index] = { id: parseInt(id), title, description, dueDate };
        }
    } else {
        // Add new task
        const newTask = {
            id: generateId(),
            title,
            description,
            dueDate
        };
        tasksData.push(newTask);
    }

    closeTaskModal();
    displayTasks();
}

// Function to delete a task
function deleteTask(id) {
    tasksData = tasksData.filter(task => task.id !== id);
    displayTasks();
}

// Function to generate a unique ID (example)
function generateId() {
    return tasksData.length > 0 ? Math.max(...tasksData.map(task => task.id)) + 1 : 1;
}

// Event listener for form submission
document.getElementById('taskForm').addEventListener('submit', saveTask);

// Initial display of tasks
displayTasks();
