/* =====================================================
   DSA Tracker — Hints System
   Topic-specific and difficulty-based hints for problems
   ===================================================== */

const GENERIC_HINTS = {
    easy: [
        '💡 Start by understanding the problem fully — read it twice.',
        '🔍 Think about the simplest brute-force approach first.',
        '📝 Write out a few examples by hand before coding.',
        '⏱️ For easy problems, aim for O(n) or O(n log n) time.',
    ],
    medium: [
        '🧠 Break the problem into smaller sub-problems.',
        '📊 Consider what data structure would help the most.',
        '🔄 Think about edge cases: empty inputs, single elements, duplicates.',
        '💡 Can you reduce the time complexity with a hash map or sorting?',
    ],
    hard: [
        '🏗️ Start with a working brute-force solution, then optimize.',
        '🎯 Identify the pattern: is it DP, greedy, divide and conquer?',
        '📐 Draw the problem visually — trees, graphs, arrays.',
        '🔑 Hard problems often combine 2+ techniques. Identify which ones.',
    ],
};

const TOPIC_HINTS = {
    'arrays': [
        'Consider using a hash map for O(1) lookups.',
        'Sorting the array first might simplify the problem.',
        'Two-pass approach: first gather info, then compute result.',
    ],
    'two-pointers': [
        'Start one pointer at the beginning, one at the end.',
        'The array might need to be sorted for two pointers to work.',
        'Think about what condition makes you move each pointer.',
    ],
    'sliding-window': [
        'Identify what property the window must maintain.',
        'Expand right, shrink left — track the window state efficiently.',
        'Use a hash map or counter to track window contents.',
    ],
    'stack': [
        'Think about what needs to be "remembered" in order.',
        'Monotonic stack? Check if elements need to be in sorted order.',
        'When you pop, that\'s often when you compute a result.',
    ],
    'binary-search': [
        'What is the search space? It might not be the array itself.',
        'Define clear conditions for moving left vs. right.',
        'Binary search on answer: "What is the minimum X such that..."',
    ],
    'linked-list': [
        'Use slow/fast pointers for cycle detection or finding middle.',
        'Drawing the pointer changes on paper helps enormously.',
        'Consider using a dummy head node to simplify edge cases.',
    ],
    'trees': [
        'Choose between recursive DFS and iterative BFS.',
        'For BST problems, leverage the sorted property.',
        'Think about what info needs to pass from parent to child (or vice versa).',
    ],
    'tries': [
        'Each node represents a character, children are next characters.',
        'Use a boolean flag to mark end-of-word nodes.',
        'Trie + DFS often solves "find all words" problems.',
    ],
    'heap': [
        'Need the K-th largest/smallest? Use a min/max heap of size K.',
        'A heap gives you O(log n) insert and O(1) access to min/max.',
        'Two heaps (max + min) can maintain a running median.',
    ],
    'backtracking': [
        'Think: "What choices do I have at each step?"',
        'Always undo your choice before trying the next one.',
        'Prune early: skip branches that can\'t lead to a valid solution.',
    ],
    'graphs': [
        'First decide: BFS or DFS? BFS for shortest path, DFS for exploration.',
        'Build an adjacency list from the input.',
        'Use a visited set/array to avoid infinite loops.',
    ],
    'dp': [
        'Define the state clearly: dp[i] represents what exactly?',
        'Write the recurrence relation before coding.',
        'Start with top-down (memoization), then convert to bottom-up if needed.',
    ],
    'greedy': [
        'Greedy works when local optimal choice leads to global optimal.',
        'Sort the input — greedy often needs a specific order.',
        'Prove your greedy choice is correct (or find a counter-example).',
    ],
    'intervals': [
        'Sort intervals by start time (or end time).',
        'Check for overlap: interval1.end > interval2.start.',
        'Merge step: take max of end times for overlapping intervals.',
    ],
    'bit-manipulation': [
        'XOR: a ^ a = 0, a ^ 0 = a — great for finding unique elements.',
        'Use masks to isolate specific bits: n & (1 << i).',
        'n & (n-1) removes the lowest set bit.',
    ],
    'math-geometry': [
        'Look for mathematical patterns or formulas.',
        'Matrix problems: think about in-place transformations.',
        'Modular arithmetic can prevent integer overflow.',
    ],
    'strings': [
        'Consider using character frequency counts (array of 26).',
        'Two-pointer technique works well for palindrome problems.',
        'StringBuilder pattern: build result array, join at the end.',
    ],
};

/**
 * Get hints for a problem based on its topic and difficulty
 * @param {string} topic - Problem topic ID
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @returns {string[]} Array of hint strings
 */
export function getHintsForProblem(topic, difficulty) {
    const genericHints = GENERIC_HINTS[difficulty] || GENERIC_HINTS.easy;
    const topicHints = TOPIC_HINTS[topic] || [];

    // Mix 2 generic + 2 topic-specific
    return [
        ...genericHints.slice(0, 2),
        ...topicHints.slice(0, 2),
        ...genericHints.slice(2),
        ...topicHints.slice(2),
    ];
}

/**
 * Get a single motivational hint based on context
 */
export function getContextualHint(solvedCount, streak) {
    if (solvedCount === 0) return '🌟 Every expert was once a beginner. Start with the first problem!';
    if (streak >= 7) return '🔥 Amazing streak! Your consistency is building real skill.';
    if (streak === 0) return '⏰ Start a new streak today — solve just one problem!';
    return '💪 Keep going! Each problem you solve makes you stronger.';
}
