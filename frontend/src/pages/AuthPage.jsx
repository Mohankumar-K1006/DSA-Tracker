import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPasswords, setShowPasswords] = useState({});
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const clearErrors = () => setErrors({});

  const togglePass = (field) => setShowPasswords(p => ({ ...p, [field]: !p[field] }));

  const handleLogin = async (e) => {
    e.preventDefault();
    clearErrors();
    if (!loginEmail) { setErrors({ loginEmail: 'Please enter your email' }); return; }
    if (!loginPassword) { setErrors({ loginPassword: 'Please enter your password' }); return; }
    setSubmitting(true);
    try {
      await login(loginEmail.trim().toLowerCase(), loginPassword);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ loginEmail: err.message });
    } finally { setSubmitting(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    clearErrors();
    if (!regName || regName.trim().length < 2) { setErrors({ regName: 'Please enter your full name' }); return; }
    if (!regEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) { setErrors({ regEmail: 'Please enter a valid email' }); return; }
    if (regPassword.length < 6) { setErrors({ regPassword: 'Password must be at least 6 characters' }); return; }
    if (regPassword !== regConfirm) { setErrors({ regConfirm: 'Passwords do not match' }); return; }
    setSubmitting(true);
    try {
      await register(regName.trim(), regEmail.trim().toLowerCase(), regPassword);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ regEmail: err.message });
    } finally { setSubmitting(false); }
  };

  const EyeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );

  return (
    <div id="page-auth" className="page active">
      <div className="auth-bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="auth-container">
        <div className="auth-card" id="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="url(#authGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <defs><linearGradient id="authGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{ stopColor: '#6366f1' }}/><stop offset="100%" style={{ stopColor: '#06b6d4' }}/></linearGradient></defs>
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              <span>DSA Tracker</span>
            </div>
            <p className="auth-tagline">Master DSA. Ace Interviews. Track Progress.</p>
          </div>

          <div className="auth-tabs">
            <button className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => { setActiveTab('login'); clearErrors(); }}>Login</button>
            <button className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`} onClick={() => { setActiveTab('register'); clearErrors(); }}>Register</button>
            <div className="auth-tab-indicator" style={activeTab === 'register' ? { left: 'calc(50%)' } : {}} />
          </div>

          {activeTab === 'login' && (
            <div className="auth-form-wrapper active">
              <form onSubmit={handleLogin} id="login-form">
                <div className="auth-field">
                  <label htmlFor="login-email">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    Email Address
                  </label>
                  <input type="email" id="login-email" placeholder="you@example.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
                  {errors.loginEmail && <span className="auth-error" style={{ display: 'block' }}>{errors.loginEmail}</span>}
                </div>
                <div className="auth-field">
                  <label htmlFor="login-password">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Password
                  </label>
                  <div className="password-input-wrapper">
                    <input type={showPasswords.login ? 'text' : 'password'} id="login-password" placeholder="Enter your password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
                    <button type="button" className="password-toggle" onClick={() => togglePass('login')}><EyeIcon /></button>
                  </div>
                  {errors.loginPassword && <span className="auth-error" style={{ display: 'block' }}>{errors.loginPassword}</span>}
                </div>
                <button type="submit" className="btn btn-primary auth-submit-btn" disabled={submitting}>
                  {submitting ? <><span className="spinner"></span> Signing In...</> : <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                    Sign In
                  </>}
                </button>
              </form>
              <div className="auth-footer">
                <p>Don't have an account? <button className="auth-link" onClick={() => { setActiveTab('register'); clearErrors(); }}>Create one</button></p>
              </div>
            </div>
          )}

          {activeTab === 'register' && (
            <div className="auth-form-wrapper active">
              <form onSubmit={handleRegister} id="register-form">
                <div className="auth-field">
                  <label htmlFor="reg-fullname">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    Full Name
                  </label>
                  <input type="text" id="reg-fullname" placeholder="John Doe" value={regName} onChange={e => setRegName(e.target.value)} required />
                  {errors.regName && <span className="auth-error" style={{ display: 'block' }}>{errors.regName}</span>}
                </div>
                <div className="auth-field">
                  <label htmlFor="reg-email">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    Email Address
                  </label>
                  <input type="email" id="reg-email" placeholder="you@example.com" value={regEmail} onChange={e => setRegEmail(e.target.value)} required />
                  {errors.regEmail && <span className="auth-error" style={{ display: 'block' }}>{errors.regEmail}</span>}
                </div>
                <div className="auth-field">
                  <label htmlFor="reg-password">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Password
                  </label>
                  <div className="password-input-wrapper">
                    <input type={showPasswords.regPass ? 'text' : 'password'} id="reg-password" placeholder="Min. 6 characters" value={regPassword} onChange={e => setRegPassword(e.target.value)} required minLength="6" />
                    <button type="button" className="password-toggle" onClick={() => togglePass('regPass')}><EyeIcon /></button>
                  </div>
                  {errors.regPassword && <span className="auth-error" style={{ display: 'block' }}>{errors.regPassword}</span>}
                </div>
                <div className="auth-field">
                  <label htmlFor="reg-confirm-password">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    Confirm Password
                  </label>
                  <div className="password-input-wrapper">
                    <input type={showPasswords.regConfirm ? 'text' : 'password'} id="reg-confirm-password" placeholder="Re-enter password" value={regConfirm} onChange={e => setRegConfirm(e.target.value)} required />
                    <button type="button" className="password-toggle" onClick={() => togglePass('regConfirm')}><EyeIcon /></button>
                  </div>
                  {errors.regConfirm && <span className="auth-error" style={{ display: 'block' }}>{errors.regConfirm}</span>}
                </div>
                <button type="submit" className="btn btn-primary auth-submit-btn" disabled={submitting}>
                  {submitting ? <><span className="spinner"></span> Creating Account...</> : <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                    Create Account
                  </>}
                </button>
              </form>
              <div className="auth-footer">
                <p>Already have an account? <button className="auth-link" onClick={() => { setActiveTab('login'); clearErrors(); }}>Sign in</button></p>
              </div>
            </div>
          )}
        </div>

        <div className="auth-features">
          <div className="auth-features-content">
            <h2>Your DSA Journey<br/>Starts Here</h2>
            <div className="auth-feature-list">
              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </div>
                <div><h4>AI-Powered Recommendations</h4><p>Get personalized problem suggestions based on your progress</p></div>
              </div>
              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </div>
                <div><h4>Deep Analytics</h4><p>Heatmaps, trends, and insights into your coding journey</p></div>
              </div>
              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <div><h4>250+ Curated Problems</h4><p>Hand-picked DSA problems organized by 17 topics</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
