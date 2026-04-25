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
          </li>
        `;
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

    editId = null;
    document.getElementById("taskInput").value = "";
    loadTasks();
}

async function deleteTask(id) {
    await fetch(`${API}/tasks/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();
