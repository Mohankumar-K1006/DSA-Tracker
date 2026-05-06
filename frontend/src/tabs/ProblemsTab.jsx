import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DSA_PROBLEMS, DSA_TOPICS } from '../data/problemsData';
import { XP_REWARDS } from '../data/levels';

const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

export default function ProblemsTab({ progress }) {
  const { solvedProblems, toggleProblem } = progress;
  const [diffFilter, setDiffFilter] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    let list = [...DSA_PROBLEMS];
    if (diffFilter === 'unsolved') list = list.filter(p => !solvedProblems[p.id]);
    else if (diffFilter === 'solved') list = list.filter(p => solvedProblems[p.id]);
    else if (diffFilter !== 'all') list = list.filter(p => p.difficulty === diffFilter);
    if (topicFilter !== 'all') list = list.filter(p => p.topic === topicFilter);
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(s) || DSA_TOPICS.find(t => t.id === p.topic)?.name.toLowerCase().includes(s));
    }
    return list;
  }, [solvedProblems, diffFilter, topicFilter, search]);

  const solved = Object.keys(solvedProblems).filter(k => solvedProblems[k]).length;

  return (
    <div id="tab-problems" className="tab-content active">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>Problem List</h1>
            <p className="subtitle">
              {DSA_PROBLEMS.length} curated DSA problems — {solved} solved
            </p>
          </div>
        </header>

        <div className="filters-bar">
          <div className="search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search problems..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="filter-chips">
            {['all','easy','medium','hard','unsolved','solved'].map(f => (
              <button key={f} className={`chip ${diffFilter === f ? 'active' : ''}`} onClick={() => setDiffFilter(f)}>
                {capitalize(f)}
              </button>
            ))}
          </div>
          <div className="filter-chips filter-chips-scrollable">
            <button className={`chip ${topicFilter === 'all' ? 'active' : ''}`} onClick={() => setTopicFilter('all')}>All Topics</button>
            {DSA_TOPICS.map(t => (
              <button key={t.id} className={`chip ${topicFilter === t.id ? 'active' : ''}`} onClick={() => setTopicFilter(t.id)}>{t.icon} {t.name}</button>
            ))}
          </div>
        </div>

        <div className="problems-table-container">
          <table className="problems-table">
            <thead><tr>
              <th className="th-status">Status</th>
              <th className="th-name">Problem</th>
              <th className="th-topic">Topic</th>
              <th className="th-difficulty">Difficulty</th>
              <th className="th-xp">XP</th>
              <th className="th-link">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(p => {
                const isSolved = !!solvedProblems[p.id];
                const topic = DSA_TOPICS.find(t => t.id === p.topic);
                const xpReward = XP_REWARDS[p.difficulty] || 10;

                return (
                  <tr key={p.id} className={isSolved ? 'solved' : ''}>
                    <td className="td-status">
                      <div className={`checkbox-custom ${isSolved ? 'checked' : ''}`} onClick={() => toggleProblem(p.id)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    </td>
                    <td>
                      <button className="problem-name-btn" onClick={() => navigate(`/solve/${p.id}`)}>
                        {p.name}
                      </button>
                    </td>
                    <td><span className="topic-badge" style={{ background: topic?.bgColor, color: topic?.color }}>{topic?.name || p.topic}</span></td>
                    <td><span className={`difficulty-badge difficulty-${p.difficulty}`}>{capitalize(p.difficulty)}</span></td>
                    <td><span className="xp-badge-small">+{xpReward}</span></td>
                    <td style={{ textAlign: 'center' }}>
                      <div className="problem-actions">
                        <button className="solve-action-link" onClick={() => navigate(`/solve/${p.id}`)} title="Solve">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="5 3 19 12 5 21 5 3"/>
                          </svg>
                        </button>
                        <a href={p.leetcode} target="_blank" rel="noopener noreferrer" className="link-btn" title="Open on LeetCode">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
