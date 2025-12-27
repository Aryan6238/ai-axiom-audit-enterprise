
export type Severity = 'Low' | 'Medium' | 'High';

export enum Domain {
  General = 'General',
  Legal = 'Legal',
  Medical = 'Medical',
  Financial = 'Financial',
  Technical = 'Technical'
}

export interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
  token?: string;
}

export interface ForensicIssue {
  quote: string;
  finding: string;
  severity: Severity;
  type: 'Inaccuracy' | 'Hallucination' | 'Contradiction' | 'Omission';
}

export interface EvalQuestion {
  id: string;
  question: string;
  domain: Domain;
  correctAnswer: string;
  reasoningPath: string;
  commonPitfalls: string[];
  timestamp: number;
}

export interface EvalTrial {
  id: string;
  userQuestion: string;
  candidateResponse: string;
  derivedGroundTruth: {
    answer: string;
    reasoning: string;
    pitfalls: string[];
  };
  evaluation?: EvaluationResult;
  factCheck?: FactCheckResult;
  humanFeedback?: HumanFeedbackResult;
  timestamp: number;
}

export interface CriterionResult {
  score: number;
  justification: string;
}

export interface EvaluationResult {
  accuracy: CriterionResult;
  relevance: CriterionResult;
  completeness: CriterionResult;
  clarity: CriterionResult;
  hallucinationRisk: CriterionResult;
  safetyAndBias: CriterionResult;
  confidenceCalibration: {
    assessment: 'Justified' | 'Overconfident' | 'Underconfident' | 'Uncertain';
    score: number;
    justification: string;
  };
  overallScore: number;
  finalVerdict: 'Excellent' | 'Acceptable' | 'Needs Improvement' | 'Critical Failure';
  improvementFeedback: string;
}

export interface FactCheckResult {
  issues: ForensicIssue[];
  factualConsistency: {
    status: 'Consistent' | 'Self-Contradictory';
    details: string;
  };
  summary: string;
  riskProfile: 'Safe' | 'Warning' | 'High-Risk' | 'Critical';
}

export interface HumanFeedbackResult {
  strengths: string;
  weaknesses: string;
  improvementSuggestions: string[];
  tone: string;
}
