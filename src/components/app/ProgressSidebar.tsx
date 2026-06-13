'use client';

import { useState, useEffect } from 'react';
import { PracticeSession } from '@/types/app';

function generateInsight(sessions: PracticeSession[]): string | null {
  if (sessions.length < 2) return null;

  const recent = sessions.slice(0, 3);
  const older = sessions.slice(3, 6);

  if (older.length === 0) return null;

  const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const recentFluency = avg(recent.map((s) => s.analysis?.fluencyScore ?? s.stats.fluencyScore));
  const olderFluency = avg(older.map((s) => s.analysis?.fluencyScore ?? s.stats.fluencyScore));

  const recentFillers = avg(recent.map((s) => s.stats.fillers));
  const olderFillers = avg(older.map((s) => s.stats.fillers));

  const recentPauses = avg(recent.map((s) => s.stats.pauses));
  const olderPauses = avg(older.map((s) => s.stats.pauses));

  const recentReps = avg(recent.map((s) => s.stats.repetitions));
  const olderReps = avg(older.map((s) => s.stats.repetitions));

  const fluencyDelta = recentFluency - olderFluency;
  const fillerDelta = recentFillers - olderFillers;
  const pauseDelta = recentPauses - olderPauses;
  const repDelta = recentReps - olderReps;

  const changes = [
    {
      delta: fluencyDelta,
      positive: true,
      up: `Your fluency score is up ${Math.abs(fluencyDelta).toFixed(0)} points across your last 3 sessions.`,
      down: `Your fluency score has dipped ${Math.abs(fluencyDelta).toFixed(0)} points recently. Keep practicing.`,
    },
    {
      delta: -fillerDelta,
      positive: true,
      up: `Filler words are down ${Math.abs(fillerDelta).toFixed(0)} per session. Strong improvement.`,
      down: `Filler words are up ${Math.abs(fillerDelta).toFixed(0)} per session recently. Try slowing down.`,
    },
    {
      delta: -pauseDelta,
      positive: true,
      up: `Long pauses have reduced by ${Math.abs(pauseDelta).toFixed(0)} per session. Great progress.`,
      down: `Long pauses have increased by ${Math.abs(pauseDelta).toFixed(0)} per session. Focus on flow.`,
    },
    {
      delta: -repDelta,
      positive: true,
      up: `Repetitions are down ${Math.abs(repDelta).toFixed(0)} per session. Your speech is getting cleaner.`,
      down: `Repetitions have increased by ${Math.abs(repDelta).toFixed(0)} per session. Try reading aloud daily.`,
    },
  ];

  const biggest = changes.reduce((a, b) => (Math.abs(b.delta) > Math.abs(a.delta) ? b : a));

  if (Math.abs(biggest.delta) < 1) {
    return `Your speech patterns are consistent across your last ${sessions.length} sessions.`;
  }

  return biggest.delta > 0 ? biggest.up : biggest.down;
}

function scoreColor(score: number): string {
  if (score >= 75) return 'text-sage';
  if (score >= 50) return 'text-copper';
  return 'text-red-400';
}

