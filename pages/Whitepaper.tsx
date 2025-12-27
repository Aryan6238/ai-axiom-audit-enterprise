
import React from 'react';
import VisualAsset from '../components/VisualAsset';

const Whitepaper: React.FC = () => {
  return (
    <div className="py-20 px-8 max-w-5xl mx-auto space-y-20">
       <div className="text-center space-y-8 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">Technical Asset v2.4</div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">AI Governance <br /><span className="text-slate-600">& Alignment</span></h1>
          <p className="text-xl text-slate-500 font-medium">Standardizing forensic benchmarks for Large Language Model deployments in institutional environments.</p>
       </div>

       <VisualAsset assetId="compliance" className="aspect-video" />

       <div className="grid gap-16 text-slate-400 font-medium leading-relaxed text-lg">
          <section className="space-y-6">
             <h2 className="text-3xl font-black text-white uppercase tracking-tight">1. The Necessity of Scrutiny</h2>
             <p>As LLMs transition from conversational agents to decision-support systems, the risk of "Neural Drift" and "Confident Hallucinations" introduces unacceptable liability. Axiom Audit provides a deterministic layer to quantify this non-deterministic risk.</p>
          </section>

          <section className="space-y-6">
             <h2 className="text-3xl font-black text-white uppercase tracking-tight">2. The Forensic Rubric</h2>
             <p>Our engine evaluates every model response through three primary lenses: Factual Anchoring, Logical Consistency, and Calibration Mapping.</p>
          </section>
       </div>

       <div className="p-16 bg-[#0c0f14] border border-slate-800 rounded-[60px] flex flex-col md:flex-row items-center justify-between gap-12 group">
          <div className="space-y-4 max-w-lg">
             <h3 className="text-3xl font-black text-white tracking-tight">Download Technical PDF</h3>
             <p className="text-base text-slate-500 font-medium">The full methodology guide on Forensic AI alignment for CIOs and Chief Risk Officers.</p>
          </div>
          <button className="px-12 py-6 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl transition-all hover:bg-indigo-50">Access Full Whitepaper</button>
       </div>
    </div>
  );
};

export default Whitepaper;
