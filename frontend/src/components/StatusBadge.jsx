import React from 'react';

const BADGE_STYLES = {
  // Assignment / Workflow Statuses
  SUBMITTED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  LATE: 'bg-orange-50 text-orange-700 border-orange-200',
  PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
  OVERDUE: 'bg-rose-50 text-rose-700 border-rose-200',

  // Attendance Statuses
  PRESENT: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  ABSENT: 'bg-rose-50 text-rose-700 border-rose-200',
  WARNING: 'bg-rose-100 text-rose-800 border-rose-300 font-semibold',
  GOOD: 'bg-emerald-50 text-emerald-700 border-emerald-200',

  // Notice Priority
  HIGH: 'bg-rose-50 text-rose-700 border-rose-200',
  MEDIUM: 'bg-blue-50 text-blue-700 border-blue-200',
  LOW: 'bg-slate-100 text-slate-700 border-slate-200',
  ALL: 'bg-slate-100 text-slate-700 border-slate-200',

  // Roles
  STUDENT: 'bg-blue-50 text-blue-800 border-blue-200',
  FACULTY: 'bg-purple-50 text-purple-800 border-purple-200',
  ADMIN: 'bg-slate-100 text-slate-800 border-slate-300'
};

export default function StatusBadge({ status, label }) {
  const normalizedKey = (status || '').toUpperCase();
  const style = BADGE_STYLES[normalizedKey] || 'bg-slate-100 text-slate-700 border-slate-200';
  const displayLabel = label || status || 'Unknown';

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${style}`}
    >
      {displayLabel}
    </span>
  );
}
