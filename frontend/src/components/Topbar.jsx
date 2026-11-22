import React from 'react';
import { Menu, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StatusBadge from './StatusBadge';

export default function Topbar({ onMenuClick }) {
  const { user, role, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between shadow-xs">
      {/* Left: Mobile Toggle & Context */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-hidden"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            SDM Institute of Technology, Ujire
          </p>
          <p className="text-sm font-bold text-slate-800">
            Intelligent Campus Platform
          </p>
        </div>
      </div>

      {/* Right: Demo Badge, User Chip, Logout */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Always-visible Demo Data Badge */}
        <div
          title="This application is running in prototype demonstration mode with synthetic campus data."
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 shadow-2xs select-none"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Demo data</span>
        </div>

        {/* User Profile & Role Chip */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-semibold text-slate-900 leading-tight">
              {user?.name || 'User'}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              {user?.email}
            </span>
          </div>

          <StatusBadge status={role} />
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          title="Sign out of current account"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-50 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 border border-slate-200 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
