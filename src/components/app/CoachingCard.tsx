'use client';

import React from 'react';

export interface CoachingCardProps {
  tip: string;
  strengths: string[];
  improvements: string[];
}

export default function CoachingCard({ tip, strengths, improvements }: CoachingCardProps) {
  return (
    <div className="bg-paper-warm border border-rule rounded-2xl overflow-hidden">
      {/* Coaching Tip */}
      <div>
        <div className="px-6 py-3 border-b border-rule bg-sage-wash">
          <span className="text-[11px] font-display uppercase tracking-[0.15em] text-sage">
            ◈ Coaching Tip
          </span>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-ink leading-relaxed">{tip}</p>
        </div>
      </div>

      {/* Strengths */}
      <div className="border-t border-rule">
        <div className="px-6 py-3 border-b border-rule bg-sage-wash">
          <span className="text-[11px] font-display uppercase tracking-[0.15em] text-sage">
            ✓ What you did well
          </span>
        </div>
        <div className="px-6 py-5">
          <ul className="space-y-2">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-ink">
                <span className="text-sage mt-0.5 shrink-0 font-display">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Improvements */}
      <div className="border-t border-rule">
        <div className="px-6 py-3 border-b border-rule bg-copper-wash">
          <span className="text-[11px] font-display uppercase tracking-[0.15em] text-copper-light">
            ↑ Areas to improve
          </span>
        </div>
        <div className="px-6 py-5">
          <ul className="space-y-2">
            {improvements.map((im, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-ink">
                <span className="text-copper mt-0.5 shrink-0 font-display">→</span>
                <span>{im}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
