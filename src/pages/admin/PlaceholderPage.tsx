import React from 'react';
import { DashboardLayout } from './DashboardLayout';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import type { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
  icon: LucideIcon;
  description?: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, icon: Icon, description }) => {
  const navigate = useNavigate();

  return (
    <DashboardLayout sidebar={<Sidebar />} topbar={<Topbar />}>
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] w-full bg-white rounded-[1.5rem] shadow-sm border border-gray-100/50 p-8">
        <div className="w-24 h-24 rounded-full bg-green-50 text-[#0ec277] flex items-center justify-center mb-6">
          <Icon className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
        <p className="text-gray-500 text-center max-w-lg mb-8 leading-relaxed">
          {description || `This is a placeholder for the ${title} page. Implementation for this module will be added in a future update.`}
        </p>
        <button 
          onClick={() => navigate('/admin/dashboard')}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full transition-colors flex items-center gap-2"
        >
          Return to Dashboard
        </button>
      </div>
    </DashboardLayout>
  );
};
