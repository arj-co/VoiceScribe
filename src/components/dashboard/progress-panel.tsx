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
      <div className="bg-cream border border-rule px-4 py-3 shadow-sm">
        <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-faint mb-1">
          {label}
        </p>
        <p className="font-mono text-lg text-ink">
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
              <linearGradient
                id="warmGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#B0845B" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#B0845B" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="0"
              stroke="#E8E3DC"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#78716C",
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
                fill: "#78716C",
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
              stroke="#B0845B"
              strokeWidth={3}
              fill="url(#warmGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "#B0845B",
                stroke: "#F6F1EB",
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
