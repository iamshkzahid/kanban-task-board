# Merge Conflict Documentation

## Overview

This document records a merge conflict that occurred during collaborative development of the Kanban Task Board between Member 3 (UI) and Member 4 (Logic).

---

## Context

Both members were working on related features simultaneously:
- **Member 3** was implementing task card rendering in `feature/ui`
- **Member 4** was implementing drag-and-drop handlers in `feature/dragdrop`

Both branches modified `index.html` — specifically the task card structure and data attributes.

---

## Conflict Location

**File:** `index.html` (lines 36–44 — kanban column task card area)

---

## Member 3's Version (`feature/ui`)

```html
<div class="task-card"
     draggable="true"
     data-task-id="${task.id}"
     data-column-id="${columnId}">
```

Member 3 used descriptive attribute names (`data-task-id`, `data-column-id`) to make the code self-documenting and consistent with `ui.js` selectors.

---

## Member 4's Version (`feature/dragdrop`)

```html
<div class="task-card"
     draggable="true"
     data-id="${task.id}"
     data-col="${columnId}">
```

Member 4 used shorter attribute names (`data-id`, `data-col`) to keep the drag-and-drop handler code concise.

---

## Git Conflict Markers

When Member 3 attempted to merge Member 4's branch:

```
<<<<<<< feature/ui
     data-task-id="${task.id}"
     data-column-id="${columnId}"
=======
     data-id="${task.id}"
     data-col="${columnId}"
>>>>>>> feature/dragdrop
```

---

## Resolution Process

1. **Discussion** — Both members met to discuss the naming convention
2. **Decision** — Agreed to use Member 3's descriptive naming (`data-task-id`, `data-column-id`) because:
   - More readable and self-documenting
   - Consistent with existing `ui.js` selectors (`.task-card[data-task-id]`)
   - Follows HTML5 best practices for custom data attributes
3. **Member 4's Update** — Updated `dragdrop.js` to use the agreed attribute names:
   ```javascript
   event.dataTransfer.setData("text/taskId", taskCard.getAttribute("data-task-id"));
   event.dataTransfer.setData("text/columnId", taskCard.getAttribute("data-column-id"));
   ```
4. **Manual Resolution** — Resolved the conflict in `index.html` by keeping Member 3's version
5. **Testing** — Both members verified their features:
   - ✅ Task cards render correctly with edit/delete buttons
   - ✅ Drag-and-drop moves tasks between columns
   - ✅ Mobile move buttons work correctly
   - ✅ Task data persists across page reloads

---

## Commands Used

```bash
# Member 3 fetches Member 4's branch
git fetch origin

# Attempt to merge — conflict detected
git merge origin/feature/dragdrop
# CONFLICT (content): Merge conflict in index.html

# Open index.html and manually resolve the conflict markers
# Keep data-task-id and data-column-id (Member 3's convention)

# Stage the resolved file
git add index.html

# Commit the merge resolution
git commit -m "resolve: merge conflict on task card data attributes"

# Push the resolved branch
git push origin feature/ui
```

---

## Lessons Learned

1. **Communicate early** — Discuss naming conventions before implementing
2. **Consistent attributes** — Both UI and logic layers should agree on data attribute names
3. **Test after merge** — Always verify both features work after conflict resolution
4. **Document decisions** — Record why a particular convention was chosen

---

## Author

**Member 3** — Sauryaman Bisen  
OJT Capstone Track A — Dev Agency
