/* ============================================
   STATE.JS — Kanban Board State Management
   ============================================
*/

// Main board state object
let boardState = {
  todo: [],
  inprogress: [],
  done: []
};

// initializeBoardState() - Loads saved board state from localStorage on app start
function initializeBoardState() {
  boardState = loadBoardState();
}

// addTask() - Creates a new task and adds it to a column
function addTask(columnId, title, description) {
  const newTask = {
    id: Date.now(),
    title: title,
    description: description
  };

  // Add task to the specified column
  boardState[columnId].push(newTask);

  // Save to localStorage
  saveBoardState(boardState);

  return newTask;
}

// deleteTask() - Removes a task from a column
function deleteTask(columnId, taskId) {
  // Filter out the task with matching ID
  boardState[columnId] = boardState[columnId].filter(function (task) {
    return task.id !== taskId;
  });

  saveBoardState(boardState);
}

// updateTask() - Updates a task's title and description
function updateTask(columnId, taskId, title, description) {
  for (let i = 0; i < boardState[columnId].length; i++) {
    if (boardState[columnId][i].id === taskId) {
      boardState[columnId][i].title = title;
      boardState[columnId][i].description = description;
      break;
    }
  }

  saveBoardState(boardState);
}

// moveTask() - Moves a task from one column to another



// findTaskColumn() - Finds which column a task belongs to
function findTaskColumn(taskId) {
  const columns = ["todo", "inprogress", "done"];

  for (let c = 0; c < columns.length; c++) {
    const columnId = columns[c];
    for (let i = 0; i < boardState[columnId].length; i++) {
      if (boardState[columnId][i].id === taskId) {
        return columnId;
      }
    }
  }

  return null;
}
