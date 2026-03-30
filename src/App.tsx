import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContainer } from './components/auth/AuthContainer';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagement } from './pages/admin/UserManagement';
import { GlobalProjects } from './pages/admin/GlobalProjects';
import { SystemLogs } from './pages/admin/SystemLogs';
import { AppAnalytics } from './pages/admin/AppAnalytics';
import { SupportTickets } from './pages/admin/SupportTickets';
import { SystemSettings } from './pages/admin/SystemSettings';
import { ToastProvider } from './components/ui/Toast';
import { UserDashboard } from './pages/user/UserDashboard';
import { AuthProvider } from './context/AuthContext';
import { UserPlaceholder } from './pages/user/UserPlaceholder';
import { 
  LayoutGrid, 
  Calendar, 
  MessageSquare, 
  Users2, 
  ToyBrick, 
  Compass, 
  Settings 
} from 'lucide-react';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AuthContainer />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            
            {/* User Navigation Routes */}
            <Route path="/boards" element={<UserPlaceholder title="Boards" icon={LayoutGrid} />} />
            <Route path="/schedule" element={<UserPlaceholder title="Plan Schedule" icon={Calendar} />} />
            <Route path="/messages" element={<UserPlaceholder title="Messages" icon={MessageSquare} />} />
            <Route path="/team" element={<UserPlaceholder title="Team Members" icon={Users2} />} />
            <Route path="/plugins" element={<UserPlaceholder title="Tools & Plugins" icon={ToyBrick} />} />
            <Route path="/roadmap" element={<UserPlaceholder title="Product Roadmap" icon={Compass} />} />
            <Route path="/settings" element={<UserPlaceholder title="Settings" icon={Settings} />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/projects" element={<GlobalProjects />} />
            <Route path="/admin/logs" element={<SystemLogs />} />
            <Route path="/admin/analytics" element={<AppAnalytics />} />
            <Route path="/admin/support" element={<SupportTickets />} />
            <Route path="/admin/settings" element={<SystemSettings />} />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;

