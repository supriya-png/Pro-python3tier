const api = "http://localhost:8000/tasks";

async function loadTasks() {
    const res = await fetch(api);
    const data = await res.json();

    let html = "";

    data.forEach(task => {
        html += `
        <li>
            ${task.title}
            <button onclick="deleteTask(${task.id})">Delete</button>
        </li>`;
    });

    document.getElementById("taskList").innerHTML = html;
}

async function addTask() {
    const task = document.getElementById("taskInput").value;

    await fetch(api + "?title=" + task, {
        method: "POST"
    });

    loadTasks();
}

async function deleteTask(id) {
    await fetch(api + "/" + id, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();
