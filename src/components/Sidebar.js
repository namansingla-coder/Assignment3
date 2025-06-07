import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5 fixed overflow-y-auto">
      <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>

      <ul className="space-y-4">
        {/* Dashboard */}
        <li>
          <Link to="/" className="hover:text-blue-400 font-semibold">Dashboard</Link>
        </li>

        {/* App Section */}
        <li className="mt-6 text-gray-400 uppercase text-xs tracking-wide">App</li>
        <li className="ml-3">
          <Link to="/calendar" className="hover:text-blue-400">Calendar</Link>
        </li>
        <li className="ml-3">
          <Link to="/kanban" className="hover:text-blue-400">Kanban</Link>
        </li>

        {/* Charts Section */}
        <li className="mt-6 text-gray-400 uppercase text-xs tracking-wide">Charts</li>
        <li className="ml-3">
          <Link to="/charts/line" className="hover:text-blue-400">Line Chart</Link>
        </li>
        <li className="ml-3">
          <Link to="/charts/bar" className="hover:text-blue-400">Bar Chart</Link>
        </li>
        <li className="ml-3">
          <Link to="/charts/pie" className="hover:text-blue-400">Pie Chart</Link>
        </li>
        
        <li className="ml-3">
          <Link to="/charts/area" className="hover:text-blue-400">Area Chart</Link>
        </li>
        <li className="ml-3">
          <Link to="/charts/financial" className="hover:text-blue-400">Financial Chart</Link>
        </li>

        {/* Tables Section */}
        <li className="mt-6 text-gray-400 uppercase text-xs tracking-wide">Tables</li>
        <li className="ml-3">
          <Link to="/tables" className="hover:text-blue-400">Users</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;