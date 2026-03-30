import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Clock, Users } from 'lucide-react';

interface TaskCardProps {
  title: string;
  category: string;
  timeLeft: string;
  progress: number;
  icon: LucideIcon;
  iconBgColor: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  title, 
  category, 
  timeLeft, 
  progress, 
  icon: Icon,
  iconBgColor
}) => {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-transparent hover:border-brand/10 transition-all duration-300 hover:translate-y-[-4px] overflow-hidden group">
      {/* Icon and Category */}
      <div className="flex flex-col mb-6">
        <div 
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-${iconBgColor}/20`}
          style={{ backgroundColor: iconBgColor }}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-xl font-black text-gray-800 mb-1 group-hover:text-brand transition-colors">{title}</h3>
        <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest">
            <Users className="w-3.5 h-3.5" />
            <span>{category}</span>
        </div>
      </div>

      {/* Deadline */}
      <div className="flex items-center gap-2 mb-10 text-gray-400 font-bold text-xs">
        <Clock className="w-4 h-4" />
        <span>{timeLeft} Left</span>
      </div>

      {/* Team and Progress */}
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
        <div className="flex -space-x-3">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden flex items-center justify-center text-[10px] font-bold text-gray-400 shadow-sm"
            >
              {/* Profile placeholder */}
              <div className="w-full h-full bg-brand/10 rounded-full flex items-center justify-center">
                  U{i}
              </div>
            </div>
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-400 shadow-sm">
            +
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 w-1/2">
          <div className="flex items-center justify-between w-full">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Progress</span>
            <span className="text-sm font-black text-gray-800">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
