import React from 'react';
import { PlaceholderPage } from './PlaceholderPage';
import { PieChart } from 'lucide-react';

export const AppAnalytics: React.FC = () => {
  return (
    <PlaceholderPage 
      title="App Analytics" 
      icon={PieChart} 
      description="Evaluate global trends, signups statistics, peak active sessions, and detailed productivity insights."
    />
  );
};
