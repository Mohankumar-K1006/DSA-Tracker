export const XP_REWARDS = {
    Easy: 10,
    Medium: 20,
    Hard: 30
};

// Calculates current level based on total XP
export const getLevelForXP = (xp) => {
    if (!xp) return 1;
    return Math.floor(Math.sqrt(xp / 100)) + 1;
};

// Calculates how much total XP is needed for the next level
export const getXPForNextLevel = (level) => {
    return Math.pow(level, 2) * 100;
};