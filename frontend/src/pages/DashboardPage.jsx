import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import DashboardTab from '../tabs/DashboardTab';
import ProblemsTab from '../tabs/ProblemsTab';
import TopicsTab from '../tabs/TopicsTab';
import AIRecommendTab from '../tabs/AIRecommendTab';
import AnalyticsTab from '../tabs/AnalyticsTab';
import Confetti from '../components/Confetti';

const NAV_TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg> },
  { id: 'problems', label: 'Problems', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { id: 'topics', label: 'Topics', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
  { id: 'ai', label: 'AI Recommend', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> },
  { id: 'analytics', label: 'Analytics', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const progress = useProgress(currentUser?.email);
  const navigate = useNavigate();

  useEffect(() => { progress.reloadData(currentUser?.email); }, [currentUser?.email]);

  const initials = useMemo(() => {
    if (!currentUser) return '';
    return currentUser.avatar || currentUser.fullName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }, [currentUser]);

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    const name = currentUser?.fullName?.split(' ')[0] || '';
    if (h < 12) return `Good Morning, ${name}! ☀️`;
    if (h < 17) return `Good Afternoon, ${name}! 🌤️`;
    return `Good Evening, ${name}! 🌙`;
  }, [currentUser]);

  const streak = progress.calculateStreak();

  const handleLogout = () => { logout(); navigate('/auth'); };

  const TabContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab progress={progress} greeting={greeting} />;
      case 'problems': return <ProblemsTab progress={progress} />;
      case 'topics': return <TopicsTab progress={progress} />;
      case 'ai': return <AIRecommendTab progress={progress} />;
      case 'analytics': return <AnalyticsTab progress={progress} />;
      default: return null;
    }
  };

  return (
    <div id="page-dashboard" className="page active">
      {progress.showConfetti && <Confetti />}

      {/* Navbar */}
      <nav className="navbar" id="navbar">
        <div className="nav-brand" onClick={() => navigate('/')}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#navGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <defs><linearGradient id="navGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{ stopColor: '#6366f1' }}/><stop offset="100%" style={{ stopColor: '#06b6d4' }}/></linearGradient></defs>
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          <span>DSA Tracker</span>
        </div>

        <div className="nav-links" id="desktop-nav-links">
          {NAV_TABS.map(t => (
            <button key={t.id} className={`nav-link ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <div className="streak-badge">
            <span className="streak-fire">🔥</span>
            <span className="streak-count">{streak}</span>
            <span className="streak-label">day streak</span>
          </div>

          <div className="user-profile-dropdown" onClick={e => e.stopPropagation()}>
            <button className="user-avatar-btn" onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <div className="user-avatar" style={{ background: currentUser?.avatarColor }}>{initials}</div>
            </button>
            <div className={`user-dropdown-menu ${userMenuOpen ? 'active' : ''}`}>
              <div className="user-dropdown-header">
                <div className="user-avatar-lg" style={{ background: currentUser?.avatarColor }}>{initials}</div>
                <div className="user-dropdown-info">
                  <span className="user-display-name">{currentUser?.fullName}</span>
                  <span className="user-display-email">{currentUser?.email}</span>
                </div>
              </div>
              <div className="user-dropdown-divider"></div>
              <button className="user-dropdown-item" onClick={handleLogout}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Sign Out
              </button>
            </div>
          </div>

          <button className={`hamburger-btn ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="hamburger-line"></span><span className="hamburger-line"></span><span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* Mobile sidebar */}
      <div className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} />
      <div className={`mobile-sidebar ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-sidebar-header">
          <div className="nav-brand"><span>DSA Tracker</span></div>
          <button className="close-sidebar-btn" onClick={() => setMobileMenuOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="mobile-sidebar-links">
          {NAV_TABS.map(t => (
            <button key={t.id} className={`mobile-nav-link ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => { setActiveTab(t.id); setMobileMenuOpen(false); }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        <div className="mobile-sidebar-footer">
          <div className="mobile-user-info">
            <div className="user-avatar-sm" style={{ background: currentUser?.avatarColor }}>{initials}</div>
            <span className="user-display-name">{currentUser?.fullName}</span>
          </div>
          <button className="btn btn-outline" onClick={() => { if (window.confirm('Reset all progress?')) progress.resetProgress(); setMobileMenuOpen(false); }}>Reset Progress</button>
          <button className="btn btn-outline btn-outline-danger" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign Out
          </button>
        </div>
      </div>

      <TabContent />

      {/* Bottom nav (mobile) */}
      <nav className="bottom-nav">
        {NAV_TABS.map(t => (
          <button key={t.id} className={`bottom-nav-item ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
            {t.icon}<span>{t.id === 'dashboard' ? 'Home' : t.id === 'ai' ? 'AI' : t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
