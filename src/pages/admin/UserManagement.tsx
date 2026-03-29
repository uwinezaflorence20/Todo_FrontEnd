import React from 'react';
import { PlaceholderPage } from './PlaceholderPage';
import { Users } from 'lucide-react';

export const UserManagement: React.FC = () => {
  return (
    <PlaceholderPage 
      title="User Management" 
      icon={Users} 
      description="Manage application users, configure roles, and monitor individual access permissions across the workspace."
    />
  );
};
