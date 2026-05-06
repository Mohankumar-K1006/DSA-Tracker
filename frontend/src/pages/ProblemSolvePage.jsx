import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DSA_PROBLEMS, DSA_TOPICS } from '../data/problemsData';
import { getHintsForProblem } from '../data/hints';
import { XP_REWARDS } from '../data/levels';

export default function ProblemSolvePage({ progress }) {
    const { problemId } = useParams();
    const navigate = useNavigate();
    const id = parseInt(problemId);
    const problem = DSA_PROBLEMS.find(p => p.id === id);
    const topic = problem ? DSA_TOPICS.find(t => t.id === problem.topic) : null;

    const {
        solvedProblems, solveProblem, unsolveProblem, saveNotes,
        problemNotes, xp, level,
    } = progress;

    const isSolved = !!solvedProblems[id];

    // Timer state
    const [elapsed, setElapsed] = useState(0);
    const [timerRunning, setTimerRunning] = useState(!isSolved);
    const timerRef = useRef(null);

    // Notes state
    const [notes, setNotes] = useState(problemNotes[id] || '');
    const [notesSaved, setNotesSaved] = useState(true);
    const notesSaveTimeout = useRef(null);

    // Hints state
    const [hintsRevealed, setHintsRevealed] = useState(0);
    const hints = useMemo(() =>
        problem ? getHintsForProblem(problem.topic, problem.difficulty) : [],
        [problem]
    );

    // Solving animation
    const [solving, setSolving] = useState(false);
    const [justSolved, setJustSolved] = useState(false);

    // Timer
    useEffect(() => {
        if (timerRunning && !isSolved) {
            timerRef.current = setInterval(() => {
                setElapsed(prev => prev + 1);
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [timerRunning, isSolved]);

    // Auto-save notes
    useEffect(() => {
        if (notesSaveTimeout.current) clearTimeout(notesSaveTimeout.current);
        setNotesSaved(false);
        notesSaveTimeout.current = setTimeout(() => {
            if (notes !== (problemNotes[id] || '')) {
                saveNotes(id, notes);
            }
            setNotesSaved(true);
        }, 1500);
        return () => {
            if (notesSaveTimeout.current) clearTimeout(notesSaveTimeout.current);
        };
    }, [notes]);

    if (!problem) {
        return (
            <div className="solve-page">
                <div className="solve-container">
                    <div className="solve-not-found">
                        <h2>Problem Not Found</h2>
                        <p>The problem you're looking for doesn't exist.</p>
                        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const xpReward = XP_REWARDS[problem.difficulty] || 10;

    const handleSolve = async () => {
        if (isSolved) return;
        setSolving(true);
        try {
            await solveProblem(id, problem.difficulty, problem.topic, elapsed);
            setTimerRunning(false);
            setJustSolved(true);
            setTimeout(() => setJustSolved(false), 3000);
        } catch (err) {
            console.error('Solve failed:', err);
        } finally {
            setSolving(false);
        }
    };

    const handleUnsolve = async () => {
        if (!isSolved) return;
        try {
            await unsolveProblem(id, problem.difficulty);
            setTimerRunning(true);
            setJustSolved(false);
        } catch (err) {
            console.error('Unsolve failed:', err);
        }
    };

    // Adjacent problems for navigation
    const currentIdx = DSA_PROBLEMS.findIndex(p => p.id === id);
    const prevProblem = currentIdx > 0 ? DSA_PROBLEMS[currentIdx - 1] : null;
    const nextProblem = currentIdx < DSA_PROBLEMS.length - 1 ? DSA_PROBLEMS[currentIdx + 1] : null;

    return (
        <div className={`solve-page ${justSolved ? 'just-solved' : ''}`}>
            {/* Top navigation bar */}
            <div className="solve-topbar">
                <button className="solve-back-btn" onClick={() => navigate('/dashboard')}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6"/>
                    </svg>
                    Back
                </button>

                <div className="solve-nav-arrows">
                    {prevProblem && (
                        <button
                            className="solve-nav-btn"
                            onClick={() => navigate(`/solve/${prevProblem.id}`)}
                            title={prevProblem.name}
                        >
                            ← Prev
                        </button>
                    )}
                    <span className="solve-nav-counter">
                        #{problem.id} of {DSA_PROBLEMS.length}
                    </span>
                    {nextProblem && (
                        <button
                            className="solve-nav-btn"
                            onClick={() => navigate(`/solve/${nextProblem.id}`)}
                            title={nextProblem.name}
                        >
                            Next →
                        </button>
                    )}
                </div>
            </div>

            <div className="solve-container">
                {/* Problem Header */}
                <div className="solve-header">
                    <div className="solve-header-left">
                        <div className="solve-topic-badge" style={{ background: topic?.bgColor, color: topic?.color }}>
                            {topic?.icon} {topic?.name}
                        </div>
                        <h1 className="solve-title">{problem.name}</h1>
                        <div className="solve-meta">
                            <span className={`difficulty-badge difficulty-${problem.difficulty}`}>
                                {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                            </span>
                            <span className="solve-xp-badge">+{xpReward} XP</span>
                            {isSolved && <span className="solve-solved-badge">✓ Solved</span>}
                        </div>
                    </div>
                    <div className="solve-header-right">
                        <a
                            href={problem.leetcode}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary solve-leetcode-btn"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                            Open on LeetCode
                        </a>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="solve-grid">
                    {/* Left Column — Timer + Action */}
                    <div className="solve-action-panel">
                        {/* Timer */}
                        <div className="solve-timer-card">
                            <div className="solve-timer-label">Time Elapsed</div>
                            <div className={`solve-timer-display ${timerRunning ? 'running' : ''}`}>
                                {formatTime(elapsed)}
                            </div>
                            <div className="solve-timer-controls">
                                <button
                                    className="solve-timer-btn"
                                    onClick={() => setTimerRunning(!timerRunning)}
                                    disabled={isSolved}
                                >
                                    {timerRunning ? '⏸ Pause' : '▶ Resume'}
                                </button>
                                <button
                                    className="solve-timer-btn"
                                    onClick={() => { setElapsed(0); setTimerRunning(true); }}
                                    disabled={isSolved}
                                >
                                    🔄 Reset
                                </button>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="solve-action-card">
                            {!isSolved ? (
                                <button
                                    className={`btn btn-primary solve-mark-btn ${solving ? 'solving' : ''}`}
                                    onClick={handleSolve}
                                    disabled={solving}
                                >
                                    {solving ? (
                                        <><span className="spinner" /> Saving...</>
                                    ) : (
                                        <>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12"/>
                                            </svg>
                                            Mark as Solved — +{xpReward} XP
                                        </>
                                    )}
                                </button>
                            ) : (
                                <div className="solve-completed-state">
                                    <div className="solve-completed-icon">✅</div>
                                    <p className="solve-completed-text">Problem Solved!</p>
                                    <button className="btn btn-outline solve-undo-btn" onClick={handleUnsolve}>
                                        ↩ Mark as Unsolved
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Quick Nav */}
                        <div className="solve-quick-nav">
                            <button className="btn btn-outline" onClick={() => navigate('/dashboard')}>
                                ← Dashboard
                            </button>
                            {nextProblem && (
                                <button className="btn btn-secondary" onClick={() => navigate(`/solve/${nextProblem.id}`)}>
                                    Next Problem →
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right Column — Hints + Notes */}
                    <div className="solve-work-panel">
                        {/* Hints Section */}
                        <div className="solve-hints-card">
                            <div className="solve-hints-header">
                                <h3>💡 Hints</h3>
                                <span className="solve-hints-count">{hintsRevealed}/{hints.length}</span>
                            </div>
                            <div className="solve-hints-list">
                                {hints.map((hint, i) => (
                                    <div
                                        key={i}
                                        className={`solve-hint ${i < hintsRevealed ? 'revealed' : 'hidden'}`}
                                    >
                                        {i < hintsRevealed ? (
                                            <p>{hint}</p>
                                        ) : (
                                            <button
                                                className="solve-hint-reveal-btn"
                                                onClick={() => setHintsRevealed(i + 1)}
                                            >
                                                Reveal Hint {i + 1}
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Notes Section */}
                        <div className="solve-notes-card">
                            <div className="solve-notes-header">
                                <h3>📝 Your Notes & Approach</h3>
                                <span className={`solve-notes-status ${notesSaved ? 'saved' : 'saving'}`}>
                                    {notesSaved ? '✓ Saved' : 'Saving...'}
                                </span>
                            </div>
                            <textarea
                                className="solve-notes-textarea"
                                placeholder="Write your approach, pseudocode, key insights, or anything you want to remember about this problem..."
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                                rows={10}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
