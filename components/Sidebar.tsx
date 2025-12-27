
import React from 'react';
import { Domain } from '../types';

interface SidebarProps {
  selectedDomain: Domain;
  setSelectedDomain: (d: Domain) => void;
  complexity: 'Standard' | 'Hard' | 'Extreme';
  setComplexity: (c: 'Standard' | 'Hard' | 'Extreme') => void;
  onGenerate: () => void;
  isGenerating: boolean;
  onClear: () => void;
  hasQuestions: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  selectedDomain, 
  setSelectedDomain, 
  complexity, 
  setComplexity, 
  onGenerate, 
  isGenerating,
  onClear,
  hasQuestions
}) => {
  return (
    <aside className="w-80 bg-slate-900/40 border-r border-slate-800 p-6 flex flex-col space-y-8 h-full hidden lg:flex">
      <div className="space-y-4">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
          Domain Specialization
        </label>
        <div className="grid grid-cols-1 gap-2">
          {/* Cast Object.values to Domain[] to resolve 'unknown' type assignment to React keys and nodes */}
          {(Object.values(Domain) as Domain[]).map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDomain(d)}
              className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                selectedDomain === d 
                  ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400 shadow-[0_0_15px_-5px_rgba(99,102,241,0.5)]' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
          Complexity Profile
        </label>
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          {(['Standard', 'Hard', 'Extreme'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setComplexity(level)}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                complexity === level 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 space-y-3">
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center space-x-2"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Computing...</span>
            </>
          ) : (
            <span>Generate Scenario</span>
          )}
        </button>

        {hasQuestions && (
          <button
            onClick={onClear}
            className="w-full text-slate-500 hover:text-red-400 text-xs font-medium py-2 transition-colors"
          >
            Clear All History
          </button>
        )}
      </div>

      <div className="mt-auto p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-xl">
        <h4 className="text-xs font-bold text-indigo-400 uppercase mb-2">Pro Tip</h4>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Questions are designed to probe context window limits and reasoning depth. Use "Extreme" for RAG pipeline stress tests.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
