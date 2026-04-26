import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div id="page-landing" className="page active">
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <section className="hero">
        <div className="hero-badge" id="hero-badge">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          <span>Master DSA, Ace Interviews</span>
        </div>

        <h1 className="hero-title" id="hero-title">
          Track Your Path to<br/>
          <span className="gradient-text">Coding Excellence</span>
        </h1>

        <p className="hero-subtitle" id="hero-subtitle">
          250+ curated problems with AI-powered recommendations,<br/>
          analytics dashboard, and consistency tracking.
        </p>

        <div className="hero-cta" id="hero-cta">
          <button className="btn btn-primary" id="btn-start-tracking" onClick={() => navigate('/auth')}>
            Start Tracking Free
          </button>
          <button className="btn btn-secondary" id="btn-view-demo" onClick={() => navigate('/auth')}>
            View Demo
          </button>
        </div>

        <div className="features-grid" id="features-grid">
          <div className="feature-card" id="feature-recommendations">
            <div className="feature-icon icon-purple">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <h3>AI Recommendations</h3>
            <p>Smart suggestions based on your weak areas and learning path</p>
          </div>

          <div className="feature-card" id="feature-analytics">
            <div className="feature-icon icon-teal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <h3>Progress Analytics</h3>
            <p>Heatmaps, trend charts, and deep insights into your growth</p>
          </div>

          <div className="feature-card" id="feature-problems">
            <div className="feature-icon icon-indigo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
              </svg>
            </div>
            <h3>250+ Curated Problems</h3>
            <p>Hand-picked DSA problems organized by 17 topics and difficulty</p>
          </div>

          <div className="feature-card" id="feature-nudges">
            <div className="feature-icon icon-amber">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <h3>Stay Consistent</h3>
            <p>Motivational nudges, streaks, achievements, and daily goals</p>
          </div>
        </div>
      </section>
    </div>
  );
}
