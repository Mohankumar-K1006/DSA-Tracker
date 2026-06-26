import { createContext, useState, useCallback, useEffect } from 'react';
import { apiLogin, apiRegister, apiLogout, apiGetCurrentUser, hasToken } from "./utils/api";

export const AuthContext = createContext(null);

// ─── Auth Provider ──────────────────────────────────────
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // On mount, check if we have a valid token and fetch user
    useEffect(() => {
        async function checkAuth() {
            if (!hasToken()) {
                setLoading(false);
                return;
            }
            try {
                const data = await apiGetCurrentUser();
                setCurrentUser(data.user);
            } catch {
                // Token is invalid/expired — clear it
                apiLogout();
                setCurrentUser(null);
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, []);

    const login = useCallback(async (email, password) => {
        const data = await apiLogin(email, password);
        setCurrentUser(data.user);
        return data;
    }, []);

    const register = useCallback(async (fullName, email, password) => {
        const data = await apiRegister(fullName, email, password);
        setCurrentUser(data.user);
        return data;
    }, []);

    const logout = useCallback(() => {
        apiLogout();
        setCurrentUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
