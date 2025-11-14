export default function Task({ task, from }) {
    const handleDragStart = (e) => {
    e.dataTransfer.setData("task", JSON.stringify({ from, task }));
    };

    return (
    <div
        draggable
        onDragStart={handleDragStart}
        className="bg-white p-3 rounded-md shadow cursor-grab hover:bg-gray-50 transition"
    >
        <p className="text-gray-700">{task.text}</p>
    </div>
    );
}