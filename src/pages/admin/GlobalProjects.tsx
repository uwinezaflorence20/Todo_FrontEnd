import React from 'react';
import { PlaceholderPage } from './PlaceholderPage';
import { FolderKanban } from 'lucide-react';

export const GlobalProjects: React.FC = () => {
  return (
    <PlaceholderPage 
      title="Global Projects" 
      icon={FolderKanban} 
      description="Monitor and organize active projects, deadlines, and task distribution across all active workspaces."
    />
  );
};
