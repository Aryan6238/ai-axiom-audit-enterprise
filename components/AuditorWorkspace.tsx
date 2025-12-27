
import React, { useState } from 'react';

interface AuditorWorkspaceProps {
  onRunAudit: (q: string, r: string) => void;
  isProcessing: boolean;
}

const AuditorWorkspace: React.FC<AuditorWorkspaceProps> = ({ onRunAudit, isProcessing }) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const templates = [
    { name: 'Legal Advisory', q: 'Summarize the liability of autonomous vehicle manufacturers in the EU.', r: 'Under current EU law, manufacturers are solely responsible for all accidents regardless of environmental factors.' },
    { name: 'Medical Fact', q: 'What is the standard dosage for Metformin in early-stage Type 2 diabetes?', r: 'The typical starting dose is 2000mg twice daily taken with meals.' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && response.trim()) {
      onRunAudit(question, response);
      setQuestion('');
      setResponse('');
    }
  };

  const applyTemplate = (q: string, r: string) => {
    setQuestion(q);
    setResponse(r);
  };

  return (
    <aside className="w-full lg:w-[520px] bg-[#0c0f14] border-r border-white/5 p-10 flex flex-col space-y-10 h-auto lg:h-full z-10 shadow-2xl relative overflow-y-auto custom-scrollbar">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
           <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-500">Forensic_Input_Node</h2>
           <div className="flex space-x-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
           </div>
        </div>
        
        <div className="p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-3xl space-y-3">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Instructions</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            Paste the exact prompt provided to the candidate model and its generated output. Our engine will derive a truth-baseline and perform logical mapping.
          </p>
        </div>

        <div className="space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Quick Templates</span>
          <div className="flex flex-wrap gap-2">
            {templates.map((t, idx) => (
              <button 
                key={idx}
                onClick={() => applyTemplate(t.q, t.r)}
                className="px-4 py-2 bg-slate-900 border border-white/5 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-indigo-500/30 hover:text-white transition-all"
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="prompt-input" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>Context Query</span>
            </label>
            <span className="text-[9px] font-mono text-slate-700">{question.length} chars</span>
          </div>
          <textarea
            id="prompt-input"
            required
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What was the original prompt?..."
            className="w-full h-32 bg-[#05070a] border border-white/5 rounded-2xl p-5 text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50 transition-all font-mono placeholder:text-slate-800 resize-none shadow-inner"
          />
        </div>

        <div className="space-y-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <label htmlFor="response-input" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Candidate Payload</span>
            </label>
             <span className="text-[9px] font-mono text-slate-700">{response.length} chars</span>
          </div>
          <textarea
            id="response-input"
            required
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Paste the model's output here..."
            className="w-full flex-1 bg-[#05070a] border border-white/5 rounded-2xl p-5 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all font-mono placeholder:text-slate-800 resize-none min-h-[250px] shadow-inner"
          />
        </div>

        <div className="pt-4 space-y-6">
          <button
            type="submit"
            disabled={isProcessing || !question.trim() || !response.trim()}
            className="group relative w-full bg-white text-black font-black uppercase tracking-[0.15em] text-[11px] py-6 rounded-2xl transition-all hover:bg-indigo-50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_20px_40px_rgba(255,255,255,0.05)] overflow-hidden"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center space-x-4">
                <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span className="animate-pulse">Analyzing_Logic_Flow</span>
              </span>
            ) : (
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <span>Execute Forensic Scan</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
          
          <div className="flex items-center justify-between text-[9px] text-slate-600 font-[800] uppercase tracking-[0.2em] px-2">
             <span className="flex items-center space-x-2">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
               <span>Secured with AES-256 Encryption</span>
             </span>
             <span>Forensic Node v1.8.4</span>
          </div>
        </div>
      </form>
    </aside>
  );
};

export default AuditorWorkspace;
