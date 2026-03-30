import React, { useState } from 'react';
import { UserLayout } from './UserLayout';
import { UserSidebar } from './UserSidebar';
import { UserTopbar } from './UserTopbar';
import { TaskCard } from './TaskCard';
import { 
    Monitor, 
    Palette, 
    Layout, 
    BarChart, 
    ShoppingCart, 
    Database, 
    Video, 
    Target,
    Grid,
    List
} from 'lucide-react';

const tasks = [
  { id: 1, title: 'Finalize Design System', category: 'Work', timeLeft: '1 Weeks', progress: 34, icon: Monitor, iconBgColor: '#ec4899', status: 'Doing' },
  { id: 2, title: 'Grocery Shopping', category: 'Personal', timeLeft: '3 Hours', progress: 100, icon: ShoppingCart, iconBgColor: '#0ec277', status: 'Done' },
  { id: 3, title: 'Update Documentation', category: 'Work', timeLeft: '2 Days', progress: 4, icon: Layout, iconBgColor: '#3b82f6', status: 'Pending' },
  { id: 4, title: 'Client Meeting', category: 'Work', timeLeft: '1 Hour', progress: 0, icon: BarChart, iconBgColor: '#f97316', status: 'Pending' },
  { id: 5, title: 'Pay Electricity Bill', category: 'Personal', timeLeft: '3 Weeks', progress: 65, icon: Database, iconBgColor: '#8b5cf6', status: 'Doing' },
  { id: 6, title: 'Bug Fixes', category: 'Work', timeLeft: '2 Days', progress: 100, icon: Video, iconBgColor: '#f59e0b', status: 'Done' },
  { id: 7, title: 'Exercise', category: 'Health', timeLeft: '11 Days', progress: 24, icon: Target, iconBgColor: '#06b6d4', status: 'Doing' },
  { id: 8, title: 'Read Book', category: 'Personal', timeLeft: '1 Weeks', progress: 70, icon: Palette, iconBgColor: '#db2777', status: 'Doing' },
];

const filters = [
  { label: 'All', count: 50 },
  { label: 'Pending', count: 20 },
  { label: 'Doing', count: 18 },
  { label: 'Done', count: 34 },
];

export const UserDashboard: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredTasks = activeFilter === 'All' 
        ? tasks 
        : tasks.filter(task => task.status === activeFilter);

    return (
        <UserLayout sidebar={<UserSidebar />} topbar={<UserTopbar />}>
            <div className="flex flex-col gap-10">
                {/* Header Section */}
                <div className="flex items-end justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Todo List</h1>
                        <p className="text-gray-400 font-bold text-sm tracking-wide opacity-70">Your personal tasks for today</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-3 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-400 hover:text-brand hover:border-brand/20 transition-all">
                            <Grid className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-400 hover:text-brand hover:border-brand/20 transition-all">
                            <List className="w-5 h-5" />
                        </button>
                        <button className="px-6 py-3 bg-white border border-gray-100 font-bold text-sm text-gray-600 rounded-xl shadow-sm hover:bg-gray-50 transition-all border-b-4 border-b-gray-200 active:border-b-0 active:translate-y-1">
                            More Options
                        </button>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-6">
                    {filters.map((filter) => (
                        <button 
                            key={filter.label}
                            onClick={() => setActiveFilter(filter.label)}
                            className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm ${
                                activeFilter === filter.label 
                                    ? 'bg-brand text-white shadow-xl shadow-brand/20' 
                                    : 'bg-white text-gray-400 hover:bg-gray-50 shadow-sm border border-transparent hover:border-gray-100'
                            }`}
                        >
                            <span>{filter.label}</span>
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black ${
                                activeFilter === filter.label 
                                    ? 'bg-white/20 text-white' 
                                    : 'bg-brand/10 text-brand'
                            }`}>
                                {filter.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredTasks.map((task) => (
                        <TaskCard 
                            key={task.id}
                            title={task.title}
                            category={task.category}
                            timeLeft={task.timeLeft}
                            progress={task.progress}
                            icon={task.icon}
                            iconBgColor={task.iconBgColor}
                        />
                    ))}
                </div>
            </div>
        </UserLayout>
    );
};
