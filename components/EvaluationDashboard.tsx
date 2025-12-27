
import React from 'react';
import { EvaluationResult, CriterionResult } from '../types';

interface EvaluationDashboardProps {
  result: EvaluationResult;
}

const MetricRow: React.FC<{ label: string; result: CriterionResult }> = ({ label, result }) => {
  const getProgressColor = (score: number) => {
    if (score >= 4.5) return 'bg-emerald-500';
    if (score >= 3.5) return 'bg-indigo-500';
    if (score >= 2.0) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
        <span className={`text-xs font-bold ${getProgressColor(result.score).replace('bg-', 'text-')}`}>
          {result.score.toFixed(1)}/5
        </span>
      </div>
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getProgressColor(result.score)} transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(0,0,0,0.5)]`} 
          style={{ width: `${(result.score / 5) * 100}%` }}
        />
      </div>
    </div>
  );
};

const EvaluationDashboard: React.FC<EvaluationDashboardProps> = ({ result }) => {
  const getVerdictStyle = (verdict: string) => {
    switch (verdict) {
      case 'Excellent': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 glow-emerald';
      case 'Acceptable': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 glow-indigo';
      case 'Needs Improvement': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Critical Failure': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const getCalibrationColor = (assessment: string) => {
    if (assessment === 'Justified') return 'text-emerald-400';
    if (assessment === 'Overconfident') return 'text-rose-400';
    if (assessment === 'Underconfident') return 'text-amber-400';
    return 'text-slate-400';
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className={`p-10 rounded-[40px] border flex flex-col md:flex-row items-center justify-between ${getVerdictStyle(result.finalVerdict)} transition-all relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-full bg-white/5 skew-x-[-20deg] translate-x-10 pointer-events-none" />
        <div className="text-center md:text-left relative z-10">
          <h5 className="text-[10px] font-black uppercase opacity-60 tracking-[0.3em] mb-2">Audit Verdict</h5>
          <p className="text-4xl font-[900] tracking-tighter uppercase italic">{result.finalVerdict}</p>
        </div>
        <div className="mt-6 md:mt-0 text-center md:text-right relative z-10">
          <h5 className="text-[10px] font-black uppercase opacity-60 tracking-[0.3em] mb-2">Aggregate Scan Score</h5>
          <p className="text-5xl font-[900] tracking-tighter">
            {result.overallScore.toFixed(1)}
            <span className="text-sm opacity-40 font-bold ml-1">/30.0</span>
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-10 bg-[#05070a] rounded-[40px] border border-white/5 space-y-8 shadow-inner">
            <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] border-b border-white/5 pb-4">Quantitative Vectors</h4>
            <div className="space-y-6">
              <MetricRow label="Accuracy" result={result.accuracy} />
              <MetricRow label="Relevance" result={result.relevance} />
              <MetricRow label="Completeness" result={result.completeness} />
              <MetricRow label="Clarity" result={result.clarity} />
              <MetricRow label="Hallucination Risk" result={result.hallucinationRisk} />
              <MetricRow label="Safety & Bias" result={result.safetyAndBias} />
            </div>
        </div>

        <div className="p-10 bg-[#05070a] rounded-[40px] border border-white/5 flex flex-col justify-between shadow-inner">
            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] border-b border-white/5 pb-4">Confidence Calibration</h4>
              <div className={`text-2xl font-[900] tracking-tight uppercase ${getCalibrationColor(result.confidenceCalibration.assessment)}`}>
                {result.confidenceCalibration.assessment}
              </div>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                {result.confidenceCalibration.justification}
              </p>
            </div>
            
            <div className="mt-10 pt-10 border-t border-white/5">
                <h4 className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-4">Forensic Summary</h4>
                <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                  "{result.improvementFeedback}"
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationDashboard;
