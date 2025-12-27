
import React from 'react';
import VisualAsset from '../components/VisualAsset';

interface GetStartedProps {
  onStart: () => void;
}

const GetStarted: React.FC<GetStartedProps> = ({ onStart }) => {
  return (
    <div className="py-20 px-8 max-w-7xl mx-auto space-y-32">
       <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
             <div className="inline-block px-4 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">The Axiom Protocol</div>
             <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.85]">Audit Your <br /><span className="text-slate-600">Intelligence</span></h1>
             <p className="text-xl text-slate-400 font-medium leading-relaxed">
               Axiom Audit provides the mission-critical infrastructure to transition LLMs from experimental prototypes to production-grade enterprise assets.
             </p>
             <div className="flex space-x-4">
                <button onClick={onStart} className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl hover:bg-indigo-50 transition-all">Provision Access</button>
             </div>
          </div>
          <div className="relative">
             <VisualAsset assetId="auditor" className="aspect-video" />
          </div>
       </div>

       <div className="grid md:grid-cols-3 gap-12">
          {[
            { 
              title: "Legal & Liability", 
              desc: "Automate verification for AI outputs against Indian laws (DPDP Act) and industry guidelines.",
              assetId: "legal" as const
            },
            { 
              title: "Financial Scrutiny", 
              desc: "Validate model outputs for high-stakes financial advisory and reporting.",
              assetId: "finance" as const
            },
            { 
              title: "Clinical Accuracy", 
              desc: "Ensure medical summaries remain factually anchored to verified research nodes.",
              assetId: "medical" as const
            }
          ].map((card, i) => (
            <div key={i} className="bg-[#0c0f14] border border-slate-800 rounded-[40px] p-8 space-y-6 hover:border-slate-700 transition-all group">
               <VisualAsset assetId={card.assetId} className="h-48 mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
               <h3 className="text-2xl font-black text-white uppercase tracking-tight">{card.title}</h3>
               <p className="text-sm text-slate-400 leading-relaxed font-medium">{card.desc}</p>
            </div>
          ))}
       </div>
    </div>
  );
};

export default GetStarted;
