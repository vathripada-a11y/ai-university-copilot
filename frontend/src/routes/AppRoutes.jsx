import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/Layout';
import PlaceholderPage from '../components/PlaceholderPage';

// Pages
import Login from '../pages/auth/Login';
import StudentDashboard from '../pages/student/Dashboard';
import FacultyDashboard from '../pages/faculty/Dashboard';
import AdminDashboard from '../pages/admin/Dashboard';

function RootRedirect() {
  const { role, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  switch (role) {
    case 'STUDENT':
      return <Navigate to="/student" replace />;
    case 'FACULTY':
      return <Navigate to="/faculty" replace />;
    case 'ADMIN':
      return <Navigate to="/admin" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}

function LoginRoute() {
  const { role, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    switch (role) {
      case 'STUDENT':
        return <Navigate to="/student" replace />;
      case 'FACULTY':
        return <Navigate to="/faculty" replace />;
      case 'ADMIN':
        return <Navigate to="/admin" replace />;
      default:
        break;
    }
  }

  return <Login />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root & Authentication */}
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<LoginRoute />} />

      {/* STUDENT ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
        <Route element={<Layout />}>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/attendance" element={<PlaceholderPage title="My Attendance Records" />} />
          <Route path="/student/timetable" element={<PlaceholderPage title="Section A Timetable" />} />
          <Route path="/student/assignments" element={<PlaceholderPage title="My Coursework & Assignments" />} />
          <Route path="/student/notices" element={<PlaceholderPage title="Student Notices & Circulars" />} />
          <Route path="/student/copilot" element={<PlaceholderPage title="AI University Copilot Assistant" />} />
        </Route>
      </Route>

      {/* FACULTY ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={['FACULTY']} />}>
        <Route element={<Layout />}>
          <Route path="/faculty" element={<FacultyDashboard />} />
          <Route path="/faculty/timetable" element={<PlaceholderPage title="My Teaching Timetable" />} />
          <Route path="/faculty/offerings" element={<PlaceholderPage title="Assigned Course Offerings" />} />
          <Route path="/faculty/attendance" element={<PlaceholderPage title="Mark Student Attendance" />} />
          <Route path="/faculty/assignments" element={<PlaceholderPage title="Manage Assignments & Grades" />} />
          <Route path="/faculty/notices" element={<PlaceholderPage title="Departmental Circulars" />} />
          <Route path="/faculty/copilot" element={<PlaceholderPage title="AI Teaching Assistant Copilot" />} />
        </Route>
      </Route>

      {/* ADMIN ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route element={<Layout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<PlaceholderPage title="User Management (Students & Faculty)" />} />
          <Route path="/admin/timetable" element={<PlaceholderPage title="Master Institution Schedule" />} />
          <Route path="/admin/notices" element={<PlaceholderPage title="Circulars & Notice Publication" />} />
          <Route path="/admin/copilot" element={<PlaceholderPage title="Copilot Campus Operations Console" />} />
        </Route>
      </Route>

      {/* Catch-All / 404 */}
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}
