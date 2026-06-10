"use client";

import React from "react";

interface MetricCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
}

/**
 * A typographic metric display — no icons, no cards, no glow.
 * Just the number, beautifully set.
 */
export function MetricCard({ label, value, subtitle }: MetricCardProps) {
  return (
    <div className="space-y-2">
      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-muted font-bold">
        {label}
      </p>
      <p className="font-mono text-3xl font-bold text-ink tracking-tight">
        {value}
      </p>
      {subtitle && (
        <p className="font-mono text-[11px] text-ink-muted font-semibold">{subtitle}</p>
      )}
    </div>
  );
}
