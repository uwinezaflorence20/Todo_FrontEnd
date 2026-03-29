import React from 'react';
import { Search, Bell, ChevronDown, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Topbar: React.FC = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <div className="flex items-center justify-between bg-white/50 backdrop-blur-sm px-6 py-4 rounded-2xl w-full">
      {/* Search Bar */}
      <div className="relative w-96">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full bg-white rounded-full py-2.5 pl-5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ec277]/20 shadow-sm"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-6">
        {/* Language Selector */}
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-sm font-semibold text-gray-700">ENG</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>

        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell className="w-6 h-6 text-[#0ec277]" />
          <span className="absolute 0 top-0.5 right-0.5 w-2 h-2 bg-red-500 border border-white rounded-full"></span>
        </div>

        {/* Profile */}
        <div className="relative border-l border-gray-200 pl-4">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center border-2 border-white shadow-sm transition-transform group-hover:scale-105">
              <User className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-gray-800">Admin</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
            </div>
          </div>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-gray-50 mb-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Account</p>
                <p className="text-sm font-bold text-gray-800 truncate">admin@gmail.com</p>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors font-semibold"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
