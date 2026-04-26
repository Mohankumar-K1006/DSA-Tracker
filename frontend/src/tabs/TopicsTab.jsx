import { DSA_PROBLEMS, DSA_TOPICS } from '../data/problemsData';

const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

export default function TopicsTab({ progress }) {
  const { solvedProblems, toggleProblem } = progress;

  return (
    <div id="tab-topics" className="tab-content active">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div><h1>Topics Overview</h1><p className="subtitle">Deep dive into each DSA topic and track your mastery.</p></div>
        </header>

        <div className="topics-detail-grid">
          {DSA_TOPICS.map(topic => {
            const problems = DSA_PROBLEMS.filter(p => p.topic === topic.id);
            const solved = problems.filter(p => solvedProblems[p.id]).length;
            const total = problems.length;
            const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
            return (
              <div key={topic.id} className="topic-detail-card" data-topic-id={topic.id}>
                <div className="topic-detail-header">
                  <div className="topic-detail-icon" style={{ background: topic.bgColor }}>{topic.icon}</div>
                  <div className="topic-detail-info"><h3>{topic.name}</h3><p>{solved} of {total} problems solved</p></div>
                </div>
                <div className="topic-detail-progress">
                  <div className="bar-track"><div className="bar-fill" style={{ width: pct + '%', background: `linear-gradient(90deg, ${topic.color}, ${topic.color}aa)` }} /></div>
                  <div className="topic-detail-stats"><span className="done">{pct}% complete</span><span className="total">{solved}/{total}</span></div>
                </div>
                <div className="topic-detail-problems">
                  {problems.map(p => {
                    const isSolved = !!solvedProblems[p.id];
                    return (
                      <div key={p.id} className="topic-problem-item" onClick={() => toggleProblem(p.id)}>
                        <div className={`mini-check ${isSolved ? 'checked' : ''}`}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <span className={`topic-problem-name ${isSolved ? 'solved-name' : ''}`}>{p.name}</span>
                        <span className={`difficulty-badge difficulty-${p.difficulty}`} style={{ fontSize: '0.7rem' }}>{capitalize(p.difficulty)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
