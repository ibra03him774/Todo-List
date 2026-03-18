let tasks = [
  {
    title: "Finish your JavaScript Course",
    date: "20/03/2026",
    isDone: true,
  }
];

// ===== Storage =====
function getTasksFromStorage() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (storedTasks) {
    tasks = storedTasks;
  }
}

function storeTask() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===== Render =====
function renderTasks() {
  const tasksContainer = document.getElementById("tasks");
  tasksContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    const content = `
      <div class="task-container ${task.isDone ? "done" : ""}">
        <div class="txt-container">
          <h2>${task.title}</h2>
          <p><i class="bi bi-calendar2"></i> ${task.date}</p>
        </div>

        <div class="btn-container">
          <button title="Delete" onclick="deleteTask(${index})" class="delete-btn">
            <i class="bi bi-trash-fill"></i>
          </button>

          ${
            task.isDone
              ? `<button title="Cancel" onclick="toggleTaskCompletion(${index})" class="cancel-btn">
                  <i class="bi bi-x-octagon"></i>
                </button>`
              : `<button title="Check" onclick="toggleTaskCompletion(${index})" class="true-btn">
                  <i class="bi bi-check2-circle"></i>
                </button>`
          }

          <button title="Edit" onclick="editTask(${index})" class="edit-btn">
            <i class="bi bi-pen"></i>
          </button>
        </div>
      </div>
    `;

    tasksContainer.innerHTML += content;
  });
}

// ===== Events =====

const input = document.querySelector("input");

document.querySelector(".add-btn").addEventListener("click", () => {
  const taskTitle = input.value;

  if (!taskTitle.trim()) return;

  const now = new Date();
  const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

  const newTask = {
    title: taskTitle,
    date: date,
    isDone: false,
  };

  tasks.push(newTask);
  storeTask();
  renderTasks();

  input.value = ""; 
});

// ===== Actions =====
function deleteTask(index) {
  const isConfirmed = confirm(
    `Are you sure you want to delete the task : ${tasks[index].title} ?`
  );

  if (!isConfirmed) return;

  tasks.splice(index, 1);
  storeTask();
  renderTasks();
}

function editTask(index) {
  const newTitle = prompt("Enter the new task title", tasks[index].title);

  if (!newTitle) return;

  tasks[index].title = newTitle;
  storeTask();
  renderTasks();
}

function toggleTaskCompletion(index) {
  tasks[index].isDone = !tasks[index].isDone;

  storeTask();
  renderTasks();
}

// ===== Init =====
getTasksFromStorage();
renderTasks();