import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: null,
        userType: null,
        email: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        if (token) {
            const decoded = jwtDecode(token);
            setAuth({
                token,
                userType: decoded.userType,
                email: decoded.email,
            });
        }
    }, []);

    const login = async (email, password) => {
        try {
            // debugger;
            const response = await axios.post('dorm-finder-api.vercel.app/login', { email, password });
            if (response.data.message === 'success') {
                const { token, userType } = response.data;
                localStorage.setItem('token', token);
                const decoded = jwtDecode(token);
                setAuth({ token, userType, email: decoded.email });
                return true; // Indicate success
            } else {
                // Handle login failure (e.g., invalid credentials)
                console.error('Login failed: Invalid credentials');
                return false; // Indicate failure
            }
        } catch (error) {
            console.error('Login error:', error);
            return false; // Indicate failure
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ token: null, userType: null, email: null });
        console.log(token);
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
