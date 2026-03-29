import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Settings, 
  PieChart,
  Users,
  MessageSquare,
  CheckCircle,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Users, label: 'User Management', path: '/admin/users' },
  { icon: FolderKanban, label: 'Global Projects', path: '/admin/projects' },
  { icon: LayoutDashboard, label: 'System Logs', path: '/admin/logs' },
  { icon: PieChart, label: 'App Analytics', path: '/admin/analytics' },
  { icon: MessageSquare, label: 'Support Tickets', path: '/admin/support' },
  { icon: Settings, label: 'System Settings', path: '/admin/settings' },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="py-8 flex flex-col h-full">
      <div className="px-8 mb-10 flex items-center gap-2">
        <CheckCircle className="w-8 h-8 font-bold" />
        <span className="text-2xl font-bold tracking-wider">TICK.DO</span>
      </div>

      <div className="px-6 mb-4 text-sm font-semibold opacity-80">
        Workspace
      </div>

      <nav className="flex-1 overflow-y-auto w-full px-4 space-y-1">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
              isActive 
                ? 'bg-white text-[#0ec277] font-bold shadow-sm' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-[#0ec277]' : 'opacity-80'}`} />
                  <span className="text-sm">{item.label}</span>
                </div>
                {!isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
