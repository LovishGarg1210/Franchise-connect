import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  DollarSign, 
  History, 
  Users, 
  FileText, 
  Settings,
  Menu
} from 'lucide-react';

const Sidebar = ({setIsOpen,isOpen}) => {
  const location = useLocation();


  const menuItems = [
    { path: '/userdashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { path: '/userdashboard/sales', icon: <DollarSign size={20} />, label: 'Sales' },
    { path: '/userdashboard/history', icon: <History size={20} />, label: 'History' },
    { path: '/userdashboard/employees', icon: <Users size={20} />, label: 'Employees' },
    { path: '/userdashboard/expenses', icon: <FileText size={20} />, label: 'Expenses' },
    { path: '/userdashboard/settings', icon: <Settings size={20} />, label: 'Settings' },
  ]

  return (
    <div
      className={`min-h-screen md:static fixed top-0 left-0 bg-gray-900 text-white transition-transform duration-300 
        ${isOpen ? 'translate-x-0 w-full md:w-64 z-50' : '-translate-x-full md:translate-x-0 w-20'}`
      }
    >
      <div className="flex items-center justify-between p-4">
        <h2 className={`font-bold text-xl ${!isOpen && 'hidden'}`}>Franchise Hub</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-gray-800 rounded">
          <Menu size={20} />
        </button>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 ${
              location.pathname === item.path ? 'bg-gray-800' : 'hover:bg-gray-800'
            }`}
          >
            <span className="mr-4">{item.icon}</span>
            <span className={`${!isOpen && 'hidden'}`}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;