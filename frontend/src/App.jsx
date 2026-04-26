import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) return <div style={{ minHeight: '100vh' }} />;
  return currentUser ? children : <Navigate to="/auth" replace />;
}

export default function App() {
  const { currentUser, loading } = useAuth();

  if (loading) return <div style={{ minHeight: '100vh' }} />;

  return (
    <Routes>
      <Route path="/" element={currentUser ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
      <Route path="/auth" element={currentUser ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
