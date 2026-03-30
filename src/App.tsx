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
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;

