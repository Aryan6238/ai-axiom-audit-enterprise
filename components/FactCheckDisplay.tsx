
import React from 'react';
import { FactCheckResult, Severity } from '../types';

interface FactCheckDisplayProps {
  result: FactCheckResult;
}

const SeverityBadge: React.FC<{ severity: Severity }> = ({ severity }) => {
  const styles = {
    High: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    Medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    Low: 'bg-slate-500/10 text-slate-400 border-slate-500/20'
  };
  return (
    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${styles[severity]}`}>
      {severity}
    </span>
  );
};

const FactCheckDisplay: React.FC<FactCheckDisplayProps> = ({ result }) => {
  const getProfileColor = (profile: string) => {
    switch (profile) {
      case 'Safe': return 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5';
      case 'Warning': return 'border-amber-500/30 text-amber-400 bg-amber-500/5';
      case 'High-Risk': return 'border-orange-500/30 text-orange-400 bg-orange-500/5';
      case 'Critical': return 'border-rose-500/30 text-rose-400 bg-rose-500/5 animate-pulse';
      default: return 'border-slate-800 text-slate-400';
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className={`p-4 rounded-xl border flex items-center justify-between ${getProfileColor(result.riskProfile)}`}>
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
          <span className="text-xs font-black uppercase tracking-widest">Risk Profile: {result.riskProfile}</span>
        </div>
        <p className="text-xs font-bold opacity-80">{result.summary}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h5 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Detected Forensic Issues</h5>
          {result.issues.length === 0 ? (
            <div className="py-8 text-center text-emerald-500/40 text-xs italic">
              No forensic inaccuracies detected.
            </div>
          ) : (
            <div className="space-y-4">
              {result.issues.map((issue, i) => (
                <div key={i} className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 space-y-2 group hover:border-slate-700 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase">{issue.type}</span>
                    <SeverityBadge severity={issue.severity as Severity} />
                  </div>
                  <div className="text-[11px] font-mono text-rose-300 bg-rose-950/20 px-2 py-1 rounded">
                    "{issue.quote}"
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed italic">
                    {issue.finding}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h5 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Internal Consistency</h5>
          <div className={`p-4 rounded-xl border ${result.factualConsistency.status === 'Consistent' ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
             <div className="flex items-center space-x-2 mb-2">
               <div className={`w-1.5 h-1.5 rounded-full ${result.factualConsistency.status === 'Consistent' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
               <span className={`text-[11px] font-bold uppercase ${result.factualConsistency.status === 'Consistent' ? 'text-emerald-400' : 'text-rose-400'}`}>
                 {result.factualConsistency.status}
               </span>
             </div>
             <p className="text-[11px] text-slate-400 leading-relaxed">
               {result.factualConsistency.details}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactCheckDisplay;
