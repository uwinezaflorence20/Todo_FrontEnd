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

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthContainer />} />
          <Route path="/dashboard" element={<UserDashboard />} />
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
  );
}

export default App;

