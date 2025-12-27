
import React from 'react';
import VisualAsset from './VisualAsset';

interface HeroProps {
  onStart: () => void;
  onWhitepaper: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart, onWhitepaper }) => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-8 py-20 overflow-hidden">
      {/* Background Imagery */}
      <div className="absolute inset-0 z-0">
         <VisualAsset assetId="hero" className="w-full h-full rounded-none border-none opacity-20 scale-110 blur-[2px]" />
         <div className="absolute inset-0 bg-gradient-to-b from-[#05070a] via-transparent to-[#05070a]" />
      </div>

      <div className="relative z-10 max-w-6xl text-center space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="inline-flex items-center space-x-4 px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-black uppercase tracking-[0.3em]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span>Axiom Forensic Engine v2.4 Active</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white tracking-wider leading-[0.85] uppercase italic">
          "Examine Every Step of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-indigo-400 to-emerald-400 not-italic"> AI Reasoning."</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
          We provide deterministic verification for large AI models, mapping and scoring their reasoning to certify accuracy and reliability in critical enterprise deployments.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 pt-8">
          <button 
            onClick={onStart}
            className="w-full md:w-auto px-12 py-6 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-indigo-50 transition-all hover:scale-105 shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
          >
            Launch Console
          </button>
          <button 
            onClick={onWhitepaper}
            className="w-full md:w-auto px-12 py-6 bg-transparent text-white font-black uppercase tracking-widest text-xs rounded-2xl border border-slate-800 hover:bg-white/5 transition-all"
          >
            AI Alignment Guide
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
