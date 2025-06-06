import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="ml-64 p-6 bg-gray-100 min-h-screen">{<Outlet/>}</main>
      </div>
    </div>
  );
};

export default Layout;