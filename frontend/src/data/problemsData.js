/* =====================================================
   DSA Problem Data — Curated 250+ problem set
   organized by topic with difficulty levels.
   Sources: NeetCode 150, Blind 75, Striver's DSA Sheet
   ===================================================== */

export const DSA_TOPICS = [
    {
        id: 'arrays',
        name: 'Arrays & Hashing',
        icon: '📊',
        color: '#6366f1',
        bgColor: '#eef2ff',
    },
    {
        id: 'two-pointers',
        name: 'Two Pointers',
        icon: '👆',
        color: '#8b5cf6',
        bgColor: '#ede9fe',
    },
    {
        id: 'sliding-window',
        name: 'Sliding Window',
        icon: '🪟',
        color: '#06b6d4',
        bgColor: '#ecfeff',
    },
    {
        id: 'stack',
        name: 'Stack',
        icon: '📚',
        color: '#0891b2',
        bgColor: '#ecfeff',
    },
    {
        id: 'binary-search',
        name: 'Binary Search',
        icon: '🔍',
        color: '#0d9488',
        bgColor: '#f0fdfa',
    },
    {
        id: 'linked-list',
        name: 'Linked List',
        icon: '🔗',
        color: '#059669',
        bgColor: '#f0fdf4',
    },
    {
        id: 'trees',
        name: 'Trees',
        icon: '🌳',
        color: '#16a34a',
        bgColor: '#f0fdf4',
    },
    {
        id: 'tries',
        name: 'Tries',
        icon: '🔤',
        color: '#65a30d',
        bgColor: '#f7fee7',
    },
    {
        id: 'heap',
        name: 'Heap / Priority Queue',
        icon: '⏫',
        color: '#ca8a04',
        bgColor: '#fefce8',
    },
    {
        id: 'backtracking',
        name: 'Backtracking',
        icon: '🔙',
        color: '#d97706',
        bgColor: '#fffbeb',
    },
    {
        id: 'graphs',
        name: 'Graphs',
        icon: '🕸️',
        color: '#ea580c',
        bgColor: '#fff7ed',
    },
    {
        id: 'dp',
        name: 'Dynamic Programming',
        icon: '🧩',
        color: '#dc2626',
        bgColor: '#fef2f2',
    },
    {
        id: 'greedy',
        name: 'Greedy',
        icon: '💰',
        color: '#e11d48',
        bgColor: '#fff1f2',
    },
    {
        id: 'intervals',
        name: 'Intervals',
        icon: '📏',
        color: '#9333ea',
        bgColor: '#faf5ff',
    },
    {
        id: 'bit-manipulation',
        name: 'Bit Manipulation',
        icon: '⚡',
        color: '#7c3aed',
        bgColor: '#ede9fe',
    },
    {
        id: 'math-geometry',
        name: 'Math & Geometry',
        icon: '📐',
        color: '#0284c7',
        bgColor: '#e0f2fe',
    },
    {
        id: 'strings',
        name: 'Strings',
        icon: '🔡',
        color: '#be185d',
        bgColor: '#fce7f3',
    },
];

/* Topic prerequisite map — used by AI recommendation engine */
export const TOPIC_PREREQUISITES = {
    'arrays': [],
    'strings': [],
    'two-pointers': ['arrays'],
    'sliding-window': ['arrays','two-pointers'],
    'stack': ['arrays'],
    'binary-search': ['arrays'],
    'linked-list': ['arrays'],
    'trees': ['linked-list','stack'],
    'tries': ['trees','strings'],
    'heap': ['arrays','trees'],
    'backtracking': ['arrays','trees'],
    'graphs': ['trees','backtracking'],
    'dp': ['arrays','backtracking'],
    'greedy': ['arrays','dp'],
    'intervals': ['arrays','greedy'],
    'bit-manipulation': ['arrays','math-geometry'],
    'math-geometry': ['arrays'],
};

