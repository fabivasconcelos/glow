import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-bold">Admin Panel</h2>
      <nav className="mt-6">
        <ul>
          <li className="mb-2">
            <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-700">Dashboard</Link>
          </li>
          <li className="mb-2">
            <Link to="/therapists" className="block p-2 rounded hover:bg-gray-700">Therapists</Link>
          </li>
          <li className="mb-2">
            <Link to="/anamnesis/categories" className="block p-2 rounded hover:bg-gray-700"> Anamnesis Categories</Link>
          </li>
          <li className="mb-2">
            <Link to="/anamnesis/sections" className="block p-2 rounded hover:bg-gray-700"> Anamnesis Sections</Link>
          </li>
          <li>
            <Link to="/anamnesis/questions" className="block p-2 hover:bg-gray-200">
              Anamnesis Questions
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;