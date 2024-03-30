import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmailVerify from './components/Auth/emailVerify';
import Register from './components/Auth/register';
import Login from './components/Auth/login';
import ProtectedPage from './pages/protectedPage';
import ProtectedRoute from './contexts/protectedRoute';
import AuthProvider from './contexts/authProvider';
import './index.css'

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
        </Routes>
      </AuthProvider>
    </BrowserRouter >
  );
}
