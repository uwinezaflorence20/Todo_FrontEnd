import React from 'react';
import { PlaceholderPage } from './PlaceholderPage';
import { LayoutDashboard } from 'lucide-react';

export const SystemLogs: React.FC = () => {
  return (
    <PlaceholderPage 
      title="System Logs" 
      icon={LayoutDashboard} 
      description="View detailed server health metrics, monitor HTTP request histories, and trace diagnostic logs."
    />
  );
};
