/* ============================================
   STORAGE.JS — Kanban Board localStorage
   ============================================
*/

// Key used to store board data in localStorage
const KANBAN_STORAGE_KEY = "kanban-board-state";

// loadBoardState() - Reads the board state from localStorage
function loadBoardState() {
  try {
    const savedData = localStorage.getItem(KANBAN_STORAGE_KEY);

    if (savedData === null) {
      // Return default empty board state
      return getEmptyBoardState();
    }

    const boardState = JSON.parse(savedData);
    return boardState;
  } catch (error) {
    console.error("Error loading board state:", error);
    return getEmptyBoardState();
  }
}

// saveBoardState() - Saves the board state to localStorage
function saveBoardState(boardState) {
  try {
    const jsonString = JSON.stringify(boardState);
    localStorage.setItem(KANBAN_STORAGE_KEY, jsonString);
  } catch (error) {
    console.error("Error saving board state:", error);
    alert("Unable to save data. Your browser storage may be full or disabled.");
  }
}

// getEmptyBoardState() - Returns a fresh, empty board state
function getEmptyBoardState() {
  return {
    todo: [],
    inprogress: [],
    done: []
  };
}
