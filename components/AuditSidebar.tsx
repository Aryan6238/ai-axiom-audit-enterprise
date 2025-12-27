
import React, { useState } from 'react';

interface AuditSidebarProps {
  onRunAudit: (q: string, r: string) => void;
  isProcessing: boolean;
  onClear: () => void;
  hasHistory: boolean;
}

const AuditSidebar: React.FC<AuditSidebarProps> = ({ 
  onRunAudit, 
  isProcessing,
  onClear,
  hasHistory
}) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleRun = () => {
    if (question.trim() && response.trim()) {
      onRunAudit(question, response);
      setQuestion('');
      setResponse('');
    }
  };

  return (
    <aside className="w-96 bg-slate-900/40 border-r border-slate-800 p-6 flex flex-col space-y-6 h-full hidden lg:flex">
      <div className="space-y-2">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Audit Input
        </label>
        <p className="text-[11px] text-slate-400 leading-tight">
          Enter the prompt you gave the model and the response it generated.
        </p>
      </div>

      <div className="space-y-4 flex-1">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">The Prompt / Question</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What was asked?..."
            className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">Candidate Response</label>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Paste LLM output here..."
            className="w-full h-64 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
          />
        </div>
      </div>

      <div className="pt-4 space-y-3">
        <button
          onClick={handleRun}
          disabled={isProcessing || !question.trim() || !response.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <span>Execute Audit</span>
          )}
        </button>

        {hasHistory && (
          <button
            onClick={onClear}
            className="w-full text-slate-500 hover:text-red-400 text-[10px] font-bold uppercase tracking-widest py-2 transition-colors"
          >
            Clear Records
          </button>
        )}
      </div>
    </aside>
  );
};

export default AuditSidebar;
