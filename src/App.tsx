import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmailVerify from './components/Auth/emailVerify';
import ForgotPassword from './components/Auth/forgotPassword';
import Login from './components/Auth/login';
import PasswordReset from './components/Auth/passwordReset';
import Register from './components/Auth/register';
import AuthProvider from './contexts/authProvider';
import ProtectedRoute from './contexts/protectedRoute';
import './index.css';
import ProtectedPage from './pages/protectedPage';

export default function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/protected-page' element={<ProtectedRoute />}>
            <Route path="/protected-page" element={<ProtectedPage />} />
          </Route>
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter >
  );
}
