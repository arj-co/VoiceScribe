"use client";

import { mockSessionSummary } from "@/lib/mock-data";

export function SessionSummary() {
  return (
    <section>
      {/* Section heading */}
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
          Reflections
        </h2>
        <span className="font-mono text-[11px] text-ink-muted tracking-widest uppercase font-bold">
          Latest session
        </span>
      </div>

      <div className="editorial-rule-fine mb-8" />

      {/* Stats row — typographic, not card-based */}
      <div className="grid grid-cols-4 gap-0 border-b border-rule-light pb-8 mb-8">
        <div>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-muted font-bold mb-2">
            Duration
          </p>
          <p className="font-mono text-xl sm:text-2xl font-bold text-ink">
            {mockSessionSummary.duration}
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-muted font-bold mb-2">
            Words
          </p>
          <p className="font-mono text-xl sm:text-2xl font-bold text-ink">
            {mockSessionSummary.totalWords}
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-muted font-bold mb-2">
            WPM
          </p>
          <p className="font-mono text-xl sm:text-2xl font-bold text-ink">
            {mockSessionSummary.wordsPerMinute}
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-muted font-bold mb-2">
            Change
          </p>
          <p className="font-mono text-xl sm:text-2xl font-bold text-sage">
            {mockSessionSummary.improvement}%
          </p>
        </div>
      </div>

      {/* Insights — written like editorial commentary, not alert boxes */}
      <div className="space-y-6">
        <div>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-sage font-bold mb-2">
            What went well
          </p>
          <p className="font-display text-lg sm:text-xl font-semibold text-ink leading-relaxed italic">
            &ldquo;{mockSessionSummary.topStrength}&rdquo;
          </p>
        </div>

        <div className="editorial-rule-fine" />

        <div>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-copper font-bold mb-2">
            Something to explore
          </p>
          <p className="font-display text-lg sm:text-xl font-semibold text-ink leading-relaxed italic">
            &ldquo;{mockSessionSummary.topArea}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
