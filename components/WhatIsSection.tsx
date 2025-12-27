
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
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]">
           "This is about assessment, <br />
            <span className="text-indigo-500">not appearance.”</span>
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed font-medium">
            Most chat tools treat AI like someone you talk to. Axiom Audit treats AI as something that must be carefully examined and verified. We provide the essential systems needed to move AI from experiments into reliable, real-world business use.
          </p>
          
          <div className="p-8 bg-indigo-600/5 border border-indigo-500/10 rounded-[32px] space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">Why we are different</h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Chatbots focus on smooth conversation. Axiom focuses on careful, logical checking. We assign clear risk scores and create audit records that organizations can trust and store for compliance.
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
