import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  Calendar, 
  BarChart3, 
  MessageSquare, 
  Users2, 
  ToyBrick, 
  Compass, 
  Settings, 
  LogOut,
  CheckCircle,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { icon: LayoutGrid, label: 'Boards', path: '/boards' },
  { icon: Calendar, label: 'Plan Schedule', path: '/schedule' },
  { icon: BarChart3, label: 'Reporting', path: '/dashboard' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: Users2, label: 'Team Member', path: '/team' },
  { icon: ToyBrick, label: 'Tools Plugin', path: '/plugins' },
  { icon: Compass, label: 'Roadmap', path: '/roadmap' },
  { icon: Settings, label: 'Setting', path: '/settings' },
];

export const UserSidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="py-8 flex flex-col h-full bg-white border-r border-gray-100">
      {/* Brand */}
      <div className="px-8 mb-10 flex items-center gap-2 text-brand">
        <CheckCircle className="w-8 h-8 font-bold" />
        <span className="text-2xl font-black tracking-wider text-gray-800">Boardto</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 space-y-1">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
              isActive 
                ? 'bg-brand text-white font-bold shadow-lg shadow-brand/20' 
                : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
            }`}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'opacity-70'}`} />
                  <span className="text-sm tracking-wide">{item.label}</span>
                </div>
                {!isActive && <ChevronRight className="w-4 h-4 opacity-30" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-4 mt-auto pt-6">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};
