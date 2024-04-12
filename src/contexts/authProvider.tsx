import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../server/api";

interface AuthContextProps {
  isSigned: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSigned, setIsSigned] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadingStoreData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsSigned(true);
      } else {
        setIsSigned(false);
      }

    };
    loadingStoreData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/api/auth/login", { email, password });
      const token = response.data.data;
      localStorage.setItem('token', token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsSigned(true);
      navigate('/protected-page');
    } catch (error) {
      console.error('Login Error:', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsSigned(false);
  };

  return (
    <AuthContext.Provider value={{ isSigned, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}