export const DSA_PROBLEMS = [
    // ================================================================
    // === Arrays & Hashing (18 problems) ===
    // ================================================================
    { id: 1,   name: 'Two Sum',                          topic: 'arrays',          difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/two-sum/' },
    { id: 2,   name: 'Contains Duplicate',                topic: 'arrays',          difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/contains-duplicate/' },
    { id: 3,   name: 'Valid Anagram',                     topic: 'arrays',          difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/valid-anagram/' },
    { id: 4,   name: 'Group Anagrams',                    topic: 'arrays',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/group-anagrams/' },
    { id: 5,   name: 'Top K Frequent Elements',           topic: 'arrays',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/top-k-frequent-elements/' },
    { id: 6,   name: 'Product of Array Except Self',      topic: 'arrays',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/product-of-array-except-self/' },
    { id: 7,   name: 'Valid Sudoku',                      topic: 'arrays',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/valid-sudoku/' },
    { id: 8,   name: 'Encode and Decode Strings',         topic: 'arrays',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/encode-and-decode-strings/' },
    { id: 9,   name: 'Longest Consecutive Sequence',      topic: 'arrays',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/longest-consecutive-sequence/' },
    { id: 133, name: 'Majority Element',                  topic: 'arrays',          difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/majority-element/' },
    { id: 134, name: 'Remove Duplicates from Sorted Array', topic: 'arrays',        difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/' },
    { id: 135, name: 'Move Zeroes',                       topic: 'arrays',          difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/move-zeroes/' },
    { id: 136, name: 'Sort Colors',                       topic: 'arrays',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/sort-colors/' },
    { id: 137, name: 'Next Permutation',                  topic: 'arrays',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/next-permutation/' },
    { id: 138, name: 'Longest Subarray with Sum K',       topic: 'arrays',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/' },
    { id: 139, name: 'Subarray Sum Equals K',             topic: 'arrays',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/subarray-sum-equals-k/' },
    { id: 140, name: 'Pascal\'s Triangle',                topic: 'arrays',          difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/pascals-triangle/' },
    { id: 141, name: 'First Missing Positive',            topic: 'arrays',          difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/first-missing-positive/' },

    // ================================================================
    // === Two Pointers (10 problems) ===
    // ================================================================
    { id: 10,  name: 'Valid Palindrome',                  topic: 'two-pointers',    difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/valid-palindrome/' },
    { id: 11,  name: 'Two Sum II',                        topic: 'two-pointers',    difficulty: 'medium', leetcode: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
    { id: 12,  name: '3Sum',                              topic: 'two-pointers',    difficulty: 'medium', leetcode: 'https://leetcode.com/problems/3sum/' },
    { id: 13,  name: 'Container With Most Water',         topic: 'two-pointers',    difficulty: 'medium', leetcode: 'https://leetcode.com/problems/container-with-most-water/' },
    { id: 14,  name: 'Trapping Rain Water',               topic: 'two-pointers',    difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/trapping-rain-water/' },
    { id: 142, name: '4Sum',                              topic: 'two-pointers',    difficulty: 'medium', leetcode: 'https://leetcode.com/problems/4sum/' },
    { id: 143, name: 'Remove Duplicates from Sorted Array II', topic: 'two-pointers', difficulty: 'medium', leetcode: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/' },
    { id: 144, name: 'Boats to Save People',              topic: 'two-pointers',    difficulty: 'medium', leetcode: 'https://leetcode.com/problems/boats-to-save-people/' },
    { id: 145, name: 'Sort Array By Parity',              topic: 'two-pointers',    difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/sort-array-by-parity/' },
    { id: 146, name: 'Longest Mountain in Array',         topic: 'two-pointers',    difficulty: 'medium', leetcode: 'https://leetcode.com/problems/longest-mountain-in-array/' },

    // ================================================================
    // === Sliding Window (10 problems) ===
    // ================================================================
    { id: 15,  name: 'Best Time to Buy & Sell Stock',     topic: 'sliding-window',  difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
    { id: 16,  name: 'Longest Substring Without Repeating', topic: 'sliding-window', difficulty: 'medium', leetcode: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
    { id: 17,  name: 'Longest Repeating Character Replacement', topic: 'sliding-window', difficulty: 'medium', leetcode: 'https://leetcode.com/problems/longest-repeating-character-replacement/' },
    { id: 18,  name: 'Permutation in String',             topic: 'sliding-window',  difficulty: 'medium', leetcode: 'https://leetcode.com/problems/permutation-in-string/' },
    { id: 19,  name: 'Minimum Window Substring',          topic: 'sliding-window',  difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/minimum-window-substring/' },
    { id: 20,  name: 'Sliding Window Maximum',            topic: 'sliding-window',  difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/sliding-window-maximum/' },
    { id: 147, name: 'Find All Anagrams in a String',     topic: 'sliding-window',  difficulty: 'medium', leetcode: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/' },
    { id: 148, name: 'Max Consecutive Ones III',          topic: 'sliding-window',  difficulty: 'medium', leetcode: 'https://leetcode.com/problems/max-consecutive-ones-iii/' },
    { id: 149, name: 'Fruit Into Baskets',                topic: 'sliding-window',  difficulty: 'medium', leetcode: 'https://leetcode.com/problems/fruit-into-baskets/' },
    { id: 150, name: 'Substring with Concatenation of All Words', topic: 'sliding-window', difficulty: 'hard', leetcode: 'https://leetcode.com/problems/substring-with-concatenation-of-all-words/' },

    // ================================================================
    // === Stack (12 problems) ===
    // ================================================================
    { id: 21,  name: 'Valid Parentheses',                 topic: 'stack',           difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/valid-parentheses/' },
    { id: 22,  name: 'Min Stack',                         topic: 'stack',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/min-stack/' },
    { id: 23,  name: 'Evaluate Reverse Polish Notation',  topic: 'stack',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/' },
    { id: 24,  name: 'Generate Parentheses',              topic: 'stack',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/generate-parentheses/' },
    { id: 25,  name: 'Daily Temperatures',                topic: 'stack',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/daily-temperatures/' },
    { id: 26,  name: 'Car Fleet',                         topic: 'stack',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/car-fleet/' },
    { id: 27,  name: 'Largest Rectangle in Histogram',    topic: 'stack',           difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' },
    { id: 151, name: 'Next Greater Element I',            topic: 'stack',           difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/next-greater-element-i/' },
    { id: 152, name: 'Next Greater Element II',           topic: 'stack',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/next-greater-element-ii/' },
    { id: 153, name: 'Online Stock Span',                 topic: 'stack',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/online-stock-span/' },
    { id: 154, name: 'Asteroid Collision',                topic: 'stack',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/asteroid-collision/' },
    { id: 155, name: 'Trapping Rain Water (Stack)',       topic: 'stack',           difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/trapping-rain-water/' },

    // ================================================================
    // === Binary Search (12 problems) ===
    // ================================================================
    { id: 28,  name: 'Binary Search',                     topic: 'binary-search',   difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/binary-search/' },
    { id: 29,  name: 'Search a 2D Matrix',                topic: 'binary-search',   difficulty: 'medium', leetcode: 'https://leetcode.com/problems/search-a-2d-matrix/' },
    { id: 30,  name: 'Koko Eating Bananas',               topic: 'binary-search',   difficulty: 'medium', leetcode: 'https://leetcode.com/problems/koko-eating-bananas/' },
    { id: 31,  name: 'Find Minimum in Rotated Sorted Array', topic: 'binary-search', difficulty: 'medium', leetcode: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
    { id: 32,  name: 'Search in Rotated Sorted Array',    topic: 'binary-search',   difficulty: 'medium', leetcode: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
    { id: 33,  name: 'Time Based Key-Value Store',        topic: 'binary-search',   difficulty: 'medium', leetcode: 'https://leetcode.com/problems/time-based-key-value-store/' },
    { id: 34,  name: 'Median of Two Sorted Arrays',       topic: 'binary-search',   difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },
    { id: 156, name: 'Find Peak Element',                 topic: 'binary-search',   difficulty: 'medium', leetcode: 'https://leetcode.com/problems/find-peak-element/' },
    { id: 157, name: 'Search in Rotated Sorted Array II', topic: 'binary-search',   difficulty: 'medium', leetcode: 'https://leetcode.com/problems/search-in-rotated-sorted-array-ii/' },
    { id: 158, name: 'Capacity To Ship Packages',         topic: 'binary-search',   difficulty: 'medium', leetcode: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/' },
    { id: 159, name: 'Split Array Largest Sum',            topic: 'binary-search',   difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/split-array-largest-sum/' },
    { id: 160, name: 'Aggressive Cows (Magnetic Balls)',   topic: 'binary-search',   difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/magnetic-force-between-two-balls/' },

    // ================================================================
    // === Linked List (15 problems) ===
    // ================================================================
    { id: 35,  name: 'Reverse Linked List',               topic: 'linked-list',     difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/reverse-linked-list/' },
    { id: 36,  name: 'Merge Two Sorted Lists',            topic: 'linked-list',     difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
    { id: 37,  name: 'Linked List Cycle',                 topic: 'linked-list',     difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/linked-list-cycle/' },
    { id: 38,  name: 'Reorder List',                      topic: 'linked-list',     difficulty: 'medium', leetcode: 'https://leetcode.com/problems/reorder-list/' },
    { id: 39,  name: 'Remove Nth Node From End',          topic: 'linked-list',     difficulty: 'medium', leetcode: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
    { id: 40,  name: 'Copy List with Random Pointer',     topic: 'linked-list',     difficulty: 'medium', leetcode: 'https://leetcode.com/problems/copy-list-with-random-pointer/' },
    { id: 41,  name: 'Add Two Numbers',                   topic: 'linked-list',     difficulty: 'medium', leetcode: 'https://leetcode.com/problems/add-two-numbers/' },
    { id: 42,  name: 'Find the Duplicate Number',         topic: 'linked-list',     difficulty: 'medium', leetcode: 'https://leetcode.com/problems/find-the-duplicate-number/' },
    { id: 43,  name: 'LRU Cache',                         topic: 'linked-list',     difficulty: 'medium', leetcode: 'https://leetcode.com/problems/lru-cache/' },
    { id: 44,  name: 'Merge K Sorted Lists',              topic: 'linked-list',     difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
    { id: 45,  name: 'Reverse Nodes in K-Group',          topic: 'linked-list',     difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/reverse-nodes-in-k-group/' },
    { id: 161, name: 'Middle of the Linked List',         topic: 'linked-list',     difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/middle-of-the-linked-list/' },
    { id: 162, name: 'Palindrome Linked List',            topic: 'linked-list',     difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/palindrome-linked-list/' },
    { id: 163, name: 'Linked List Cycle II',              topic: 'linked-list',     difficulty: 'medium', leetcode: 'https://leetcode.com/problems/linked-list-cycle-ii/' },
    { id: 164, name: 'Flatten a Multilevel Doubly LL',    topic: 'linked-list',     difficulty: 'medium', leetcode: 'https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/' },

    // ================================================================
    // === Trees (20 problems) ===
    // ================================================================
    { id: 46,  name: 'Invert Binary Tree',                topic: 'trees',           difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/invert-binary-tree/' },
    { id: 47,  name: 'Maximum Depth of Binary Tree',      topic: 'trees',           difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
    { id: 48,  name: 'Diameter of Binary Tree',           topic: 'trees',           difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/diameter-of-binary-tree/' },
    { id: 49,  name: 'Balanced Binary Tree',              topic: 'trees',           difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/balanced-binary-tree/' },
    { id: 50,  name: 'Same Tree',                         topic: 'trees',           difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/same-tree/' },
    { id: 51,  name: 'Subtree of Another Tree',           topic: 'trees',           difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/subtree-of-another-tree/' },
    { id: 52,  name: 'Lowest Common Ancestor of BST',     topic: 'trees',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/' },
    { id: 53,  name: 'Binary Tree Level Order Traversal', topic: 'trees',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
    { id: 54,  name: 'Binary Tree Right Side View',       topic: 'trees',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/binary-tree-right-side-view/' },
    { id: 55,  name: 'Count Good Nodes in Binary Tree',   topic: 'trees',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/' },
    { id: 56,  name: 'Validate Binary Search Tree',       topic: 'trees',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/validate-binary-search-tree/' },
    { id: 57,  name: 'Kth Smallest Element in BST',       topic: 'trees',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/' },
    { id: 58,  name: 'Construct Binary Tree from Preorder and Inorder', topic: 'trees', difficulty: 'medium', leetcode: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/' },
    { id: 59,  name: 'Binary Tree Maximum Path Sum',      topic: 'trees',           difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },
    { id: 60,  name: 'Serialize and Deserialize Binary Tree', topic: 'trees',       difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/' },
    { id: 165, name: 'Binary Tree Zigzag Level Order',    topic: 'trees',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/' },
    { id: 166, name: 'Path Sum',                          topic: 'trees',           difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/path-sum/' },
    { id: 167, name: 'Path Sum II',                       topic: 'trees',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/path-sum-ii/' },
    { id: 168, name: 'Symmetric Tree',                    topic: 'trees',           difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/symmetric-tree/' },
    { id: 169, name: 'Populating Next Right Pointers',    topic: 'trees',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node/' },

    // ================================================================
    // === Tries (7 problems) ===
    // ================================================================
    { id: 61,  name: 'Implement Trie (Prefix Tree)',      topic: 'tries',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
    { id: 62,  name: 'Design Add & Search Words',         topic: 'tries',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/' },
    { id: 63,  name: 'Word Search II',                    topic: 'tries',           difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/word-search-ii/' },
    { id: 170, name: 'Replace Words',                     topic: 'tries',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/replace-words/' },
    { id: 171, name: 'Longest Word in Dictionary',        topic: 'tries',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/longest-word-in-dictionary/' },
    { id: 172, name: 'Map Sum Pairs',                     topic: 'tries',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/map-sum-pairs/' },
    { id: 173, name: 'Search Suggestions System',         topic: 'tries',           difficulty: 'medium', leetcode: 'https://leetcode.com/problems/search-suggestions-system/' },

    // ================================================================
    // === Heap / Priority Queue (10 problems) ===
    // ================================================================
    { id: 64,  name: 'Kth Largest Element in a Stream',   topic: 'heap',            difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/' },
    { id: 65,  name: 'Last Stone Weight',                 topic: 'heap',            difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/last-stone-weight/' },
    { id: 66,  name: 'K Closest Points to Origin',        topic: 'heap',            difficulty: 'medium', leetcode: 'https://leetcode.com/problems/k-closest-points-to-origin/' },
    { id: 67,  name: 'Kth Largest Element in an Array',   topic: 'heap',            difficulty: 'medium', leetcode: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
    { id: 68,  name: 'Task Scheduler',                    topic: 'heap',            difficulty: 'medium', leetcode: 'https://leetcode.com/problems/task-scheduler/' },
    { id: 69,  name: 'Design Twitter',                    topic: 'heap',            difficulty: 'medium', leetcode: 'https://leetcode.com/problems/design-twitter/' },
    { id: 70,  name: 'Find Median from Data Stream',      topic: 'heap',            difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/find-median-from-data-stream/' },
    { id: 174, name: 'Top K Frequent Words',              topic: 'heap',            difficulty: 'medium', leetcode: 'https://leetcode.com/problems/top-k-frequent-words/' },
    { id: 175, name: 'Reorganize String',                 topic: 'heap',            difficulty: 'medium', leetcode: 'https://leetcode.com/problems/reorganize-string/' },
    { id: 176, name: 'Merge K Sorted Lists (Heap)',       topic: 'heap',            difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/merge-k-sorted-lists/' },

    // ================================================================
    // === Backtracking (14 problems) ===
    // ================================================================
    { id: 71,  name: 'Subsets',                           topic: 'backtracking',    difficulty: 'medium', leetcode: 'https://leetcode.com/problems/subsets/' },
    { id: 72,  name: 'Combination Sum',                   topic: 'backtracking',    difficulty: 'medium', leetcode: 'https://leetcode.com/problems/combination-sum/' },
    { id: 73,  name: 'Permutations',                      topic: 'backtracking',    difficulty: 'medium', leetcode: 'https://leetcode.com/problems/permutations/' },
    { id: 74,  name: 'Subsets II',                        topic: 'backtracking',    difficulty: 'medium', leetcode: 'https://leetcode.com/problems/subsets-ii/' },
    { id: 75,  name: 'Combination Sum II',                topic: 'backtracking',    difficulty: 'medium', leetcode: 'https://leetcode.com/problems/combination-sum-ii/' },
    { id: 76,  name: 'Word Search',                       topic: 'backtracking',    difficulty: 'medium', leetcode: 'https://leetcode.com/problems/word-search/' },
    { id: 77,  name: 'Palindrome Partitioning',           topic: 'backtracking',    difficulty: 'medium', leetcode: 'https://leetcode.com/problems/palindrome-partitioning/' },
    { id: 78,  name: 'Letter Combinations of Phone Number', topic: 'backtracking',  difficulty: 'medium', leetcode: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/' },
    { id: 79,  name: 'N-Queens',                          topic: 'backtracking',    difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/n-queens/' },
    { id: 177, name: 'Permutations II',                   topic: 'backtracking',    difficulty: 'medium', leetcode: 'https://leetcode.com/problems/permutations-ii/' },
    { id: 178, name: 'Combinations',                      topic: 'backtracking',    difficulty: 'medium', leetcode: 'https://leetcode.com/problems/combinations/' },
    { id: 179, name: 'Generate Parentheses (Backtrack)',   topic: 'backtracking',   difficulty: 'medium', leetcode: 'https://leetcode.com/problems/generate-parentheses/' },
    { id: 180, name: 'Sudoku Solver',                     topic: 'backtracking',    difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/sudoku-solver/' },
    { id: 181, name: 'Expression Add Operators',          topic: 'backtracking',    difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/expression-add-operators/' },

    // ================================================================
    // === Graphs (20 problems) ===
    // ================================================================
    { id: 80,  name: 'Number of Islands',                 topic: 'graphs',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/number-of-islands/' },
    { id: 81,  name: 'Clone Graph',                       topic: 'graphs',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/clone-graph/' },
    { id: 82,  name: 'Max Area of Island',                topic: 'graphs',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/max-area-of-island/' },
    { id: 83,  name: 'Pacific Atlantic Water Flow',       topic: 'graphs',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/pacific-atlantic-water-flow/' },
    { id: 84,  name: 'Surrounded Regions',                topic: 'graphs',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/surrounded-regions/' },
    { id: 85,  name: 'Rotting Oranges',                   topic: 'graphs',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/rotting-oranges/' },
    { id: 86,  name: 'Walls and Gates',                   topic: 'graphs',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/walls-and-gates/' },
    { id: 87,  name: 'Course Schedule',                   topic: 'graphs',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/course-schedule/' },
    { id: 88,  name: 'Course Schedule II',                topic: 'graphs',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/course-schedule-ii/' },
    { id: 89,  name: 'Graph Valid Tree',                  topic: 'graphs',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/graph-valid-tree/' },
    { id: 90,  name: 'Number of Connected Components',    topic: 'graphs',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/' },
    { id: 91,  name: 'Redundant Connection',              topic: 'graphs',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/redundant-connection/' },
    { id: 92,  name: 'Word Ladder',                       topic: 'graphs',          difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/word-ladder/' },
    { id: 182, name: 'Cheapest Flights Within K Stops',   topic: 'graphs',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/' },
    { id: 183, name: 'Network Delay Time',                topic: 'graphs',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/network-delay-time/' },
    { id: 184, name: 'Swim in Rising Water',              topic: 'graphs',          difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/swim-in-rising-water/' },
    { id: 185, name: 'Alien Dictionary',                  topic: 'graphs',          difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/alien-dictionary/' },
    { id: 186, name: 'Min Cost to Connect All Points',    topic: 'graphs',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/min-cost-to-connect-all-points/' },
    { id: 187, name: 'Reconstruct Itinerary',             topic: 'graphs',          difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/reconstruct-itinerary/' },
    { id: 188, name: 'Accounts Merge',                    topic: 'graphs',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/accounts-merge/' },

    // ================================================================
    // === Dynamic Programming (26 problems) ===
    // ================================================================
    { id: 93,  name: 'Climbing Stairs',                   topic: 'dp',              difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/climbing-stairs/' },
    { id: 94,  name: 'Min Cost Climbing Stairs',          topic: 'dp',              difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/min-cost-climbing-stairs/' },
    { id: 95,  name: 'House Robber',                      topic: 'dp',              difficulty: 'medium', leetcode: 'https://leetcode.com/problems/house-robber/' },
    { id: 96,  name: 'House Robber II',                   topic: 'dp',              difficulty: 'medium', leetcode: 'https://leetcode.com/problems/house-robber-ii/' },
    { id: 97,  name: 'Longest Palindromic Substring',     topic: 'dp',              difficulty: 'medium', leetcode: 'https://leetcode.com/problems/longest-palindromic-substring/' },
    { id: 98,  name: 'Palindromic Substrings',            topic: 'dp',              difficulty: 'medium', leetcode: 'https://leetcode.com/problems/palindromic-substrings/' },
    { id: 99,  name: 'Decode Ways',                       topic: 'dp',              difficulty: 'medium', leetcode: 'https://leetcode.com/problems/decode-ways/' },
    { id: 100, name: 'Coin Change',                       topic: 'dp',              difficulty: 'medium', leetcode: 'https://leetcode.com/problems/coin-change/' },
    { id: 101, name: 'Maximum Product Subarray',          topic: 'dp',              difficulty: 'medium', leetcode: 'https://leetcode.com/problems/maximum-product-subarray/' },
    { id: 102, name: 'Word Break',                        topic: 'dp',              difficulty: 'medium', leetcode: 'https://leetcode.com/problems/word-break/' },
    { id: 103, name: 'Longest Increasing Subsequence',    topic: 'dp',              difficulty: 'medium', leetcode: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
    { id: 104, name: 'Partition Equal Subset Sum',        topic: 'dp',              difficulty: 'medium', leetcode: 'https://leetcode.com/problems/partition-equal-subset-sum/' },
    { id: 105, name: 'Unique Paths',                      topic: 'dp',              difficulty: 'medium', leetcode: 'https://leetcode.com/problems/unique-paths/' },
    { id: 106, name: 'Longest Common Subsequence',        topic: 'dp',              difficulty: 'medium', leetcode: 'https://leetcode.com/problems/longest-common-subsequence/' },
    { id: 107, name: 'Target Sum',                        topic: 'dp',              difficulty: 'medium', leetcode: 'https://leetcode.com/problems/target-sum/' },
    { id: 108, name: 'Interleaving String',               topic: 'dp',              difficulty: 'medium', leetcode: 'https://leetcode.com/problems/interleaving-string/' },
    { id: 109, name: 'Edit Distance',                     topic: 'dp',              difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/edit-distance/' },
    { id: 110, name: 'Burst Balloons',                    topic: 'dp',              difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/burst-balloons/' },
    { id: 111, name: 'Regular Expression Matching',       topic: 'dp',              difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/regular-expression-matching/' },
    { id: 189, name: 'Coin Change II',                    topic: 'dp',              difficulty: 'medium', leetcode: 'https://leetcode.com/problems/coin-change-ii/' },
    { id: 190, name: 'Best Time to Buy & Sell Stock with Cooldown', topic: 'dp',    difficulty: 'medium', leetcode: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/' },
    { id: 191, name: 'Minimum Path Sum',                  topic: 'dp',              difficulty: 'medium', leetcode: 'https://leetcode.com/problems/minimum-path-sum/' },
    { id: 192, name: '0/1 Knapsack Problem',              topic: 'dp',              difficulty: 'medium', leetcode: 'https://leetcode.com/problems/ones-and-zeroes/' },
    { id: 193, name: 'Distinct Subsequences',             topic: 'dp',              difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/distinct-subsequences/' },
    { id: 194, name: 'Longest Increasing Path in Matrix', topic: 'dp',              difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/' },
    { id: 195, name: 'Maximal Square',                    topic: 'dp',              difficulty: 'medium', leetcode: 'https://leetcode.com/problems/maximal-square/' },

    // ================================================================
    // === Greedy (12 problems) ===
    // ================================================================
    { id: 112, name: 'Maximum Subarray',                  topic: 'greedy',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/maximum-subarray/' },
    { id: 113, name: 'Jump Game',                         topic: 'greedy',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/jump-game/' },
    { id: 114, name: 'Jump Game II',                      topic: 'greedy',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/jump-game-ii/' },
    { id: 115, name: 'Gas Station',                       topic: 'greedy',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/gas-station/' },
    { id: 116, name: 'Hand of Straights',                 topic: 'greedy',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/hand-of-straights/' },
    { id: 117, name: 'Merge Triplets to Form Target',     topic: 'greedy',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/merge-triplets-to-form-target-triplet/' },
    { id: 118, name: 'Partition Labels',                  topic: 'greedy',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/partition-labels/' },
    { id: 119, name: 'Valid Parenthesis String',           topic: 'greedy',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/valid-parenthesis-string/' },
    { id: 196, name: 'Best Time to Buy & Sell Stock II',  topic: 'greedy',          difficulty: 'medium', leetcode: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/' },
    { id: 197, name: 'Activity Selection / N Meetings',   topic: 'greedy',          difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/' },
    { id: 198, name: 'Assign Cookies',                    topic: 'greedy',          difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/assign-cookies/' },
    { id: 199, name: 'Candy',                             topic: 'greedy',          difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/candy/' },

    // ================================================================
    // === Intervals (9 problems) ===
    // ================================================================
    { id: 120, name: 'Insert Interval',                   topic: 'intervals',       difficulty: 'medium', leetcode: 'https://leetcode.com/problems/insert-interval/' },
    { id: 121, name: 'Merge Intervals',                   topic: 'intervals',       difficulty: 'medium', leetcode: 'https://leetcode.com/problems/merge-intervals/' },
    { id: 122, name: 'Non-Overlapping Intervals',         topic: 'intervals',       difficulty: 'medium', leetcode: 'https://leetcode.com/problems/non-overlapping-intervals/' },
    { id: 123, name: 'Meeting Rooms',                     topic: 'intervals',       difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/meeting-rooms/' },
    { id: 124, name: 'Meeting Rooms II',                  topic: 'intervals',       difficulty: 'medium', leetcode: 'https://leetcode.com/problems/meeting-rooms-ii/' },
    { id: 125, name: 'Minimum Interval to Include Each Query', topic: 'intervals',  difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/minimum-interval-to-include-each-query/' },
    { id: 200, name: 'Interval List Intersections',       topic: 'intervals',       difficulty: 'medium', leetcode: 'https://leetcode.com/problems/interval-list-intersections/' },
    { id: 201, name: 'Employee Free Time',                topic: 'intervals',       difficulty: 'hard',   leetcode: 'https://leetcode.com/problems/employee-free-time/' },
    { id: 202, name: 'Remove Covered Intervals',          topic: 'intervals',       difficulty: 'medium', leetcode: 'https://leetcode.com/problems/remove-covered-intervals/' },

    // ================================================================
    // === Bit Manipulation (10 problems) ===
    // ================================================================
    { id: 126, name: 'Single Number',                     topic: 'bit-manipulation', difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/single-number/' },
    { id: 127, name: 'Number of 1 Bits',                  topic: 'bit-manipulation', difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/number-of-1-bits/' },
    { id: 128, name: 'Counting Bits',                     topic: 'bit-manipulation', difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/counting-bits/' },
    { id: 129, name: 'Reverse Bits',                      topic: 'bit-manipulation', difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/reverse-bits/' },
    { id: 130, name: 'Missing Number',                    topic: 'bit-manipulation', difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/missing-number/' },
    { id: 131, name: 'Sum of Two Integers',               topic: 'bit-manipulation', difficulty: 'medium', leetcode: 'https://leetcode.com/problems/sum-of-two-integers/' },
    { id: 132, name: 'Reverse Integer',                   topic: 'bit-manipulation', difficulty: 'medium', leetcode: 'https://leetcode.com/problems/reverse-integer/' },
    { id: 203, name: 'Single Number II',                  topic: 'bit-manipulation', difficulty: 'medium', leetcode: 'https://leetcode.com/problems/single-number-ii/' },
    { id: 204, name: 'Single Number III',                 topic: 'bit-manipulation', difficulty: 'medium', leetcode: 'https://leetcode.com/problems/single-number-iii/' },
    { id: 205, name: 'Power of Two',                      topic: 'bit-manipulation', difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/power-of-two/' },

    // ================================================================
    // === Math & Geometry (12 problems) — NEW TOPIC ===
    // ================================================================
    { id: 206, name: 'Rotate Image',                      topic: 'math-geometry',   difficulty: 'medium', leetcode: 'https://leetcode.com/problems/rotate-image/' },
    { id: 207, name: 'Spiral Matrix',                     topic: 'math-geometry',   difficulty: 'medium', leetcode: 'https://leetcode.com/problems/spiral-matrix/' },
    { id: 208, name: 'Set Matrix Zeroes',                 topic: 'math-geometry',   difficulty: 'medium', leetcode: 'https://leetcode.com/problems/set-matrix-zeroes/' },
    { id: 209, name: 'Happy Number',                      topic: 'math-geometry',   difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/happy-number/' },
    { id: 210, name: 'Plus One',                          topic: 'math-geometry',   difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/plus-one/' },
    { id: 211, name: 'Pow(x, n)',                         topic: 'math-geometry',   difficulty: 'medium', leetcode: 'https://leetcode.com/problems/powx-n/' },
    { id: 212, name: 'Multiply Strings',                  topic: 'math-geometry',   difficulty: 'medium', leetcode: 'https://leetcode.com/problems/multiply-strings/' },
    { id: 213, name: 'Detect Squares',                    topic: 'math-geometry',   difficulty: 'medium', leetcode: 'https://leetcode.com/problems/detect-squares/' },
    { id: 214, name: 'Robot Bounded In Circle',           topic: 'math-geometry',   difficulty: 'medium', leetcode: 'https://leetcode.com/problems/robot-bounded-in-circle/' },
    { id: 215, name: 'Spiral Matrix II',                  topic: 'math-geometry',   difficulty: 'medium', leetcode: 'https://leetcode.com/problems/spiral-matrix-ii/' },
    { id: 216, name: 'Count Primes',                      topic: 'math-geometry',   difficulty: 'medium', leetcode: 'https://leetcode.com/problems/count-primes/' },
    { id: 217, name: 'Palindrome Number',                 topic: 'math-geometry',   difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/palindrome-number/' },

    // ================================================================
    // === Strings (12 problems) — NEW TOPIC ===
    // ================================================================
    { id: 218, name: 'Longest Common Prefix',             topic: 'strings',         difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/longest-common-prefix/' },
    { id: 219, name: 'Largest Number',                    topic: 'strings',         difficulty: 'medium', leetcode: 'https://leetcode.com/problems/largest-number/' },
    { id: 220, name: 'String to Integer (atoi)',          topic: 'strings',         difficulty: 'medium', leetcode: 'https://leetcode.com/problems/string-to-integer-atoi/' },
    { id: 221, name: 'Zigzag Conversion',                 topic: 'strings',         difficulty: 'medium', leetcode: 'https://leetcode.com/problems/zigzag-conversion/' },
    { id: 222, name: 'Roman to Integer',                  topic: 'strings',         difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/roman-to-integer/' },
    { id: 223, name: 'Integer to Roman',                  topic: 'strings',         difficulty: 'medium', leetcode: 'https://leetcode.com/problems/integer-to-roman/' },
    { id: 224, name: 'Count and Say',                     topic: 'strings',         difficulty: 'medium', leetcode: 'https://leetcode.com/problems/count-and-say/' },
    { id: 225, name: 'Implement strStr (KMP)',            topic: 'strings',         difficulty: 'medium', leetcode: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/' },
    { id: 226, name: 'Reverse Words in a String',         topic: 'strings',         difficulty: 'medium', leetcode: 'https://leetcode.com/problems/reverse-words-in-a-string/' },
    { id: 227, name: 'Valid Palindrome II',               topic: 'strings',         difficulty: 'easy',   leetcode: 'https://leetcode.com/problems/valid-palindrome-ii/' },
    { id: 228, name: 'Minimum Remove to Make Valid Parentheses', topic: 'strings',  difficulty: 'medium', leetcode: 'https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/' },
    { id: 229, name: 'Longest Palindromic Subsequence',   topic: 'strings',         difficulty: 'medium', leetcode: 'https://leetcode.com/problems/longest-palindromic-subsequence/' },
];

/* === Motivational Quotes for Nudge System === */
export const MOTIVATIONAL_QUOTES = [
    { text: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "It's not that I'm so smart, it's just that I stay with problems longer.", author: "Albert Einstein" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Consistency is more important than perfection.", author: "Unknown" },
    { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
    { text: "A problem well-stated is a problem half-solved.", author: "Charles Kettering" },
    { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
    { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
    { text: "Don't practice until you get it right. Practice until you can't get it wrong.", author: "Unknown" },
    { text: "Every expert was once a beginner. Keep solving!", author: "Unknown" },
    { text: "One problem a day keeps unemployment away.", author: "LeetCode Community" },
    { text: "The best algorithm is the one you understand.", author: "Unknown" },
    { text: "Don't compare your Chapter 1 to someone else's Chapter 20.", author: "Unknown" },
    { text: "Debugging is like being the detective in a crime movie where you're also the murderer.", author: "Filipe Fortes" },
];

/* === Achievement Badges === */
export const ACHIEVEMENTS = [
    { id: 'first-solve',    name: 'First Step',       icon: '🎯', description: 'Solve your very first problem', condition: (solved) => solved >= 1 },
    { id: 'ten-club',       name: 'Getting Started',  icon: '🔟', description: 'Solve 10 problems', condition: (solved) => solved >= 10 },
    { id: 'quarter',        name: 'Quarter Century',   icon: '🌟', description: 'Solve 25 problems', condition: (solved) => solved >= 25 },
    { id: 'half-century',   name: 'Half Century',      icon: '🏅', description: 'Solve 50 problems', condition: (solved) => solved >= 50 },
    { id: 'century',        name: 'Century Club',      icon: '💯', description: 'Solve 100 problems', condition: (solved) => solved >= 100 },
    { id: 'legend',         name: 'DSA Legend',        icon: '👑', description: 'Solve 200 problems', condition: (solved) => solved >= 200 },
    { id: 'streak-3',       name: 'On Fire',           icon: '🔥', description: 'Maintain a 3-day streak', condition: (_, streak) => streak >= 3 },
    { id: 'streak-7',       name: 'Week Warrior',      icon: '⚔️', description: 'Maintain a 7-day streak', condition: (_, streak) => streak >= 7 },
    { id: 'streak-14',      name: 'Fortnight Fighter',  icon: '🛡️', description: 'Maintain a 14-day streak', condition: (_, streak) => streak >= 14 },
    { id: 'streak-30',      name: 'Monthly Master',    icon: '🏆', description: 'Maintain a 30-day streak', condition: (_, streak) => streak >= 30 },
    { id: 'topic-master',   name: 'Topic Master',      icon: '📘', description: 'Complete 100% of any topic', condition: (_, __, topicCompletion) => topicCompletion },
    { id: 'hard-solver',    name: 'Fearless',          icon: '💪', description: 'Solve 10 hard problems', condition: (_, __, ___, hardSolved) => hardSolved >= 10 },
];

