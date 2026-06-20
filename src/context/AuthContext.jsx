import React, { createContext, useContext, useState} from 'react';
import { API_BASE_URL } from "../api/config.js";

//createContext - shares a values across the component tree 
// w/out manually passing it down as a prop through every level in between (prop drilling)
const AuthContext = createContext(null);


export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');

        if (!stored) {
            return null;
        } else {
            //user obj stored as a string in localStorage
            // therefore need to parse it into json obj to be useable throughout components
            return JSON.parse(stored);
        }
    });

    const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken'));

    const storeSession = (userData, access, refresh) => {
        //user obj from backend
        setUser(userData);
        setAccessToken(access);
        setRefreshToken(refresh);
        
        //turn user obj into string to be saved in localStorage
        //localStorage can only hold text
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
    };

    //Register user
    const register = async ({ firstName, lastName, username, password }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    username,
                    password
                })
            });
            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: flattenErrors(data) };
            }

            storeSession(data.user, data.access, data.refresh);
            return { success: true };
        } catch {
            return { success: false, error: 'Connection Error.' };
        }
    };

    //Login user
    const login = async ({ username, password }) => {
        try {
            //login user
            // returns user obj, access and refresh tokens
            const response = await fetch(`${API_BASE_URL}/token/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username,
                    password
                })
            });
            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: data.detail || 'Invalid username or password.' };
            }

            //store logged in user data, access token, and refresh token in session
            storeSession(data.user, data.access, data.refresh);
            return { success: true };
        } catch {
            return { success: false, error: 'Connection error.'};
        }
    };

    //logout user
    const logout = () => {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    return(
        <AuthContext.Provider value={{ user, accessToken, refreshToken, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function flattenErrors(errorData) {
    return Object.values(errorData).flat().join(' ');
}

export function useAuth() {
    return useContext(AuthContext);
}

