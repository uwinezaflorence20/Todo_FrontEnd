import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-white rounded-[1.5rem] p-6 flex flex-col justify-between shadow-sm border border-gray-100/50 relative overflow-hidden h-36">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1 z-10">
          <span className="text-3xl font-extrabold text-[#0ec277]">{value}</span>
          <span className="text-sm font-bold text-gray-800">{title}</span>
        </div>
        <div className="w-12 h-12 rounded-full bg-[#0ec277] flex items-center justify-center text-white z-10 shadow-md">
          {icon}
        </div>
      </div>
      <div className="text-xs text-gray-400 font-medium z-10 mt-auto">
        {subtitle}
      </div>
    </div>
  );
};
