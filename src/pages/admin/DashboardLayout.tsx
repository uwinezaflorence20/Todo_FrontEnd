import React from 'react';

interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ sidebar, topbar, children }) => {
  return (
    <div className="flex h-screen w-full bg-[#f4f7f6] font-sans overflow-hidden">
      {/* Sidebar - fixed width */}
      <aside className="w-[280px] h-full flex-shrink-0 bg-[#0ec277] rounded-r-[2rem] text-white flex flex-col justify-between overflow-y-auto">
        {sidebar}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Topbar */}
        <header className="px-8 pt-6 pb-2 shrink-0">
          {topbar}
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 pt-4">
          {children}
        </div>
      </main>
    </div>
  );
};
