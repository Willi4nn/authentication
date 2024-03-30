import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './authProvider';

export default function ProtectedRoute() {
  const { isSigned } = useAuth();

  return isSigned ? (
    <Outlet />
  ) : (
    <Navigate to="/"/>
  )
}
