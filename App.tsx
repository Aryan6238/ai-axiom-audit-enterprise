
import React, { useState, useEffect } from 'react';
import { User, EvalTrial } from './types';
import { deriveBenchmarkContext, evaluateTrial, factCheckTrial, generateTrialFeedback } from './geminiService';
import { authService } from './authService';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import AuditorWorkspace from './components/AuditorWorkspace';
import EvaluationResultCard from './components/EvaluationResultCard';
import HowItWorks from './components/HowItWorks';
import WhyMatters from './components/WhyMatters';
import WhatIsSection from './components/WhatIsSection';
import Features from './components/Features';
import ForensicExample from './components/ForensicExample';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import GetStarted from './pages/GetStarted';
import Whitepaper from './pages/Whitepaper';
import StatusPage from './pages/StatusPage';
import Pricing from './pages/Pricing';
import ApiDocs from './pages/ApiDocs';

type View = 'landing' | 'get-started' | 'whitepaper' | 'contact' | 'login' | 'signup' | 'console' | 'status' | 'pricing' | 'docs';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [trials, setTrials] = useState<EvalTrial[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Initial Auth Check
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    
    // 2. Load History
    const savedTrials = localStorage.getItem('axiom_audit_history');
    if (savedTrials) {
      try { setTrials(JSON.parse(savedTrials)); } catch (e) {}
    }
  }, []);

  const navigate = (view: View) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Protected route check
    if (view === 'console' && !user) {
      setCurrentView('login');
      return;
    }
    
    // If user is already logged in and goes to login/signup, redirect to console
    if ((view === 'login' || view === 'signup') && user) {
      setCurrentView('console');
      return;
    }

    setCurrentView(view);
  };

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setCurrentView('console');
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentView('landing');
  };

  const handleRunAudit = async (q: string, r: string) => {
    setIsProcessing(true);
    setError(null);
    try {
      const truth = await deriveBenchmarkContext(q);
      const trial: EvalTrial = {
        id: `AUD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        userQuestion: q,
        candidateResponse: r,
        derivedGroundTruth: truth,
        timestamp: Date.now()
      };
      setTrials(prev => [trial, ...prev]);
      
      const [ev, fc, hb] = await Promise.all([
        evaluateTrial(trial),
        factCheckTrial(trial),
        generateTrialFeedback(trial)
      ]);

      setTrials(prev => {
        const updated = prev.map(t => t.id === trial.id ? { ...t, evaluation: ev, factCheck: fc, humanFeedback: hb } : t);
        localStorage.setItem('axiom_audit_history', JSON.stringify(updated));
        return updated;
      });
    } catch (e: any) {
      setError(e.message || "Audit interrupted.");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderContent = () => {
    switch(currentView) {
      case 'get-started': return <GetStarted onStart={() => navigate('signup')} />;
      case 'whitepaper': return <Whitepaper />;
      case 'contact': return <Contact />;
      case 'login': return <Login onLoginSuccess={handleAuthSuccess} onSwitchSignup={() => navigate('signup')} />;
      case 'signup': return <Signup onSignupSuccess={handleAuthSuccess} onSwitchLogin={() => navigate('login')} />;
      case 'status': return <StatusPage />;
      case 'pricing': return <Pricing />;
      case 'docs': return <ApiDocs />;
      case 'console':
        return (
          <div className="py-20 animate-in fade-in duration-700 min-h-screen">
             <div className="max-w-7xl mx-auto px-8 mb-12 flex items-center justify-between">
                <div>
                   <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Forensic Console</h2>
                   <p className="text-slate-500 text-sm font-medium">Session Active for: <span className="text-indigo-400">{user?.name}</span> @ {user?.company || 'Independent'}</p>
                </div>
                <button onClick={handleLogout} className="px-6 py-2 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-rose-500 hover:text-white transition-all">Terminate Session</button>
             </div>
             
             <div className="max-w-[1440px] mx-auto px-4 md:px-8">
               <div className="flex flex-col lg:flex-row overflow-hidden min-h-[850px] border border-slate-800 rounded-[48px] bg-[#0c0f14]/80 backdrop-blur-3xl shadow-2xl">
                 <AuditorWorkspace onRunAudit={handleRunAudit} isProcessing={isProcessing} />
                 <section className="flex-1 overflow-y-auto p-8 md:p-16 space-y-16 bg-[#05070a]/30">
                    {trials.length === 0 && !isProcessing ? (
                      <div className="h-full flex flex-col items-center justify-center opacity-40 text-center space-y-4">
                         <div className="w-16 h-16 rounded-3xl bg-slate-800 flex items-center justify-center">
                            <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                         </div>
                         <h3 className="text-xl font-bold text-white">No Audit History</h3>
                         <p className="text-xs text-slate-500 uppercase tracking-widest font-black max-w-xs">Initialize a scan from the left workspace to begin forensic mapping.</p>
                      </div>
                    ) : (
                      trials.map(t => <EvaluationResultCard key={t.id} trial={t} onDelete={() => setTrials(prev => prev.filter(p => p.id !== t.id))} />)
                    )}
                 </section>
               </div>
             </div>
          </div>
        );
      default:
        return (
          <>
            <Hero 
              onStart={() => navigate('get-started')} 
              onWhitepaper={() => navigate('whitepaper')} 
            />
            <WhatIsSection />
            <WhyMatters />
            <ForensicExample />
            <HowItWorks />
            <Features />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 selection:bg-indigo-500/30 overflow-x-hidden flex flex-col">
      <Header 
        onNavigate={navigate} 
        isLoggedIn={!!user} 
        onLogout={handleLogout}
      />
      <main className="flex-1">
        {renderContent()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;
