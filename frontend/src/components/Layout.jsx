import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AlertCircle, X } from 'lucide-react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { permissionNotice, clearPermissionNotice } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100/70 flex">
      {/* Sidebar (Desktop fixed/static, Mobile slide-over) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* Unauthorized Redirection Alert Banner */}
          {permissionNotice && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">Access Restricted</p>
                  <p className="text-xs text-rose-700 mt-0.5">{permissionNotice}</p>
                </div>
              </div>
              <button
                onClick={clearPermissionNotice}
                className="p-1 rounded-md text-rose-600 hover:bg-rose-100"
                aria-label="Dismiss alert"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <Outlet />
        </main>
      </div>
    </div>
  );
}
