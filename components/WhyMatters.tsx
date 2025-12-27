
import React from 'react';
import VisualAsset from './VisualAsset';

const WhyMatters: React.FC = () => {
  return (
    <section className="py-40 px-8 bg-[#0c0f14] relative border-y border-slate-900">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
        <div className="order-2 md:order-1 relative">
           <div className="absolute -inset-10 bg-emerald-500/10 blur-[120px] rounded-full" />
           <VisualAsset 
             assetId="risk"
             className="aspect-video"
           />
        </div>

        <div className="order-1 md:order-2 space-y-10">
           <div className="inline-block px-4 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              Risk Management
           </div>
           <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]">
             “Why we must <br />
             <span className="text-emerald-500 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-300">always verify things"</span>
           </h2>
           <p className="text-xl text-slate-400 leading-relaxed font-medium">
             As AI models move from testing to real-world use, the chance of serious mistakes increases. In regulated fields like finance, law, and healthcare, even a small error can have huge consequences.
           </p>
           
           <div className="flex items-start space-x-6 p-8 bg-slate-900/50 rounded-3xl border border-slate-800">
              <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center text-emerald-500 flex-shrink-0">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed font-medium italic">
                "Axiom Audit gives businesses the protection they need to use generative AI safely and confidently."
              </p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMatters;
