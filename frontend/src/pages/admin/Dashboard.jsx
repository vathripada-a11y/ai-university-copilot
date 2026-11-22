import React, { useState, useEffect } from 'react';
import {
  Users,
  GraduationCap,
  Bell,
  Activity,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import StatusBadge from '../../components/StatusBadge';
import { getAdminStats } from '../../api/users';
import { getAllNotices } from '../../api/notices';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [allNotices, setAllNotices] = useState([]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([getAdminStats(), getAllNotices()])
      .then(([adminStats, notices]) => {
        if (isMounted) {
          setStats(adminStats);
          setAllNotices(notices);
        }
      })
      .catch((err) => {
        console.error('Failed to load admin dashboard data:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="w-8 h-8 border-3 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-3 text-xs text-slate-500 font-medium">Loading institutional administration console...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Campus Administration Console"
        description="SDM Institute of Technology, Ujire • Academic Year 2026-27"
        badge={<span className="px-2 py-0.5 text-xs font-semibold rounded bg-slate-200 text-slate-800">Master Admin</span>}
      />

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={stats?.totalStudents || 0}
          icon={GraduationCap}
          subtitle="ISE 5th Sem • Section A"
        />

        <StatCard
          title="Total Faculty"
          value={stats?.totalFaculty || 0}
          icon={Users}
          subtitle="Department of ISE"
        />

        <StatCard
          title="Notices Published"
          value={stats?.noticesPublished || 0}
          icon={Bell}
          subtitle="Active campus & dept circulars"
        />

        <StatCard
          title="Active Users"
          value={stats?.activeUsers || 0}
          icon={Activity}
          subtitle="Authenticated portal accounts"
        />
      </div>

      {/* Administration Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notices & Circulars Overview (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-900" />
              <h2 className="text-sm font-bold text-slate-900">
                Published Notices & Audience Targeting
              </h2>
            </div>
            <Link
              to="/admin/notices"
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
            >
              Manage Circulars <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {allNotices.map((notice) => (
              <div
                key={notice.id}
                className="p-3.5 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-semibold text-slate-900">
                      {notice.title}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Published by {notice.publishedBy} • {notice.publishedDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {notice.audience}
                    </span>
                    <StatusBadge status={notice.priority} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System & Institutional Quick Actions (1 col) */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
              <ShieldCheck className="w-4 h-4 text-blue-900" />
              <h2 className="text-sm font-bold text-slate-900">Institutional Controls</h2>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-slate-200/80 bg-slate-50">
                <p className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-900" />
                  SDMIT Department of ISE
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  5th Semester Section A configured with 5 Core Subjects, 10 Student Profiles, and 2 Primary Faculty Members.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  to="/admin/users"
                  className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-xs font-medium text-slate-800 transition"
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-blue-900" /> Manage Students & Faculty
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </Link>

                <Link
                  to="/admin/timetable"
                  className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-xs font-medium text-slate-800 transition"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-900" /> Configure Master Schedule
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
            Signed in as {user?.name}
          </div>
        </div>
      </div>
    </div>
  );
}
