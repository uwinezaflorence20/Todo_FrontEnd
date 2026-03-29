import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Jan', 'Active Users': 800, 'New Signups': 550 },
  { name: 'Feb', 'Active Users': 500, 'New Signups': 600 },
  { name: 'Mar', 'Active Users': 1400, 'New Signups': 900 },
  { name: 'Apr', 'Active Users': 550, 'New Signups': 700 },
  { name: 'May', 'Active Users': 800, 'New Signups': 950 },
  { name: 'Jun', 'Active Users': 500, 'New Signups': 600 },
  { name: 'Jul', 'Active Users': 1300, 'New Signups': 1500 },
  { name: 'Aug', 'Active Users': 550, 'New Signups': 500 },
  { name: 'Sep', 'Active Users': 1300, 'New Signups': 1400 },
  { name: 'Oct', 'Active Users': 800, 'New Signups': 850 },
  { name: 'Nov', 'Active Users': 550, 'New Signups': 500 },
  { name: 'Dec', 'Active Users': 800, 'New Signups': 600 },
];

export const HospitalSurveyChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100/50 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">User Analytics</h3>
        <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
          <div className="flex items-center gap-1.5 cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-[#0ec277]"></span> Active Users
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span> New Signups
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
            <Bar dataKey="Active Users" fill="#0ec277" radius={[4, 4, 0, 0]} />
            <Bar dataKey="New Signups" fill="#fbbf24" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
