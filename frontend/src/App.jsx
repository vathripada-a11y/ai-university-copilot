import React from 'react'
import { GraduationCap, Sparkles } from 'lucide-react'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-800">
      <div className="flex items-center space-x-3 mb-4">
        <GraduationCap className="w-10 h-10 text-indigo-600" />
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          AI University Copilot
        </h1>
        <Sparkles className="w-6 h-6 text-amber-500" />
      </div>
      <p className="text-sm text-slate-600 font-medium">
        SDMIT Ujire - 5th Sem ISE Mini Project
      </p>
    </div>
  )
}
