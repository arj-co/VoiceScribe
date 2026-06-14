'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PracticeSession } from '@/types/app';

function scoreColor(score: number): string {
  if (score >= 75) return 'text-sage';
  if (score >= 50) return 'text-copper';
  return 'text-red-400';
}

function scoreDelta(sessions: PracticeSession[]): string | null {
  if (sessions.length < 2) return null;
  const latest = sessions[0].analysis?.fluencyScore ?? sessions[0].stats.fluencyScore;
  const prev = sessions[1].analysis?.fluencyScore ?? sessions[1].stats.fluencyScore;
  const diff = latest - prev;
  if (diff === 0) return null;
  return (diff > 0 ? '+' : '') + diff.toFixed(0) + ' pts since last session';
}

function relativeDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  if (mins < 60) return mins <= 1 ? 'just now' : `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (hours < 48) return 'yesterday';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function buildChartPoints(sessions: PracticeSession[]): { x: number; y: number; score: number; date: string }[] {
  const data = sessions.slice(0, 10).reverse();
  return data.map((s, i) => {
    const score = s.analysis?.fluencyScore ?? s.stats.fluencyScore;
    const x = 60 + (i / Math.max(data.length - 1, 1)) * 500;
    const y = 160 - ((score - 40) / 60) * 120;
    const date = new Date(s.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return { x, y: Math.max(20, Math.min(160, y)), score, date };
  });
}

export default function HistoryPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-paper">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-[3px] border-rule" />
          <div className="absolute inset-0 rounded-full border-[3px] border-t-copper border-l-transparent border-r-transparent border-b-transparent animate-spin" />
        </div>
      </div>
    );
  }

  const points = buildChartPoints(sessions);
  const delta = scoreDelta(sessions);

  const bestScore = sessions.length > 0
    ? Math.max(...sessions.map((s) => s.analysis?.fluencyScore ?? s.stats.fluencyScore))
    : 0;
  const avgScore = sessions.length > 0
    ? Math.round(
        sessions.reduce((a, s) => a + (s.analysis?.fluencyScore ?? s.stats.fluencyScore), 0) /
          sessions.length,
      )
    : 0;

  const avgPauses = sessions.length > 0
    ? (sessions.reduce((a, s) => a + s.stats.pauses, 0) / sessions.length).toFixed(1)
    : '0';
  const avgFillers = sessions.length > 0
    ? (sessions.reduce((a, s) => a + s.stats.fillers, 0) / sessions.length).toFixed(1)
    : '0';
  const avgRepetitions = sessions.length > 0
    ? (sessions.reduce((a, s) => a + s.stats.repetitions, 0) / sessions.length).toFixed(1)
    : '0';
  const avgProlongations = sessions.length > 0
    ? (sessions.reduce((a, s) => a + s.stats.prolongations, 0) / sessions.length).toFixed(1)
    : '0';

  // Chart Y-axis labels
  const scores = points.map((p) => p.score);
  const minScore = scores.length > 0 ? Math.floor(Math.min(...scores) / 10) * 10 : 40;
  const maxScore = scores.length > 0 ? Math.ceil(Math.max(...scores) / 10) * 10 : 100;
  const range = maxScore - minScore || 10;
  const yLabels = [
    minScore,
    Math.round(minScore + range / 3),
    Math.round(minScore + (2 * range) / 3),
    maxScore,
  ];

  const areaPath =
    points.length > 1
      ? `M ${points[0].x},180 L ${points[0].x},${points[0].y} ${points
          .slice(1)
          .map((p) => `L ${p.x},${p.y}`)
          .join(' ')} L ${points[points.length - 1].x},180 Z`
      : '';

  const linePath =
    points.length > 1
      ? `M ${points[0].x},${points[0].y} ${points
          .slice(1)
          .map((p) => `L ${p.x},${p.y}`)
          .join(' ')}`
      : '';

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      {/* TOP BAR */}
      <header className="flex justify-between items-center px-6 sm:px-10 border-b border-rule-faint bg-paper/90 backdrop-blur-md h-14">
        <button onClick={() => router.push('/')} className="flex items-center gap-2.5 group cursor-pointer">
          <span className="w-2.5 h-2.5 rounded-full bg-sage group-hover:scale-110 transition-transform duration-300" />
          <span className="font-display text-xl font-bold tracking-tight text-ink">
            Voice<span className="text-sage">Scribe</span>
          </span>
        </button>
        <div className="flex items-center gap-3">
          <Link
            href="/app/analysis"
            className="flex items-center gap-2 px-4 py-1.5 bg-sage-wash text-ink font-mono text-[10px] tracking-widest uppercase font-bold rounded-full border border-rule hover:bg-sage-faint transition-colors duration-200"
          >
            Analysis →
          </Link>
          <button
            onClick={() => router.push('/app')}
            className="group flex items-center gap-2 px-4 py-1.5 bg-ink text-paper font-mono text-[10px] tracking-widest uppercase font-bold rounded-full overflow-hidden relative cursor-pointer"
          >
            <span className="absolute inset-0 bg-copper translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[0.21,0.47,0.32,0.98]" />
            <svg className="relative z-10 w-3 h-3 rotate-180 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span className="relative z-10">Back</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ═══════════ LEFT COLUMN — Your Journey ═══════════ */}
          <div>
            {/* Heading */}
            <div className="mb-8 relative">
              <h1 className="font-display text-5xl sm:text-6xl font-bold text-ink leading-none">
                Your<br />Journey
              </h1>
              {delta && sessions.length >= 2 && (
                <p className="font-mono text-[10px] uppercase tracking-widest text-sage mt-3">
                  {delta.replace(
                    'last session',
                    'since ' +
                      new Date(sessions[1].createdAt)
                        .toLocaleDateString('en-US', { month: 'short' })
                        .toUpperCase(),
                  )}
                </p>
              )}
            </div>

            {/* SVG Chart */}
            <div className="bg-sage-wash border border-rule rounded-2xl p-2 mb-3">
              <svg
                width="100%"
                viewBox="0 0 620 200"
                preserveAspectRatio="xMidYMid meet"
                className="text-ink"
              >
                {sessions.length < 2 ? (
                  <text
                    x="310"
                    y="100"
                    textAnchor="middle"
                    fontSize="11"
                    fill="currentColor"
                    opacity="0.6"
                    fontFamily="monospace"
                  >
                    Complete 2+ sessions to see your journey
                  </text>
                ) : (
                  <>
                    <defs>
                      <linearGradient id="journeyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#A0703E" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#A0703E" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Y axis labels + guide lines */}
                    {yLabels.map((label) => {
                      const yPos = 160 - ((label - 40) / 60) * 120;
                      const clampedY = Math.max(20, Math.min(160, yPos));
                      return (
                        <g key={label}>
                          <text
                            x="50"
                            y={clampedY + 3}
                            fontSize="9"
                            fill="currentColor"
                            opacity="0.4"
                            textAnchor="end"
                            fontFamily="monospace"
                          >
                            {label}
                          </text>
                          <line
                            x1="60"
                            x2="560"
                            y1={clampedY}
                            y2={clampedY}
                            stroke="currentColor"
                            strokeOpacity="0.06"
                            strokeWidth="1"
                          />
                        </g>
                      );
                    })}

                    {/* Area fill */}
                    {areaPath && <path d={areaPath} fill="url(#journeyGrad)" />}

                    {/* Line */}
                    {linePath && (
                      <path
                        d={linePath}
                        stroke="#A0703E"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}

                    {/* Hover tooltip */}
                    {hoveredIndex !== null && points[hoveredIndex] && (
                      <g>
                        <rect
                          x={points[hoveredIndex].x - 35}
                          y={points[hoveredIndex].y - 52}
                          width="70"
                          height="36"
                          rx="6"
                          fill="currentColor"
                          opacity="0.08"
                          stroke="currentColor"
                          strokeOpacity="0.15"
                          strokeWidth="1"
                        />
                        <text
                          x={points[hoveredIndex].x}
                          y={points[hoveredIndex].y - 36}
                          textAnchor="middle"
                          fontSize="8"
                          fill="currentColor"
                          opacity="0.5"
                          fontFamily="monospace"
                        >
                          {points[hoveredIndex].date}
                        </text>
                        <text
                          x={points[hoveredIndex].x}
                          y={points[hoveredIndex].y - 22}
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="700"
                          fill="currentColor"
                          fontFamily="monospace"
                        >
                          {points[hoveredIndex].score}
                        </text>
                      </g>
                    )}

                    {/* Data point circles */}
                    {points.map((p, i) => (
                      <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r={hoveredIndex === i ? 6 : 4}
                        fill="#A0703E"
                        stroke="white"
                        strokeWidth="2"
                        cursor="pointer"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      />
                    ))}

                    {/* X axis date labels */}
                    {points.map((p, i) => {
                      if (points.length > 6 && i % 2 !== 0) return null;
                      return (
                        <text
                          key={`label-${i}`}
                          x={p.x}
                          y={192}
                          textAnchor="middle"
                          fontSize="8"
                          fill="currentColor"
                          opacity="0.7"
                          fontFamily="monospace"
                        >
                          {p.date}
                        </text>
                      );
                    })}
                  </>
                )}
              </svg>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint">
              Fluency score over time
            </p>

            {/* Session List */}
            <div className="editorial-rule my-8" />
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted mb-5">
              Past Sessions
            </p>

            {sessions.length === 0 ? (
              <div className="flex flex-col items-center text-center py-16">
                <p className="text-4xl mb-5">◌</p>
                <p className="font-display text-xs uppercase tracking-widest text-ink-muted mb-8">
                  No sessions yet
                </p>
                <button
                  onClick={() => router.push('/app')}
                  className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-ink text-paper font-display text-xs uppercase tracking-widest hover:bg-copper transition-all duration-300 cursor-pointer"
                >
                  <span>Start Practising</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            ) : (
              <div>
                {sessions.map((session) => {
                  const score = session.analysis?.fluencyScore ?? session.stats.fluencyScore;
                  const truncatedPrompt =
                    session.prompt.length > 45 ? session.prompt.slice(0, 45) + '…' : session.prompt;

                  return (
                    <div
                      key={session.id}
                      className="flex justify-between items-center py-4 border-b border-rule-light last:border-b-0 cursor-pointer hover:bg-rule-faint px-2 -mx-2 rounded-lg transition-colors duration-100"
                      onClick={() => router.push('/app/session/' + session.id)}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] uppercase tracking-widest bg-sage-faint text-sage px-2 py-0.5 rounded-sm">
                            {session.mode}
                          </span>
                          <span className="font-sans text-sm text-ink">{truncatedPrompt}</span>
                        </div>
                        <p className="font-mono text-[9px] text-ink-faint uppercase tracking-widest mt-1">
                          {relativeDate(session.createdAt)} · {session.transcript.durationSeconds.toFixed(0)}s
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-display text-2xl font-bold ${scoreColor(score)}`}>{score}</p>
                        <p className="font-mono text-[9px] text-ink-faint">/100</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ═══════════ RIGHT COLUMN — Overview (Sticky) ═══════════ */}
          <div className="lg:sticky lg:top-24">
            <p className="font-display text-2xl font-bold text-ink mb-1">Overview</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint mb-8">
              {sessions.length} sessions recorded
            </p>

            {/* Stat pills */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-sage-wash border border-rule-light rounded-xl p-4 text-center">
                <p className={`font-display text-3xl font-bold ${scoreColor(bestScore)}`}>{bestScore}</p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mt-1">Best</p>
              </div>
              <div className="bg-sage-wash border border-rule-light rounded-xl p-4 text-center">
                <p className="font-display text-3xl font-bold text-ink">{sessions.length}</p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mt-1">Sessions</p>
              </div>
              <div className="bg-sage-wash border border-rule-light rounded-xl p-4 text-center">
                <p className={`font-display text-3xl font-bold ${scoreColor(avgScore)}`}>{avgScore}</p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mt-1">Average</p>
              </div>
            </div>

            {/* Dysfluency averages */}
            <div className="bg-sage-wash border border-rule-light rounded-2xl p-6 mb-6">
              <p className="font-mono text-[9px] uppercase tracking-widest text-ink-muted mb-4">
                Avg per session
              </p>
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
                  <span className="font-mono text-[9px] uppercase tracking-widest text-ink/80">
                    {row.label}
                  </span>
                  <span className="font-sans text-sm font-medium text-ink">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Most recent session card */}
            {sessions.length > 0 && (() => {
              const latest = sessions[0];
              const latestScore = latest.analysis?.fluencyScore ?? latest.stats.fluencyScore;
              return (
                <div className="bg-sage-wash border border-rule rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-ink-muted">
                      Latest session
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint">
                      {relativeDate(latest.createdAt)}
                    </p>
                  </div>

                  <p>
                    <span className={`font-display text-5xl font-bold ${scoreColor(latestScore)}`}>
                      {latestScore}
                    </span>
                    <span className="font-mono text-lg text-ink-faint"> /100</span>
                  </p>

                  {latest.analysis?.overallFeedback && (
                    <div className="mt-4 pt-4 border-t border-rule-light">
                      <p className="font-mono text-[9px] uppercase tracking-widest text-ink-muted mb-2">
                        Gemini feedback
                      </p>
                      <p className="font-sans text-sm text-ink leading-relaxed line-clamp-3">
                        {latest.analysis.overallFeedback}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => router.push('/app/session/' + latest.id)}
                    className="mt-4 block font-mono text-[10px] uppercase tracking-widest text-copper hover:text-sage transition-colors cursor-pointer"
                  >
                    View full analysis →
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      </main>
    </div>
  );
}
