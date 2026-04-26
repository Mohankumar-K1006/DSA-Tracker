import { useMemo } from 'react';
import { DSA_PROBLEMS, DSA_TOPICS, TOPIC_PREREQUISITES } from '../data/problemsData';

const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

export default function AIRecommendTab({ progress }) {
  const { solvedProblems, activityLog, toggleProblem } = progress;

  const analysis = useMemo(() => {
    const topicAnalysis = DSA_TOPICS.map(t => {
      const probs = DSA_PROBLEMS.filter(p => p.topic === t.id);
      const s = probs.filter(p => solvedProblems[p.id]).length;
      const lastSolveDate = activityLog
        .filter(a => a.action === 'solved' && DSA_PROBLEMS.find(p => p.id === a.problemId)?.topic === t.id)
        .map(a => new Date(a.timestamp)).sort((a, b) => b - a)[0];
      const daysSinceLastSolve = lastSolveDate ? Math.floor((new Date() - lastSolveDate) / 86400000) : 999;
      return { ...t, total: probs.length, solved: s, pct: probs.length > 0 ? s / probs.length : 0, unsolved: probs.filter(p => !solvedProblems[p.id]), daysSinceLastSolve };
    });

    const weakTopics = topicAnalysis.filter(t => t.solved < t.total).sort((a, b) => a.pct - b.pct);
    const rustyTopics = topicAnalysis.filter(t => t.daysSinceLastSolve > 7 && t.solved > 0).sort((a, b) => b.daysSinceLastSolve - a.daysSinceLastSolve);
    const strongTopics = topicAnalysis.filter(t => t.pct >= 0.7).length;

    const recommendations = [];
    for (const topic of weakTopics.slice(0, 3)) {
      const targetDiff = topic.pct < 0.3 ? 'easy' : topic.pct < 0.6 ? 'medium' : 'hard';
      let pick = topic.unsolved.find(p => p.difficulty === targetDiff) || topic.unsolved[0];
      if (pick && !recommendations.find(r => r.id === pick.id)) {
        recommendations.push({ ...pick, reason: `Your weakest area — ${topic.name} is at ${Math.round(topic.pct * 100)}%.` });
      }
    }
    for (const topic of rustyTopics.slice(0, 2)) {
      const pick = topic.unsolved[0];
      if (pick && !recommendations.find(r => r.id === pick.id)) {
        recommendations.push({ ...pick, reason: `You haven't practiced ${topic.name} in ${topic.daysSinceLastSolve} days. Time to refresh!` });
      }
    }
    if (recommendations.length < 5) {
      for (const topic of topicAnalysis) {
        if (topic.pct === 0 && TOPIC_PREREQUISITES[topic.id]) {
          const prereqs = TOPIC_PREREQUISITES[topic.id];
          const prereqsDone = prereqs.every(pid => topicAnalysis.find(t => t.id === pid)?.pct >= 0.3);
          if (prereqsDone && topic.unsolved.length > 0) {
            const pick = topic.unsolved.find(p => p.difficulty === 'easy') || topic.unsolved[0];
            if (pick && !recommendations.find(r => r.id === pick.id)) {
              recommendations.push({ ...pick, reason: `Ready to start ${topic.name}!` });
              if (recommendations.length >= 6) break;
            }
          }
        }
      }
    }
    if (recommendations.length < 4) {
      const allUnsolved = DSA_PROBLEMS.filter(p => !solvedProblems[p.id] && !recommendations.find(r => r.id === p.id));
      const shuffled = allUnsolved.sort(() => Math.random() - 0.5).slice(0, 4 - recommendations.length);
      shuffled.forEach(p => recommendations.push({ ...p, reason: 'Diversify your practice — try something new!' }));
    }

    return { topicAnalysis, weakTopics, rustyTopics, strongTopics, recommendations: recommendations.slice(0, 6) };
  }, [solvedProblems, activityLog]);

  return (
    <div id="tab-ai" className="tab-content active">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div><h1>AI Recommendations</h1><p className="subtitle">Smart, personalized problem suggestions based on your progress and weak areas.</p></div>
        </header>

        <div className="ai-summary-cards">
          <div className="ai-summary-card"><div className="ai-card-label">Weakest Topic</div><div className="ai-card-value">{analysis.weakTopics[0]?.name || 'None'}</div><div className="ai-card-desc">{analysis.weakTopics[0] ? Math.round(analysis.weakTopics[0].pct * 100) + '% solved' : 'All complete!'}</div></div>
          <div className="ai-summary-card"><div className="ai-card-label">Topics Mastered (≥70%)</div><div className="ai-card-value">{analysis.strongTopics}/{DSA_TOPICS.length}</div><div className="ai-card-desc">across all topics</div></div>
          <div className="ai-summary-card"><div className="ai-card-label">Rusty Topics</div><div className="ai-card-value">{analysis.rustyTopics.length}</div><div className="ai-card-desc">{analysis.rustyTopics.length > 0 ? 'Not practiced in 7+ days' : 'All topics fresh!'}</div></div>
        </div>

        <section className="section">
          <div className="section-header"><h2>Recommended For You</h2><span className="section-badge ai-badge">AI Powered</span></div>
          <div className="ai-recommendations">
            {analysis.recommendations.map(r => {
              const topic = DSA_TOPICS.find(t => t.id === r.topic);
              return (
                <div key={r.id} className="ai-rec-card">
                  <div className="ai-rec-header"><span className="ai-rec-name">{r.name}</span><span className={`difficulty-badge difficulty-${r.difficulty}`}>{capitalize(r.difficulty)}</span></div>
                  <div className="ai-rec-reason">{r.reason}</div>
                  <div className="ai-rec-footer">
                    <span className="ai-rec-topic" style={{ background: topic?.bgColor, color: topic?.color }}>{topic?.icon} {topic?.name}</span>
                    <div className="ai-rec-actions">
                      <button className="ai-rec-btn ai-rec-solve" onClick={() => toggleProblem(r.id)}>✓ Solved</button>
                      <a href={r.leetcode} target="_blank" rel="noopener noreferrer" className="ai-rec-btn ai-rec-link">LeetCode →</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="section">
          <div className="section-header"><h2>Focus Areas</h2></div>
          <div className="ai-focus-areas">
            {analysis.weakTopics.slice(0, 4).map(t => (
              <div key={t.id} className="ai-focus-card">
                <h4>{t.icon} {t.name}</h4>
                <p>{t.solved}/{t.total} solved — {t.unsolved.length} remaining</p>
                <div className="ai-focus-bar"><div className="ai-focus-fill" style={{ width: Math.round(t.pct * 100) + '%', background: `linear-gradient(90deg,${t.color},${t.color}aa)` }} /></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
