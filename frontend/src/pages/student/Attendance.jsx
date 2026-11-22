import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import DataTable from '../../components/DataTable';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import StatusBadge from '../../components/StatusBadge';
import { getMyAttendance } from '../../api/attendance';

export default function StudentAttendance() {
  const [attendance, setAttendance] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    getMyAttendance()
      .then((data) => {
        if (isMounted) setAttendance(data);
      })
      .catch((err) => {
        console.error('Failed to load student attendance:', err);
        if (isMounted) setError('Attendance could not be loaded. Please try again later.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const subjects = attendance?.subjects || [];
  const filteredSubjects = selectedSubject === 'all'
    ? subjects
    : subjects.filter((subject) => subject.subjectId === selectedSubject);
  const columns = [
    {
      header: 'Subject',
      render: (subject) => (
        <div>
          <p className="font-semibold text-slate-900">{subject.subjectName}</p>
          <p className="text-xs text-slate-500">{subject.code}</p>
        </div>
      )
    },
    {
      header: 'Attended',
      render: (subject) => `${subject.attended} / ${subject.total}`
    },
    {
      header: 'Attendance',
      render: (subject) => (
        <div className="flex min-w-32 items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${subject.percentage < 75 ? 'bg-rose-500' : 'bg-emerald-500'}`}
              style={{ width: `${Math.min(subject.percentage, 100)}%` }}
            />
          </div>
          <span className="w-12 text-right font-semibold">{subject.percentage}%</span>
        </div>
      )
    },
    {
      header: 'Status',
      render: (subject) => (
        <StatusBadge
          status={subject.percentage < 75 ? 'WARNING' : 'GOOD'}
          label={subject.percentage < 75 ? 'Shortage' : 'Good'}
        />
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Attendance"
        description="Track your attendance by subject and stay above the 75% requirement."
      />

      {error && (
        <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard
          title="Overall Attendance"
          value={`${attendance?.overallPercentage ?? 0}%`}
          icon={CheckCircle2}
          subtitle={`${attendance?.totalAttended ?? 0} of ${attendance?.totalClasses ?? 0} classes attended`}
          isAlert={attendance?.hasWarning}
          alertMessage={attendance?.hasWarning ? 'At least one subject is below 75%' : null}
        />
        <StatCard
          title="Subjects Below 75%"
          value={attendance?.lowAttendanceSubjects?.length ?? 0}
          icon={AlertTriangle}
          subtitle="Attendance shortage requiring attention"
          isAlert={(attendance?.lowAttendanceSubjects?.length ?? 0) > 0}
        />
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-bold text-slate-900">Subject breakdown</h2>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <span>Subject</span>
            <select
              value={selectedSubject}
              onChange={(event) => setSelectedSubject(event.target.value)}
              className="max-w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-800"
            >
              <option value="all">All subjects</option>
              {subjects.map((subject) => (
                <option key={subject.subjectId} value={subject.subjectId}>
                  {subject.subjectName}
                </option>
              ))}
            </select>
          </label>
        </div>
        <DataTable
          columns={columns}
          data={filteredSubjects}
          isLoading={loading}
          emptyMessage="No attendance records found for this subject."
          keyExtractor={(subject) => subject.subjectId}
        />
      </section>
    </div>
  );
}
