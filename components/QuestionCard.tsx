
import React, { useState } from 'react';
import { EvalQuestion, EvaluationResult, FactCheckResult, HumanFeedbackResult } from '../types';
import { evaluateLLMResponse, factCheckResponse, generateHumanFeedback } from '../geminiService';
import EvaluationDashboard from './EvaluationDashboard';
import FactCheckDisplay from './FactCheckDisplay';
import HumanFeedbackDisplay from './HumanFeedbackDisplay';

interface QuestionCardProps {
  question: EvalQuestion;
  onDelete: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [labOpen, setLabOpen] = useState(false);
  const [llmInput, setLlmInput] = useState('');
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [factCheck, setFactCheck] = useState<FactCheckResult | null>(null);
  const [humanFeedback, setHumanFeedback] = useState<HumanFeedbackResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isFactChecking, setIsFactChecking] = useState(false);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);

  const handleRunEvaluation = async () => {
    if (!llmInput.trim()) return;
    setIsEvaluating(true);
    setEvaluation(null);
    try {
      const result = await evaluateLLMResponse(question, llmInput);
      setEvaluation(result);
    } catch (err) {
      console.error(err);
      alert("Failed to evaluate response.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleRunFactCheck = async () => {
    if (!llmInput.trim()) return;
    setIsFactChecking(true);
    setFactCheck(null);
    try {
      const result = await factCheckResponse(question, llmInput);
      setFactCheck(result);
    } catch (err) {
      console.error(err);
      alert("Failed to fact check response.");
    } finally {
      setIsFactChecking(false);
    }
  };

  const handleGenerateFeedback = async () => {
    if (!llmInput.trim()) return;
    setIsGeneratingFeedback(true);
    setHumanFeedback(null);
    try {
      const result = await generateHumanFeedback(question, llmInput);
      setHumanFeedback(result);
    } catch (err) {
      console.error(err);
      alert("Failed to generate reviewer feedback.");
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all group shadow-xl">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 bg-indigo-900/30 text-indigo-400 text-[10px] font-bold uppercase tracking-wider rounded border border-indigo-500/20">
              {question.domain}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {new Date(question.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <button 
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-900/20 text-slate-500 hover:text-red-400 rounded transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-lg font-medium text-slate-100 leading-relaxed">
            {question.question}
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setExpanded(!expanded)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center space-x-2 border ${
                expanded ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <span>{expanded ? 'Hide Key' : 'Show Answer Key'}</span>
            </button>

            <button
              onClick={() => setLabOpen(!labOpen)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center space-x-2 border ${
                labOpen ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-emerald-900/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-900/20'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span>{evaluation || factCheck || humanFeedback ? 'View Benchmarks' : 'Evaluation Lab'}</span>
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="p-6 border-t border-slate-800 bg-slate-950/50 space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Correct Answer</h4>
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl text-emerald-400 font-mono text-sm">
                {question.correctAnswer}
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Common Pitfalls</h4>
              <ul className="space-y-2">
                {question.commonPitfalls.map((p, i) => (
                  <li key={i} className="text-sm text-slate-400 flex items-start space-x-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/50 flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Reasoning Path</h4>
            <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl text-slate-300 text-sm whitespace-pre-wrap font-mono">
              {question.reasoningPath}
            </div>
          </div>
        </div>
      )}

      {labOpen && (
        <div className="p-6 border-t border-slate-800 bg-slate-900/40 space-y-6">
          <div className="flex flex-col space-y-4">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Candidate LLM Output</label>
            <textarea
              value={llmInput}
              onChange={(e) => setLlmInput(e.target.value)}
              placeholder="Paste the output from the LLM you are testing here..."
              className="w-full h-40 bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all font-mono shadow-inner"
            />
            <div className="flex flex-wrap justify-end gap-3">
              <button
                onClick={handleGenerateFeedback}
                disabled={isGeneratingFeedback || !llmInput.trim()}
                className="bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs font-bold py-3 px-6 rounded-lg transition-all flex items-center space-x-2 shadow-lg shadow-sky-600/20"
              >
                {isGeneratingFeedback ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Writing Review...</span>
                  </>
                ) : (
                  <span>Reviewer Feedback</span>
                )}
              </button>
              <button
                onClick={handleRunFactCheck}
                disabled={isFactChecking || !llmInput.trim()}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs font-bold py-3 px-6 rounded-lg transition-all flex items-center space-x-2 shadow-lg shadow-indigo-600/20"
              >
                {isFactChecking ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Fact Checking...</span>
                  </>
                ) : (
                  <span>Validate Facts</span>
                )}
              </button>
              <button
                onClick={handleRunEvaluation}
                disabled={isEvaluating || !llmInput.trim()}
                className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs font-bold py-3 px-6 rounded-lg transition-all flex items-center space-x-2 shadow-lg shadow-emerald-600/20"
              >
                {isEvaluating ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Scoring...</span>
                  </>
                ) : (
                  <span>Run Score Critique</span>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {humanFeedback && <HumanFeedbackDisplay result={humanFeedback} />}
            {factCheck && <FactCheckDisplay result={factCheck} />}
            {evaluation && <EvaluationDashboard result={evaluation} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
