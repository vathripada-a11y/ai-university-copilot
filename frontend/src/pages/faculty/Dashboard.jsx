import React, { useState, useEffect } from 'react';
import {
  Calendar,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Bell,
  ArrowRight,
  Clock,
  MapPin,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import StatusBadge from '../../components/StatusBadge';
import { getClassesToday } from '../../api/timetable';
import { getFacultyOfferings } from '../../api/users';
import { getFacultyAttendanceStats } from '../../api/attendance';
import { getFacultyAssignments } from '../../api/assignments';
import { getMyNotices } from '../../api/notices';
import { useAuth } from '../../context/AuthContext';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [todayClasses, setTodayClasses] = useState(null);
  const [offerings, setOfferings] = useState(null);
  const [attendanceStats, setAttendanceStats] = useState(null);
  const [assignmentStats, setAssignmentStats] = useState(null);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      getClassesToday(),
      getFacultyOfferings(),
      getFacultyAttendanceStats(),
      getFacultyAssignments(),
      getMyNotices()
    ])
      .then(([classes, courseOfferings, attStats, asgStats, noticeList]) => {
        if (isMounted) {
          setTodayClasses(classes);
          setOfferings(courseOfferings);
          setAttendanceStats(attStats);
          setAssignmentStats(asgStats);
          setNotices(noticeList.slice(0, 4));
        }
      })
      .catch((err) => {
        console.error('Failed to load faculty dashboard data:', err);
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
        <p className="mt-3 text-xs text-slate-500 font-medium">Loading faculty portal...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title={`Welcome, ${user?.name || 'Faculty Member'}`}
        description={`${user?.designation || 'Faculty'} • Department of Information Science & Engineering`}
        badge={<span className="px-2 py-0.5 text-xs font-semibold rounded bg-purple-100 text-purple-800">Faculty Portal</span>}
      />

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Classes Today"
          value={todayClasses?.count || 0}
          icon={Calendar}
          subtitle={`${todayClasses?.day || 'Today'} • Scheduled sessions`}
        />

        <StatCard
          title="My Offerings"
          value={offerings?.count || 0}
          icon={BookOpen}
          subtitle={offerings?.offerings?.map((o) => o.shortName).join(', ') || 'Assigned subjects'}
        />

        <StatCard
          title="Pending Attendance"
          value={attendanceStats?.pendingToMarkCount || 0}
          icon={CheckCircle2}
          subtitle="Classes pending entry"
          isAlert={attendanceStats?.pendingToMarkCount > 0}
          alertMessage={attendanceStats?.pendingToMarkCount > 0 ? 'Mark today\'s class attendance' : null}
        />

        <StatCard
          title="Assignments Created"
          value={assignmentStats?.totalCreated || 0}
          icon={ClipboardList}
          subtitle="Active submissions in progress"
        />
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Teaching Schedule (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-900" />
              <h2 className="text-sm font-bold text-slate-900">
                Today's Teaching Schedule ({todayClasses?.day})
              </h2>
            </div>
            <Link
              to="/faculty/timetable"
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
            >
              Full Timetable <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {todayClasses?.slots?.length > 0 ? (
            <div className="space-y-3">
              {todayClasses.slots.map((slot, idx) => (
                <div
                  key={slot.id || idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900">
                        {slot.subject}
                      </span>
                      <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                        {slot.code}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        ISE 5th Sem - Section A
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {slot.room}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 sm:mt-0 flex items-center gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-purple-900 bg-purple-50 px-2.5 py-1 rounded-md">
                      <Clock className="w-3.5 h-3.5 text-purple-700" />
                      <span>{slot.time}</span>
                    </div>
                    <Link
                      to="/faculty/attendance"
                      className="px-2.5 py-1 text-xs font-medium bg-blue-900 text-white rounded-md hover:bg-blue-800 transition"
                    >
                      Mark
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 py-6 text-center">
              No teaching sessions scheduled for today.
            </p>
          )}
        </div>

        {/* Notices for Faculty */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-purple-900" />
              <h2 className="text-sm font-bold text-slate-900">Staff & Campus Notices</h2>
            </div>
            <Link
              to="/faculty/notices"
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3 flex-1">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {notice.title}
                  </h4>
                  <StatusBadge status={notice.priority} />
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">
                  {notice.content}
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{notice.publishedDate}</span>
                  <span className="font-semibold text-purple-800">
                    {notice.audience}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
