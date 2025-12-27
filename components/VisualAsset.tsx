import React from 'react';

// Production Asset Registry (Strictly Static for Quota Safety and Stability)
const ASSET_REGISTRY: Record<string, string> = {
  hero: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200",
  auditor: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200",
  compliance: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
  lobby: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
  abstract: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
  legal: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
  finance: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800",
  medical: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
  risk: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200"
};

interface VisualAssetProps {
  assetId: keyof typeof ASSET_REGISTRY;
  className?: string;
}

const VisualAsset: React.FC<VisualAssetProps> = ({ assetId, className = "" }) => {
  const url = ASSET_REGISTRY[assetId];

  return (
    <div className={`overflow-hidden rounded-3xl border border-white/5 bg-[#0c0f14] shadow-2xl flex items-center justify-center ${className}`}>
      {url ? (
        <img 
          src={url} 
          alt={`Axiom Audit ${assetId}`} 
          // Using object-cover and object-top to handle aspect ratio discrepancies
          className="w-full h-full object-cover object-top opacity-60 hover:opacity-100 transition-opacity duration-700"
          loading="lazy"
        />
      ) : (
        <div className="flex flex-col items-center space-y-2 opacity-10">
          <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[8px] font-black uppercase tracking-widest text-slate-600">Static_Asset_Offline</span>
        </div>
      )}
    </div>
  );
};

export default VisualAsset;