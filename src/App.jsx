import KanbanBoard from "./components/KanbanBoard";

export default function App() {
  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center py-6">
      <h1 className="text-4xl font-bold text-sky-700 mb-6">
        Monster Kanban
      </h1>
      <KanbanBoard />
    </div>
  );
}