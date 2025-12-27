
import React, { useState, useEffect } from 'react';
import { EvalTrial, Severity } from '../types';
import { exportAuditToPDF } from '../utils/pdfExport';

interface EvaluationResultCardProps {
  trial: EvalTrial;
  onDelete: () => void;
}

const SeverityBadge: React.FC<{ severity: Severity }> = ({ severity }) => {
  const colors = {
    High: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    Medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    Low: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
  };
  return (
    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg border ${colors[severity]} tracking-widest`}>
      {severity}
    </span>
  );
};

const MetricBlock: React.FC<{ label: string; score: number; justification: string }> = ({ label, score, justification }) => {
  const [showTip, setShowTip] = useState(false);
  const getScoreColor = (s: number) => {
    if (s >= 4.5) return 'text-emerald-400';
    if (s >= 3.5) return 'text-indigo-400';
    if (s >= 2.5) return 'text-amber-400';
    return 'text-rose-500';
  };

  return (
    <div 
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
      className="bg-[#05070a] border border-white/5 rounded-[24px] p-6 flex flex-col items-center justify-center space-y-2 group transition-all hover:border-white/10 hover:translate-y-[-2px] relative cursor-help"
    >
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center group-hover:text-slate-300 transition-colors">{label}</span>
      <span className={`text-3xl font-[900] tracking-tighter ${getScoreColor(score)}`}>{score.toFixed(1)}</span>
      
      {showTip && (
        <div className="absolute bottom-full left-0 right-0 mb-4 z-50 animate-in fade-in zoom-in slide-in-from-bottom-2">
          <div className="bg-slate-900 border border-slate-700 p-4 rounded-2xl shadow-2xl text-[11px] text-slate-300 font-medium leading-relaxed">
            {justification}
          </div>
        </div>
      )}
    </div>
  );
};

const EvaluationResultCard: React.FC<EvaluationResultCardProps> = ({ trial, onDelete }) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'forensics' | 'persona'>('metrics');
  const [loadingStep, setLoadingStep] = useState(0);

  const steps = [
    "Establishing Baseline Truth",
    "Mapping Logical Drift",
    "Identifying Forensic Breaches",
    "Calibrating Confidence Score",
    "Signing Final Audit Ledger"
  ];

  useEffect(() => {
    if (!trial.evaluation) {
      const interval = setInterval(() => {
        setLoadingStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [trial.evaluation]);

  const getVerdictStyle = (v: string) => {
    switch(v) {
      case 'Excellent': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 glow-emerald';
      case 'Critical Failure': return 'bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse';
      case 'Needs Improvement': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default: return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 glow-indigo';
    }
  };

  const isComplete = !!(trial.evaluation && trial.factCheck);

  return (
    <article className="group relative bg-[#0c0f14] border border-white/5 rounded-[48px] overflow-hidden transition-all hover:border-white/10 shadow-2xl">
      {/* Top Banner */}
      <div className="px-10 py-6 border-b border-white/5 flex items-center justify-between bg-[#05070a]/40">
        <div className="flex items-center space-x-6">
          <div className="px-4 py-1.5 rounded-xl bg-black border border-white/5 text-[11px] font-black text-slate-500 uppercase tracking-widest font-mono">
            REF_{trial.id}
          </div>
          <span className="text-[11px] font-[800] text-slate-600 uppercase tracking-widest">
            {new Date(trial.timestamp).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          {isComplete && (
            <div className="flex items-center space-x-2">
               <div className="hidden lg:flex flex-col items-end mr-2">
                  <span className="text-[8px] font-black uppercase text-slate-600 tracking-[0.2em]">Compliance Verified</span>
                  <span className="text-[9px] font-black uppercase text-indigo-500 tracking-widest">Signed Forensic Ledger</span>
               </div>
               <button 
                onClick={() => exportAuditToPDF(trial)}
                className="flex items-center space-x-3 px-6 py-3.5 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-xl transition-all hover:bg-indigo-50 hover:scale-[1.03] active:scale-[0.97] shadow-xl shadow-white/5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <span>Download Report</span>
              </button>
            </div>
          )}
          <button onClick={onDelete} className="p-3 text-slate-700 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>

      <div className="p-10 space-y-12">
        {/* Interaction Preview */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-[0.2em]">Context_Query</h4>
            <div className="p-6 bg-[#05070a] border border-white/5 rounded-3xl text-sm text-slate-400 font-mono leading-relaxed max-h-40 overflow-y-auto custom-scrollbar">
              {trial.userQuestion}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-[0.2em]">Candidate_Output</h4>
            <div className="p-6 bg-[#05070a] border border-white/5 rounded-3xl text-sm text-slate-400 font-mono leading-relaxed max-h-40 overflow-y-auto custom-scrollbar">
              {trial.candidateResponse}
            </div>
          </div>
        </div>

        {!isComplete ? (
          <div className="p-20 flex flex-col items-center justify-center space-y-8 border border-dashed border-white/10 rounded-[60px] bg-black/20">
             <div className="relative">
               <div className="w-20 h-20 border-[2px] border-indigo-500/20 rounded-full" />
               <div className="w-20 h-20 border-t-[2px] border-indigo-500 rounded-full animate-spin absolute inset-0" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-indigo-500 rounded-lg animate-pulse" />
               </div>
             </div>
             <div className="text-center space-y-3">
               <span className="text-xl font-black text-white uppercase tracking-[0.1em] block">{steps[loadingStep]}</span>
               <div className="flex items-center justify-center space-x-2">
                 {steps.map((_, i) => (
                   <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i <= loadingStep ? 'w-8 bg-indigo-500' : 'w-4 bg-slate-800'}`} />
                 ))}
               </div>
               <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Forensic Scrutiny Engine Active</span>
             </div>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in duration-1000">
            <div className={`p-10 rounded-[48px] border flex flex-col md:flex-row items-center justify-between ${getVerdictStyle(trial.evaluation!.finalVerdict)} shadow-2xl relative overflow-hidden`}>
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
               <div className="text-center md:text-left space-y-2 relative z-10">
                  <span className="text-[11px] font-black uppercase opacity-60 tracking-[0.3em]">Final_Audit_Verdict</span>
                  <h3 className="text-1xl md:text-1xl font-[900] tracking-tighter uppercase italic leading-none">{trial.evaluation!.finalVerdict}</h3>
               </div>
               <div className="mt-8 md:mt-0 flex space-x-6 relative z-10">
                  <div className="px-10 py-7 bg-black/40 rounded-3xl border border-white/5 text-center">
                    <span className="text-[10px] font-black uppercase opacity-60 tracking-widest block mb-2">Calibration</span>
                    <span className="text-sm font-black uppercase tracking-[0.2em]">{trial.evaluation!.confidenceCalibration.assessment}</span>
                  </div>
                  <div className="px-10 py-7 bg-black/40 rounded-3xl border border-white/5 text-center">
                    <span className="text-[10px] font-black uppercase opacity-60 tracking-widest block mb-2">Aggregate_Score</span>
                    <span className="text-3xl font-[900] tracking-tighter">{trial.evaluation!.overallScore}<span className="text-sm opacity-30 font-bold ml-1">/30</span></span>
                  </div>
               </div>
            </div>

            <div className="space-y-8">
               <nav className="flex space-x-3 p-2 bg-[#05070a] rounded-2xl border border-white/5 w-fit">
                  {(['metrics', 'forensics', 'persona'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-10 py-4 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all ${
                        activeTab === tab ? 'bg-white text-black shadow-xl' : 'text-slate-600 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
               </nav>

               <div className="min-h-[400px]">
                  {activeTab === 'metrics' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-6 duration-700">
                      <MetricBlock label="Accuracy" score={trial.evaluation!.accuracy.score} justification={trial.evaluation!.accuracy.justification} />
                      <MetricBlock label="Relevance" score={trial.evaluation!.relevance.score} justification={trial.evaluation!.relevance.justification} />
                      <MetricBlock label="Completeness" score={trial.evaluation!.completeness.score} justification={trial.evaluation!.completeness.justification} />
                      <MetricBlock label="Clarity" score={trial.evaluation!.clarity.score} justification={trial.evaluation!.clarity.justification} />
                      <MetricBlock label="Safety" score={trial.evaluation!.safetyAndBias.score} justification={trial.evaluation!.safetyAndBias.justification} />
                      <MetricBlock label="Hallucination_Risk" score={trial.evaluation!.hallucinationRisk.score} justification={trial.evaluation!.hallucinationRisk.justification} />
                      
                      <div className="col-span-full mt-6 p-10 bg-[#05070a] rounded-[40px] border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600 group-hover:w-3 transition-all" />
                        <span className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.3em] block mb-6">Lead_Auditor_Justification</span>
                        <p className="text-1xl text-slate-300 leading-relaxed font-medium italic">"{trial.evaluation!.improvementFeedback}"</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'forensics' && (
                    <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-700">
                       <div className="flex items-center justify-between px-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.8)]" />
                            <span className="text-[12px] font-black uppercase text-slate-400 tracking-[0.2em]">Neural Risk Profile: <span className="text-white">{trial.factCheck!.riskProfile}</span></span>
                          </div>
                          <div className="flex items-center space-x-6">
                            <span className="text-[11px] font-black uppercase text-indigo-400 tracking-[0.2em] px-5 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">Consistency: {trial.factCheck!.factualConsistency.status}</span>
                            <span className="text-[11px] font-black uppercase text-emerald-400 tracking-[0.2em] px-5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">Verified Scans: {trial.factCheck!.issues.length === 0 ? 'All Passed' : `${trial.factCheck!.issues.length} Flagged`}</span>
                          </div>
                       </div>
                       
                       <div className="overflow-hidden border border-white/5 rounded-[40px] bg-[#05070a] shadow-inner">
                          <table className="w-full text-left text-sm border-collapse">
                             <thead className="bg-black/50 border-b border-white/5">
                                <tr>
                                   <th className="px-10 py-8 font-black uppercase tracking-[0.2em] text-slate-500 text-[10px]">Evidence_Quote</th>
                                   <th className="px-10 py-8 font-black uppercase tracking-[0.2em] text-slate-500 text-[10px]">Finding_Analysis</th>
                                   <th className="px-10 py-8 font-black uppercase tracking-[0.2em] text-slate-500 text-[10px]">Severity</th>
                                </tr>
                             </thead>
                             <tbody className="divide-y divide-white/5">
                                {trial.factCheck!.issues.map((issue, idx) => (
                                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors group/row">
                                     <td className="px-10 py-10 font-mono text-rose-400/90 leading-relaxed max-w-sm group-hover/row:text-rose-400 transition-colors italic">"{issue.quote}"</td>
                                     <td className="px-10 py-10 text-slate-400 leading-relaxed font-medium group-hover/row:text-slate-300 transition-colors">{issue.finding}</td>
                                     <td className="px-10 py-10"><SeverityBadge severity={issue.severity} /></td>
                                  </tr>
                                ))}
                                {trial.factCheck!.issues.length === 0 && (
                                  <tr>
                                    <td colSpan={3} className="px-10 py-32 text-center">
                                      <div className="flex flex-col items-center space-y-6 opacity-40 group hover:opacity-100 transition-opacity">
                                         <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                         </div>
                                         <div className="space-y-2">
                                           <span className="text-sm font-black uppercase tracking-[0.4em] text-emerald-400 block">Clean_Audit_History</span>
                                           <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Zero Forensic Breaches Detected</p>
                                         </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                             </tbody>
                          </table>
                       </div>
                    </div>
                  )}

                  {activeTab === 'persona' && trial.humanFeedback && (
                    <div className="space-y-12 animate-in slide-in-from-bottom-6 duration-700">
                       <div className="grid md:grid-cols-2 gap-10">
                          <div className="space-y-6">
                             <div className="flex items-center space-x-4">
                                <div className="w-2 h-8 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                                <h5 className="text-[12px] font-black uppercase text-white tracking-[0.2em]">Structural_Strengths</h5>
                             </div>
                             <p className="text-base text-slate-400 leading-relaxed bg-[#05070a] p-10 rounded-[40px] border border-emerald-500/10 min-h-[180px] font-medium italic">"{trial.humanFeedback.strengths}"</p>
                          </div>
                          <div className="space-y-6">
                             <div className="flex items-center space-x-4">
                                <div className="w-2 h-8 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
                                <h5 className="text-[12px] font-black uppercase text-white tracking-[0.2em]">Optimization_Needs</h5>
                             </div>
                             <p className="text-base text-slate-400 leading-relaxed bg-[#05070a] p-10 rounded-[40px] border border-rose-500/10 min-h-[180px] font-medium italic">"{trial.humanFeedback.weaknesses}"</p>
                          </div>
                       </div>
                       <div className="space-y-10">
                          <div className="flex items-center justify-center space-x-6">
                             <div className="h-[1px] flex-1 bg-slate-900" />
                             <h5 className="text-[11px] font-black uppercase text-indigo-500 tracking-[0.3em]">Neural_Optimization_Roadmap</h5>
                             <div className="h-[1px] flex-1 bg-slate-900" />
                          </div>
                          <div className="grid md:grid-cols-3 gap-8">
                             {trial.humanFeedback.improvementSuggestions.map((s, idx) => (
                               <div key={idx} className="p-10 bg-[#05070a] border border-white/5 rounded-[40px] group hover:border-indigo-500/40 transition-all duration-500 relative overflow-hidden">
                                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-[50px] rounded-full group-hover:bg-indigo-600/10 transition-all" />
                                  <div className="text-5xl font-[900] text-indigo-500/10 mb-8 group-hover:text-indigo-500/30 transition-colors italic">0{idx+1}</div>
                                  <p className="text-sm text-slate-400 leading-relaxed font-medium relative z-10">{s}</p>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                  )}
               </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default EvaluationResultCard;
