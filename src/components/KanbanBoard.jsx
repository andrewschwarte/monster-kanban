import { useState } from "react";
import Column from "./Column";

export default function KanbanBoard() {
const [boards, setBoards] = useState({
    backlog: [
    { id: 1, text: "Learn React Basics" },
    { id: 2, text: "Understand State & Props" },
    ],
    doing: [{ id: 3, text: "Build a Kanban board" }],
    review: [],
    done: [],
});

const moveTask = (from, to, task) => {
    if (from === to) return;
    setBoards((prev) => {
    const newBoards = { ...prev };
    newBoards[from] = newBoards[from].filter((t) => t.id !== task.id);
    newBoards[to] = [...newBoards[to], task];
    return newBoards;
    });
};

// Add a new task
const addTask = (column, text) => {
    setBoards((prev) => {
    const newTask = {
        id: Date.now(),
        text,
    };
    const newBoards = { ...prev };
    newBoards[column] = [...newBoards[column], newTask];
    return newBoards;
    });
};

// Remove a task
const removeTask = (column, id) => {
    setBoards((prev) => {
    const newBoards = { ...prev };
    newBoards[column] = newBoards[column].filter((t) => t.id !== id);
    return newBoards;
    });
};

return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-6xl">
    <Column
        title="Backlog"
        color="bg-rose-200"
        tasks={boards.backlog}
        onMove={moveTask}
        onAdd={addTask}
        onRemove={removeTask}
        name="backlog"
        monster={{ color: "bg-red-500", height: "h-16" }}
    />
    <Column
        title="Doing"
        color="bg-amber-200"
        tasks={boards.doing}
        onMove={moveTask}
        onAdd={addTask}
        onRemove={removeTask}
        name="doing"
        monster={{ color: "bg-orange-500", height: "h-16" }}
    />
    <Column
        title="Review"
        color="bg-green-200"
        tasks={boards.review}
        onMove={moveTask}
        onAdd={addTask}
        onRemove={removeTask}
        name="review"
        monster={{ color: "bg-green-600", height: "h-16" }}
    />
    <Column
        title="Done"
        color="bg-sky-200"
        tasks={boards.done}
        onMove={moveTask}
        onAdd={addTask}
        onRemove={removeTask}
        name="done"
        monster={{ color: "bg-blue-500", height: "h-16" }}
    />
    </div>
);
}