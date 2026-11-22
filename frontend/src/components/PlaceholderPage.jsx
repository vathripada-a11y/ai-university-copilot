import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, ArrowLeft, Sparkles } from 'lucide-react';
import PageHeader from './PageHeader';

export default function PlaceholderPage({ title, stage = 'Stage 2/3' }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract page title from route pathname if not explicitly passed
  const displayTitle = title || location.pathname.split('/').pop()?.toUpperCase() || 'Module';

  return (
    <div className="space-y-6">
      <PageHeader
        title={displayTitle}
        description="This module is part of the planned mini-project phased delivery."
        action={
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Go Back
          </button>
        }
      />

      <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center max-w-2xl mx-auto shadow-sm">
        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center mx-auto mb-4">
          <Clock className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">
          Coming in the next stage
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          The <span className="font-semibold text-slate-800">{displayTitle}</span> screen is scheduled for implementation in <strong>{stage}</strong> of the SDMIT AI University Copilot prototype.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Foundation & Dashboard verified in Stage 1
        </div>
      </div>
    </div>
  );
}
