/* ============================================
   MAIN.JS — Kanban Board Entry Point
   ============================================
   Purpose: Initializes the Kanban Board application.
   
   Steps:
   1. Load saved board state from localStorage
   2. Render the board
   3. Set up modal event handlers
   4. Set up "Add Task" button handlers
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  // Step 1: Load saved board state
  initializeBoardState();

  // Step 2: Render the board with all tasks
  renderBoard();

  // Step 3: Set up modal handlers
  initModalHandlers();

  // Step 4: Set up "Add Task" buttons on each column
  initAddTaskButtons();
});

// initModalHandlers() - Sets up the modal close and save buttons
function initModalHandlers() {
  // Close modal when X button is clicked
  const closeButton = document.getElementById("modal-close-btn");
  closeButton.addEventListener("click", closeModal);

  // Close modal when clicking outside the modal content
  const modalOverlay = document.getElementById("task-modal");
  modalOverlay.addEventListener("click", function (event) {
    // Only close if clicking the overlay itself, not the modal content
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

  // Save button in modal
  const saveButton = document.getElementById("modal-save-btn");
  saveButton.addEventListener("click", handleModalSave);

  // Allow pressing Enter to save in the title field
  const titleInput = document.getElementById("task-title-input");
  titleInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleModalSave();
    }
  });

  // Allow pressing Escape to close the modal (accessibility)
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      const modal = document.getElementById("task-modal");
      if (modal.classList.contains("active")) {
        closeModal();
      }
    }
  });
}

// initAddTaskButtons() - Sets up the "Add Task" buttons at the top of each column
function initAddTaskButtons() {
  const addButtons = document.querySelectorAll(".add-task-btn");

  addButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const columnId = button.getAttribute("data-column");
      openModal(columnId, null); // null = adding new task (not editing)
    });
  });
}
