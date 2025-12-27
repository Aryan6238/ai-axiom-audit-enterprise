
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
        <p className="text-lg text-slate-400 font-medium">Axiom is used in departments that require careful oversight to make sure AI models are accurate and logically sound.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <UseCaseCard 
          label="QA_ENGINEERING"
          title="LLM Quality Assurance"
          desc="Quickly test and compare different AI models to see how well they perform. Measure their accuracy, reliability, and overall quality before releasing a new version to ensure the best model is deployed."
          icon={<svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>}
        />
        <UseCaseCard 
          label="RISK_AND_COMPLIANCE"
          title="AI Safety & Compliance"
          desc="Keep clear records showing that AI models follow rules and safety measures, and create reports that meet Indian data privacy and healthcare compliance standards."
          icon={<svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>}
        />
        <UseCaseCard 
          label="DATA_SCIENCE"
          title="Dataset Validation"
          desc="Check the quality of AI-generated data by thoroughly reviewing the outputs. Make sure training pipelines are free from errors and logical inconsistencies."
          icon={<svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"/></svg>}
        />
        <UseCaseCard 
          label="HUMAN_IN_THE_LOOP"
          title="Evaluator Calibration"
          desc="Calibrate internal testers by measuring how their assessments match Axiom’s high-accuracy forensic Judge-Engine, ensuring consistent and reliable evaluations."
          icon={<svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>}
        />
      </div>
    </section>
  );
};

export default Features;
