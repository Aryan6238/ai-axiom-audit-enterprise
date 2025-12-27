
import React, { useState, useEffect } from 'react';
import VisualAsset from '../components/VisualAsset';
import { contactService, ContactInquiry } from '../contactService';
import { authService } from '../authService';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [adminLedger, setAdminLedger] = useState<ContactInquiry[]>([]);
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    if (currentUser) {
      setAdminLedger(contactService.getInquiries());
    }
  }, [currentUser]);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side Validation
    if (!formData.company || !formData.email || !formData.message) {
      setError("Institutional requirements: All fields must be populated.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Syntax error: Please provide a valid institutional email.");
      return;
    }

    setLoading(true);
    try {
      await contactService.submitInquiry(
        formData.company,
        formData.email,
        formData.message
      );
      setSuccess(true);
      setFormData({ company: '', email: '', message: '' });
      // Update log if admin
      if (currentUser) setAdminLedger(contactService.getInquiries());
    } catch (err: any) {
      // Specialized error message for SMTP setup
      if (err.message.includes('Relay')) {
        setError("Transmission Failure: Ensure the backend relay (server.js) is active and environment credentials are valid.");
      } else {
        setError(err.message || "Failed to establish secure transmission link.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 px-8 max-w-7xl mx-auto space-y-32">
       <div className="grid md:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
             <div className="space-y-4">
                <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Consult <br /><span className="text-indigo-500">A Solutions Architect</span></h1>
                <p className="text-xl text-slate-400 font-medium leading-relaxed">Deploy high-scrutiny model evaluation at scale across your infrastructure with secure SMTP reporting.</p>
             </div>
             
             <VisualAsset assetId="lobby" className="aspect-video opacity-60" />

             <div className="grid grid-cols-2 gap-8 text-sm pt-8 border-t border-slate-900">
                <div className="space-y-1">
                   <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Regional Hub</h4>
                   <p className="text-slate-300 font-medium">Pune, India</p>
                </div>
                <div className="space-y-1">
                   <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Lead Architect</h4>
                   <p className="text-slate-300 font-medium">aryanbusiness38@gmail.com</p>
                </div>
             </div>
          </div>

          <div className="bg-[#0c0f14] border border-slate-800 rounded-[48px] p-12 shadow-2xl relative overflow-hidden transition-all duration-500">
             {success ? (
                <div className="py-20 text-center space-y-6 animate-in fade-in zoom-in duration-700">
                   <div className="w-24 h-24 bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                   </div>
                   <h2 className="text-3xl font-black text-white uppercase tracking-tight">Transmission Confirmed</h2>
                   <p className="text-slate-400 font-medium max-w-xs mx-auto">Forensic inquiry has been relayed to the Solutions Desk via Secure SMTP.</p>
                   <button 
                     onClick={() => setSuccess(false)}
                     className="mt-8 text-xs font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors"
                   >
                     New Transmission Protocol
                   </button>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
                   <div className="space-y-6">
                      {error && (
                        <div className="p-5 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold rounded-2xl text-center shadow-lg">
                          <span className="block mb-1 uppercase tracking-widest">Audit Failure</span>
                          {error}
                        </div>
                      )}
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Institution / Company</label>
                         <input 
                            required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                            className="w-full bg-[#05070a] border border-slate-800 rounded-2xl px-5 py-4 text-sm focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-800" 
                            placeholder="e.g. Stanford AI Lab"
                            disabled={loading}
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Business Email</label>
                         <input 
                            required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-[#05070a] border border-slate-800 rounded-2xl px-5 py-4 text-sm focus:border-indigo-500 focus:outline-none transition-all font-mono placeholder:text-slate-800" 
                            placeholder="architect@institution.com"
                            disabled={loading}
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Audit Requirements</label>
                         <textarea 
                            required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                            className="w-full bg-[#05070a] border border-slate-800 rounded-2xl px-5 py-4 text-sm focus:border-indigo-500 focus:outline-none transition-all resize-none placeholder:text-slate-800" 
                            placeholder="Describe your model scrutiny needs..."
                            disabled={loading}
                         />
                      </div>
                   </div>
                   <button 
                      disabled={loading}
                      className="w-full py-6 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl transition-all hover:bg-indigo-50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 overflow-hidden relative"
                   >
                      <span className="relative z-10 flex items-center justify-center space-x-3">
                        {loading ? (
                          <>
                             <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                             <span>Establishing Secure Link...</span>
                          </>
                        ) : (
                          <>
                             <span>Transmit to Architect</span>
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                          </>
                        )}
                      </span>
                      {loading && <div className="absolute inset-0 bg-indigo-500/10 animate-pulse" />}
                   </button>
                </form>
             )}
          </div>
       </div>

       {currentUser && adminLedger.length > 0 && (
         <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="space-y-8">
               <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-lg" />
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter">Forensic Submission Ledger</h2>
               </div>
               <div className="grid gap-6">
                  {adminLedger.map((inquiry) => (
                    <div key={inquiry.id} className="p-8 bg-[#0c0f14] border border-slate-800 rounded-[32px] flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-indigo-500/40 transition-all">
                       <div className="space-y-2 flex-1">
                          <div className="flex items-center space-x-4">
                             <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">{inquiry.id}</span>
                             <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{new Date(inquiry.timestamp).toLocaleString()}</span>
                          </div>
                          <h4 className="text-lg font-black text-white">{inquiry.company}</h4>
                          <p className="text-sm text-slate-400 font-medium italic leading-relaxed">"{inquiry.message}"</p>
                       </div>
                       <div className="flex flex-col items-end shrink-0">
                          <span className="text-xs font-mono text-slate-500">{inquiry.email}</span>
                          <span className="text-[10px] font-black uppercase text-emerald-500 mt-2 tracking-widest border border-emerald-500/20 px-2 py-0.5 rounded">Ledger Logged</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
       )}
    </div>
  );
};

export default Contact;
