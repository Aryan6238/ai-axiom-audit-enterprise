import React, { useState, useEffect, useMemo } from 'react';
import { EvalTrial, Severity } from '../types';
import { exportAuditToPDF } from '../utils/pdfExport';

interface EvaluationResultCardProps {
  trial: EvalTrial;
  onDelete: () => void;
}

/* ---------------- FIX HELPERS ---------------- */

const normalizeScore = (raw: any): number => {
  if (typeof raw === 'string') {
    const match = raw.match(/[\d.]+/);
    raw = match ? parseFloat(match[0]) : 0;
  }
  if (raw > 10) raw = 10;
  if (raw < 0) raw = 0;
  return Number(raw.toFixed(1));
};

const computeOverallScore = (scores: number[]) => {
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Number(avg.toFixed(1));
};

/* --------------------------------------------- */

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
    if (s >= 8) return 'text-emerald-400';
    if (s >= 6) return 'text-indigo-400';
    if (s >= 4) return 'text-amber-400';
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
        <div className="absolute bottom-full left-0 right-0 mb-4 z-50">
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

  const isComplete = !!(trial.evaluation && trial.factCheck);

  /* ---------- FIXED SCORE HANDLING ---------- */
  const fixedScores = useMemo(() => {
    if (!trial.evaluation) return null;

    const accuracy = normalizeScore(trial.evaluation.accuracy.score);
    const relevance = normalizeScore(trial.evaluation.relevance.score);
    const completeness = normalizeScore(trial.evaluation.completeness.score);
    const clarity = normalizeScore(trial.evaluation.clarity.score);
    const safety = normalizeScore(trial.evaluation.safetyAndBias.score);
    const hallucination = normalizeScore(trial.evaluation.hallucinationRisk.score);

    const overall = computeOverallScore([
      accuracy,
      relevance,
      completeness,
      clarity,
      safety,
      hallucination
    ]);

    return { accuracy, relevance, completeness, clarity, safety, hallucination, overall };
  }, [trial.evaluation]);
  /* ----------------------------------------- */

  return (
    <article className="group relative bg-[#0c0f14] border border-white/5 rounded-[48px] overflow-hidden transition-all hover:border-white/10 shadow-2xl">
      <div className="p-10 space-y-12">
        {!isComplete || !fixedScores ? null : (
          <div className="space-y-12">
            <div className="px-10 py-7 bg-black/40 rounded-3xl border border-white/5 text-center">
              <span className="text-[10px] font-black uppercase opacity-60 tracking-widest block mb-2">Aggregate_Score</span>
              <span className="text-3xl font-[900] tracking-tighter">
                {fixedScores.overall}
                <span className="text-sm opacity-30 font-bold ml-1">/10</span>
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <MetricBlock label="Accuracy" score={fixedScores.accuracy} justification={trial.evaluation!.accuracy.justification} />
              <MetricBlock label="Relevance" score={fixedScores.relevance} justification={trial.evaluation!.relevance.justification} />
              <MetricBlock label="Completeness" score={fixedScores.completeness} justification={trial.evaluation!.completeness.justification} />
              <MetricBlock label="Clarity" score={fixedScores.clarity} justification={trial.evaluation!.clarity.justification} />
              <MetricBlock label="Safety" score={fixedScores.safety} justification={trial.evaluation!.safetyAndBias.justification} />
              <MetricBlock label="Hallucination_Risk" score={fixedScores.hallucination} justification={trial.evaluation!.hallucinationRisk.justification} />
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default EvaluationResultCard;
