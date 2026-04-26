import { useMemo } from 'react';
import { DSA_PROBLEMS, DSA_TOPICS } from '../data/problemsData';

export default function AnalyticsTab({ progress }) {
  const { solvedProblems, activityLog, calculateStreak } = progress;

  const solved = Object.keys(solvedProblems).filter(k => solvedProblems[k]).length;
  const streak = calculateStreak();
  const activeDays = [...new Set(activityLog.filter(a => a.action === 'solved').map(a => new Date(a.timestamp).toDateString()))].length;
  const avgPerDay = activeDays > 0 ? (solved / activeDays).toFixed(1) : '0';

  // Heatmap
  const heatmap = useMemo(() => {
    const solveCounts = {};
    activityLog.filter(a => a.action === 'solved').forEach(a => {
      const d = new Date(a.timestamp).toDateString();
      solveCounts[d] = (solveCounts[d] || 0) + 1;
    });
    const today = new Date();
    const weeksToShow = 26;
    const totalDays = weeksToShow * 7;
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - totalDays + 1);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const cells = [];
    let active = 0;
    for (let i = 0; i < totalDays + startDate.getDay(); i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const count = solveCounts[d.toDateString()] || 0;
      if (count > 0) active++;
      let level = 0;
      if (count >= 5) level = 4; else if (count >= 3) level = 3; else if (count >= 2) level = 2; else if (count >= 1) level = 1;
      cells.push({ level, tooltip: `${d.toLocaleDateString()}: ${count} solved` });
    }

    const months = [];
    let lastMonth = -1;
    for (let w = 0; w < weeksToShow; w++) {
      const d = new Date(startDate); d.setDate(d.getDate() + w * 7);
      if (d.getMonth() !== lastMonth) { months.push(['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]); lastMonth = d.getMonth(); }
    }
    return { cells, months, active };
  }, [activityLog]);

  // Weekly trend
  const weeklyData = useMemo(() => {
    const weeks = 12;
    const data = [];
    const today = new Date();
    for (let w = weeks - 1; w >= 0; w--) {
      const weekStart = new Date(today);
      weekStart.setDate(weekStart.getDate() - w * 7 - today.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      const count = activityLog.filter(a => {
        if (a.action !== 'solved') return false;
        const d = new Date(a.timestamp);
        return d >= weekStart && d <= weekEnd;
      }).length;
      data.push({ count, label: `${weekStart.getMonth() + 1}/${weekStart.getDate()}` });
    }
    return data;
  }, [activityLog]);

  const maxWeekly = Math.max(...weeklyData.map(d => d.count), 1);

  // Difficulty donut
  const easy = DSA_PROBLEMS.filter(p => p.difficulty === 'easy' && solvedProblems[p.id]).length;
  const medium = DSA_PROBLEMS.filter(p => p.difficulty === 'medium' && solvedProblems[p.id]).length;
  const hard = DSA_PROBLEMS.filter(p => p.difficulty === 'hard' && solvedProblems[p.id]).length;
  const total = easy + medium + hard || 1;
  const r = 60, cx = 70, cy = 70, circ = 2 * Math.PI * r;
  const easyLen = (easy / total) * circ, medLen = (medium / total) * circ, hardLen = (hard / total) * circ;
  const medOffset = easyLen, hardOffset = easyLen + medLen;

  return (
    <div id="tab-analytics" className="tab-content active">
      <div className="dashboard-container">
        <header className="dashboard-header"><div><h1>Analytics</h1><p className="subtitle">Deep insights into your problem-solving journey.</p></div></header>

        <div className="analytics-summary">
          <div className="analytics-card"><div className="an-value">{solved}</div><div className="an-label">Total Solved</div></div>
          <div className="analytics-card"><div className="an-value">{streak}</div><div className="an-label">Current Streak</div></div>
          <div className="analytics-card"><div className="an-value">{activeDays}</div><div className="an-label">Active Days</div></div>
          <div className="analytics-card"><div className="an-value">{avgPerDay}</div><div className="an-label">Avg / Active Day</div></div>
        </div>

        {/* Heatmap */}
        <section className="section">
          <div className="section-header"><h2>Activity Heatmap</h2><span className="section-badge">{heatmap.active} active days</span></div>
          <div className="heatmap-container">
            <div className="heatmap-months">{heatmap.months.map((m, i) => <span key={i}>{m}</span>)}</div>
            <div className="heatmap-grid-wrapper">
              <div className="heatmap-days-labels"><span>Mon</span><span>Wed</span><span>Fri</span></div>
              <div className="heatmap-grid">
                {heatmap.cells.map((c, i) => <div key={i} className="heatmap-cell" data-level={c.level} data-tooltip={c.tooltip} />)}
              </div>
            </div>
            <div className="heatmap-legend">
              <span>Less</span>
              <div className="heatmap-legend-squares">{[0,1,2,3,4].map(l => <div key={l} className="heatmap-cell" data-level={l} />)}</div>
              <span>More</span>
            </div>
          </div>
        </section>

        {/* Weekly Trend */}
        <section className="section">
          <div className="section-header"><h2>Weekly Trend</h2></div>
          <div className="weekly-trend-chart">
            <div className="trend-bars">
              {weeklyData.map((d, i) => (
                <div key={i} className="trend-bar-col">
                  <div className="trend-bar-value">{d.count}</div>
                  <div className="trend-bar" style={{ height: (d.count / maxWeekly) * 130 + 'px' }} />
                  <div className="trend-bar-label">{d.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="analytics-two-col">
          {/* Difficulty Distribution */}
          <section className="section">
            <div className="section-header"><h2>Difficulty Distribution</h2></div>
            <div className="difficulty-chart">
              <div className="donut-chart">
                <svg viewBox="0 0 140 140">
                  <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--green-400)" strokeWidth="16" strokeDasharray={`${easyLen} ${circ - easyLen}`} strokeDashoffset="0" />
                  <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--amber-400)" strokeWidth="16" strokeDasharray={`${medLen} ${circ - medLen}`} strokeDashoffset={-medOffset} />
                  <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--red-400)" strokeWidth="16" strokeDasharray={`${hardLen} ${circ - hardLen}`} strokeDashoffset={-hardOffset} />
                </svg>
                <div className="donut-center"><div className="donut-total">{total > 1 ? easy + medium + hard : 0}</div><div className="donut-label">solved</div></div>
              </div>
              <div className="donut-legend">
                <div className="donut-legend-item"><div className="donut-legend-dot" style={{ background: 'var(--green-400)' }} />Easy: {easy}</div>
                <div className="donut-legend-item"><div className="donut-legend-dot" style={{ background: 'var(--amber-400)' }} />Medium: {medium}</div>
                <div className="donut-legend-item"><div className="donut-legend-dot" style={{ background: 'var(--red-400)' }} />Hard: {hard}</div>
              </div>
            </div>
          </section>

          {/* Topic Mastery */}
          <section className="section">
            <div className="section-header"><h2>Topic Mastery</h2></div>
            <div className="topic-mastery-chart">
              {DSA_TOPICS.map(t => {
                const probs = DSA_PROBLEMS.filter(p => p.topic === t.id);
                const s = probs.filter(p => solvedProblems[p.id]).length;
                const pct = probs.length > 0 ? Math.round((s / probs.length) * 100) : 0;
                return (
                  <div key={t.id} className="mastery-item">
                    <span className="mastery-topic-icon">{t.icon}</span>
                    <span className="mastery-topic-name">{t.name}</span>
                    <div className="mastery-bar"><div className="mastery-fill" style={{ width: pct + '%', background: `linear-gradient(90deg,${t.color},${t.color}aa)` }} /></div>
                    <span className="mastery-pct">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
