"use client";

import { mockProgressData } from "@/lib/mock-data";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* eslint-disable @typescript-eslint/no-explicit-any */
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-paper border border-rule px-4 py-3 shadow-[0_4px_16px_rgba(44,37,32,0.1)] rounded-md">
        <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted mb-1">
          {label}
        </p>
        <p className="font-mono text-lg font-bold text-ink">
          {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
}

export function ProgressPanel() {
  return (
    <section>
      {/* Section heading */}
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
          Your Journey
        </h2>
        <span className="font-mono text-[11px] text-sage tracking-widest uppercase font-bold">
          +23 pts since May
        </span>
      </div>

      <div className="editorial-rule-fine mb-8" />

      {/* Chart — warm, editorial, NYT-style */}
      <div className="h-[260px] sm:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={mockProgressData}
            margin={{ top: 10, right: 4, left: -24, bottom: 0 }}
          >
            <defs>
              <linearGradient id="warmGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A0704A" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#A0704A" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="0"
              stroke="#D8D0C4"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#7A6E66",
                fontSize: 11,
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: 600
              }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#7A6E66",
                fontSize: 11,
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: 600
              }}
              domain={[50, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="fluencyScore"
              stroke="#A0704A"
              strokeWidth={2.5}
              fill="url(#warmGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "#A0704A",
                stroke: "#FBF8EE",
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Axis label */}
      <div className="mt-4 flex justify-between">
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-muted font-bold">
          Fluency score over time
        </span>
      </div>
    </section>
  );
}
