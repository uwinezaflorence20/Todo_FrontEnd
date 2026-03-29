import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarWidget: React.FC = () => {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  // Generating a static Dec 2019 view as in design
  const calendarDates = [
    { date: 24, padding: true }, { date: 25, padding: true }, { date: 26, padding: true }, { date: 27, padding: true }, { date: 28, padding: true }, { date: 29, padding: true }, { date: 30, padding: true },
    { date: 1 }, { date: 2 }, { date: 3 }, { date: 4 }, { date: 5 }, { date: 6 }, { date: 7 },
    { date: 8 }, { date: 9 }, { date: 10 }, { date: 11 }, { date: 12 }, { date: 13 }, { date: 14 },
    { date: 15 }, { date: 16 }, { date: 17 }, { date: 18 }, { date: 19 }, { date: 20, active: true }, { date: 21 },
    { date: 22 }, { date: 23 }, { date: 24 }, { date: 25 }, { date: 26 }, { date: 27 }, { date: 28 },
    { date: 29 }, { date: 30 }, { date: 31 }, { date: 1, padding: true }, { date: 2, padding: true }, { date: 3, padding: true }, { date: 4, padding: true },
  ];

  return (
    <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100/50 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">Calendar</h3>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <button className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <ChevronLeft className="w-3 h-3 text-gray-500" />
        </button>
        <span className="text-sm font-bold text-[#0ec277]">December 2019</span>
        <button className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <ChevronRight className="w-3 h-3 text-gray-500" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-4 gap-x-1 flex-1 content-start">
        {days.map(day => (
          <div key={day} className="text-center text-xs font-bold text-gray-800">
            {day}
          </div>
        ))}
        
        {calendarDates.map((item, idx) => (
          <div 
            key={idx} 
            className={`flex items-center justify-center text-xs p-1 ${item.padding ? 'text-gray-300' : 'text-gray-600 font-medium'}`}
          >
            <span className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors cursor-pointer ${item.active ? 'bg-[#0ec277] text-white shadow-md shadow-[#0ec277]/40' : 'hover:bg-gray-100'}`}>
              {item.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
