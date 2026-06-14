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

export default function AnalysisPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState<string>('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('voicescribe_sessions');
      if (raw) {
        const parsed = JSON.parse(raw);
        const list: PracticeSession[] = Array.isArray(parsed) ? parsed : [];
        setSessions(list);
        if (list.length > 0) setSelectedId(list[0].id);
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

  const selected = sessions.find((s) => s.id === selectedId) ?? sessions[0] ?? null;
  const latestScore = selected ? (selected.analysis?.fluencyScore ?? selected.stats.fluencyScore) : 0;

  // Averages across all sessions
  const avgScore = sessions.length > 0
    ? Math.round(sessions.reduce((a, s) => a + (s.analysis?.fluencyScore ?? s.stats.fluencyScore), 0) / sessions.length)
    : 0;
  const avgPauses = sessions.length > 0
    ? sessions.reduce((a, s) => a + s.stats.pauses, 0) / sessions.length
    : 0;
  const avgFillers = sessions.length > 0
    ? sessions.reduce((a, s) => a + s.stats.fillers, 0) / sessions.length
    : 0;
  const avgRepetitions = sessions.length > 0
    ? sessions.reduce((a, s) => a + s.stats.repetitions, 0) / sessions.length
    : 0;

  // Fluency delta vs previous session (for the selected session)
  const selectedIndex = sessions.findIndex((s) => s.id === selectedId);
  const prevSession = selectedIndex >= 0 && selectedIndex < sessions.length - 1 ? sessions[selectedIndex + 1] : null;
  const prevScore = prevSession ? (prevSession.analysis?.fluencyScore ?? prevSession.stats.fluencyScore) : null;
  const fluencyDiff = prevScore !== null ? latestScore - prevScore : null;

  // What went well
  function getStrengths(): string[] {
    if (!selected) return ['Completed a full practice session'];

    if (selected.analysis?.strengths && selected.analysis.strengths.length > 0) {
      return selected.analysis.strengths.slice(0, 2);
    }

    const strengths: string[] = [];
    if (selected.stats.fillers < avgFillers) {
      strengths.push('Fewer filler words than your average session');
    }
    if (selected.stats.pauses < avgPauses) {
      strengths.push('Fewer long pauses than your average');
    }
    if (latestScore > avgScore) {
      strengths.push('Above your average fluency score');
    }
    if (strengths.length === 0) {
      strengths.push('Completed a full practice session');
    }
    return strengths.slice(0, 2);
  }

  // Something to explore
  function getExploration(): string {
    if (!selected) return 'Record yourself on a topic you know well to build baseline confidence';

    if (selected.analysis?.coachingTip) {
      return selected.analysis.coachingTip;
    }

    if (selected.stats.fillers > avgFillers * 1.2) {
      return 'Filler words — try pausing silently instead of saying um or uh';
    }
    if (selected.stats.repetitions > avgRepetitions * 1.2) {
      return 'Word repetitions — try gentle onset: start each sentence slowly';
    }
    if (selected.stats.pauses > avgPauses * 1.2) {
      return 'Long pauses — try keeping a single thread of thought before speaking';
    }
    return 'Record yourself on a topic you know well to build baseline confidence';
  }

  const delta = scoreDelta(sessions);
  void buildChartPoints; // referenced in spec utilities
  void delta;

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
            href="/app/history"
            className="flex items-center gap-2 px-4 py-1.5 bg-sage-wash text-ink font-mono text-[10px] tracking-widest uppercase font-bold rounded-full border border-rule hover:bg-sage-faint transition-colors duration-200"
          >
            History →
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

          {/* ═══════════ LEFT COLUMN — Reflections ═══════════ */}
          <div>
            {/* Heading */}
            <div className="mb-10">
              <h1 className="font-display text-5xl sm:text-6xl font-bold text-ink">Reflections</h1>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint mt-2">
                {selected
                  ? `Latest session · ${relativeDate(selected.createdAt)}`
                  : 'Latest session · —'}
              </p>
            </div>

            {sessions.length === 0 ? (
              <div className="flex flex-col items-center text-center py-20">
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint mb-8">
                  No sessions yet.
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
              <>
                {/* Stats Row — 4 columns */}
                <div className="grid grid-cols-4 gap-4 mb-10">
                  {/* Fluency */}
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-2">
                      Fluency
                    </p>
                    <p className={`font-display text-3xl sm:text-4xl font-bold ${scoreColor(latestScore)}`}>
                      {latestScore}
                    </p>
                    {fluencyDiff !== null && (
                      <p className={`font-mono text-[9px] mt-1 ${fluencyDiff >= 0 ? 'text-sage' : 'text-copper'}`}>
                        {fluencyDiff >= 0 ? '+' : ''}{fluencyDiff.toFixed(0)}
                      </p>
                    )}
                  </div>

                  {/* Pauses */}
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-2">
                      Pauses
                    </p>
                    <p className="font-display text-3xl sm:text-4xl font-bold text-copper">
                      {selected.stats.pauses}
                    </p>
                  </div>

                  {/* Fillers */}
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-2">
                      Fillers
                    </p>
                    <p className="font-display text-3xl sm:text-4xl font-bold text-copper">
                      {selected.stats.fillers}
                    </p>
                  </div>

                  {/* Repetitions */}
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-2">
                      Reps.
                    </p>
                    <p className="font-display text-3xl sm:text-4xl font-bold text-copper">
                      {selected.stats.repetitions}
                    </p>
                  </div>
                </div>

                {/* What went well */}
                <div className="editorial-rule my-8" />
                <p className="font-mono text-[10px] uppercase tracking-widest text-sage mb-4 flex items-center gap-3">
                  <span className="w-4 h-px bg-sage" />
                  What went well
                </p>
                {getStrengths().map((strength, i) => (
                  <p key={i} className="font-display text-xl sm:text-2xl font-bold text-ink italic leading-snug mb-4">
                    &ldquo;{strength}&rdquo;
                  </p>
                ))}

                {/* Something to explore */}
                <div className="editorial-rule my-8" />
                <p className="font-mono text-[10px] uppercase tracking-widest text-copper mb-4 flex items-center gap-3">
                  <span className="w-4 h-px bg-copper" />
                  Something to explore
                </p>
                <p className="font-display text-xl sm:text-2xl font-bold text-ink italic leading-snug mb-4">
                  &ldquo;{getExploration()}&rdquo;
                </p>

                {/* Progress note */}
                {sessions.length >= 3 && scoreDelta(sessions) && (
                  <>
                    <div className="editorial-rule my-8" />
                    <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-3">
                      Trend across {sessions.length} sessions
                    </p>
                    <p className={`font-display text-3xl font-bold ${
                      (scoreDelta(sessions) ?? '').startsWith('+') ? 'text-sage' : 'text-copper'
                    }`}>
                      {scoreDelta(sessions)}
                    </p>
                    <p className="font-mono text-[10px] text-ink-faint mt-1">
                      vs your sessions from{' '}
                      {new Date(
                        sessions[Math.min(sessions.length - 1, 5)].createdAt,
                      ).toLocaleDateString('en-US', { month: 'long' })}
                    </p>
                  </>
                )}
              </>
            )}
          </div>

          {/* ═══════════ RIGHT COLUMN — Session Selector (Sticky) ═══════════ */}
          <div className="lg:sticky lg:top-24">
            <p className="font-display text-xl font-bold text-ink mb-6">Session History</p>

            {sessions.length === 0 ? (
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                No sessions recorded.
              </p>
            ) : (
              <>
                <div>
                  {sessions.map((session) => {
                    const score = session.analysis?.fluencyScore ?? session.stats.fluencyScore;
                    const isActive = session.id === selectedId;
                    const truncatedPrompt =
                      session.prompt.length > 40 ? session.prompt.slice(0, 40) + '…' : session.prompt;

                    return (
                      <div
                        key={session.id}
                        className={`flex justify-between items-center py-3 border-b border-rule-light last:border-b-0 cursor-pointer px-3 -mx-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-sage-wash border-l-2 border-l-sage pl-3'
                            : 'hover:bg-rule-faint'
                        }`}
                        onClick={() => setSelectedId(session.id)}
                      >
                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-widest text-ink-muted">
                            {session.mode.replace(/-/g, ' ')} · {relativeDate(session.createdAt)}
                          </p>
                          <p className="font-sans text-sm text-ink mt-0.5">{truncatedPrompt}</p>
                        </div>
                        <div className="text-right">
                          <span className={`font-display text-lg font-bold ${scoreColor(score)}`}>
                            {score}
                          </span>
                          <span className="font-mono text-[9px] text-ink-faint">/100</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => router.push('/app/session/' + selectedId)}
                  className="mt-6 font-mono text-[10px] uppercase tracking-widest text-copper hover:text-sage transition-colors cursor-pointer"
                >
                  View full analysis →
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
