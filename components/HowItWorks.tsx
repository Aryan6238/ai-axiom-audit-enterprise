
import React from 'react';

const Step: React.FC<{ num: string; title: string; desc: string }> = ({ num, title, desc }) => (
  <div className="flex flex-col space-y-6 relative group">
    <div className="text-8xl font-black text-white/5 absolute -top-12 -left-6 select-none group-hover:text-indigo-500/10 transition-colors">
      {num}
    </div>
    <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-lg font-black shadow-xl shadow-indigo-600/20 relative z-10">
      {num}
    </div>
    <h3 className="text-2xl font-bold text-white relative z-10">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed relative z-10 font-medium">{desc}</p>
  </div>
);

const HowItWorks: React.FC = () => {
  return (
    <section className="py-32 px-8 border-y border-slate-900 bg-[#05070a] relative">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="max-w-2xl space-y-4">
           <h2 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-500">The Axiom Protocol</h2>
           <p className="text-3xl md:text-5xl font-black text-white tracking-tighter">Automating the standard for model verification.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-16 relative">
          <div className="absolute top-6 left-0 right-0 h-[1px] bg-slate-800 hidden md:block" />
          <Step 
            num="01"
            title="Ingestion"
            desc="Input your prompt and the candidate model's response. Axiom supports batch imports via JSON/CSV for high-volume benchmarking."
          />
          <Step 
            num="02"
            title="Forensic Scrutiny"
            desc="Our Judge-Engine derives a gold-standard benchmark and maps the candidate payload against facts, logic, and safety rubrics."
          />
          <Step 
            num="03"
            title="Certified Report"
            desc="Receive a forensic breakdown, aggregate scores, and an exportable PDF audit report signed for corporate compliance logs."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
