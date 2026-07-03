// Store tasks in memory
let tasks = [];

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return;

  tasks.push({ id: Date.now(), text: text, done: false });
  input.value = "";
  render();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.done = !task.done;
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
}

function render() {
  const list = document.getElementById("taskList");
  const empty = document.getElementById("emptyMessage");

  list.innerHTML = "";

  if (tasks.length === 0) {
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";

  tasks.forEach(task => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    li.innerHTML = `
      <input type="checkbox" ${task.done ? "checked" : ""}
             onchange="toggleTask(${task.id})" />
      <span>${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">x</button>
    `;

    list.appendChild(li);
  });
}

// Allow pressing Enter to add a task
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("taskInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });
});

// Export functions for testing
if (typeof module !== "undefined") {
  module.exports = { addTask, toggleTask, deleteTask, tasks };
}
