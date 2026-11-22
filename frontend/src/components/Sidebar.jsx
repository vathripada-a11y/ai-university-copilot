import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  Calendar,
  CheckCircle2,
  BookOpen,
  ClipboardList,
  Bell,
  Users,
  Bot,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ isOpen, onClose }) {
  const { user, role } = useAuth();

  // Role-specific navigation links
  const getNavItems = () => {
    switch (role) {
      case 'STUDENT':
        return [
          { name: 'Dashboard', path: '/student', icon: LayoutDashboard },
          { name: 'Attendance', path: '/student/attendance', icon: CheckCircle2 },
          { name: 'Timetable', path: '/student/timetable', icon: Calendar },
          { name: 'Assignments', path: '/student/assignments', icon: ClipboardList },
          { name: 'Notices', path: '/student/notices', icon: Bell },
          { name: 'AI Copilot', path: '/student/copilot', icon: Bot }
        ];
      case 'FACULTY':
        return [
          { name: 'Dashboard', path: '/faculty', icon: LayoutDashboard },
          { name: 'My Timetable', path: '/faculty/timetable', icon: Calendar },
          { name: 'Course Offerings', path: '/faculty/offerings', icon: BookOpen },
          { name: 'Mark Attendance', path: '/faculty/attendance', icon: CheckCircle2 },
          { name: 'Assignments', path: '/faculty/assignments', icon: ClipboardList },
          { name: 'Notices', path: '/faculty/notices', icon: Bell },
          { name: 'AI Copilot', path: '/faculty/copilot', icon: Bot }
        ];
      case 'ADMIN':
        return [
          { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
          { name: 'User Management', path: '/admin/users', icon: Users },
          { name: 'Master Timetable', path: '/admin/timetable', icon: Calendar },
          { name: 'Notices & Circulars', path: '/admin/notices', icon: Bell },
          { name: 'AI Copilot', path: '/admin/copilot', icon: Bot }
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header / Brand */}
        <div className="h-16 px-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-white leading-tight">
                SDMIT Copilot
              </h2>
              <p className="text-[10px] text-slate-400 font-medium">
                Dept. of ISE • 5th Sem
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Quick Info */}
        <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-950/40">
          <p className="text-xs text-slate-400">Signed in as</p>
          <p className="text-sm font-semibold text-white truncate mt-0.5">
            {user?.name || 'User'}
          </p>
          <p className="text-[11px] text-blue-400 font-mono mt-0.5">
            {user?.usn || user?.designation || user?.department || role}
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/student' || item.path === '/faculty' || item.path === '/admin'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-700 text-white shadow-xs font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
          SDMIT Ujire • Mini Project 2026
        </div>
      </aside>
    </>
  );
}
