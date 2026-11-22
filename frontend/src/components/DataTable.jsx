import React from 'react';

export default function DataTable({
  columns = [],
  data = [],
  keyExtractor = (item, idx) => item.id || idx,
  emptyMessage = 'No records found.',
  isLoading = false
}) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/80 p-8 text-center">
        <div className="inline-block w-6 h-6 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-xs text-slate-500 font-medium">Loading data...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/80 p-8 text-center text-slate-500">
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white rounded-xl border border-slate-200/80 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 tracking-wider">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className={`px-5 py-3 ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {data.map((item, rowIdx) => (
              <tr
                key={keyExtractor(item, rowIdx)}
                className="hover:bg-slate-50/70 transition-colors"
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className={`px-5 py-3.5 whitespace-nowrap text-slate-700 ${col.className || ''}`}
                  >
                    {col.render ? col.render(item, rowIdx) : item[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
