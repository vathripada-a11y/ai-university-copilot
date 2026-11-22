import React, { useEffect, useState } from 'react';
import { CalendarDays, FileText, X } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import StatusBadge from '../../components/StatusBadge';
import { getMyAssignments, submitAssignment } from '../../api/assignments';

const TABS = [
  { id: 'PENDING', label: 'Pending' },
  { id: 'SUBMITTED', label: 'Submitted' },
  { id: 'OVERDUE', label: 'Overdue' }
];

const formatDate = (date) => new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
});

export default function StudentAssignments() {
  const [assignmentData, setAssignmentData] = useState(null);
  const [activeTab, setActiveTab] = useState('PENDING');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    let isMounted = true;
    getMyAssignments()
      .then((data) => {
        if (isMounted) setAssignmentData(data);
      })
      .catch((err) => {
        console.error('Failed to load student assignments:', err);
        if (isMounted) setError('Your assignments could not be loaded. Please try again later.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(''), 3500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const assignments = assignmentData?.assignments || [];
  const counts = {
    PENDING: assignmentData?.pendingCount || 0,
    SUBMITTED: assignmentData?.submittedCount || 0,
    OVERDUE: assignmentData?.overdueCount || 0
  };
  const visibleAssignments = assignments.filter((assignment) => (
    activeTab === 'SUBMITTED'
      ? ['SUBMITTED', 'LATE'].includes(assignment.status)
      : assignment.status === activeTab
  ));

  const openSubmitDialog = (assignment) => {
    setSelectedAssignment(assignment);
    setSubmissionText('');
    setFileName('');
    setSubmitError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedAssignment || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const result = await submitAssignment(selectedAssignment.id, {
        text: submissionText,
        fileName
      });
      const updatedData = await getMyAssignments();
      setAssignmentData(updatedData);
      setActiveTab('SUBMITTED');
      setSelectedAssignment(null);
      setToast(result.status === 'LATE' ? 'Assignment submitted late.' : 'Assignment submitted successfully.');
    } catch (err) {
      console.error('Failed to submit assignment:', err);
      setSubmitError(err.message || 'The assignment could not be submitted. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Assignments"
        description="Review deadlines and submit your coursework."
      />

      {error && (
        <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div role="tablist" aria-label="Assignment status" className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            id={`assignment-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.id
                ? 'border-blue-900 bg-blue-900 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
            <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
              activeTab === tab.id ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {counts[tab.id]}
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-blue-900 border-t-transparent" />
          <p className="mt-2 text-xs font-medium text-slate-500">Loading assignments...</p>
        </div>
      ) : visibleAssignments.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          No {activeTab.toLowerCase()} assignments.
        </div>
      ) : (
        <div role="tabpanel" aria-labelledby={`assignment-tab-${activeTab}`} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {visibleAssignments.map((assignment) => (
            <article key={assignment.id} className="flex flex-col rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-800">{assignment.subject} · {assignment.code}</p>
                  <h2 className="mt-1 text-base font-bold text-slate-900">{assignment.title}</h2>
                </div>
                <StatusBadge
                  status={assignment.status}
                  label={assignment.status === 'LATE' ? 'Late' : undefined}
                />
              </div>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{assignment.description}</p>
              <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="inline-flex items-center gap-2 text-xs text-slate-500">
                  <CalendarDays className="h-4 w-4" />
                  Due {formatDate(assignment.dueDate)}
                </span>
                {['PENDING', 'OVERDUE'].includes(assignment.status) && (
                  <button
                    type="button"
                    onClick={() => openSubmitDialog(assignment)}
                    className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
                  >
                    Submit
                  </button>
                )}
              </div>
              {assignment.status === 'LATE' && (
                <p className="mt-3 text-xs text-orange-700">
                  Submitted text/file: {assignment.fileName || (assignment.submissionText ? 'Text response' : 'Not specified')}
                </p>
              )}
            </article>
          ))}
        </div>
      )}

      {selectedAssignment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isSubmitting) setSelectedAssignment(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="submission-dialog-title"
            className="w-full max-w-lg rounded-xl bg-white p-5 shadow-xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="submission-dialog-title" className="text-lg font-bold text-slate-900">Submit assignment</h2>
                <p className="mt-1 text-sm text-slate-600">{selectedAssignment.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAssignment(null)}
                disabled={isSubmitting}
                aria-label="Close submission dialog"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Submission text
                <textarea
                  value={submissionText}
                  onChange={(event) => setSubmissionText(event.target.value)}
                  rows={5}
                  disabled={isSubmitting}
                  placeholder="Write your response..."
                  className="mt-1.5 block w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-800 disabled:bg-slate-50"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                File name <span className="font-normal text-slate-500">(optional; no file is uploaded)</span>
                <span className="mt-1.5 flex items-center gap-2 rounded-lg border border-slate-300 px-3">
                  <FileText className="h-4 w-4 shrink-0 text-slate-400" />
                  <input
                    type="text"
                    value={fileName}
                    onChange={(event) => setFileName(event.target.value)}
                    disabled={isSubmitting}
                    placeholder="e.g. assignment.pdf"
                    className="min-w-0 flex-1 border-0 py-2 text-sm text-slate-900 focus:outline-hidden"
                  />
                </span>
              </label>
              {submitError && (
                <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                  {submitError}
                </p>
              )}
              <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedAssignment(null)}
                  disabled={isSubmitting}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit assignment'}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {toast && (
        <div role="status" className="fixed bottom-5 right-5 z-[60] rounded-lg bg-emerald-700 px-4 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
