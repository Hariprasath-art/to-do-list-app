// Retrieve tasks from localStorage, or set an empty array if none exist
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to render tasks to the list
function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.toggle("completed", task.completed);

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    li.appendChild(taskText);

    // Toggle completion on click
    li.onclick = () => toggleComplete(index);

    // Add a delete button for each task
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = (e) => {
      e.stopPropagation();  // Prevent triggering the li's click event
      deleteTask(index);
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// Function to add a new task
function addTask() {
  const input = document.getElementById("task-input");
  const taskText = input.value.trim();

  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    input.value = "";  // Clear the input field
  }
}

// Function to toggle the completion state of a task
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Initial render of tasks
renderTasks();
