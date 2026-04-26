import { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext(null);

// ─── Helper Functions ───────────────────────────────────
function getUsers() {
  return JSON.parse(localStorage.getItem('dsa-users') || '{}');
}

function saveUsers(users) {
  localStorage.setItem('dsa-users', JSON.stringify(users));
}

function hashPassword(password) {
  // Simple hash for client-side (NOT cryptographically secure — fine for a personal tracker)
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'h_' + Math.abs(hash).toString(36) + '_' + password.length;
}

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function getRandomAvatarColor() {
  const colors = [
    'linear-gradient(135deg, #6366f1, #8b5cf6)',
    'linear-gradient(135deg, #06b6d4, #0891b2)',
    'linear-gradient(135deg, #22c55e, #16a34a)',
    'linear-gradient(135deg, #f59e0b, #d97706)',
    'linear-gradient(135deg, #ef4444, #dc2626)',
    'linear-gradient(135deg, #ec4899, #be185d)',
    'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    'linear-gradient(135deg, #14b8a6, #0d9488)',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ─── Auth Provider ──────────────────────────────────────
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem('dsa-current-user') || 'null');
  });
  const [loading] = useState(false); // No async loading needed for localStorage

  const login = useCallback(async (email, password) => {
    const users = getUsers();
    const user = users[email];

    if (!user || user.password !== hashPassword(password)) {
      throw { status: 401, message: 'Invalid email or password' };
    }

    setCurrentUser(user);
    localStorage.setItem('dsa-current-user', JSON.stringify(user));
    return { user };
  }, []);

  const register = useCallback(async (fullName, email, password) => {
    const users = getUsers();

    if (users[email]) {
      throw { status: 409, message: 'An account with this email already exists' };
    }

    const user = {
      fullName,
      email,
      password: hashPassword(password),
      avatar: getInitials(fullName),
      avatarColor: getRandomAvatarColor(),
      createdAt: new Date().toISOString(),
    };

    users[email] = user;
    saveUsers(users);

    setCurrentUser(user);
    localStorage.setItem('dsa-current-user', JSON.stringify(user));
    return { user };
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('dsa-current-user');
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
