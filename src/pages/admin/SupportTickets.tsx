import React from 'react';
import { PlaceholderPage } from './PlaceholderPage';
import { MessageSquare } from 'lucide-react';

export const SupportTickets: React.FC = () => {
  return (
    <PlaceholderPage 
      title="Support Tickets" 
      icon={MessageSquare} 
      description="Track outstanding user requests, view direct support communications, and monitor resolution timelines."
    />
  );
};
