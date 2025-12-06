import "./App.css";
import KanbanBoard from "./components/KanbanBoard";

export default function App() {
  return (
    <div className="min-h-screen bg-[url('https://media.istockphoto.com/id/1134351354/vector/tropical-seamless-pattern.jpg?s=612x612&w=0&k=20&c=pqbWKxER2igrvY5002GkfBTb-YzLRSXSEkN_fJ7oAeg=')] flex flex-col items-center py-6">
      {/* <img className="bg-[url('https://media.istockphoto.com/id/1134351354/vector/tropical-seamless-pattern.jpg?s=612x612&w=0&k=20&c=pqbWKxER2igrvY5002GkfBTb-YzLRSXSEkN_fJ7oAeg=')]" /> */}
      <h1 className="text-4xl font-bold text-gray-700 mb-6">Monkey Kanban</h1>
      <KanbanBoard />
    </div>
  );
}
