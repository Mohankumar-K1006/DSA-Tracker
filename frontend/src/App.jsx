import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useProgress } from './hooks/useProgress';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ProblemsTab from './tabs/ProblemsTab';
import LevelUpModal from './components/LevelUpModal';

function ProtectedRoute({ children }) {
    const { currentUser, loading } = useAuth();
    if (loading) return <div style={{ minHeight: '100vh' }} />;
    return currentUser ? children : <Navigate to="/auth" replace />;
}

export default function App() {
    const { currentUser, loading } = useAuth();
    const progress = useProgress();

    // Load progress when user is authenticated
    useEffect(() => {
        if (currentUser) {
            progress.loadProgress();
        }
    }, [currentUser]);

    if (loading) return <div style={{ minHeight: '100vh' }} />;

    return (
        <>
            <Routes>
                <Route path="/" element={currentUser ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
                <Route path="/auth" element={currentUser ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
                <Route path="/dashboard" element={<ProtectedRoute><DashboardPage progress={progress} /></ProtectedRoute>} />
                <Route path="/solve/:problemId" element={<ProtectedRoute><ProblemSolvePage progress={progress} /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {/* Level Up Modal — renders on top of everything */}
            <LevelUpModal
                levelUpData={progress.levelUpData}
                onDismiss={progress.dismissLevelUp}
            />
        </>
    );
}
