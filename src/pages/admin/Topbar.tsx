import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

export const Topbar: React.FC = () => {
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
        <div className="flex items-center gap-3 cursor-pointer pl-2 border-l border-gray-200">
          <img 
            src="https://images.unsplash.com/photo-1594824436951-b8efc8fb4032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="Admin" 
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-gray-800">Admin</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
