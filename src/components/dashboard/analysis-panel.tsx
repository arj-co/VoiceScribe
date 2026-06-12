"use client";

import { mockMetrics } from "@/lib/mock-data";

export function AnalysisPanel() {
  return (
    <section>
      {/* Section heading */}
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
          Session Observations
        </h2>
        <span className="font-mono text-[11px] text-ink-muted tracking-widest uppercase font-bold">
          4 min 32 sec
        </span>
      </div>

      <div className="editorial-rule-fine mb-8" />

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-0 border border-rule rounded-sm">
        {/* Fluency score */}
        <div className="col-span-2 sm:col-span-1 p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-rule">
          <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-ink-muted font-bold mb-2">Fluency</p>
          <p className="font-mono text-2xl sm:text-3xl font-bold text-ink tracking-tight">{mockMetrics.fluencyScore}%</p>
          <p className="font-mono text-[10px] text-sage font-bold uppercase tracking-wider mt-1">above average</p>
        </div>
        <div className="p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-rule">
          <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-ink-muted font-bold mb-2">Repetitions</p>
          <p className="font-mono text-2xl sm:text-3xl font-bold text-ink tracking-tight">{mockMetrics.repetitions}</p>
          <p className="font-mono text-[10px] text-ink-muted font-bold uppercase tracking-wider mt-1">detected</p>
        </div>
        <div className="p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-rule">
          <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-ink-muted font-bold mb-2">Prolongations</p>
          <p className="font-mono text-2xl sm:text-3xl font-bold text-ink tracking-tight">{mockMetrics.prolongations}</p>
          <p className="font-mono text-[10px] text-ink-muted font-bold uppercase tracking-wider mt-1">detected</p>
        </div>
        <div className="p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-rule">
          <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-ink-muted font-bold mb-2">Blocks</p>
          <p className="font-mono text-2xl sm:text-3xl font-bold text-ink tracking-tight">{mockMetrics.blocks}</p>
          <p className="font-mono text-[10px] text-ink-muted font-bold uppercase tracking-wider mt-1">detected</p>
        </div>
        <div className="p-4 sm:p-5">
          <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-ink-muted font-bold mb-2">Long Pauses</p>
          <p className="font-mono text-2xl sm:text-3xl font-bold text-ink tracking-tight">{mockMetrics.longPauses}</p>
          <p className="font-mono text-[10px] text-ink-muted font-bold uppercase tracking-wider mt-1">detected</p>
        </div>
      </div>
    </section>
  );
}
