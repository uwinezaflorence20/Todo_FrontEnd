import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Jan', 'General Patient': 80, CPD: 55 },
  { name: 'Feb', 'General Patient': 50, CPD: 60 },
  { name: 'Mar', 'General Patient': 140, CPD: 90 },
  { name: 'Apr', 'General Patient': 55, CPD: 70 },
  { name: 'May', 'General Patient': 80, CPD: 95 },
  { name: 'Jun', 'General Patient': 50, CPD: 60 },
  { name: 'Jul', 'General Patient': 130, CPD: 150 },
  { name: 'Aug', 'General Patient': 55, CPD: 50 },
  { name: 'Sep', 'General Patient': 130, CPD: 140 },
  { name: 'Oct', 'General Patient': 80, CPD: 85 },
  { name: 'Nov', 'General Patient': 55, CPD: 50 },
  { name: 'Dec', 'General Patient': 80, CPD: 60 },
];

export const HospitalSurveyChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100/50 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">Hospital Survey</h3>
        <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
          <div className="flex items-center gap-1.5 cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-[#0ec277]"></span> General Patient
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span> CPD
          </div>
        </div>
      </div>
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={2} barSize={6}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#9ca3af' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#9ca3af' }} 
            />
            <Tooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="General Patient" fill="#0ec277" radius={[4, 4, 0, 0]} />
            <Bar dataKey="CPD" fill="#fbbf24" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
