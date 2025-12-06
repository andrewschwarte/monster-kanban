import { useEffect, useState } from "react";
import Column from "./Column";
import {
  getTasks,
  addTask as addTaskAPI,
  updateTask,
  deleteTask,
} from "../api/tasks";

export default function KanbanBoard() {
  const [boards, setBoards] = useState({
    backlog: [],
    doing: [],
    review: [],
    done: [],
    trash: [],
  });

  // Load tasks from backend on mount
  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();

        // Group backend tasks by status → column
        const groups = {
          backlog: [],
          doing: [],
          review: [],
          done: [],
          trash: [],
        };
        for (const t of data) {
          const column = t.status === "todo" ? "backlog" : t.status;
          if (groups[column]) {
            groups[column].push({ id: t.id, text: t.title });
          }
        }
        setBoards(groups);
      } catch (err) {
        console.error("Error loading tasks:", err);
      }
    }

    loadTasks();
  }, []);

  // Add a new task
  const addTask = async (column, text) => {
    if (!text) return;
    const status = column === "backlog" ? "todo" : column;
    try {
      const newTask = await addTaskAPI(text, status);
      setBoards((prev) => {
        const newBoards = { ...prev };
        newBoards[column] = [
          ...newBoards[column],
          { id: newTask.id, text: newTask.title },
        ];
        return newBoards;
      });
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Move task between columns (update status)
  const moveTask = async (from, to, task) => {
    if (from === to) return;
    const newStatus = to === "backlog" ? "todo" : to;
    try {
      await updateTask(task.id, { title: task.text, status: newStatus });
      // TODO: change tasks from old status to new status
      setBoards((prev) => {
        const newBoards = { ...prev };
        newBoards[from] = newBoards[from].filter((t) => t.id !== task.id);
        newBoards[to] = [...newBoards[to], task];
        return newBoards;
      });
    } catch (err) {
      console.error("Error moving task:", err);
    }
  };

  //---------------------------Update to remove task funtion on delete move to trash intead------------------

  // Remove task (delete)
  // Move task to trash instead of deleting
  const removeTask = async (column, id) => {
    // -----------------------------If already in trash, permanently delete
    if (column === "trash") {
      try {
        await deleteTask(id);
        setBoards((prev) => {
          const newBoards = { ...prev };
          newBoards.trash = newBoards.trash.filter((t) => t.id !== id);
          return newBoards;
        });
      } catch (err) {
        console.error("Error deleting task:", err);
      }
      return;
    }

    //------------------------------- Otherwise, move to trash
    const task = boards[column].find((t) => t.id === id);
    if (!task) return;

    try {
      await updateTask(id, { title: task.text, status: "trash" });
      setBoards((prev) => {
        const newBoards = { ...prev };
        newBoards[column] = newBoards[column].filter((t) => t.id !== id);
        newBoards.trash = [...newBoards.trash, task];
        return newBoards;
      });
    } catch (err) {
      console.error("Error moving task to trash:", err);
    }
  };

  //---------------------------------- Empty all tasks from trash (big red button)
  const emptyTrash = async () => {
    const trashTasks = boards.trash;
    if (trashTasks.length === 0) return;

    try {
      // Delete all trash tasks from backend
      await Promise.all(trashTasks.map((task) => deleteTask(task.id)));

      setBoards((prev) => ({
        ...prev,
        trash: [],
      }));
    } catch (err) {
      console.error("Error emptying trash:", err);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-6xl">
      <Column
        title="Backlog"
        color="bg-red-200"
        tasks={boards.backlog}
        onMove={moveTask}
        onAdd={addTask}
        onRemove={removeTask}
        name="backlog"
        monster={{ color: "bg-red-500", height: "h-16" }}
      />
      <Column
        title="Doing"
        color="bg-orange-100"
        tasks={boards.doing}
        onMove={moveTask}
        onAdd={addTask}
        onRemove={removeTask}
        name="doing"
        monster={{ color: "bg-orange-500", height: "h-16" }}
      />
      <Column
        title="Review"
        color="bg-green-100"
        tasks={boards.review}
        onMove={moveTask}
        onAdd={addTask}
        onRemove={removeTask}
        name="review"
        monster={{ color: "bg-green-500", height: "h-16" }}
      />
      <Column
        title="Done"
        color="bg-blue-100"
        tasks={boards.done}
        onMove={moveTask}
        onAdd={addTask}
        onRemove={removeTask}
        name="done"
        monster={{ color: "bg-blue-500", height: "h-16" }}
      />
      <Column
        title="Trash"
        color="bg-gray-100"
        tasks={boards.trash}
        onMove={moveTask}
        onAdd={addTask}
        onRemove={removeTask}
        onEmptyTrash={emptyTrash}
        name="trash"
        monster={{ color: "bg-gray-500", height: "h-16" }}
      />
    </div>
  );
}
