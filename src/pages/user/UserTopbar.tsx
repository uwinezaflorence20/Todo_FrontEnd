import React from 'react';
import { Search, Bell, ChevronDown, User, Plus } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import { useAuth } from '../../context/AuthContext';

export const UserTopbar: React.FC = () => {
  const { success } = useToast();
  const { user } = useAuth();
  
  const handleAddNew = () => {
    success('New Task', 'Create task modal would open here.');
  };

  const displayName = user?.name || user?.email?.split('@')[0] || 'User';
  const displayRole = user?.role === 'ADMIN' ? 'Administrator' : 'User';

  return (
    <div className="flex items-center justify-between px-8 py-6 w-full bg-transparent">
      {/* Search Bar */}
      <div className="relative w-[450px]">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search Tasks..." 
          className="w-full bg-white rounded-full py-4 pl-16 pr-8 text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 shadow-sm border border-transparent transition-all hover:border-gray-100"
        />
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-10">
        
        {/* Floating Add Button for context */}
        <button 
          onClick={handleAddNew}
          className="w-14 h-14 rounded-2xl bg-brand text-white shadow-xl shadow-brand/30 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        >
          <Plus className="w-8 h-8" />
        </button>

        {/* Notification Bell */}
        <div className="relative cursor-pointer group">
          <div className="p-3 rounded-xl bg-white border border-gray-100 group-hover:bg-gray-50 transition-colors">
            <Bell className="w-6 h-6 text-gray-600 transition-transform group-hover:shake" />
            <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 border-4 border-white rounded-full text-[10px] text-white flex items-center justify-center font-bold">1</span>
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4 cursor-pointer group pl-6 border-l border-gray-100">
          <div className="flex flex-col items-end">
            <p className="text-sm font-bold text-gray-800 tracking-wide uppercase">{displayName}</p>
            <p className="text-[11px] font-semibold text-gray-400 capitalize">{displayRole}</p>
          </div>
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-white transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-brand/10 flex items-center justify-center text-brand font-black text-xl">
                   {displayName.charAt(0).toUpperCase()}
                </div>
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-lg shadow-sm border border-gray-100">
                <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
