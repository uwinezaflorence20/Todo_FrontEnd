import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, Plus, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface UserTopbarProps {
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  onAddTask?: () => void;
}

export const UserTopbar: React.FC<UserTopbarProps> = ({
  searchQuery = '',
  onSearchChange,
  onAddTask,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayName = user?.name || user?.email?.split('@')[0] || 'User';
  const displayRole = user?.role === 'ADMIN' ? 'Administrator' : 'User';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="flex items-center justify-between px-8 py-5 w-full bg-transparent">
      {/* Search Bar */}
      <div className="relative w-[420px]">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="w-full bg-white rounded-full py-3.5 pl-14 pr-8 text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 shadow-sm border border-transparent transition-all hover:border-gray-100"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange?.('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 text-lg leading-none"
          >
            ×
          </button>
        )}
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-8">
        {/* Add Task Button */}
        {onAddTask && (
          <button
            onClick={onAddTask}
            className="w-12 h-12 rounded-2xl bg-brand text-white shadow-xl shadow-brand/30 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            title="Add new task"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}

        {/* Notification Bell */}
        <div className="relative cursor-pointer group">
          <div className="p-3 rounded-xl bg-white border border-gray-100 group-hover:bg-gray-50 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 border-2 border-white rounded-full text-[9px] text-white flex items-center justify-center font-bold">1</span>
          </div>
        </div>

        {/* Profile with dropdown */}
        <div className="relative pl-6 border-l border-gray-100" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex flex-col items-end">
              <p className="text-sm font-bold text-gray-800 tracking-wide">{displayName}</p>
              <p className="text-[11px] font-semibold text-gray-400 capitalize">{displayRole}</p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg border-2 border-white transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-brand/10 flex items-center justify-center text-brand font-black text-lg">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 p-0.5 bg-white rounded-lg shadow-sm border border-gray-100">
                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-[calc(100%+12px)] w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
              {/* User info header */}
              <div className="px-4 py-3 border-b border-gray-50">
                <p className="text-sm font-black text-gray-800 truncate">{displayName}</p>
                <p className="text-xs text-gray-400 font-medium truncate">{user?.email}</p>
              </div>

              <button
                onClick={() => { setDropdownOpen(false); navigate('/profile'); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-brand transition-colors"
              >
                <User className="w-4 h-4" />
                View Profile
              </button>

              <button
                onClick={() => { setDropdownOpen(false); navigate('/settings'); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-brand transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>

              <div className="border-t border-gray-50 mt-1 pt-1">
                <button
                  onClick={() => { setDropdownOpen(false); logout(); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
