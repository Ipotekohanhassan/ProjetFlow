import { useState } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Folder, Users, Bell, User, UserPlus } from 'lucide-react';
import 'tailwindcss/tailwind.css';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { icon: LayoutGrid, label: "Dashboard", path: "/dashboard" },
    { icon: Folder, label: "Mes Projets", path: "/tasks" },
    { icon: Users, label: "Ma Team", path: "/team-members" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: UserPlus, label: "Demandes d'amis", path: "/friend-request" },
    { icon: User, label: "Mon Profil", path: "/profil" },
  ];

  return (
    <div className="relative flex">
      {/* Mobile Toggle Button */}
      <button
        className="p-3 bg-blue-600 text-white fixed top-4 left-4 z-50 rounded-md lg:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 p-6 fixed top-0 left-0 h-full z-40 transform transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:relative lg:translate-x-0 w-64`}
      >
        <div className="flex items-center">
          <Folder className="w-8 h-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">
            Projet<span className="text-blue-700">Flow</span>
          </span>
        </div>

        {/* User Info */}
        <div className="mt-8">
          <div className="flex items-center space-x-3 mb-8">
            <img src="https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png" alt="User" className="w-12 h-12 rounded-full" />
            <div>
              <h2 className="font-bold text-lg">Ipote Kohan</h2>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg cursor-pointer ${location.pathname === item.path
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'hover:bg-gray-100 text-gray-600'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
