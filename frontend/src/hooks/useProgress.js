import { useState, useCallback, useRef } from 'react';
import { DSA_PROBLEMS } from '../data/problemsData';
import {
    apiGetProgress,
    apiSolveProblem,
    apiUnsolveProblem,
    apiResetProgress,
    apiSaveNotes,
} from '../utils/api';

export function useProgress() {
    const [solvedProblems, setSolvedProblems] = useState({});
    const [activityLog, setActivityLog] = useState([]);
    const [dailyGoal, setDailyGoal] = useState(3);
    const [xp, setXP] = useState(0);
    const [level, setLevel] = useState(1);
    const [levelInfo, setLevelInfo] = useState(null);
    const [problemNotes, setProblemNotes] = useState({});
    const [problemTimers, setProblemTimers] = useState({});
    const [showConfetti, setShowConfetti] = useState(false);
    const [levelUpData, setLevelUpData] = useState(null); // { level, name }
    const [loaded, setLoaded] = useState(false);

    const solvedRef = useRef(solvedProblems);
    const activityRef = useRef(activityLog);

    // ─── Load progress from server ──────────────────────
    const loadProgress = useCallback(async () => {
        try {
            const data = await apiGetProgress();
            if (data.success && data.progress) {
                const p = data.progress;
                setSolvedProblems(p.solvedProblems || {});
                solvedRef.current = p.solvedProblems || {};
                setActivityLog(p.activityLog || []);
                activityRef.current = p.activityLog || [];
                setDailyGoal(p.dailyGoal || 3);
                setXP(p.xp || 0);
                setLevel(p.level || 1);
                setLevelInfo(p.levelInfo || null);
                setProblemNotes(p.problemNotes || {});
                setProblemTimers(p.problemTimers || {});
                setLoaded(true);
            }
        } catch (err) {
            console.error('Failed to load progress:', err);
            setLoaded(true);
        }
    }, []);

    // ─── Solve a problem ────────────────────────────────
    const solveProblem = useCallback(async (problemId, difficulty, topic, timeSpent) => {
        try {
            const data = await apiSolveProblem(problemId, difficulty, topic, timeSpent);
            if (data.success) {
                // Update local state
                setSolvedProblems(prev => {
                    const next = { ...prev, [problemId]: true };
                    solvedRef.current = next;
                    return next;
                });
                setXP(data.totalXP);
                setLevel(data.level);
                setLevelInfo(data.levelInfo);

                // Activity log
                setActivityLog(prev => {
                    const entry = {
                        problemId,
                        action: 'solved',
                        timestamp: new Date().toISOString(),
                        xpAwarded: data.xpEarned,
                    };
                    const newLog = [...prev, entry].slice(-200);
                    activityRef.current = newLog;
                    return newLog;
                });

                // Check milestones
                if (data.isMilestone) {
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 3000);
                }

                // Check level up
                if (data.leveledUp) {
                    setLevelUpData({
                        level: data.level,
                        name: data.levelInfo?.name || data.newLevelName,
                    });
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 4000);
                }

                return data;
            }
        } catch (err) {
            console.error('Failed to solve problem:', err);
            throw err;
        }
    }, []);

    // ─── Unsolve a problem ──────────────────────────────
    const unsolveProblem = useCallback(async (problemId, difficulty) => {
        try {
            const data = await apiUnsolveProblem(problemId, difficulty);
            if (data.success) {
                setSolvedProblems(prev => {
                    const next = { ...prev };
                    delete next[problemId];
                    solvedRef.current = next;
                    return next;
                });
                setXP(data.totalXP);
                setLevel(data.level);
                setLevelInfo(data.levelInfo);

                setActivityLog(prev => {
                    const entry = {
                        problemId,
                        action: 'unsolved',
                        timestamp: new Date().toISOString(),
                    };
                    const newLog = [...prev, entry].slice(-200);
                    activityRef.current = newLog;
                    return newLog;
                });
            }
        } catch (err) {
            console.error('Failed to unsolve problem:', err);
            throw err;
        }
    }, []);

    // ─── Toggle problem (calls solve or unsolve) ────────
    const toggleProblem = useCallback(async (id) => {
        const wasSolved = !!solvedRef.current[id];
        const problem = DSA_PROBLEMS.find(p => p.id === id);
        if (!problem) return;

        if (wasSolved) {
            await unsolveProblem(id, problem.difficulty);
        } else {
            await solveProblem(id, problem.difficulty, problem.topic);
        }
    }, [solveProblem, unsolveProblem]);

    // ─── Save notes ─────────────────────────────────────
    const saveNotes = useCallback(async (problemId, notes) => {
        try {
            await apiSaveNotes(problemId, notes);
            setProblemNotes(prev => ({ ...prev, [problemId]: notes }));
        } catch (err) {
            console.error('Failed to save notes:', err);
        }
    }, []);

    // ─── Reset progress ─────────────────────────────────
    const resetProgress = useCallback(async () => {
        try {
            await apiResetProgress();
            setSolvedProblems({});
            solvedRef.current = {};
            setActivityLog([]);
            activityRef.current = [];
            setXP(0);
            setLevel(1);
            setLevelInfo(null);
            setProblemNotes({});
            setProblemTimers({});
        } catch (err) {
            console.error('Failed to reset progress:', err);
        }
    }, []);

    // ─── Calculate streak (from local activity log) ─────
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

    // ─── Dismiss level up modal ─────────────────────────
    const dismissLevelUp = useCallback(() => {
        setLevelUpData(null);
    }, []);

    return {
        solvedProblems, activityLog, dailyGoal, showConfetti,
        xp, level, levelInfo, problemNotes, problemTimers,
        loaded, levelUpData,
        toggleProblem, solveProblem, unsolveProblem,
        resetProgress, calculateStreak, loadProgress,
        saveNotes, dismissLevelUp,
    };
}
