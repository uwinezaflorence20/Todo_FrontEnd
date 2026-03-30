import React from 'react';

interface UserLayoutProps {
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
  children: React.ReactNode;
}

export const UserLayout: React.FC<UserLayoutProps> = ({ sidebar, topbar, children }) => {
  return (
    <div className="flex h-screen w-full bg-[#f8fafd] font-sans overflow-hidden">
      {/* Sidebar - fixed width */}
      <aside className="w-[300px] h-full flex-shrink-0 bg-white border-r border-gray-100/50 shadow-2xl shadow-gray-200/20 z-50">
        {sidebar}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-white/40 backdrop-blur-3xl relative">
        {/* Subtle background decoration to match design */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] translate-x-1/2 translate-y-[-50%] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] translate-x-[-1/2] translate-y-[50%] pointer-events-none" />

        {/* Topbar */}
        <header className="shrink-0 z-40 bg-white/20 backdrop-blur-md">
          {topbar}
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-10 py-6 scrollbar-hide">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
