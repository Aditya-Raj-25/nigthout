import { createContext, useContext, useState } from 'react';
import { login as apiLogin, signup as apiSignup } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (email, password) => {
        try {
            const response = await apiLogin(email, password);
            if (response.success) {
                setUser(response.user);
                setIsAuthenticated(true);
                return { success: true, user: response.user };
            }
            return { success: false, error: 'Login failed' };
        } catch (error) {
            return { success: false, error: error.message || 'Login failed' };
        }
    };

    const signup = async (email, password, name) => {
        try {
            const response = await apiSignup(name, email, password);
            if (response.success) {
                setUser(response.user);
                setIsAuthenticated(true);
                return { success: true, user: response.user };
            }
            return { success: false, error: 'Signup failed' };
        } catch (error) {
            return { success: false, error: error.message || 'Signup failed' };
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
