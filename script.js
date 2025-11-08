const input = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const markAllBtn = document.querySelector("#markAllBtn");
const unmarkAllBtn = document.querySelector("#unmarkAllBtn");
const deleteAllBtn = document.querySelector("#deleteAllBtn");

const deletePrompt = document.querySelector("#deletePrompt");
const deleteCompletedBtn = document.querySelector("#deleteCompletedBtn");
const deleteAllConfirmBtn = document.querySelector("#deleteAllConfirmBtn");
const cancelDeleteBtn = document.querySelector("#cancelDeleteBtn");

addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");

  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.innerText = taskText;

  checkbox.addEventListener("change", () => {
    li.classList.toggle("done", checkbox.checked);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "✕";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  taskContent.appendChild(checkbox);
  taskContent.appendChild(span);
  li.appendChild(taskContent);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  input.value = "";
}

markAllBtn.addEventListener("click", () => {
  const allTasks = document.querySelectorAll("#taskList li");
  if (allTasks.length === 0) {
    alert("No tasks to mark!");
    return;
  }
  allTasks.forEach((task) => {
    const checkbox = task.querySelector("input[type='checkbox']");
    checkbox.checked = true;
    task.classList.add("done");
  });
});

unmarkAllBtn.addEventListener("click", () => {
  const allTasks = document.querySelectorAll("#taskList li");
  if (allTasks.length === 0) {
    alert("No tasks to unmark!");
    return;
  }
  allTasks.forEach((task) => {
    const checkbox = task.querySelector("input[type='checkbox']");
    checkbox.checked = false;
    task.classList.remove("done");
  });
});

deleteAllBtn.addEventListener("click", () => {
  const tasks = document.querySelectorAll("#taskList li");
  if (tasks.length === 0) {
    alert("No tasks to delete!");
    return;
  }
  deletePrompt.classList.add("active");
});

deleteCompletedBtn.addEventListener("click", () => {
  const allTasks = document.querySelectorAll("#taskList li");
  allTasks.forEach((task) => {
    if (task.classList.contains("done")) task.remove();
  });
  deletePrompt.classList.remove("active");
});

deleteAllConfirmBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
  deletePrompt.classList.remove("active");
});

cancelDeleteBtn.addEventListener("click", () => {
  deletePrompt.classList.remove("active");
});

deletePrompt.addEventListener("click", (e) => {
  if (e.target === deletePrompt) {
    deletePrompt.classList.remove("active");
  }
});
