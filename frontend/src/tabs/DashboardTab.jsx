import { useMemo, useState } from 'react';
import { DSA_PROBLEMS, DSA_TOPICS } from '../data/problemsData';
import { ACHIEVEMENTS, MOTIVATIONAL_QUOTES } from '../data/problemsData';

function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export default function DashboardTab({ progress, greeting }) {
  const { solvedProblems, activityLog, dailyGoal, toggleProblem, resetProgress, calculateStreak } = progress;
  const [nudgeDismissed, setNudgeDismissed] = useState(false);

  const stats = useMemo(() => {
    const solved = Object.keys(solvedProblems).filter(k => solvedProblems[k]).length;
    const easySolved = DSA_PROBLEMS.filter(p => p.difficulty === 'easy' && solvedProblems[p.id]).length;
    const mediumSolved = DSA_PROBLEMS.filter(p => p.difficulty === 'medium' && solvedProblems[p.id]).length;
    const hardSolved = DSA_PROBLEMS.filter(p => p.difficulty === 'hard' && solvedProblems[p.id]).length;
    const easyTotal = DSA_PROBLEMS.filter(p => p.difficulty === 'easy').length;
    const mediumTotal = DSA_PROBLEMS.filter(p => p.difficulty === 'medium').length;
    const hardTotal = DSA_PROBLEMS.filter(p => p.difficulty === 'hard').length;
    const pct = DSA_PROBLEMS.length > 0 ? Math.round((solved / DSA_PROBLEMS.length) * 100) : 0;
    return { solved, easySolved, mediumSolved, hardSolved, easyTotal, mediumTotal, hardTotal, pct };
  }, [solvedProblems]);

  const streak = calculateStreak();

  const todaySolved = useMemo(() => {
    const today = new Date().toDateString();
    return activityLog.filter(a => a.action === 'solved' && new Date(a.timestamp).toDateString() === today).length;
  }, [activityLog]);

  const nudge = useMemo(() => {
    const quote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    let msg = '', icon = '💪';
    if (streak >= 7) { msg = `Amazing ${streak}-day streak! You're unstoppable! 🔥`; icon = '🔥'; }
    else if (streak >= 3) { msg = `${streak}-day streak going! Keep the momentum!`; icon = '⚡'; }
    else if (todaySolved === 0 && streak > 0) { msg = `Don't break your ${streak}-day streak! Solve one problem today.`; icon = '⏰'; }
    else if (todaySolved === 0) { msg = 'Start your day strong — solve your first problem!'; icon = '🌅'; }
    else if (todaySolved >= dailyGoal) { msg = `Daily goal smashed! You solved ${todaySolved} problems today! 🎉`; icon = '🏆'; }
    else { msg = `${todaySolved}/${dailyGoal} today. ${dailyGoal - todaySolved} more to hit your daily goal!`; icon = '🎯'; }
    if (stats.solved >= 200) { msg = `DSA Legend! ${stats.solved} problems solved. You're interview-ready! 👑`; icon = '👑'; }
    else if (stats.solved >= 100) { msg = `Century Club! ${stats.solved} solved. Keep pushing! 💯`; icon = '💯'; }
    return { msg, icon, quote };
  }, [streak, todaySolved, dailyGoal, stats.solved]);

  const topicCompletion = useMemo(() => DSA_TOPICS.some(t => {
    const probs = DSA_PROBLEMS.filter(p => p.topic === t.id);
    return probs.length > 0 && probs.every(p => solvedProblems[p.id]);
  }), [solvedProblems]);

  const hardSolvedCount = useMemo(() => DSA_PROBLEMS.filter(p => p.difficulty === 'hard' && solvedProblems[p.id]).length, [solvedProblems]);

  const achievements = useMemo(() => {
    let unlocked = 0;
    const items = ACHIEVEMENTS.map(a => {
      const isUnlocked = a.condition(stats.solved, streak, topicCompletion, hardSolvedCount);
      if (isUnlocked) unlocked++;
      return { ...a, isUnlocked };
    });
    return { items, unlocked };
  }, [stats.solved, streak, topicCompletion, hardSolvedCount]);

  const recentActivity = useMemo(() => activityLog.slice(-20).reverse(), [activityLog]);

  let topicsStarted = 0;
  const topicCards = DSA_TOPICS.map(topic => {
    const problems = DSA_PROBLEMS.filter(p => p.topic === topic.id);
    const solved = problems.filter(p => solvedProblems[p.id]).length;
    const total = problems.length;
    const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
    if (solved > 0) topicsStarted++;
    const easy = problems.filter(p => p.difficulty === 'easy').length;
    const medium = problems.filter(p => p.difficulty === 'medium').length;
    const hard = problems.filter(p => p.difficulty === 'hard').length;
    return { ...topic, solved, total, pct, easy, medium, hard };
  });

  return (
    <div id="tab-dashboard" className="tab-content active">
      {/* Nudge Banner */}
      {!nudgeDismissed && (
        <div className="nudge-banner" style={{ display: 'flex' }}>
          <div className="nudge-content">
            <span className="nudge-icon">{nudge.icon}</span>
            <div className="nudge-text">
              <p className="nudge-message">{nudge.msg}</p>
              <p className="nudge-quote">"{nudge.quote.text}" — {nudge.quote.author}</p>
            </div>
          </div>
          <button className="nudge-close" onClick={() => setNudgeDismissed(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      )}

      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>{greeting}</h1>
            <p className="subtitle">Track your DSA progress and ace your next interview.</p>
          </div>
          <div className="header-actions">
            <div className="daily-goal-widget">
              <div className="daily-goal-label">Daily Goal</div>
              <div className="daily-goal-progress">{todaySolved}/{dailyGoal}</div>
              <div className="daily-goal-bar"><div className="daily-goal-fill" style={{ width: Math.min((todaySolved / dailyGoal) * 100, 100) + '%' }} /></div>
            </div>
            <button className="btn btn-outline" onClick={() => { if (window.confirm('Reset all progress?')) resetProgress(); }}>Reset</button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon stat-icon-blue"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
            <div className="stat-info"><span className="stat-value">{stats.solved}</span><span className="stat-label">Total Solved</span></div>
            <div className="stat-progress"><div className="progress-ring"><svg viewBox="0 0 36 36"><path className="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/><path className="ring-fill ring-blue" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeDasharray={`${stats.pct}, 100`}/></svg><span className="ring-text">{stats.pct}%</span></div></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-green"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
            <div className="stat-info"><span className="stat-value">{stats.easySolved}</span><span className="stat-label">Easy</span></div>
            <div className="stat-bar"><div className="bar-track"><div className="bar-fill bar-green" style={{ width: stats.easyTotal > 0 ? (stats.easySolved / stats.easyTotal) * 100 + '%' : '0%' }} /></div></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-amber"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
            <div className="stat-info"><span className="stat-value">{stats.mediumSolved}</span><span className="stat-label">Medium</span></div>
            <div className="stat-bar"><div className="bar-track"><div className="bar-fill bar-amber" style={{ width: stats.mediumTotal > 0 ? (stats.mediumSolved / stats.mediumTotal) * 100 + '%' : '0%' }} /></div></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-red"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
            <div className="stat-info"><span className="stat-value">{stats.hardSolved}</span><span className="stat-label">Hard</span></div>
            <div className="stat-bar"><div className="bar-track"><div className="bar-fill bar-red" style={{ width: stats.hardTotal > 0 ? (stats.hardSolved / stats.hardTotal) * 100 + '%' : '0%' }} /></div></div>
          </div>
        </div>

        {/* Achievements */}
        <section className="section">
          <div className="section-header"><h2>Achievements</h2><span className="section-badge">{achievements.unlocked} unlocked</span></div>
          <div className="achievements-row">
            {achievements.items.map(a => (
              <div key={a.id} className={`achievement-card ${a.isUnlocked ? 'unlocked' : 'locked'}`} data-tooltip={a.description}>
                <div className="ach-icon">{a.icon}</div>
                <div className="ach-name">{a.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Topic Progress */}
        <section className="section">
          <div className="section-header"><h2>Topic Progress</h2><span className="section-badge">{topicsStarted} / {DSA_TOPICS.length} topics started</span></div>
          <div className="topic-grid">
            {topicCards.map(t => (
              <div key={t.id} className="topic-card">
                <div className="topic-card-header">
                  <div className="topic-card-icon" style={{ background: t.bgColor }}>{t.icon}</div>
                  <span className="topic-card-count">{t.solved}/{t.total}</span>
                </div>
                <h4>{t.name}</h4>
                <div className="topic-progress">
                  <div className="bar-track"><div className="bar-fill" style={{ width: t.pct + '%', background: `linear-gradient(90deg, ${t.color}, ${t.color}aa)` }} /></div>
                  <span className="topic-progress-text">{t.pct}%</span>
                </div>
                <div className="topic-difficulty-dots">
                  <span className="diff-dot diff-easy">{t.easy}E</span>
                  <span className="diff-dot diff-medium">{t.medium}M</span>
                  <span className="diff-dot diff-hard">{t.hard}H</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="section">
          <div className="section-header"><h2>Recent Activity</h2></div>
          <div className="activity-list">
            {recentActivity.length === 0 ? (
              <div className="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <p>No activity yet. Start solving problems to see your progress!</p>
              </div>
            ) : recentActivity.map((a, i) => {
              const problem = DSA_PROBLEMS.find(p => p.id === a.problemId);
              if (!problem) return null;
              const isSolved = a.action === 'solved';
              const topic = DSA_TOPICS.find(t => t.id === problem.topic);
              return (
                <div key={i} className="activity-item">
                  <div className={`activity-icon ${isSolved ? 'solved' : 'unsolved'}`}>{isSolved ? '✓' : '↩'}</div>
                  <div className="activity-info">
                    <div className="activity-name">{problem.name}</div>
                    <div className="activity-meta">
                      <span className={`difficulty-badge difficulty-${problem.difficulty}`}>{problem.difficulty}</span>
                      <span>{topic?.name || ''}</span>
                    </div>
                  </div>
                  <span className="activity-time">{timeAgo(new Date(a.timestamp))}</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
