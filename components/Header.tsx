
import React from 'react';

interface HeaderProps {
  onNavigate: (view: any) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, isLoggedIn, onLogout }) => {
  return (
    <header className="h-24 px-12 flex items-center justify-between border-b border-white/5 bg-[#05070a]/80 backdrop-blur-3xl sticky top-0 z-[100]">
      <div className="flex items-center space-x-16">
        <div 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => onNavigate('landing')}
        >
          <div className="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)] border border-indigo-400/30 group-hover:rotate-[5deg] transition-all duration-500">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="flex flex-col -space-y-1.5">
            <h1 className="text-3xl font-[900] tracking-tighter text-white uppercase italic">
              AXIOM<span className="text-indigo-500 not-italic font-black">AUDIT</span>
            </h1>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">Forensic Ops</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center space-x-10">
          {[
            { id: 'get-started', label: 'Platform' },
            { id: 'whitepaper', label: 'Compliance' },
            { id: 'contact', label: 'Connect' }
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => onNavigate(item.id)}
              className="text-[11px] font-[800] uppercase tracking-widest text-slate-400 hover:text-white transition-all"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="flex items-center space-x-8">
        {!isLoggedIn ? (
          <button 
            onClick={() => onNavigate('login')}
            className="hidden md:block text-[11px] font-[800] uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
          >
            Console Login
          </button>
        ) : (
           <div className="hidden md:flex flex-col items-end -space-y-1">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active session</span>
              <button 
                onClick={() => onNavigate('console')}
                className="text-[11px] font-black text-indigo-400 uppercase tracking-widest hover:text-white"
              >
                Auditor Dashboard
              </button>
           </div>
        )}
        <button 
          onClick={() => onNavigate(isLoggedIn ? 'console' : 'signup')}
          className="px-8 py-3.5 bg-white text-black text-[11px] font-[900] uppercase tracking-widest rounded-xl transition-all hover:bg-indigo-50 hover:scale-105 shadow-[0_15px_40px_rgba(255,255,255,0.1)]"
        >
          {isLoggedIn ? 'Access Console' : 'Get Started'}
        </button>
      </div>
    </header>
  );
};

export default Header;
