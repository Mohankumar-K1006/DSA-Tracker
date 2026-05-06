/* =====================================================
   DSA Tracker — Progress Model (Mongoose Schema)
   Stores user progress: solved problems, XP, level, activity
   ===================================================== */

const mongoose = require('mongoose');

const activityEntrySchema = new mongoose.Schema({
    problemId: { type: Number, required: true },
    action: { type: String, enum: ['solved', 'unsolved'], required: true },
    timestamp: { type: Date, default: Date.now },
    xpAwarded: { type: Number, default: 0 },
}, { _id: false });

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
        index: true,
    },
    solvedProblems: {
        type: Map,
        of: Boolean,
        default: {},
    },
    xp: {
        type: Number,
        default: 0,
        min: 0,
    },
    level: {
        type: Number,
        default: 1,
        min: 1,
        max: 8,
    },
    activityLog: {
        type: [activityEntrySchema],
        default: [],
    },
    dailyGoal: {
        type: Number,
        default: 3,
        min: 1,
        max: 20,
    },
    problemNotes: {
        type: Map,
        of: String,
        default: {},
    },
    problemTimers: {
        type: Map,
        of: Number, // seconds spent
        default: {},
    },
    streakData: {
        currentStreak: { type: Number, default: 0 },
        longestStreak: { type: Number, default: 0 },
        lastSolveDate: { type: String, default: '' },
    },
}, {
    timestamps: true,
});

// ─── Level Thresholds ───────────────────────────────────
const LEVEL_THRESHOLDS = [
    { level: 1, xp: 0,    name: 'Beginner' },
    { level: 2, xp: 100,  name: 'Learner' },
    { level: 3, xp: 300,  name: 'Practitioner' },
    { level: 4, xp: 600,  name: 'Problem Solver' },
    { level: 5, xp: 1000, name: 'Expert' },
    { level: 6, xp: 1500, name: 'Master' },
    { level: 7, xp: 2200, name: 'Grandmaster' },
    { level: 8, xp: 3000, name: 'Legend' },
];

// ─── XP Rewards ─────────────────────────────────────────
const XP_REWARDS = {
    easy: 10,
    medium: 25,
    hard: 50,
    streakBonus: 5,
    firstTopicSolve: 20,
};

// Calculate level from XP
progressSchema.methods.calculateLevel = function () {
    let newLevel = 1;
    for (const threshold of LEVEL_THRESHOLDS) {
        if (this.xp >= threshold.xp) {
            newLevel = threshold.level;
        }
    }
    return newLevel;
};

// Get level info
progressSchema.methods.getLevelInfo = function () {
    const currentLevel = LEVEL_THRESHOLDS.find(l => l.level === this.level) || LEVEL_THRESHOLDS[0];
    const nextLevel = LEVEL_THRESHOLDS.find(l => l.level === this.level + 1);
    return {
        level: this.level,
        name: currentLevel.name,
        currentXP: this.xp,
        levelXP: currentLevel.xp,
        nextLevelXP: nextLevel ? nextLevel.xp : null,
        nextLevelName: nextLevel ? nextLevel.name : null,
        isMaxLevel: !nextLevel,
    };
};

// Calculate streak from activity log
progressSchema.methods.calculateStreak = function () {
    const solvedDates = [...new Set(
        this.activityLog
            .filter(a => a.action === 'solved')
            .map(a => new Date(a.timestamp).toDateString())
    )].sort((a, b) => new Date(b) - new Date(a));

    if (solvedDates.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < solvedDates.length; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - i);
        if (solvedDates.includes(checkDate.toDateString())) {
            streak++;
        } else {
            break;
        }
    }
    return streak;
};

// Keep activity log trimmed
progressSchema.pre('save', function (next) {
    if (this.activityLog.length > 500) {
        this.activityLog = this.activityLog.slice(-500);
    }
    next();
});

// Export model and constants
const Progress = mongoose.model('Progress', progressSchema);

module.exports = { Progress, LEVEL_THRESHOLDS, XP_REWARDS };
