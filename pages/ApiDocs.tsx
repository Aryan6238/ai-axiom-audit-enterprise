
import React from 'react';

const ApiDocs: React.FC = () => {
  return (
    <div className="py-32 px-8 max-w-5xl mx-auto space-y-16">
      <div className="space-y-4">
        <h2 className="text-5xl font-black text-white tracking-tighter uppercase">API <br /> <span className="text-indigo-500">Intelligence</span></h2>
        <p className="text-lg text-slate-500 font-medium">Programmatically evaluate model candidates via our REST infrastructure.</p>
      </div>

      <div className="space-y-12">
        <section className="space-y-6">
           <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Authentication</h3>
           <p className="text-sm text-slate-400 font-medium">Bearer authentication using JWT tokens is required for all forensic endpoints.</p>
           <div className="bg-[#0c0f14] p-6 rounded-2xl border border-slate-800 font-mono text-xs text-indigo-400 overflow-x-auto">
             Authorization: Bearer {'{'}your_access_token{'}'}
           </div>
        </section>

        <section className="space-y-6">
           <h3 className="text-2xl font-bold text-white uppercase tracking-tight">POST /v1/audit/execute</h3>
           <p className="text-sm text-slate-400 font-medium">Initialize a deep-tissue scan on a specific model response.</p>
           <div className="bg-[#0c0f14] p-8 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Request Payload</h4>
              <pre className="font-mono text-xs text-slate-400 bg-[#05070a] p-4 rounded-xl border border-white/5 overflow-x-auto">
{`{
  "prompt": "Explain the liability of AI manufacturers.",
  "response": "Under EU law, manufacturers are solely responsible...",
  "rubrics": ["legal", "accuracy", "hallucination_check"],
  "format": "json"
}`}
              </pre>
           </div>
        </section>

        <section className="space-y-6">
           <h3 className="text-2xl font-bold text-white uppercase tracking-tight">System Reliability</h3>
           <p className="text-sm text-slate-400 font-medium italic">Endpoint latency averages 450ms for standard reasoning mapping and 1.2s for high-fidelity fact verification.</p>
        </section>
      </div>
    </div>
  );
};

export default ApiDocs;
