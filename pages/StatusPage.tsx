
import React from 'react';

const StatusPage: React.FC = () => {
  const systems = [
    { name: 'Forensic Engine', status: 'Operational', uptime: '99.98%' },
    { name: 'Fact-Check Database', status: 'Operational', uptime: '100%' },
    { name: 'API v1 Gateway', status: 'Operational', uptime: '99.99%' },
    { name: 'Console Dashboard', status: 'Operational', uptime: '100%' },
    { name: 'Asset Generation', status: 'Degraded', uptime: '94.2%' },
  ];

  return (
    <div className="py-32 px-8 max-w-4xl mx-auto space-y-16">
      <div className="space-y-4">
        <h2 className="text-5xl font-black text-white tracking-tighter uppercase">System <br /> <span className="text-indigo-500">Integrity</span></h2>
        <p className="text-lg text-slate-500 font-medium">Real-time status of Axiom Audit global infrastructure.</p>
      </div>

      <div className="space-y-4">
         {systems.map(s => (
           <div key={s.name} className="flex items-center justify-between p-8 bg-[#0c0f14] border border-slate-800 rounded-3xl hover:border-slate-700 transition-all">
              <div className="flex items-center space-x-4">
                 <div className={`w-3 h-3 rounded-full ${s.status === 'Operational' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                 <span className="text-lg font-bold text-white">{s.name}</span>
              </div>
              <div className="text-right">
                 <span className={`text-xs font-black uppercase tracking-widest block ${s.status === 'Operational' ? 'text-emerald-400' : 'text-amber-400'}`}>{s.status}</span>
                 <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{s.uptime} Uptime</span>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default StatusPage;
