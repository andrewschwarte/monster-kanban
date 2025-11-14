import Monster from "./Monster";
import Task from "./Task";

export default function Column({ title, color, tasks, onMove, name, monster }) {
const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("task"));
    onMove(data.from, name, data.task);
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
    <div
        className={`${color} p-3 rounded-lg flex flex-col w-full mt-[-1rem] shadow`}
    >
        <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">
        {title}
        </h2>

        <div className="flex-1 space-y-2">
        {tasks.length === 0 ? (
            <p className="text-sm text-gray-500 text-center italic">
            No tasks here
            </p>
        ) : (
            tasks.map((t) => (
            <Task key={t.id} task={t} from={name} onMove={onMove} />
            ))
        )}
        </div>
    </div>
    </div>
);
}