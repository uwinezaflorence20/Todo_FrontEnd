import React from 'react';
import { UserLayout } from './UserLayout';
import { UserSidebar } from './UserSidebar';
import { UserTopbar } from './UserTopbar';
import type { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserPlaceholderProps {
  title: string;
  icon: LucideIcon;
  description?: string;
}

export const UserPlaceholder: React.FC<UserPlaceholderProps> = ({ title, icon: Icon, description }) => {
  const navigate = useNavigate();

  return (
    <UserLayout sidebar={<UserSidebar />} topbar={<UserTopbar />}>
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] w-full bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-50 p-12 text-center animate-fade-in">
        <div className="w-32 h-32 rounded-3xl bg-brand/10 text-brand flex items-center justify-center mb-8 shadow-inner">
          <Icon className="w-16 h-16" />
        </div>
        
        <h1 className="text-4xl font-black text-gray-800 mb-4 tracking-tight">{title}</h1>
        
        <p className="text-gray-400 font-medium text-lg max-w-xl mb-10 leading-relaxed">
          {description || `The ${title} module is currently under construction. We're working hard to bring you the best task management experience.`}
        </p>
        
        <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-10 py-4 bg-brand text-white font-bold rounded-2xl shadow-lg shadow-brand/20 transition-all hover:scale-105 active:scale-95 hover:bg-brand-dark"
            >
              Back to Dashboard
            </button>
            
            <button 
              className="px-10 py-4 bg-gray-50 text-gray-400 font-bold rounded-2xl border border-gray-100 transition-all hover:bg-gray-100"
            >
              Learn More
            </button>
        </div>
      </div>
    </UserLayout>
  );
};
