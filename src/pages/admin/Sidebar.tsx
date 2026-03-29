import React from 'react';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Users, 
  UserPlus, 
  Settings, 
  FileText,
  Building2,
  Stethoscope,
  HeartPulse,
  MessageSquare,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: CalendarCheck, label: 'Appointments' },
  { icon: Stethoscope, label: 'Doctors' },
  { icon: Users, label: 'Patients' },
  { icon: Building2, label: 'Room Allotments' },
  { icon: FileText, label: 'Payments' },
  { icon: Settings, label: 'Expenses Report' },
  { icon: UserPlus, label: 'Departments' },
  { icon: HeartPulse, label: 'Insurance Company' },
  { icon: CalendarCheck, label: 'Events' },
  { icon: MessageSquare, label: 'Chat' },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="py-8 flex flex-col h-full">
      <div className="px-8 mb-10 flex items-center gap-2">
        <HeartPulse className="w-8 h-8 font-bold" />
        <span className="text-2xl font-bold tracking-wider">MEDILINE-</span>
      </div>

      <div className="px-6 mb-4 text-sm font-semibold opacity-80">
        Hospital
      </div>

      <nav className="flex-1 overflow-y-auto w-full px-4 space-y-1">
        {navItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
              item.active 
                ? 'bg-white text-[#0ec277] font-bold shadow-sm' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className={`w-5 h-5 ${item.active ? 'text-[#0ec277]' : 'opacity-80'}`} />
              <span className="text-sm">{item.label}</span>
            </div>
            {!item.active && <ChevronRight className="w-4 h-4 opacity-50" />}
          </a>
        ))}
      </nav>
    </div>
  );
};
