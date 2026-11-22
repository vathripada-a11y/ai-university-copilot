import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { user, role, isAuthenticated, loading, notifyPermissionDenied } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 text-xs font-semibold text-slate-500">Checking authorization...</p>
        </div>
      </div>
    );
  }

  // If not logged in, redirect to login page
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user role is not permitted for this route
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // Notify user with "Not permitted" alert
    notifyPermissionDenied(`Not permitted: Your account role (${role}) cannot access ${location.pathname}.`);

    // Redirect to their own role dashboard
    const roleHome =
      role === 'STUDENT' ? '/student' :
      role === 'FACULTY' ? '/faculty' :
      role === 'ADMIN' ? '/admin' : '/login';

    return <Navigate to={roleHome} replace />;
  }

  return <Outlet />;
}
