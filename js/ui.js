/* ============================================
   UI.JS — Kanban Board DOM Rendering
   ============================================
   Purpose: Handles ALL visual updates for the Kanban Board.
   
   Renders columns, task cards, modals, and handles
   user interactions (add, edit, delete).
   
   SECURITY: All user input is sanitized with sanitizeHTML()
   to prevent XSS (Cross-Site Scripting) attacks.
   ============================================ */

// sanitizeHTML() - Prevents XSS by escaping HTML special characters
function sanitizeHTML(rawString) {
  const div = document.createElement("div");
  div.textContent = rawString;
  return div.innerHTML;
}

// renderBoard() - Renders all three columns with their tasks
function renderBoard() {
  renderColumn("todo", "To Do");
  renderColumn("inprogress", "In Progress");
  renderColumn("done", "Done");

  // Re-attach drag and drop after rendering
  initDragAndDrop();

  // Update task count badges in column headers
  updateColumnCounts();
}

// updateColumnCounts() - Shows the number of tasks in each column header
function updateColumnCounts() {
  const columns = ["todo", "inprogress", "done"];

  for (let i = 0; i < columns.length; i++) {
    const columnId = columns[i];
    const count = boardState[columnId].length;
    const badge = document.querySelector(
      `.kanban-column[data-column="${columnId}"] .column-count`
    );
    if (badge) {
      badge.textContent = count;
    }
  }
}

// renderColumn() - Renders a single column with its tasks
function renderColumn(columnId, columnTitle) {
  const tasksContainer = document.querySelector(
    `.kanban-column[data-column="${columnId}"] .column-tasks`
  );

  const tasks = boardState[columnId];

  // If no tasks, show empty state
  if (tasks.length === 0) {
    tasksContainer.innerHTML = `
      <div class="column-empty">
        <p>No tasks yet. Click + to add one.</p>
      </div>
    `;
    return;
  }

  // Build HTML for each task card
  let tasksHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    // SECURITY: Sanitize user input before rendering
    const safeTitle = sanitizeHTML(task.title);
    const safeDescription = sanitizeHTML(task.description || "");

    // Build move buttons for mobile (since drag-and-drop doesn't work well on touch)
    const moveButtonsHTML = buildMoveButtons(columnId, task.id);

    tasksHTML += `
      <div class="task-card fade-in" 
           draggable="true" 
           data-task-id="${task.id}" 
           data-column-id="${columnId}"
           ondragstart="handleDragStart(event)"
           ondragend="handleDragEnd(event)">
        <div class="task-header">
          <h4 class="task-title">${safeTitle}</h4>
          <div class="task-actions">
            <button class="btn-icon edit-task-btn" data-task-id="${task.id}" data-column-id="${columnId}" title="Edit">
              Edit
            </button>
            <button class="btn-icon delete-task-btn" data-task-id="${task.id}" data-column-id="${columnId}" title="Delete">
              Delete
            </button>
          </div>
        </div>
        ${safeDescription ? `<p class="task-description">${safeDescription}</p>` : ""}
        <div class="task-move-buttons">
          ${moveButtonsHTML}
        </div>
      </div>
    `;
  }

  tasksContainer.innerHTML = tasksHTML;

  // Add event listeners to edit and delete buttons
  addTaskEventListeners(columnId);
}

// buildMoveButtons() - Creates move buttons for mobile (fallback for drag-and-drop)
function buildMoveButtons(columnId, taskId) {
  let buttons = "";

  if (columnId !== "todo") {
    buttons += `<button class="btn-move move-left" data-task-id="${taskId}" data-from="${columnId}" data-to="${getPreviousColumn(columnId)}">← Move Left</button>`;
  }

  if (columnId !== "done") {
    buttons += `<button class="btn-move move-right" data-task-id="${taskId}" data-from="${columnId}" data-to="${getNextColumn(columnId)}">Move Right →</button>`;
  }

  return buttons;
}

// getPreviousColumn() / getNextColumn() - Helper to determine adjacent columns
function getPreviousColumn(columnId) {
  if (columnId === "inprogress") return "todo";
  if (columnId === "done") return "inprogress";
  return null;
}

function getNextColumn(columnId) {
  if (columnId === "todo") return "inprogress";
  if (columnId === "inprogress") return "done";
  return null;
}

