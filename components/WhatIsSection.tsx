
import React from 'react';
import VisualAsset from './VisualAsset';

const WhatIsSection: React.FC = () => {
  return (
    <section className="py-40 px-8 bg-[#05070a] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-600/5 blur-[150px] rounded-full" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24">
        <div className="flex-1 space-y-10">
          <div className="inline-block px-4 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
            The Philosophy
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
            A Measurement <br />
            <span className="text-indigo-500">Not an Interface</span>
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed font-medium">
            Standard chat interfaces treat AI as a conversational partner. Axiom Audit treats AI as a source of forensic data. We provide the mission-critical infrastructure required to transition Large Language Models from experimental labs to production-grade enterprise environments.
          </p>
          
          <div className="p-8 bg-indigo-600/5 border border-indigo-500/10 rounded-[32px] space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">Why we are different</h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              While chatbots aim for conversational fluidity, Axiom aims for logical scrutiny. We assignment objective risk scores and generate legally defensible audit trails for institutional logging.
            </p>
          </div>
        </div>

        <div className="flex-1 relative">
           <VisualAsset assetId="abstract" className="aspect-square md:aspect-video" />
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
