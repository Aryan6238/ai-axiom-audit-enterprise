
import React from 'react';

interface FooterProps {
  onNavigate: (view: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-800 bg-[#0c0f14] py-20 px-8 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
        <div className="col-span-2 space-y-8">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
             </div>
             <span className="text-xl font-black text-white tracking-tighter">AXIOM<span className="text-indigo-500">AUDIT</span></span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-500 font-medium">
             <div className="space-y-4">
                <h4 className="text-white font-black uppercase text-[10px] tracking-widest">Office HQ</h4>
                <p>Pune, Maharashtra, India.</p>
                <p>Email: <a href="mailto:aryanjalak12@gmail.com" className="text-indigo-400 hover:underline">aryanjalak12@gmail.com</a></p>
                <p>PH No: <a href="tel:+918767390358" className="text-indigo-400">+91-8767390358</a></p>
             </div>
             <div className="space-y-4">
                <h4 className="text-white font-black uppercase text-[10px] tracking-widest">Global Connect</h4>
                <div className="flex space-x-4">
                  <a href="https://github.com/Aryan6238" target="_blank" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors">
                    <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </a>
                  <a href="https://www.linkedin.com/in/aryan-jalak-51430734b" target="_blank" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors">
                    <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                </div>
             </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm">Product</h4>
          <ul className="text-sm text-slate-500 space-y-2">
            <li onClick={() => onNavigate('console')} className="hover:text-indigo-400 cursor-pointer transition-colors">Forensic Console</li>
            <li onClick={() => onNavigate('docs')} className="hover:text-indigo-400 cursor-pointer transition-colors">API Docs</li>
            <li onClick={() => onNavigate('pricing')} className="hover:text-indigo-400 cursor-pointer transition-colors">Pricing</li>
            <li onClick={() => onNavigate('status')} className="hover:text-indigo-400 cursor-pointer transition-colors">Status</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm">Legal</h4>
          <ul className="text-sm text-slate-500 space-y-2">
            <li onClick={() => onNavigate('whitepaper')} className="hover:text-indigo-400 cursor-pointer transition-colors">Compliance Whitepaper</li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors">Privacy Policy</li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors">Terms of Service</li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors">Cookie Policy</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-20 flex flex-col md:flex-row items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
        <span>© 2025 Axiom Forensic Audit System</span>
        <span>MADE IN INDIA • By Aryan Jalak</span>
      </div>
    </footer>
  );
};

export default Footer;
