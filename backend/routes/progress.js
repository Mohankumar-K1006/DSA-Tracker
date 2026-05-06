/* =====================================================
   DSA Tracker — Progress Routes
   All routes require JWT authentication
   ===================================================== */

const express = require('express');
const protect = require('../middleware/auth');
const { Progress, LEVEL_THRESHOLDS, XP_REWARDS } = require('../models/Progress');

const router = express.Router();

// ─── All routes protected ───────────────────────────────
router.use(protect);

// ─── GET /api/progress — Get user's full progress ──────
router.get('/', async (req, res) => {
    try {
        let progress = await Progress.findOne({ userId: req.user._id });

        // Create fresh progress if first time
        if (!progress) {
            progress = await Progress.create({ userId: req.user._id });
        }

        const levelInfo = progress.getLevelInfo();
        const streak = progress.calculateStreak();

        res.json({
            success: true,
            progress: {
                solvedProblems: Object.fromEntries(progress.solvedProblems),
                xp: progress.xp,
                level: progress.level,
                levelInfo,
                streak,
                dailyGoal: progress.dailyGoal,
                activityLog: progress.activityLog.slice(-200),
                problemNotes: Object.fromEntries(progress.problemNotes),
                problemTimers: Object.fromEntries(progress.problemTimers),
            },
        });
    } catch (error) {
        console.error('Get progress error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── POST /api/progress/solve — Mark problem solved ────
router.post('/solve', async (req, res) => {
    try {
        const { problemId, difficulty, topic, timeSpent } = req.body;

        if (!problemId || !difficulty) {
            return res.status(400).json({
                success: false,
                message: 'problemId and difficulty are required',
            });
        }

        let progress = await Progress.findOne({ userId: req.user._id });
        if (!progress) {
            progress = await Progress.create({ userId: req.user._id });
        }

        // Check if already solved
        if (progress.solvedProblems.get(String(problemId))) {
            return res.status(400).json({
                success: false,
                message: 'Problem already solved',
            });
        }

        // Calculate XP reward
        let xpEarned = XP_REWARDS[difficulty] || 10;

        // Check if this is the first solve for the topic
        const solvedMap = Object.fromEntries(progress.solvedProblems);
        // We can't easily check topic here without problem data, 
        // but we'll award a bonus for first-ever solve
        const totalSolved = Object.keys(solvedMap).filter(k => solvedMap[k]).length;
        if (totalSolved === 0) {
            xpEarned += XP_REWARDS.firstTopicSolve; // First ever solve bonus
        }

        // Streak bonus
        const streak = progress.calculateStreak();
        if (streak >= 3) {
            xpEarned += XP_REWARDS.streakBonus;
        }

        // Update progress
        progress.solvedProblems.set(String(problemId), true);
        progress.xp += xpEarned;

        // Save time spent
        if (timeSpent) {
            progress.problemTimers.set(String(problemId), timeSpent);
        }

        // Log activity
        progress.activityLog.push({
            problemId,
            action: 'solved',
            timestamp: new Date(),
            xpAwarded: xpEarned,
        });

        // Update streak data
        const todayStr = new Date().toDateString();
        if (progress.streakData.lastSolveDate !== todayStr) {
            progress.streakData.lastSolveDate = todayStr;
        }

        // Calculate new level
        const oldLevel = progress.level;
        progress.level = progress.calculateLevel();
        const leveledUp = progress.level > oldLevel;

        await progress.save();

        const levelInfo = progress.getLevelInfo();
        const newStreak = progress.calculateStreak();

        // Update streak data
        progress.streakData.currentStreak = newStreak;
        if (newStreak > progress.streakData.longestStreak) {
            progress.streakData.longestStreak = newStreak;
        }
        await progress.save();

        // Check milestones
        const newSolvedCount = Object.keys(Object.fromEntries(progress.solvedProblems))
            .filter(k => progress.solvedProblems.get(k)).length;
        const isMilestone = [1, 10, 25, 50, 75, 100, 150, 200, 229].includes(newSolvedCount);

        res.json({
            success: true,
            xpEarned,
            totalXP: progress.xp,
            level: progress.level,
            levelInfo,
            leveledUp,
            newLevelName: leveledUp ? levelInfo.name : null,
            streak: newStreak,
            isMilestone,
            solvedCount: newSolvedCount,
        });
    } catch (error) {
        console.error('Solve error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── POST /api/progress/unsolve — Unmark a solved problem
router.post('/unsolve', async (req, res) => {
    try {
        const { problemId, difficulty } = req.body;

        if (!problemId) {
            return res.status(400).json({
                success: false,
                message: 'problemId is required',
            });
        }

        let progress = await Progress.findOne({ userId: req.user._id });
        if (!progress) {
            return res.status(404).json({ success: false, message: 'No progress found' });
        }

        if (!progress.solvedProblems.get(String(problemId))) {
            return res.status(400).json({
                success: false,
                message: 'Problem is not marked as solved',
            });
        }

        // Remove XP (deduct the difficulty reward)
        const xpToRemove = XP_REWARDS[difficulty] || 10;
        progress.xp = Math.max(0, progress.xp - xpToRemove);

        // Unmark
        progress.solvedProblems.delete(String(problemId));

        // Log activity
        progress.activityLog.push({
            problemId,
            action: 'unsolved',
            timestamp: new Date(),
            xpAwarded: -xpToRemove,
        });

        // Recalculate level
        progress.level = progress.calculateLevel();

        await progress.save();

        const levelInfo = progress.getLevelInfo();

        res.json({
            success: true,
            totalXP: progress.xp,
            level: progress.level,
            levelInfo,
        });
    } catch (error) {
        console.error('Unsolve error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── PUT /api/progress/notes/:problemId — Save notes ───
router.put('/notes/:problemId', async (req, res) => {
    try {
        const { problemId } = req.params;
        const { notes } = req.body;

        let progress = await Progress.findOne({ userId: req.user._id });
        if (!progress) {
            progress = await Progress.create({ userId: req.user._id });
        }

        progress.problemNotes.set(String(problemId), notes || '');
        await progress.save();

        res.json({ success: true, message: 'Notes saved' });
    } catch (error) {
        console.error('Save notes error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── GET /api/progress/stats — Get analytics data ──────
router.get('/stats', async (req, res) => {
    try {
        let progress = await Progress.findOne({ userId: req.user._id });
        if (!progress) {
            progress = await Progress.create({ userId: req.user._id });
        }

        const streak = progress.calculateStreak();
        const solvedMap = Object.fromEntries(progress.solvedProblems);
        const solvedCount = Object.keys(solvedMap).filter(k => solvedMap[k]).length;
        const activeDays = [...new Set(
            progress.activityLog
                .filter(a => a.action === 'solved')
                .map(a => new Date(a.timestamp).toDateString())
        )].length;

        res.json({
            success: true,
            stats: {
                solvedCount,
                streak,
                activeDays,
                avgPerDay: activeDays > 0 ? (solvedCount / activeDays).toFixed(1) : '0',
                xp: progress.xp,
                level: progress.level,
                levelInfo: progress.getLevelInfo(),
                longestStreak: progress.streakData.longestStreak,
            },
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── POST /api/progress/reset — Reset all progress ─────
router.post('/reset', async (req, res) => {
    try {
        await Progress.findOneAndUpdate(
            { userId: req.user._id },
            {
                solvedProblems: {},
                xp: 0,
                level: 1,
                activityLog: [],
                problemNotes: {},
                problemTimers: {},
                streakData: { currentStreak: 0, longestStreak: 0, lastSolveDate: '' },
            },
            { upsert: true }
        );

        res.json({ success: true, message: 'Progress reset' });
    } catch (error) {
        console.error('Reset error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── PUT /api/progress/daily-goal — Update daily goal ──
router.put('/daily-goal', async (req, res) => {
    try {
        const { dailyGoal } = req.body;
        const goal = Math.max(1, Math.min(20, parseInt(dailyGoal) || 3));

        let progress = await Progress.findOne({ userId: req.user._id });
        if (!progress) {
            progress = await Progress.create({ userId: req.user._id });
        }

        progress.dailyGoal = goal;
        await progress.save();

        res.json({ success: true, dailyGoal: goal });
    } catch (error) {
        console.error('Update daily goal error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
