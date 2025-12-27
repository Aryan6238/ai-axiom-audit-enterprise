
import React from 'react';

const ApiDocs: React.FC = () => {
  return (
    <div className="py-32 px-8 max-w-5xl mx-auto space-y-16">
      <div className="space-y-4">
        <h2 className="text-5xl font-black text-white tracking-tighter uppercase">API <br /> <span className="text-indigo-500">Intelligence</span></h2>
        <p className="text-lg text-slate-500 font-medium">Programmatically test and assess AI model candidates using our REST-based API, making evaluation fast and automated.</p>
      </div>

      <div className="space-y-12">
        <section className="space-y-6">
           <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Authentication</h3>
           <p className="text-sm text-slate-400 font-medium">All forensic endpoints require authentication. Use bearer tokens (JWT) to securely access the API.</p>
           <div className="bg-[#0c0f14] p-6 rounded-2xl border border-slate-800 font-mono text-xs text-indigo-400 overflow-x-auto">
             Authorization: Bearer {'{'}your_access_token{'}'}
           </div>
        </section>

        <section className="space-y-6">
           <h3 className="text-2xl font-bold text-white uppercase tracking-tight">POST /v1/audit/execute</h3>
           <p className="text-sm text-slate-400 font-medium">Use the endpoint POST /v1/audit/execute to start an in-depth audit of a particular AI model output, checking for accuracy, logic, and alignment.</p>
           <div className="bg-[#0c0f14] p-8 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Request Payload</h4>
              <pre className="font-mono text-xs text-slate-400 bg-[#05070a] p-4 rounded-xl border border-white/5 overflow-x-auto">
{`{
  "prompt": "Explain the liability of AI manufacturers in India.",
  "response": "Under Indian law, manufacturers and deployers of AI systems may be held responsible for harm caused due to negligence, failure to comply with the Digital Personal Data Protection (DPDP) Act, or violations of relevant industry standards...",
  "rubrics": ["legal", "accuracy", "hallucination_check"],
  "format": "json"
}`}
              </pre>
           </div>
        </section>

        <section className="space-y-6">
           <h3 className="text-2xl font-bold text-white uppercase tracking-tight">System Reliability</h3>
           <p className="text-sm text-slate-400 font-medium italic">The system typically responds in 5-7 seconds when performing regular reasoning tests, and around 8 seconds when doing in-depth fact-checking to ensure high accuracy.</p>
        </section>
      </div>
    </div>
  );
};

export default ApiDocs;
