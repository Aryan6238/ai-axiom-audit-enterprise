
import React from 'react';

const ForensicExample: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-24">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">Forensic Deep-Dive</div>
          <h2 className="text-5xl font-black text-white tracking-wider uppercase leading-none">Thorough Review <br /> in Practice </h2>
          <p className="text-lg text-slate-400 leading-relaxed font-medium">
            While basic tools only look for keywords, Axiom checks reasoning and factual accuracy. 
             Below is a real example where our system caught a “Confident Hallucination” in a financial advisory AI.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-[#0c0f14] border border-slate-800 rounded-3xl">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Issue Type</span>
              <span className="text-rose-400 font-bold uppercase tracking-tight">Logical Contradiction</span>
            </div>
            <div className="p-6 bg-[#0c0f14] border border-slate-800 rounded-3xl">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Risk Score</span>
              <span className="text-rose-500 font-bold uppercase tracking-tight">8.4 / 10.0 (High)</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0c0f14] border border-slate-800 rounded-[48px] overflow-hidden shadow-2xl">
          <div className="px-8 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Case_Study_Ref: AD-9482</span>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500/20" />
            </div>
          </div>
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Context Query</h4>
              <p className="text-sm font-mono text-slate-400 bg-black/40 p-4 rounded-xl border border-white/5">
                “What is the current capital gains tax rate for high‑income earners in India for 2024?”
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Model Candidate Response</h4>
              <p className="text-sm font-mono text-slate-400 bg-rose-950/10 p-4 rounded-xl border border-rose-500/20">
                “…India applies a flat 30% capital gains tax on all investments regardless of holding period or income level…”
              </p>
            </div>
            <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl space-y-2">
              <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Forensic Finding</h4>
              <p className="text-xs text-slate-300 font-medium italic">
                "Finding: The model hallucinates a flat tax rate. In India, capital gains tax depends on the type of asset and holding period. For example, long‑term capital gains on listed equities and equity‑oriented mutual funds are taxed at 12.5% for gains above ₹1.25 lakh, and short‑term capital gains on such assets are taxed at 20% — there is no single flat rate irrespective of income bracket. Critical inaccuracy detected."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForensicExample;
