
import React from 'react';

const SampleOutputSection: React.FC = () => {
  return (
    <section className="py-32 px-8 bg-[#0c0f14] border-t border-slate-900">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-4">
           <h2 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-500">The Forensic Ledger</h2>
           <p className="text-3xl md:text-5xl font-black text-white tracking-tighter">Deciphering the Audit trail.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
           <div className="space-y-6">
              <div className="p-10 bg-[#05070a] border border-slate-800 rounded-[40px] space-y-6 hover:border-indigo-500/30 transition-all">
                 <h3 className="text-xl font-bold text-white">Quantitative Scoring</h3>
                 <p className="text-slate-400 text-sm leading-relaxed font-medium">
                   We score every response across 6 critical dimensions: Accuracy, Relevance, Completeness, Clarity, Hallucination Risk, and Safety. These form an aggregate Calibration Score (0-30).
                 </p>
                 <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-indigo-500 animate-in slide-in-from-left duration-1000" />
                 </div>
              </div>

              <div className="p-10 bg-[#05070a] border border-slate-800 rounded-[40px] space-y-6 hover:border-emerald-500/30 transition-all">
                 <h3 className="text-xl font-bold text-white">Confidence Calibration</h3>
                 <p className="text-slate-400 text-sm leading-relaxed font-medium">
                   Spot "Confident Hallucinations." Axiom detects when a model is high-certainty but factually incorrect—the most dangerous failure mode in LLMs.
                 </p>
                 <div className="flex space-x-2">
                    <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase">Justified</div>
                    <div className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase opacity-20">Overconfident</div>
                 </div>
              </div>
           </div>

           <div className="bg-[#05070a] border border-slate-800 rounded-[40px] p-10 flex flex-col justify-center space-y-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 space-y-4">
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-black mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                 </div>
                 <h3 className="text-3xl font-black text-white">Corporate-Ready PDF Exports</h3>
                 <p className="text-slate-400 text-sm leading-relaxed font-medium">
                   Every audit session generates a high-compliance document ready for the boardroom. Track timestamps, Model IDs, and full forensic justifications in a professional format.
                 </p>
                 <button className="text-xs font-black uppercase tracking-widest text-indigo-400 flex items-center space-x-2 pt-4">
                   <span>View Sample Report</span>
                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default SampleOutputSection;
