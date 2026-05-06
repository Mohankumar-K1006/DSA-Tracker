/* =====================================================
   DSA Tracker — API Client
   Centralized fetch wrapper with JWT token injection
   ===================================================== */

const API_BASE = '/api';

function getToken() {
    return localStorage.getItem('dsa-token');
}

function setToken(token) {
    localStorage.setItem('dsa-token', token);
}

function removeToken() {
    localStorage.removeItem('dsa-token');
}

async function request(endpoint, options = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await res.json();

    if (!res.ok) {
        const error = new Error(data.message || 'Request failed');
        error.status = res.status;
        throw error;
    }

    return data;
}

// ─── Auth API ───────────────────────────────────────────

export async function apiLogin(email, password) {
    const data = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
    if (data.token) setToken(data.token);
    return data;
}

export async function apiRegister(fullName, email, password) {
    const data = await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ fullName, email, password }),
    });
    if (data.token) setToken(data.token);
    return data;
}

export async function apiGetCurrentUser() {
    return request('/auth/me');
}

export function apiLogout() {
    removeToken();
}

export function hasToken() {
    return !!getToken();
}

// ─── Progress API ───────────────────────────────────────

export async function apiGetProgress() {
    return request('/progress');
}

export async function apiSolveProblem(problemId, difficulty, topic, timeSpent) {
    return request('/progress/solve', {
        method: 'POST',
        body: JSON.stringify({ problemId, difficulty, topic, timeSpent }),
    });
}

export async function apiUnsolveProblem(problemId, difficulty) {
    return request('/progress/unsolve', {
        method: 'POST',
        body: JSON.stringify({ problemId, difficulty }),
    });
}

export async function apiSaveNotes(problemId, notes) {
    return request(`/progress/notes/${problemId}`, {
        method: 'PUT',
        body: JSON.stringify({ notes }),
    });
}

export async function apiGetStats() {
    return request('/progress/stats');
}

export async function apiResetProgress() {
    return request('/progress/reset', {
        method: 'POST',
    });
}

export async function apiUpdateDailyGoal(dailyGoal) {
    return request('/progress/daily-goal', {
        method: 'PUT',
        body: JSON.stringify({ dailyGoal }),
    });
}
