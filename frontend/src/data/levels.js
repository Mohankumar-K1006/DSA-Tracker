/* =====================================================
   DSA Tracker — Levels & XP System
   Defines level progression, XP thresholds, and helpers
   ===================================================== */

export const LEVELS = [
    {
        level: 1,
        name: 'Beginner',
        icon: '🌱',
        xpRequired: 0,
        color: '#6366f1',
        gradient: 'linear-gradient(135deg, #6366f1, #818cf8)',
        unlocksDescription: 'Easy problems',
        allowedDifficulties: ['easy'],
    },
    {
        level: 2,
        name: 'Learner',
        icon: '📖',
        xpRequired: 100,
        color: '#06b6d4',
        gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
        unlocksDescription: 'Easy + some Medium problems',
        allowedDifficulties: ['easy', 'medium'],
    },
    {
        level: 3,
        name: 'Practitioner',
        icon: '⚡',
        xpRequired: 300,
        color: '#0891b2',
        gradient: 'linear-gradient(135deg, #0891b2, #06b6d4)',
        unlocksDescription: 'All Easy + Medium problems',
        allowedDifficulties: ['easy', 'medium'],
    },
    {
        level: 4,
        name: 'Problem Solver',
        icon: '🔥',
        xpRequired: 600,
        color: '#d97706',
        gradient: 'linear-gradient(135deg, #d97706, #f59e0b)',
        unlocksDescription: 'Medium + some Hard problems',
        allowedDifficulties: ['easy', 'medium', 'hard'],
    },
    {
        level: 5,
        name: 'Expert',
        icon: '💎',
        xpRequired: 1000,
        color: '#7c3aed',
        gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
        unlocksDescription: 'All difficulties unlocked',
        allowedDifficulties: ['easy', 'medium', 'hard'],
    },
    {
        level: 6,
        name: 'Master',
        icon: '🏆',
        xpRequired: 1500,
        color: '#059669',
        gradient: 'linear-gradient(135deg, #059669, #34d399)',
        unlocksDescription: 'All unlocked + Master badge',
        allowedDifficulties: ['easy', 'medium', 'hard'],
    },
    {
        level: 7,
        name: 'Grandmaster',
        icon: '👑',
        xpRequired: 2200,
        color: '#dc2626',
        gradient: 'linear-gradient(135deg, #dc2626, #f87171)',
        unlocksDescription: 'All unlocked + special effects',
        allowedDifficulties: ['easy', 'medium', 'hard'],
    },
    {
        level: 8,
        name: 'Legend',
        icon: '🌟',
        xpRequired: 3000,
        color: '#f59e0b',
        gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
        unlocksDescription: 'Legendary status achieved!',
        allowedDifficulties: ['easy', 'medium', 'hard'],
    },
];

export const XP_REWARDS = {
    easy: 10,
    medium: 25,
    hard: 50,
    streakBonus: 5,
    firstTopicSolve: 20,
};

/**
 * Get the level data for a given XP amount
 */
export function getLevelForXP(xp) {
    let currentLevel = LEVELS[0];
    for (const level of LEVELS) {
        if (xp >= level.xpRequired) {
            currentLevel = level;
        }
    }
    return currentLevel;
}

/**
 * Get the next level data (or null if max level)
 */
export function getNextLevel(currentLevelNum) {
    return LEVELS.find(l => l.level === currentLevelNum + 1) || null;
}

/**
 * Get XP needed for the next level
 */
export function getXPForNextLevel(xp) {
    const current = getLevelForXP(xp);
    const next = getNextLevel(current.level);
    if (!next) return { needed: 0, progress: 100 };
    const xpIntoLevel = xp - current.xpRequired;
    const xpForLevel = next.xpRequired - current.xpRequired;
    return {
        needed: next.xpRequired - xp,
        progress: Math.min(100, Math.round((xpIntoLevel / xpForLevel) * 100)),
    };
}

/**
 * Check if a problem difficulty is unlocked at a given level
 * All difficulties are unlocked — users can solve any problem freely
 */
export function isDifficultyUnlocked(difficulty, levelNum) {
    return true;
}

/**
 * Check if a specific problem is unlocked based on level
 * All problems are unlocked — users choose their own path
 */
export function isProblemUnlocked(problemDifficulty, levelNum) {
    return true;
}
