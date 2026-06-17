/* ============================================
   DRAGDROP.JS — Kanban Board Drag and Drop
   ============================================
   Purpose: Implements HTML5 Drag and Drop API for moving tasks
            between columns.
   
   HTML5 Drag and Drop Events:
   - dragstart: fires when user starts dragging an element
   - dragover: fires when dragged element is over a valid drop target
   - dragenter: fires when dragged element enters a drop target
   - dragleave: fires when dragged element leaves a drop target
   - drop: fires when user releases the dragged element on a target
   - dragend: fires when the drag operation ends
   ============================================ */

// initDragAndDrop() - Sets up drag-and-drop for all task cards and columns
function initDragAndDrop() {
  // Get all drop zone areas (the task lists inside each column)
  const dropZones = document.querySelectorAll(".column-tasks");

  dropZones.forEach(function (zone) {
    // Allow dropping by preventing the default behavior
    zone.addEventListener("dragover", handleDragOver);

    // Visual feedback when dragging over a column
    zone.addEventListener("dragenter", handleDragEnter);

    // Remove visual feedback when leaving a column
    zone.addEventListener("dragleave", handleDragLeave);

    // Handle the actual drop
    zone.addEventListener("drop", handleDrop);
  });
}

// handleDragStart() - Called when user starts dragging a task card
function handleDragStart(event) {
  const taskCard = event.target.closest(".task-card");

  // Store the task ID and column in the drag data
  event.dataTransfer.setData("text/taskId", taskCard.getAttribute("data-task-id"));
  event.dataTransfer.setData("text/columnId", taskCard.getAttribute("data-column-id"));

  // Set the drag effect
  event.dataTransfer.effectAllowed = "move";

  // Add a visual class to the dragged card
  setTimeout(function () {
    taskCard.classList.add("dragging");
  }, 0);
}

// handleDragOver() - Called continuously while dragging over a drop zone
function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

// handleDragEnter() - Called when dragged element enters a drop zone
function handleDragEnter(event) {
  event.preventDefault();
  const dropZone = event.target.closest(".column-tasks");
  if (dropZone) {
    dropZone.classList.add("drag-over");
  }
}

// handleDragLeave() - Called when dragged element leaves a drop zone
function handleDragLeave(event) {
  const dropZone = event.target.closest(".column-tasks");
  if (dropZone && !dropZone.contains(event.relatedTarget)) {
    dropZone.classList.remove("drag-over");
  }
}

// handleDrop() - Called when user drops a task on a column
function handleDrop(event) {
  event.preventDefault();

  // Remove visual highlight
  const dropZone = event.target.closest(".column-tasks");
  if (dropZone) {
    dropZone.classList.remove("drag-over");
  }

  // Get the data from the drag
  const taskId = parseInt(event.dataTransfer.getData("text/taskId"));
  const fromColumn = event.dataTransfer.getData("text/columnId");

  // Determine which column the task was dropped on
  const targetColumn = dropZone.closest(".kanban-column");
  const toColumn = targetColumn.getAttribute("data-column");

  // Don't do anything if dropped on the same column
  if (fromColumn === toColumn) {
    return;
  }

  // Move the task in state (adds to end of target column)
  moveTask(fromColumn, toColumn, taskId);

  // Re-render the board
  renderBoard();
}

// handleDragEnd() - Called when the drag operation ends (success or cancel)
function handleDragEnd(event) {
  const taskCard = event.target.closest(".task-card");
  if (taskCard) {
    taskCard.classList.remove("dragging");
  }

  // Remove all drag-over highlights
  const allDropZones = document.querySelectorAll(".column-tasks");
  allDropZones.forEach(function (zone) {
    zone.classList.remove("drag-over");
  });
}
