
import React from 'react';

const UseCaseCard: React.FC<{ title: string; desc: string; icon: React.ReactNode; label: string }> = ({ title, desc, icon, label }) => (
  <div className="p-10 bg-[#0c0f14] border border-slate-800 rounded-[40px] hover:border-slate-700 transition-all group relative overflow-hidden">
    <div className="absolute top-0 right-0 p-6 opacity-5">
      {icon}
    </div>
    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-6">{label}</div>
    <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed font-medium">{desc}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section className="py-40 px-8 max-w-7xl mx-auto space-y-32">
      <div className="max-w-3xl space-y-6">
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-500">Core Scenarios</h2>
        <p className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">Institutional <br /><span className="text-slate-600">Use Cases</span></p>
        <p className="text-lg text-slate-400 font-medium">Axiom is deployed across high-scrutiny departments to ensure model alignment and logical integrity.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <UseCaseCard 
          label="QA_ENGINEERING"
          title="LLM Quality Assurance"
          desc="Perform high-velocity benchmarking of model candidates against rigid technical rubrics. Quantify performance before version cut-overs."
          icon={<svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>}
        />
        <UseCaseCard 
          label="RISK_AND_COMPLIANCE"
          title="AI Safety & Compliance"
          desc="Document model alignment and safety guardrails for regulatory oversight. Boardroom-ready logs for SOC2 and HIPAA requirements."
          icon={<svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>}
        />
        <UseCaseCard 
          label="DATA_SCIENCE"
          title="Dataset Validation"
          desc="Audit synthetic data quality by performing deep-tissue scans on generated outputs. Cleanse training pipelines of logical drift."
          icon={<svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"/></svg>}
        />
        <UseCaseCard 
          label="HUMAN_IN_THE_LOOP"
          title="Evaluator Calibration"
          desc="Calibrate internal human testing teams by comparing their assessments against Axiom's high-precision forensic Judge-Engine."
          icon={<svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>}
        />
      </div>
    </section>
  );
};

export default Features;
