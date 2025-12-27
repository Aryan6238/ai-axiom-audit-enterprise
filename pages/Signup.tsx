
import React, { useState } from 'react';
import { User } from '../types';
import { authService } from '../authService';

interface SignupProps {
  onSignupSuccess: (user: User) => void;
  onSwitchLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignupSuccess, onSwitchLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: ''
  });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setError('');

    // 1. Client-side Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      // 2. Call local Auth Service
      await authService.register(
        formData.name,
        formData.email,
        formData.password,
        formData.company
      );

      // 3. Handle Success
      setSuccessMsg("Account created successfully! You can now log in.");
      setFormData({ name: '', email: '', password: '', confirmPassword: '', company: '' });
      
      // We don't auto-log in to ensure they see the success message
      // and go through the intended flow.
    } catch (err: any) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-8 bg-[#05070a]">
      <div className="w-full max-w-md bg-[#0c0f14] border border-slate-800 rounded-[32px] p-10 shadow-2xl space-y-8 animate-in zoom-in duration-500">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">AXIOM<span className="text-indigo-500 not-italic">SIGNUP</span></h2>
          <p className="text-sm text-slate-500 font-medium">Create your institutional auditor credentials.</p>
        </div>

        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold rounded-xl text-center">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold rounded-xl text-center">
            {successMsg}
            <button 
              onClick={onSwitchLogin}
              className="block w-full mt-2 text-white bg-emerald-600 py-2 rounded-lg font-black uppercase tracking-widest text-[10px]"
            >
              Go to Login
            </button>
          </div>
        )}

        {!successMsg && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Full Name</label>
                <input 
                  type="text" required value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#05070a] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Institution</label>
                <input 
                  type="text" required value={formData.company} 
                  onChange={e => setFormData({...formData, company: e.target.value})}
                  className="w-full bg-[#05070a] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Email Address</label>
              <input 
                type="email" required value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-[#05070a] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none transition-all font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Password</label>
              <input 
                type="password" required value={formData.password} 
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full bg-[#05070a] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none transition-all font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Confirm Password</label>
              <input 
                type="password" required value={formData.confirmPassword} 
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full bg-[#05070a] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none transition-all font-mono"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Initializing ID...' : 'Provision Forensic ID'}
            </button>
          </form>
        )}

        <div className="text-center">
           <button 
            onClick={onSwitchLogin}
            className="text-xs text-slate-500 hover:text-indigo-400 font-bold uppercase tracking-widest transition-colors"
           >
             Already an auditor? Login
           </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
