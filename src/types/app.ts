export type DysfluencyType = 'pause' | 'repetition' | 'filler' | 'prolongation' | 'fluent';

export interface WordToken {
  word: string;
  start: number;
  end: number;
  confidence: number;
  type: DysfluencyType;
}

export interface SessionTranscript {
  words: WordToken[];
  rawText: string;
  durationSeconds: number;
}

export interface DysfluencyStats {
  pauses: number;
  repetitions: number;
  fillers: number;
  prolongations: number;
  totalWords: number;
  fluencyScore: number;
}

export interface GeminiAnalysis {
  overallFeedback: string;
  questionFeedback: string;
  coachingTip: string;
  strengths: string[];
  improvements: string[];
  fluencyScore: number;
}

export interface PracticeSession {
  id: string;
  mode: string;
  prompt: string;
  transcript: SessionTranscript;
  stats: DysfluencyStats;
  analysis: GeminiAnalysis | null;
  createdAt: string;
}

export type PracticeMode = 'job-interview' | 'presentation' | 'custom';

export interface ModeConfig {
  id: PracticeMode;
  title: string;
  description: string;
  prompts: string[];
}
