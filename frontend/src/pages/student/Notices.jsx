import React, { useEffect, useState } from 'react';
import DataTable from '../../components/DataTable';
import PageHeader from '../../components/PageHeader';
import StatusBadge from '../../components/StatusBadge';
import { getMyNotices } from '../../api/notices';

const formatDate = (date) => new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
});

export default function StudentNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    getMyNotices()
      .then((items) => {
        if (isMounted) setNotices(items);
      })
      .catch((err) => {
        console.error('Failed to load student notices:', err);
        if (isMounted) setError('Notices could not be loaded. Please try again later.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const columns = [
    {
      header: 'Notice',
      render: (notice) => (
        <div className="min-w-56 max-w-xl whitespace-normal">
          <p className="font-semibold text-slate-900">{notice.title}</p>
          <p className="mt-1 text-xs leading-5 text-slate-600">{notice.content}</p>
          <p className="mt-1 text-xs text-slate-400">Published by {notice.publishedBy}</p>
        </div>
      )
    },
    {
      header: 'Audience',
      render: (notice) => <StatusBadge status={notice.audience} />
    },
    {
      header: 'Date',
      render: (notice) => formatDate(notice.publishedDate)
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Notices"
        description="Announcements addressed to all, students, or Section A."
      />

      {error && (
        <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <DataTable
        columns={columns}
        data={notices}
        isLoading={loading}
        emptyMessage="There are no notices addressed to you."
        keyExtractor={(notice) => notice.id}
      />
    </div>
  );
}
