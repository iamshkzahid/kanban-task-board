# Kanban Task Board

A responsive **Kanban Task Management Application** built using **HTML, CSS, and JavaScript**. The application helps users organize tasks across different stages of work using a drag-and-drop interface similar to Trello.

Tasks can be created, edited, deleted, and moved between workflow columns, with all data automatically saved in the browser using Local Storage.

---

## Features

- Create new tasks
- Edit existing tasks
- Delete tasks
- Drag and drop tasks between columns
- Three workflow stages:
  - To Do
  - In Progress
  - Done
- Task title and description support
- Real-time task counter for each column
- Local Storage persistence
- Responsive design for desktop and mobile
- Dark/Light theme toggle
- Mobile navigation menu

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Local Storage API
- Drag & Drop API

---

## Project Structure

```text
kanban-task-board-main/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── main.js
│   ├── state.js
│   ├── storage.js
│   ├── dragdrop.js
│   ├── theme.js
│   └── ui.js
│
├── README.md
│
└── .github/
    ├── ISSUE_TEMPLATE/
    └── PULL_REQUEST_TEMPLATE.md
```

---

## File Description

### index.html
Contains the main structure of the application including:

- Navigation bar
- Kanban board layout
- Task columns
- Add Task buttons
- Task modal for creating and editing tasks

---

### style.css

Provides styling for:

- Kanban board layout
- Task cards
- Modal windows
- Buttons
- Theme support
- Responsive design

---

### main.js

Application entry point.

Responsibilities:

- Initialize board state
- Render tasks
- Handle modal interactions
- Handle add task buttons

---

### state.js

Manages application state.

Functions include:

- Add task
- Edit task
- Delete task
- Move task
- Find task location
- Update board state

---

### storage.js

Handles browser Local Storage operations.

Functions include:

- Save board data
- Load board data
- Persist tasks after page refresh

---

### dragdrop.js

Implements drag-and-drop functionality.

Features:

- Drag task cards
- Drop tasks into other columns
- Update board state automatically

---

### ui.js

Responsible for:

- Rendering tasks
- Updating counters
- Opening and closing modals
- Displaying board updates

---

### theme.js

Provides:

- Dark mode support
- Light mode support
- Theme persistence using Local Storage
- Mobile menu toggle

---

## Workflow

### 1. Add Task

Click the **+** button in any column.

Enter:

- Task Title
- Task Description

Click **Save**.

---

### 2. Edit Task

Select a task and update:

- Title
- Description

Save changes.

---

### 3. Delete Task

Remove unwanted tasks from the board.

---

### 4. Move Task

Drag a task card and drop it into another column.

Example:

```text
To Do → In Progress → Done
```

---

## Data Persistence

All tasks are automatically stored using the browser's Local Storage.

This means:

- Tasks remain available after page refresh
- No database setup required
- No backend required

---

## How to Run the Project

### Clone Repository

```bash
git clone https://github.com/your-username/kanban-task-board.git
```

### Navigate to Project Folder

```bash
cd kanban-task-board
```

### Open Application

Open:

```text
index.html
```

in any modern web browser.

No installation or dependencies are required.

---

## Learning Outcomes

This project demonstrates:

- DOM Manipulation
- Event Handling
- Drag and Drop API
- State Management
- Local Storage Integration
- Responsive Web Design
- Modular JavaScript Architecture

---

## Future Enhancements

- Task priorities
- Due dates
- Search and filtering
- Labels and tags
- User authentication
- Team collaboration
- Cloud database integration
- Activity history

---

## Author

Sauryaman Bisen

---

## License

This project is licensed under the MIT License.
