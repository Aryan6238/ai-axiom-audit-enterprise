
import React from 'react';

const PricingCard: React.FC<{ tier: string; price: string; features: string[]; highlight?: boolean }> = ({ tier, price, features, highlight }) => (
  <div className={`p-10 rounded-[40px] border flex flex-col space-y-8 ${highlight ? 'bg-indigo-600/10 border-indigo-500 shadow-2xl scale-105' : 'bg-[#0c0f14] border-slate-800'}`}>
     <div className="space-y-2">
        <h3 className="text-xl font-black text-white uppercase tracking-tighter">{tier}</h3>
        <p className="text-4xl font-black text-white">{price}<span className="text-sm font-medium text-slate-500">/month</span></p>
     </div>
     <ul className="flex-1 space-y-4">
        {features.map(f => (
          <li key={f} className="text-sm text-slate-400 flex items-center space-x-3 font-medium">
             <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
             <span>{f}</span>
          </li>
        ))}
     </ul>
     <button className={`w-full py-4 font-black uppercase text-xs tracking-widest rounded-xl transition-all ${highlight ? 'bg-indigo-500 text-white shadow-xl' : 'bg-white text-black hover:bg-indigo-50'}`}>
        Select Protocol
     </button>
  </div>
);

const Pricing: React.FC = () => {
  return (
    <div className="py-32 px-8 max-w-7xl mx-auto space-y-20">
      <div className="text-center space-y-4">
         <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">Global <br /> <span className="text-slate-600">Audit Tiers</span></h2>
         <p className="text-xl text-slate-500 max-w-xl mx-auto font-medium">Scalable forensic power for individual researchers and global enterprises alike.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <PricingCard 
          tier="Open Source" price="$0" 
          features={['5 Scans / month', 'Standard Logic Scrutiny', 'Public PDF Reports', 'Community Support']} 
        />
        <PricingCard 
          tier="Pro Auditor" price="$99" highlight
          features={['Unlimited Forensic Scans', 'High-Fidelity Fact Checking', 'Private Audit Ledger', 'API Integration v1', 'Priority Processing']} 
        />
        <PricingCard 
          tier="Enterprise" price="Custom" 
          features={['Custom Legal Rubrics', 'On-Prem / Private Cloud', 'SLA Support 24/7', 'SSO & Multi-Seat', 'ISO 27001 Compliance Pack']} 
        />
      </div>
    </div>
  );
};

export default Pricing;
