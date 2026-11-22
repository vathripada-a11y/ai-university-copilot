import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Calendar,
  ClipboardList,
  Bell,
  AlertTriangle,
  ArrowRight,
  Clock,
  MapPin,
  UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import StatusBadge from '../../components/StatusBadge';
import { getMyAttendance } from '../../api/attendance';
import { getClassesToday } from '../../api/timetable';
import { getMyAssignments } from '../../api/assignments';
import { getMyNotices } from '../../api/notices';
import { useAuth } from '../../context/AuthContext';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState(null);
  const [todayClasses, setTodayClasses] = useState(null);
  const [assignmentData, setAssignmentData] = useState(null);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      getMyAttendance(),
      getClassesToday(),
      getMyAssignments(),
      getMyNotices()
    ])
      .then(([attendance, classes, assignments, noticeList]) => {
        if (isMounted) {
          setAttendanceData(attendance);
          setTodayClasses(classes);
          setAssignmentData(assignments);
          setNotices(noticeList.slice(0, 4));
        }
      })
      .catch((err) => {
        console.error('Failed to load student dashboard data:', err);
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
        <p className="mt-3 text-xs text-slate-500 font-medium">Loading your student dashboard...</p>
      </div>
    );
  }

  const hasLowAttendance = attendanceData?.hasWarning;
  const lowSubjects = attendanceData?.lowAttendanceSubjects || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'Student'}!`}
        description={`ISE 5th Semester • Section ${user?.section || 'A'} • USN: ${user?.usn || 'N/A'}`}
        badge={<span className="px-2 py-0.5 text-xs font-semibold rounded bg-blue-100 text-blue-800">VTU 2021 Scheme</span>}
      />

      {/* Critical Low Attendance Alert Banner (triggers for Ananya Rao) */}
      {hasLowAttendance && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-rose-100 text-rose-700 mt-0.5">
              <AlertTriangle className="w-5 h-5 shrink-0" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-rose-900">
                  Attendance Shortage Warning (&lt; 75%)
                </h3>
                <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-rose-200 text-rose-800">
                  Action Required
                </span>
              </div>
              <p className="text-xs text-rose-700 mt-1">
                Your attendance is below the mandatory VTU 75% threshold in{' '}
                <span className="font-semibold">
                  {lowSubjects.map((s) => `${s.subjectName} (${s.percentage}%)`).join(', ')}
                </span>
                . You must attend upcoming lectures to avoid hall-ticket withholding.
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <Link
                  to="/student/attendance"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-rose-900 hover:text-rose-950 underline"
                >
                  View Attendance Breakdown <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Attendance"
          value={`${attendanceData?.overallPercentage || 0}%`}
          icon={CheckCircle2}
          subtitle={`${attendanceData?.totalAttended || 0} of ${attendanceData?.totalClasses || 0} classes attended`}
          isAlert={hasLowAttendance}
          alertMessage={hasLowAttendance ? '1 subject below 75%' : null}
        />

        <StatCard
          title="Classes Today"
          value={todayClasses?.count || 0}
          icon={Calendar}
          subtitle={`${todayClasses?.day || 'Today'} • Next: ${todayClasses?.nextClass?.subject || 'None'}`}
        />

        <StatCard
          title="Pending Assignments"
          value={assignmentData?.pendingCount || 0}
          icon={ClipboardList}
          subtitle={
            assignmentData?.overdueCount > 0
              ? `${assignmentData.overdueCount} assignment overdue`
              : 'All caught up'
          }
          isAlert={assignmentData?.overdueCount > 0}
          alertMessage={assignmentData?.overdueCount > 0 ? '1 assignment is overdue!' : null}
        />

        <StatCard
          title="Latest Notices"
          value={notices.length}
          icon={Bell}
          subtitle="Circulated for Section A & Students"
        />
      </div>

      {/* Two Column Section: Schedule & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Classes Today (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-900" />
              <h2 className="text-sm font-bold text-slate-900">
                Today's Class Schedule ({todayClasses?.day})
              </h2>
            </div>
            <Link
              to="/student/timetable"
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
                        <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                        {slot.faculty}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {slot.room}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 sm:mt-0 flex items-center gap-1.5 text-xs font-medium text-blue-950 bg-blue-50 px-2.5 py-1 rounded-md self-start sm:self-auto">
                    <Clock className="w-3.5 h-3.5 text-blue-800" />
                    <span>{slot.time}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 py-6 text-center">
              No classes scheduled for today.
            </p>
          )}
        </div>

        {/* Notices Panel (1 col) */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-900" />
              <h2 className="text-sm font-bold text-slate-900">Recent Notices</h2>
            </div>
            <Link
              to="/student/notices"
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
                  <span className="font-medium text-slate-600 uppercase">
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