// addTaskEventListeners() - Adds click listeners to task buttons in a column
function addTaskEventListeners(columnId) {
  const column = document.querySelector(`.kanban-column[data-column="${columnId}"]`);

  // Delete buttons
  const deleteButtons = column.querySelectorAll(".delete-task-btn");
  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const taskId = parseInt(button.getAttribute("data-task-id"));
      const colId = button.getAttribute("data-column-id");
      handleDeleteTask(colId, taskId);
    });
  });

  // Edit buttons
  const editButtons = column.querySelectorAll(".edit-task-btn");
  editButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const taskId = parseInt(button.getAttribute("data-task-id"));
      const colId = button.getAttribute("data-column-id");
      handleEditTask(colId, taskId);
    });
  });

  // Move buttons (mobile fallback)
  const moveButtons = column.querySelectorAll(".btn-move");
  moveButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const taskId = parseInt(button.getAttribute("data-task-id"));
      const fromCol = button.getAttribute("data-from");
      const toCol = button.getAttribute("data-to");
      moveTask(fromCol, toCol, taskId);
      renderBoard();
    });
  });
}

// handleDeleteTask() - Deletes a task after confirmation
function handleDeleteTask(columnId, taskId) {
  const confirmed = confirm("Are you sure you want to delete this task?");
  if (confirmed) {
    deleteTask(columnId, taskId);
    renderBoard();
  }
}

// handleEditTask() - Opens the modal pre-filled with task data for editing
function handleEditTask(columnId, taskId) {
  // Find the task
  let taskToEdit = null;
  for (let i = 0; i < boardState[columnId].length; i++) {
    if (boardState[columnId][i].id === taskId) {
      taskToEdit = boardState[columnId][i];
      break;
    }
  }

  if (taskToEdit === null) return;

  // Open modal with pre-filled data
  openModal(columnId, taskToEdit);
}

/* ============================================
   MODAL FUNCTIONS
   ============================================ */

// openModal() - Opens the add/edit task modal
function openModal(columnId, existingTask) {
  const modal = document.getElementById("task-modal");
  const modalTitle = document.getElementById("modal-title");
  const titleInput = document.getElementById("task-title-input");
  const descInput = document.getElementById("task-desc-input");
  const saveButton = document.getElementById("modal-save-btn");

  if (existingTask) {
    // Editing mode
    modalTitle.textContent = "Edit Task";
    titleInput.value = existingTask.title;
    descInput.value = existingTask.description || "";
    saveButton.textContent = "Update Task";
    saveButton.setAttribute("data-editing-id", existingTask.id);
    saveButton.setAttribute("data-column-id", columnId);
  } else {
    // Adding mode
    modalTitle.textContent = "Add New Task";
    titleInput.value = "";
    descInput.value = "";
    saveButton.textContent = "Add Task";
    saveButton.removeAttribute("data-editing-id");
    saveButton.setAttribute("data-column-id", columnId);
  }

  // Show the modal
  modal.classList.add("active");
  titleInput.focus();
}

// closeModal() - Closes the task modal
function closeModal() {
  const modal = document.getElementById("task-modal");
  modal.classList.remove("active");

  // Clear any error messages
  const errors = modal.querySelectorAll(".error-message");
  errors.forEach(function (el) { el.remove(); });

  const errorFields = modal.querySelectorAll(".error");
  errorFields.forEach(function (el) { el.classList.remove("error"); });
}

// handleModalSave() - Handles saving from the modal (add or update)
function handleModalSave() {
  const titleInput = document.getElementById("task-title-input");
  const descInput = document.getElementById("task-desc-input");
  const saveButton = document.getElementById("modal-save-btn");

  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  // Validate title
  if (title === "") {
    // Show error
    titleInput.classList.add("error");
    // Remove existing error messages first
    const existing = titleInput.parentNode.querySelector(".error-message");
    if (existing) existing.remove();

    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = "Please enter a task title.";
    titleInput.parentNode.appendChild(errorDiv);
    return;
  }

  const columnId = saveButton.getAttribute("data-column-id");
  const editingId = saveButton.getAttribute("data-editing-id");

  if (editingId) {
    // Update existing task
    updateTask(columnId, parseInt(editingId), title, description);
  } else {
    // Add new task
    addTask(columnId, title, description);
  }

  // Close modal and re-render
  closeModal();
  renderBoard();
}
