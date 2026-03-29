import React from 'react';
import { DashboardLayout } from './DashboardLayout';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { StatCard } from './StatCard';
import { HospitalSurveyChart } from './HospitalSurveyChart';
import { CalendarWidget } from './CalendarWidget';
import { CalendarCheck, Users, Stethoscope, Scissors, Building2, Banknote } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <DashboardLayout sidebar={<Sidebar />} topbar={<Topbar />}>
      <div className="flex flex-col gap-8 h-full">
        {/* Top Summary Cards and Welcome Card */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Welcome Card */}
          <div className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-gray-100/50 xl:col-span-1 flex flex-col justify-center relative overflow-hidden h-full min-h-[160px]">
            <div className="z-10 relative h-full flex flex-col justify-center">
              <h2 className="text-[#0ec277] font-bold text-lg mb-1">Today Available</h2>
              <p className="text-gray-500 text-xs font-semibold mb-4">From: Fortis Hospital</p>
              
              <div className="flex items-center gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                  alt="Dr. Daisy Leen" 
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md z-10"
                />
                <div>
                  <h3 className="text-gray-800 font-extrabold text-sm">Dr. Daisy Leen</h3>
                  <p className="text-gray-400 font-medium text-[10px]">Orthopedist 11:00AM-03:00PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stat Cards Grid */}
          <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard 
              title="Appointments" 
              value="40" 
              subtitle="Yesterday 32 Appointments" 
              icon={<CalendarCheck className="w-6 h-6" />} 
            />
            <StatCard 
              title="New Admit" 
              value="21" 
              subtitle="Yesterday 18 Admits" 
              icon={<Users className="w-6 h-6" />} 
            />
            <StatCard 
              title="Operations" 
              value="14" 
              subtitle="Yesterday 9 Operations" 
              icon={<Scissors className="w-6 h-6" />} 
            />
            <StatCard 
              title="Doctors" 
              value="15" 
              subtitle="Today Available" 
              icon={<Stethoscope className="w-6 h-6" />} 
            />
            <StatCard 
              title="Nurses" 
              value="36" 
              subtitle="Today Available" 
              icon={<Building2 className="w-6 h-6" />} 
            />
            <StatCard 
              title="Earnings" 
              value="$52,140" 
              subtitle="Yesterday's $14,876" 
              icon={<Banknote className="w-6 h-6" />} 
            />
          </div>
        </div>

        {/* Charts and Calendar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[350px]">
          {/* Chart takes up 2 columns out of 3 */}
          <div className="lg:col-span-2">
            <HospitalSurveyChart />
          </div>
          {/* Calendar takes up 1 column */}
          <div className="lg:col-span-1">
            <CalendarWidget />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
