import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContainer } from './components/auth/AuthContainer';
import { AdminDashboard } from './pages/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthContainer />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
