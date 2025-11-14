export default function Task({ task, from, onRemove }) {
    const handleDragStart = (e) => {
    e.dataTransfer.setData("task", JSON.stringify({ from, task }));
    };

    return (
    <div
        draggable
        onDragStart={handleDragStart}
        className="bg-white p-3 rounded-md shadow flex justify-between items-center cursor-grab hover:bg-gray-50 transition"
    >
        <p className="text-gray-700">{task.text}</p>
        {/* Remove Button */}
        <button
        onClick={() => onRemove(from, task.id)}
        className="text-red-500 hover:text-red-700 text-sm ml-2"
        >
        ✖
        </button>
    </div>
    );
}