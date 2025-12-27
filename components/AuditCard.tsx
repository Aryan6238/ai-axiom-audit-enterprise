
import React, { useState } from 'react';
import { EvalTrial } from '../types';
import { factCheckTrial, generateTrialFeedback } from '../geminiService';
import EvaluationDashboard from './EvaluationDashboard';
import FactCheckDisplay from './FactCheckDisplay';
import HumanFeedbackDisplay from './HumanFeedbackDisplay';

interface AuditCardProps {
  trial: EvalTrial;
  onDelete: () => void;
  onUpdate: (trial: EvalTrial) => void;
}

const AuditCard: React.FC<AuditCardProps> = ({ trial, onDelete, onUpdate }) => {
  const [showTruth, setShowTruth] = useState(false);
  const [isFactChecking, setIsFactChecking] = useState(false);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);

  const runFactCheck = async () => {
    setIsFactChecking(true);
    try {
      const res = await factCheckTrial(trial);
      onUpdate({ ...trial, factCheck: res });
    } finally {
      setIsFactChecking(false);
    }
  };

  const runFeedback = async () => {
    setIsGeneratingFeedback(true);
    try {
      const res = await generateTrialFeedback(trial);
      onUpdate({ ...trial, humanFeedback: res });
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Info */}
      <div className="px-8 py-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Audit ID: {trial.id} • {new Date(trial.timestamp).toLocaleString()}
          </span>
        </div>
        <button onClick={onDelete} className="text-slate-600 hover:text-rose-500 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div className="p-8 space-y-8">
        {/* User Question vs Response section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">The Prompt</h4>
            <div className="p-5 bg-slate-950/80 rounded-2xl border border-indigo-500/10 text-sm text-slate-300 font-mono leading-relaxed">
              {trial.userQuestion}
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Candidate Output</h4>
            <div className="p-5 bg-slate-950/80 rounded-2xl border border-emerald-500/10 text-sm text-slate-300 font-mono leading-relaxed">
              {trial.candidateResponse}
            </div>
          </div>
        </div>

        {/* Evaluation Dashboard (Automatic) */}
        {trial.evaluation && (
          <div className="pt-4 border-t border-slate-800">
            <EvaluationDashboard result={trial.evaluation} />
          </div>
        )}

        {/* Advanced Modules */}
        <div className="flex flex-wrap gap-4 pt-4">
          <button 
            onClick={() => setShowTruth(!showTruth)}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all border ${
              showTruth ? 'bg-slate-100 text-slate-900 border-white' : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {showTruth ? 'Hide Ground Truth' : 'Reveal Ground Truth'}
          </button>
          <button 
            onClick={runFactCheck}
            disabled={isFactChecking}
            className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full bg-indigo-900/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-900/40 transition-all flex items-center space-x-2"
          >
            {isFactChecking && <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
            <span>Fact-Check Forensic</span>
          </button>
          <button 
            onClick={runFeedback}
            disabled={isGeneratingFeedback}
            className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full bg-sky-900/20 text-sky-400 border border-sky-500/30 hover:bg-sky-900/40 transition-all flex items-center space-x-2"
          >
            {isGeneratingFeedback && <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
            <span>Audit Persona Feedback</span>
          </button>
        </div>

        {showTruth && (
          <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 animate-in slide-in-from-top-4 duration-300">
             <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Derived Gold Standard</h5>
                  <div className="text-sm text-emerald-400/90 leading-relaxed font-mono">
                    {trial.derivedGroundTruth.answer}
                  </div>
                </div>
                <div className="space-y-4">
                  <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reasoning Chain</h5>
                  <div className="text-xs text-slate-400 leading-relaxed whitespace-pre-wrap font-mono">
                    {trial.derivedGroundTruth.reasoning}
                  </div>
                </div>
             </div>
          </div>
        )}

        {trial.factCheck && <FactCheckDisplay result={trial.factCheck} />}
        {trial.humanFeedback && <HumanFeedbackDisplay result={trial.humanFeedback} />}
      </div>
    </div>
  );
};

export default AuditCard;
