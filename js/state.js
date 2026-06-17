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
function moveTask(fromColumn, toColumn, taskId) {
  // Find the task in the source column
  let taskToMove = null;

  for (let i = 0; i < boardState[fromColumn].length; i++) {
    if (boardState[fromColumn][i].id === taskId) {
      taskToMove = boardState[fromColumn][i];
      break;
    }
  }

  // If task not found, exit
  if (taskToMove === null) {
    return;
  }

  // Remove from source column
  boardState[fromColumn] = boardState[fromColumn].filter(function (task) {
    return task.id !== taskId;
  });

  // Add to destination column
  boardState[toColumn].push(taskToMove);

  // Save to localStorage
  saveBoardState(boardState);
}


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
