
import React, { useState } from 'react';
import { User } from '../types';
import { authService } from '../authService';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
  onSwitchSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onSwitchSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call local Auth Service instead of broken fetch
      const user = await authService.login(email, password);
      onLoginSuccess(user);
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please verify your forensic ID.");
      setPassword(''); // Clear password on failure for security/usability
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-8 bg-[#05070a]">
      <div className="w-full max-w-md bg-[#0c0f14] border border-slate-800 rounded-[32px] p-10 shadow-2xl space-y-8 animate-in zoom-in duration-500">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">AXIOM<span className="text-indigo-500 not-italic">LOGIN</span></h2>
          <p className="text-sm text-slate-500 font-medium">Authentication required for console access.</p>
        </div>

        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Email Address</label>
            <input 
              type="email" required value={email} 
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#05070a] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none transition-all font-mono"
              placeholder="name@institution.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Master Password</label>
            <input 
              type="password" required value={password} 
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#05070a] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none transition-all font-mono"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Establish Secure Link'}
          </button>
        </form>

        <div className="text-center">
           <button 
            onClick={onSwitchSignup}
            className="text-xs text-slate-500 hover:text-indigo-400 font-bold uppercase tracking-widest transition-colors"
           >
             No Forensic ID? Create Account
           </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
