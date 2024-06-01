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
        console.log('Tokesdndbsjn:', token);
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
            const response = await axios.post('http://localhost:3001/login', { email, password });
            if (response.data.message === 'success') {
                const { token, userType } = response.data;
                localStorage.setItem('token', token);
                const decoded = jwtDecode(token);
                setAuth({ token, userType, email: decoded.email });
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ token: null, userType: null, email: null });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
