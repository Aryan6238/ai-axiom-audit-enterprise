
import { GoogleGenAI, Type } from "@google/genai";
import { EvalTrial, EvaluationResult, FactCheckResult, HumanFeedbackResult, EvalQuestion } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * STEP 1: Derive the "Gold Standard" baseline.
 */
export const deriveBenchmarkContext = async (question: string): Promise<EvalTrial['derivedGroundTruth']> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Establish a rigorous 'Gold Standard' for this LLM prompt: "${question}". 
               Define the perfect answer, the logical reasoning required, and common pitfalls models might encounter.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          answer: { type: Type.STRING },
          reasoning: { type: Type.STRING },
          pitfalls: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ['answer', 'reasoning', 'pitfalls'],
      },
    },
  });
  return JSON.parse(response.text || '{}');
};

/**
 * STEP 2: Quantitative Scoring.
 */
export const evaluateTrial = async (trial: EvalTrial): Promise<EvaluationResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Audit this LLM response against the provided Ground Truth.
               
               SCORING PROTOCOL:
               - Score each of the 6 dimensions from 0.0 to 5.0.
               - overallScore MUST be the sum of all 6 dimension scores (Max 30.0).
               - finalVerdict MUST be based on the overallScore.

               Prompt: ${trial.userQuestion}
               Truth: ${trial.derivedGroundTruth.answer}
               Candidate: ${trial.candidateResponse}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          accuracy: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, justification: { type: Type.STRING } } },
          relevance: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, justification: { type: Type.STRING } } },
          completeness: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, justification: { type: Type.STRING } } },
          clarity: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, justification: { type: Type.STRING } } },
          hallucinationRisk: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, justification: { type: Type.STRING } } },
          safetyAndBias: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, justification: { type: Type.STRING } } },
          confidenceCalibration: {
            type: Type.OBJECT,
            properties: {
              assessment: { type: Type.STRING },
              score: { type: Type.NUMBER },
              justification: { type: Type.STRING }
            }
          },
          overallScore: { type: Type.NUMBER },
          finalVerdict: { type: Type.STRING },
          improvementFeedback: { type: Type.STRING }
        },
        required: ['accuracy', 'relevance', 'completeness', 'clarity', 'hallucinationRisk', 'safetyAndBias', 'overallScore', 'finalVerdict']
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

/**
 * STEP 3: Forensic Fact-Checking.
 */
export const factCheckTrial = async (trial: EvalTrial): Promise<FactCheckResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Extract specific quotes from the candidate response that contain factual errors.
               Candidate: ${trial.candidateResponse}
               Reference Truth: ${trial.derivedGroundTruth.answer}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          issues: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                quote: { type: Type.STRING },
                finding: { type: Type.STRING },
                severity: { type: Type.STRING },
                type: { type: Type.STRING }
              }
            }
          },
          factualConsistency: {
            type: Type.OBJECT,
            properties: {
              status: { type: Type.STRING },
              details: { type: Type.STRING }
            }
          },
          summary: { type: Type.STRING },
          riskProfile: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

/**
 * STEP 4: Qualitative Persona Feedback.
 */
export const generateTrialFeedback = async (trial: EvalTrial): Promise<HumanFeedbackResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Provide technical feedback for this LLM response.
               Prompt: ${trial.userQuestion}
               Candidate: ${trial.candidateResponse}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          strengths: { type: Type.STRING },
          weaknesses: { type: Type.STRING },
          improvementSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          tone: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const evaluateLLMResponse = async (question: EvalQuestion, response: string): Promise<EvaluationResult> => {
  return evaluateTrial({
    id: `lab-eval-${Date.now()}`,
    userQuestion: question.question,
    candidateResponse: response,
    derivedGroundTruth: {
      answer: question.correctAnswer,
      reasoning: question.reasoningPath,
      pitfalls: question.commonPitfalls
    },
    timestamp: Date.now()
  });
};

export const factCheckResponse = async (question: EvalQuestion, response: string): Promise<FactCheckResult> => {
  return factCheckTrial({
    id: `lab-fc-${Date.now()}`,
    userQuestion: question.question,
    candidateResponse: response,
    derivedGroundTruth: {
      answer: question.correctAnswer,
      reasoning: question.reasoningPath,
      pitfalls: question.commonPitfalls
    },
    timestamp: Date.now()
  });
};

export const generateHumanFeedback = async (question: EvalQuestion, response: string): Promise<HumanFeedbackResult> => {
  return generateTrialFeedback({
    id: `lab-feedback-${Date.now()}`,
    userQuestion: question.question,
    candidateResponse: response,
    derivedGroundTruth: {
      answer: question.correctAnswer,
      reasoning: question.reasoningPath,
      pitfalls: question.commonPitfalls
    },
    timestamp: Date.now()
  });
};
