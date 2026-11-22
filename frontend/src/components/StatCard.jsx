import React from 'react';

export default function StatCard({
  title,
  value,
  icon: Icon,
  subtitle,
  badgeText,
  isAlert = false,
  alertMessage
}) {
  return (
    <div
      className={`rounded-xl border p-5 transition-all shadow-sm ${
        isAlert
          ? 'bg-rose-50/70 border-rose-200'
          : 'bg-white border-slate-200/80 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <span
              className={`text-2xl font-bold tracking-tight ${
                isAlert ? 'text-rose-700' : 'text-slate-900'
              }`}
            >
              {value}
            </span>
            {badgeText && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
                {badgeText}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div
            className={`p-3 rounded-lg ${
              isAlert
                ? 'bg-rose-100 text-rose-600'
                : 'bg-blue-50 text-blue-900'
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {subtitle && (
        <p className="mt-3 text-xs text-slate-600 flex items-center gap-1">
          {subtitle}
        </p>
      )}

      {isAlert && alertMessage && (
        <div className="mt-3 pt-3 border-t border-rose-200 text-xs text-rose-700 font-medium flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
          {alertMessage}
        </div>
      )}
    </div>
  );
}
