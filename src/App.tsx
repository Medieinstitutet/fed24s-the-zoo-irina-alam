import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="p-4 text-center text-xl font-bold bg-green-200">🦁 My Zoo</header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
