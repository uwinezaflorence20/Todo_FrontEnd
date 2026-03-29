import React from 'react';
import { PlaceholderPage } from './PlaceholderPage';
import { Settings } from 'lucide-react';

export const SystemSettings: React.FC = () => {
  return (
    <PlaceholderPage 
      title="System Settings" 
      icon={Settings} 
      description="Adjust system-wide configurations, email templates, backup thresholds, and general platform preferences."
    />
  );
};
