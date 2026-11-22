import React, { useEffect, useState } from 'react';
import { MapPin, UserRound } from 'lucide-react';
import DataTable from '../../components/DataTable';
import PageHeader from '../../components/PageHeader';
import { getMyTimetable } from '../../api/timetable';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getInitialDay = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  return DAYS.includes(today) ? today : 'Monday';
};

export default function StudentTimetable() {
  const [timetable, setTimetable] = useState([]);
  const [selectedDay, setSelectedDay] = useState(getInitialDay);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    getMyTimetable()
      .then((slots) => {
        if (isMounted) setTimetable(slots);
      })
      .catch((err) => {
        console.error('Failed to load student timetable:', err);
        if (isMounted) setError('The timetable could not be loaded. Please try again later.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const daySlots = timetable.filter((slot) => slot.day === selectedDay);
  const columns = [
    { header: 'Time', accessor: 'time' },
    {
      header: 'Subject',
      render: (slot) => (
        <div>
          <p className="font-semibold text-slate-900">{slot.subject}</p>
          <p className="text-xs text-slate-500">{slot.code}</p>
        </div>
      )
    },
    {
      header: 'Faculty',
      render: (slot) => (
        <span className="inline-flex items-center gap-2">
          <UserRound className="h-4 w-4 text-slate-400" />
          {slot.faculty}
        </span>
      )
    },
    {
      header: 'Room',
      render: (slot) => (
        <span className="inline-flex items-center gap-2">
          <MapPin className="h-4 w-4 text-slate-400" />
          {slot.room}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Section A Timetable"
        description="Browse your weekly class schedule by day."
      />

      {error && (
        <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div role="tablist" aria-label="Timetable day" className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {DAYS.map((day) => (
          <button
            key={day}
            id={`day-tab-${day}`}
            type="button"
            role="tab"
            aria-selected={selectedDay === day}
            onClick={() => setSelectedDay(day)}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
              selectedDay === day
                ? 'border-blue-900 bg-blue-900 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div role="tabpanel" aria-labelledby={`day-tab-${selectedDay}`} className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900">{selectedDay} classes</h2>
        <DataTable
          columns={columns}
          data={daySlots}
          isLoading={loading}
          emptyMessage={`No classes scheduled for ${selectedDay}.`}
          keyExtractor={(slot) => slot.id}
        />
      </div>
    </div>
  );
}
