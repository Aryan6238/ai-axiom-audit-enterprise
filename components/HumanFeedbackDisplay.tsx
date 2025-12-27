
import React from 'react';
import { HumanFeedbackResult } from '../types';

interface HumanFeedbackDisplayProps {
  result: HumanFeedbackResult;
}

const HumanFeedbackDisplay: React.FC<HumanFeedbackDisplayProps> = ({ result }) => {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-500">
      <div className="bg-sky-600/10 border-b border-sky-500/20 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[11px] font-bold text-sky-400 uppercase tracking-widest">Developer Reviewer Persona</span>
        </div>
        <span className="text-[10px] text-slate-500 font-medium italic">Tone: {result.tone}</span>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center space-x-2">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>Model Strengths</span>
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed pl-5 border-l-2 border-emerald-500/30">
            {result.strengths}
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-rose-400 uppercase tracking-widest flex items-center space-x-2">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
            </svg>
            <span>Weaknesses / Optimization Needs</span>
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed pl-5 border-l-2 border-rose-500/30">
            {result.weaknesses}
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest flex items-center space-x-2">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Actionable Improvements</span>
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            {result.improvementSuggestions.map((suggestion, i) => (
              <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-xl relative group hover:border-sky-500/30 transition-colors">
                <span className="absolute -top-2 -left-2 w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg">
                  {i + 1}
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {suggestion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanFeedbackDisplay;
