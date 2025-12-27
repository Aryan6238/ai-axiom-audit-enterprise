
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center space-y-6 animate-pulse">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-indigo-600 rounded-full animate-ping opacity-20"></div>
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-bold text-slate-200">Generating Neural Benchmarks</h3>
        <p className="text-sm text-slate-500 max-w-xs mx-auto">
          Crafting a logically intensive scenario designed to challenge model weights and reasoning paths...
        </p>
      </div>
    </div>
  );
};

export default Loader;
