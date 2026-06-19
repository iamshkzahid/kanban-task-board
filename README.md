# Kanban Task Board

A kanban-style task management board with drag-and-drop functionality. Built as part of the **OJT Capstone Project — Track A (Dev Agency)**.

## Features

- **Three Columns** — To Do, In Progress, Done
- **Task Cards** — Create, edit, and delete tasks with titles and descriptions
- **Modal Interface** — Add/edit tasks through a clean modal dialog
- **Drag and Drop** — Move tasks between columns using HTML5 Drag and Drop API
- **Mobile Fallback** — Move buttons for touch devices where drag-and-drop isn't reliable
- **Empty States** — Helpful prompts when columns have no tasks
- **Persistent Storage** — Tasks saved to localStorage across sessions
- **XSS Protection** — All user input sanitized before rendering

## Component Ownership

This project follows **Track A distributed ownership**:

| Component | Owner | Files |
|---|---|---|
| **UI Layer** | Member 3 | `index.html`, `css/style.css`, `js/ui.js` |
| **Logic Layer** | Member 4 | `js/state.js`, `js/storage.js`, `js/dragdrop.js`, `js/main.js` |

> **Important:** Member 3 only modifies UI files. Member 4 owns all state management, storage, and drag-and-drop logic.

## Tech Stack

- HTML5 (semantic markup, data attributes)
- CSS3 (custom properties, grid, flexbox)
- JavaScript ES6+ (DOM manipulation, event handling)
- HTML5 Drag and Drop API
- localStorage for persistence

## Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/sauryamanbisen-art/kanban-task-board.git
   cd kanban-task-board
   ```

2. Open `index.html` in your browser.

No build tools, dependencies, or API keys required.

## Project Structure

```
kanban-task-board/
├── index.html              # Board layout with 3 columns + task modal
├── css/
│   └── style.css           # All styles including responsive (Member 3)
├── js/
│   ├── ui.js               # DOM rendering: cards, modal, columns (Member 3)
│   ├── state.js            # Board state management (Member 4)
│   ├── storage.js          # localStorage read/write (Member 4)
│   ├── dragdrop.js         # HTML5 drag-and-drop handlers (Member 4)
│   └── main.js             # App initialization (Member 4)
├── .gitignore
├── MERGE_CONFLICT.md
└── README.md
```

## Architecture — UI Layer (Member 3)

| Function | Purpose |
|---|---|
| `sanitizeHTML()` | XSS prevention — escapes HTML entities |
| `renderBoard()` | Renders all three columns and re-attaches drag handlers |
| `renderColumn()` | Renders a single column with task cards or empty state |
| `updateColumnCounts()` | Updates task count badges in column headers |
| `buildMoveButtons()` | Creates mobile fallback move buttons |
| `addTaskEventListeners()` | Attaches edit/delete/move handlers to task cards |
| `openModal()` / `closeModal()` | Task add/edit modal management |
| `handleModalSave()` | Validates input and saves new/edited tasks |

## Responsive Design

- **Desktop (>768px)** — 3-column grid layout with drag-and-drop
- **Tablet/Mobile (≤768px)** — Single column stack with move buttons visible
- **Small Mobile (≤480px)** — Smaller header fonts, touch-optimized targets

### Mobile Fallback Strategy

On touch devices, HTML5 drag-and-drop is unreliable. The UI provides "← Move Left" and "Move Right →" buttons that appear on mobile viewports (hidden on desktop via CSS `display: none`).

## Author

**Member 3 (UI Layer)** — Sauryaman Bisen  
OJT Capstone Track A — Dev Agency
