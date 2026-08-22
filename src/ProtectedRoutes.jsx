import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoutes({ allowedRoles }) {
  const authData = JSON.parse(localStorage.getItem('nexus_user') || 'null');

  // 1. Agar user logged in nahi he -> Send to Login
  if (!authData || !authData.token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Agar user wrong role ke sath access kar raha he -> Redirect to appropriate dashboard
  if (allowedRoles && !allowedRoles.includes(authData.role)) {
    return <Navigate to={authData.role === 'admin' ? '/admin' : '/overview'} replace />;
  }

  // 3. Authenticated & Authorized -> Render requested route
  return <Outlet />;
}