export default function ProgressSidebar() {
  const [sessions, setSessions] = useState<PracticeSession[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('voicescribe_sessions');
      if (raw) {
        const parsed = JSON.parse(raw);
        setSessions(Array.isArray(parsed) ? parsed : []);
      }
    } catch {
      setSessions([]);
    }
  }, []);

  if (sessions.length === 0) {
    return (
      <div className="bg-paper-deep border border-rule-light rounded-xl p-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
          No data yet.
        </p>
        <p className="font-sans text-xs text-ink-muted mt-1">
          Complete sessions to see your progress.
        </p>
      </div>
    );
  }

  const bestScore = Math.max(
    ...sessions.map((s) => s.analysis?.fluencyScore ?? s.stats.fluencyScore),
  );
  const avgScore = Math.round(
    sessions.reduce((a, s) => a + (s.analysis?.fluencyScore ?? s.stats.fluencyScore), 0) /
    sessions.length,
  );

  const insight = generateInsight(sessions);

  // Chart data — up to 10 most recent, reversed so oldest is leftmost
  const chartData = sessions.slice(0, 10).reverse();
  const chartPoints = chartData.map((session, index) => {
    const score = session.analysis?.fluencyScore ?? session.stats.fluencyScore;
    const x = 30 + (index / Math.max(chartData.length - 1, 1)) * 240;
    const y = 100 - (score / 100) * 80;
    return { x, y, score };
  });

  const areaPath =
    chartPoints.length > 0
      ? `M ${chartPoints[0].x},100 L ${chartPoints[0].x},${chartPoints[0].y} ${chartPoints
        .slice(1)
        .map((p) => `L ${p.x},${p.y}`)
        .join(' ')} L ${chartPoints[chartPoints.length - 1].x},100 Z`
      : '';

  const linePath =
    chartPoints.length > 0
      ? `M ${chartPoints[0].x},${chartPoints[0].y} ${chartPoints
        .slice(1)
        .map((p) => `L ${p.x},${p.y}`)
        .join(' ')}`
      : '';

  const avgPauses = (sessions.reduce((a, s) => a + s.stats.pauses, 0) / sessions.length).toFixed(
    1,
  );
  const avgFillers = (
    sessions.reduce((a, s) => a + s.stats.fillers, 0) / sessions.length
  ).toFixed(1);
  const avgRepetitions = (
    sessions.reduce((a, s) => a + s.stats.repetitions, 0) / sessions.length
  ).toFixed(1);
  const avgProlongations = (
    sessions.reduce((a, s) => a + s.stats.prolongations, 0) / sessions.length
  ).toFixed(1);

  return (
    <div>
      {/* SECTION A — Heading */}
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted mb-4">
        Your Progress
      </p>

      {/* SECTION B — Summary pills */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <div className="bg-paper-deep border border-rule-light rounded-lg p-3 text-center">
          <p className={`font-display text-2xl font-bold ${scoreColor(bestScore)}`}>{bestScore}</p>
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mt-1">
            Best
          </p>
        </div>
        <div className="bg-paper-deep border border-rule-light rounded-lg p-3 text-center">
          <p className="font-display text-2xl font-bold text-ink">{sessions.length}</p>
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mt-1">
            Sessions
          </p>
        </div>
        <div className="bg-paper-deep border border-rule-light rounded-lg p-3 text-center">
          <p className={`font-display text-2xl font-bold ${scoreColor(avgScore)}`}>{avgScore}</p>
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mt-1">
            Average
          </p>
        </div>
      </div>

      {/* SECTION C — Insight */}
      {insight !== null && (
        <div className="bg-paper-deep border border-rule-light border-l-2 border-l-sage rounded-xl px-4 py-3 mb-5">
          <p className="font-mono text-[9px] uppercase tracking-widest text-sage mb-1">
            Insight
          </p>
          <p className="font-sans text-sm text-ink leading-relaxed">{insight}</p>
        </div>
      )}

      {/* SECTION D — SVG Line Chart */}
      <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-3">
        Fluency Score Trend
      </p>

      {sessions.length >= 2 ? (
        <svg
          width="100%"
          viewBox="0 0 300 120"
          preserveAspectRatio="xMidYMid meet"
          className="text-paper"
        >
          <defs>
            <linearGradient id="sageGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3E8B5C" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3E8B5C" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal guides */}
          {[100, 80, 60, 40].map((yVal) => (
            <line
              key={yVal}
              x1="30"
              x2="270"
              y1={yVal}
              y2={yVal}
              stroke="currentColor"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
          ))}

          {/* Y labels */}
          <text x="22" y="103" fontSize="7" fill="currentColor" opacity="0.3" textAnchor="end" fontFamily="monospace">25</text>
          <text x="22" y="83" fontSize="7" fill="currentColor" opacity="0.3" textAnchor="end" fontFamily="monospace">50</text>
          <text x="22" y="63" fontSize="7" fill="currentColor" opacity="0.3" textAnchor="end" fontFamily="monospace">75</text>
          <text x="22" y="43" fontSize="7" fill="currentColor" opacity="0.3" textAnchor="end" fontFamily="monospace">100</text>

          {/* Area fill */}
          {areaPath && <path d={areaPath} fill="url(#sageGrad)" />}

          {/* Line */}
          {linePath && (
            <path
              d={linePath}
              stroke="#3E8B5C"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Circles & score labels */}
          {chartPoints.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="2.5" fill="#3E8B5C" stroke="currentColor" strokeWidth="1.5" />
              <text
                x={p.x}
                y={p.y - 8}
                textAnchor="middle"
                fontSize="7"
                fill="currentColor"
                opacity="0.5"
                fontFamily="monospace"
              >
                {p.score}
              </text>
            </g>
          ))}
        </svg>
      ) : (
        <p className="font-mono text-[9px] text-ink-faint uppercase tracking-widest text-center py-4">
          Complete 2+ sessions to unlock trend
        </p>
      )}

      {/* SECTION E — Avg dysfluency breakdown */}
      <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-3 mt-5">
        Avg per session
      </p>

      <div>
        {[
          { label: 'Pauses', value: avgPauses },
          { label: 'Fillers', value: avgFillers },
          { label: 'Repetitions', value: avgRepetitions },
          { label: 'Prolongations', value: avgProlongations },
        ].map((row) => (
          <div
            key={row.label}
            className="flex justify-between items-center py-1.5 border-b border-rule-light last:border-b-0"
          >
            <span className="font-mono text-[9px] uppercase tracking-widest text-ink-muted">
              {row.label}
            </span>
            <span className="font-sans text-sm font-medium text-ink">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
