import { useState } from "react";
import Monster from "./Monster";
import Task from "./Task";

export default function Column({
  title,
  color,
  tasks,
  onMove,
  onAdd,
  onRemove,
  onEmptyTrash,
  name,
  monster,
}) {
  const [newTask, setNewTask] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("task"));
    onMove(data.from, name, data.task);
  };

  const handleAdd = () => {
    if (newTask.trim() === "") return;
    onAdd(name, newTask);
    setNewTask("");
  };

  return (
    <div
      className="flex flex-col items-center"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Monster */}
      <Monster color={monster.color} height={monster.height} />

      {/* Board Column */}
      <div className={`${color} mt-3 p-3 rounded-lg shadow w-full -mt-4`}>
        <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">
          {title}
        </h2>

        {/* Tasks */}
        <div className="flex-1 space-y-2 mb-3">
          {tasks.length === 0 ? (
            <p className="text-sm text-gray-500 text-center italic">
              No tasks yet
            </p>
          ) : (
            tasks.map((t) => (
              <Task key={t.id} task={t} from={name} onRemove={onRemove} />
            ))
          )}
        </div>

        {/* Add Task Box or Empty Trash Button */}
        {name === "trash" ? (
          <button
            onClick={onEmptyTrash}
            disabled={tasks.length === 0}
            className="w-full bg-red-500 text-white text-sm px-3 py-2 rounded-md hover:bg-red-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Empty Trash
          </button>
        ) : (
          <div className="flex space-x-2">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1 px-1 py-1 text-sm border rounded-md max-w-37"
              placeholder="New Task..."
            />
            <button
              onClick={handleAdd}
              className="bg-white border text-sm px-3 rounded-md hover:bg-white/70 transition"
            >
              ➕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
