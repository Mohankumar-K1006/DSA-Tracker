import { useState, useCallback, useRef } from 'react';
import { DSA_PROBLEMS } from '../data/problemsData';

export function useProgress(userEmail) {
  const prefix = userEmail ? `dsa-${userEmail}-` : 'dsa-';

  const [solvedProblems, setSolvedProblems] = useState(() =>
    JSON.parse(localStorage.getItem(prefix + 'solved') || '{}')
  );
  const [activityLog, setActivityLog] = useState(() =>
    JSON.parse(localStorage.getItem(prefix + 'activity') || '[]')
  );
  const [dailyGoal] = useState(() =>
    parseInt(localStorage.getItem(prefix + 'daily-goal') || '3')
  );
  const [showConfetti, setShowConfetti] = useState(false);

  const solvedRef = useRef(solvedProblems);
  const activityRef = useRef(activityLog);

  const saveSolved = useCallback((newSolved) => {
    solvedRef.current = newSolved;
    localStorage.setItem(prefix + 'solved', JSON.stringify(newSolved));
  }, [prefix]);

  const saveActivity = useCallback((newLog) => {
    activityRef.current = newLog;
    localStorage.setItem(prefix + 'activity', JSON.stringify(newLog));
  }, [prefix]);

  const toggleProblem = useCallback((id) => {
    setSolvedProblems(prev => {
      const wasSolved = !!prev[id];
      const next = { ...prev };
      if (wasSolved) { delete next[id]; } else { next[id] = true; }
      saveSolved(next);

      // Check milestone
      if (!wasSolved) {
        const count = Object.keys(next).filter(k => next[k]).length;
        if ([1,10,25,50,75,100,150,200,229].includes(count)) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      }

      // Log activity
      setActivityLog(prevLog => {
        const entry = { problemId: id, action: wasSolved ? 'unsolved' : 'solved', timestamp: new Date().toISOString() };
        const newLog = [...prevLog, entry].slice(-200);
        saveActivity(newLog);
        return newLog;
      });

      return next;
    });
  }, [saveSolved, saveActivity]);

  const resetProgress = useCallback(() => {
    setSolvedProblems({});
    setActivityLog([]);
    localStorage.removeItem(prefix + 'solved');
    localStorage.removeItem(prefix + 'activity');
  }, [prefix]);

  const calculateStreak = useCallback(() => {
    const log = activityRef.current.length ? activityRef.current : activityLog;
    if (log.length === 0) return 0;
    const solvedDates = [...new Set(
      log.filter(a => a.action === 'solved').map(a => new Date(a.timestamp).toDateString())
    )].sort((a, b) => new Date(b) - new Date(a));
    if (solvedDates.length === 0) return 0;
    let streak = 0;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    for (let i = 0; i < solvedDates.length; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      if (solvedDates.includes(checkDate.toDateString())) streak++;
      else break;
    }
    return streak;
  }, [activityLog]);

  const reloadData = useCallback((email) => {
    const p = email ? `dsa-${email}-` : 'dsa-';
    setSolvedProblems(JSON.parse(localStorage.getItem(p + 'solved') || '{}'));
    setActivityLog(JSON.parse(localStorage.getItem(p + 'activity') || '[]'));
  }, []);

  return {
    solvedProblems, activityLog, dailyGoal, showConfetti,
    toggleProblem, resetProgress, calculateStreak, reloadData,
  };
}
