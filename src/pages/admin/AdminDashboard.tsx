import React, { useEffect, useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { StatCard } from './StatCard';
import { HospitalSurveyChart } from './HospitalSurveyChart';
import { CalendarWidget } from './CalendarWidget';
import { Users, Server, Activity, AlertCircle, Database, ShieldAlert } from 'lucide-react';
import { userApi, taskApi } from '../../services/api';

export const AdminDashboard: React.FC = () => {
  const [userCount, setUserCount] = useState<string>('...');
  const [taskCount, setTaskCount] = useState<string>('...');

  useEffect(() => {
    userApi.getAll()
      .then((users) => setUserCount(users.length.toLocaleString()))
      .catch(() => setUserCount('N/A'));

    taskApi.getAll()
      .then((tasks) => setTaskCount(tasks.length.toLocaleString()))
      .catch(() => setTaskCount('N/A'));
  }, []);

  return (
    <DashboardLayout sidebar={<Sidebar />} topbar={<Topbar />}>
      <div className="flex flex-col gap-8 h-full">
        {/* Top Summary Cards and Welcome Card */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Welcome Card */}
          <div className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-gray-100/50 xl:col-span-1 flex flex-col justify-center relative overflow-hidden h-full min-h-[160px]">
            <div className="z-10 relative h-full flex flex-col justify-center">
              <h2 className="text-[#0ec277] font-bold text-lg mb-1">System Status</h2>
              <p className="text-gray-500 text-xs font-semibold mb-4">All services operational</p>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 text-[#0ec277] border-4 border-white shadow-md z-10 flex items-center justify-center font-bold text-xl">
                  OK
                </div>
                <div>
                  <h3 className="text-gray-800 font-extrabold text-sm">Server Latency</h3>
                  <p className="text-gray-400 font-medium text-[10px]">Current: 45ms (Healthy)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stat Cards Grid */}
          <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Total Users"
              value={userCount}
              subtitle="Registered accounts"
              icon={<Users className="w-6 h-6" />}
            />
            <StatCard
              title="Active Sessions"
              value="842"
              subtitle="Right now"
              icon={<Activity className="w-6 h-6" />}
            />
            <StatCard
              title="Global Tasks"
              value={taskCount}
              subtitle="Across all workspaces"
              icon={<Database className="w-6 h-6" />}
            />
            <StatCard
              title="Server Errors"
              value="3"
              subtitle="Requires attention"
              icon={<AlertCircle className="w-6 h-6" />}
            />
            <StatCard
              title="Storage Used"
              value="45TB"
              subtitle="62% capacity"
              icon={<Server className="w-6 h-6" />}
            />
            <StatCard
              title="Security Alerts"
              value="0"
              subtitle="System secure"
              icon={<ShieldAlert className="w-6 h-6" />}
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
