const API = "http://localhost:8000";
let editId = null;

async function loadTasks() {
    const res = await fetch(`${API}/tasks`);
    const data = await res.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    data.forEach(task => {
        list.innerHTML += `
        <li>
          ${task.title}
          <button onclick="editTask(${task.id}, '${task.title}')">Edit</button>
          <button onclick="deleteTask(${task.id})">Delete</button>
        </li>`;
    });
}

async function addTask() {
    const title = document.getElementById("taskInput").value;

    await fetch(`${API}/tasks`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({title})
    });

    document.getElementById("taskInput").value = "";
    loadTasks();
}

function editTask(id, title) {
    editId = id;
    document.getElementById("taskInput").value = title;
}

async function updateTask() {
    const title = document.getElementById("taskInput").value;

    await fetch(`${API}/tasks/${editId}`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({title})
    });

    document.getElementById("taskInput").value = "";
    loadTasks();
    showTasks();
}

async function deleteTask(id) {
    await fetch(`${API}/tasks/${id}`, {
        method: "DELETE"
    });

    loadTasks();
    showTasks();
}

async function showTasks() {
    const res = await fetch(`${API}/tasks`);
    const data = await res.json();

    let html = `
      <h2>My Tasks</h2>
      <table border="1" width="100%">
      <tr>
        <th>ID</th>
        <th>Task</th>
        <th>Updated Date</th>
      </tr>
    `;

    data.forEach(task => {
        html += `
          <tr>
            <td>${task.id}</td>
            <td>${task.title}</td>
            <td>${new Date().toLocaleDateString()}</td>
          </tr>
        `;
    });

    html += "</table>";

    document.getElementById("tasksTable").innerHTML = html;
}

loadTasks();
