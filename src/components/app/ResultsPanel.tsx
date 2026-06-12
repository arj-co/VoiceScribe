'use client';

import React from 'react';
import { GeminiAnalysis, DysfluencyStats, WordToken } from '@/types/app';
import CoachingCard from '@/components/app/CoachingCard';

export interface ResultsPanelProps {
  analysis: GeminiAnalysis;
  stats: DysfluencyStats;
  words: WordToken[];
  mode: string;
  prompt: string;
  onPracticeAgain: () => void;
  onGoHome: () => void;
}

export default function ResultsPanel({
  analysis,
  stats,
  onPracticeAgain,
  onGoHome,
}: ResultsPanelProps) {
  const score = analysis.fluencyScore;

  const scoreColor =
    score >= 75 ? 'text-sage' : score >= 50 ? 'text-copper' : 'text-red-500';

  const ringColor =
    score >= 75 ? 'border-sage' : score >= 50 ? 'border-copper' : 'border-red-400';

  const STAT_ITEMS = [
    { label: 'Pauses',       value: stats.pauses,        dot: 'bg-amber-500' },
    { label: 'Fillers',      value: stats.fillers,       dot: 'bg-purple-500' },
    { label: 'Repetitions',  value: stats.repetitions,   dot: 'bg-red-500' },
    { label: 'Prolongations',value: stats.prolongations, dot: 'bg-orange-500' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 flex flex-col gap-6 pb-20">

      {/* SCORE HERO */}
      <div className="flex flex-col items-center text-center pt-4 pb-8">
        <div className={`w-40 h-40 rounded-full border-[5px] ${ringColor} flex flex-col justify-center items-center mb-5 bg-paper-warm`}>
          <span className={`text-6xl font-display font-bold ${scoreColor}`}>{score}</span>
          <span className="text-[11px] font-display uppercase tracking-widest text-ink-ghost mt-1">/100</span>
        </div>
        <span className="text-[11px] font-display uppercase tracking-[0.2em] text-ink-muted mb-4">
          Fluency Score
        </span>
        <p className="text-base text-ink-muted max-w-md leading-relaxed">
          {analysis.overallFeedback}
        </p>
      </div>

      {/* DIVIDER */}
      <div className="editorial-rule" />

      {/* STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {STAT_ITEMS.map(({ label, value, dot }) => (
          <div key={label} className="bg-paper-warm border border-rule rounded-2xl p-4 text-center">
            <div className={`w-2 h-2 rounded-full ${dot} mx-auto mb-3`} />
            <span className="block text-4xl font-display font-bold text-ink mb-1">{value}</span>
            <span className="text-[10px] font-display uppercase tracking-widest text-ink-ghost">{label}</span>
          </div>
        ))}
      </div>

      {/* ABOUT YOUR ANSWER */}
      <div className="bg-paper-warm border border-rule rounded-2xl overflow-hidden">
        <div className="px-6 py-3 border-b border-rule">
          <span className="text-[11px] font-display uppercase tracking-[0.15em] text-ink-muted">
            About your answer
          </span>
        </div>
        <div className="px-6 py-5 text-sm text-ink leading-relaxed">
          {analysis.questionFeedback}
        </div>
      </div>

      {/* COACHING CARD */}
      <CoachingCard
        tip={analysis.coachingTip}
        strengths={analysis.strengths}
        improvements={analysis.improvements}
      />

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 justify-center pt-4">
        <button
          onClick={onPracticeAgain}
          className="group inline-flex items-center gap-2 px-7 py-3 rounded-full border border-rule text-ink-muted font-display text-xs uppercase tracking-widest hover:border-ink hover:text-ink transition-all duration-300 cursor-pointer"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5">↺</span>
          <span>Practice Again</span>
        </button>
        <button
          onClick={onGoHome}
          className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-ink text-paper font-display text-xs uppercase tracking-widest hover:bg-copper transition-all duration-300 cursor-pointer shadow-md"
        >
          <span>New Mode</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </div>
    </div>
  );
}
