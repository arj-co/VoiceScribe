'use client';

import { useRouter } from 'next/navigation';
import useSessionStore from '@/hooks/useSessionStore';
import ProgressChart from '@/components/app/ProgressChart';
import { PracticeSession } from '@/types/app';

function getScoreColor(score: number): string {
  if (score >= 75) return 'text-sage';
  if (score >= 50) return 'text-copper';
  return 'text-red-500';
}

function getMostPracticedMode(sessions: PracticeSession[]): string {
  if (sessions.length === 0) return '—';
  const counts: Record<string, number> = {};
  for (const s of sessions) {
    counts[s.mode] = (counts[s.mode] ?? 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

export default function HistoryPage() {
  const router = useRouter();
  const { sessions, isLoaded } = useSessionStore();

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

  const bestScore = sessions.length > 0
    ? Math.max(...sessions.map((s) => s.analysis?.fluencyScore ?? s.stats.fluencyScore))
    : 0;

  const avgScore = sessions.length > 0
    ? Math.round(sessions.reduce((sum, s) => sum + (s.analysis?.fluencyScore ?? s.stats.fluencyScore), 0) / sessions.length)
    : 0;

  const topMode = getMostPracticedMode(sessions);

  const SUMMARY_STATS = [
    { label: 'Best Score', value: bestScore },
    { label: 'Avg Score', value: avgScore },
    { label: 'Top Mode', value: topMode, small: true },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      {/* TOP BAR */}
      <header className="flex justify-between items-center px-6 sm:px-10 border-b border-rule-faint bg-paper/90 backdrop-blur-md h-14">
        <button onClick={() => router.push('/')} className="flex items-center gap-2 group">
          <span className="w-[7px] h-[7px] rounded-full bg-sage group-hover:scale-110 transition-transform duration-300" />
          <span className="font-display text-[15px] font-semibold tracking-tight text-ink">
            Voice<span className="text-sage">Scribe</span>
          </span>
        </button>
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
      </header>

      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-6 py-12">

          {/* HEADING */}
          <div className="mb-10">
            <p className="text-[11px] font-display uppercase tracking-[0.2em] text-ink-muted mb-2">
              Your journey
            </p>
            <h1 className="font-display font-bold text-4xl text-ink">Progress</h1>
            <p className="text-sm text-ink-muted mt-2">
              {sessions.length} session{sessions.length !== 1 ? 's' : ''} completed
            </p>
          </div>

          {/* SUMMARY STATS */}
          {sessions.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-8">
              {SUMMARY_STATS.map(({ label, value, small }) => (
                <div key={label} className="bg-paper-warm border border-rule rounded-2xl p-5 text-center">
                  <div className={`font-display font-bold text-ink mb-1 ${small ? 'text-base capitalize leading-tight' : 'text-4xl'}`}>
                    {value}
                  </div>
                  <div className="text-[10px] font-display uppercase tracking-widest text-ink-ghost mt-1">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PROGRESS CHART */}
          <div className="bg-paper-warm border border-rule rounded-2xl p-6 mb-8">
            <p className="text-[11px] font-display uppercase tracking-[0.15em] text-ink-muted mb-5">
              Fluency Score Over Time
            </p>
            <ProgressChart sessions={sessions} />
          </div>

          {/* SESSION LIST */}
          <div>
            <div className="editorial-rule mb-6" />
            <h2 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-ink-muted mb-5">
              Past Sessions
            </h2>

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
              <div className="flex flex-col gap-3">
                {sessions.map((session) => {
                  const score = session.analysis?.fluencyScore ?? session.stats.fluencyScore;
                  const scoreColor = getScoreColor(score);
                  const truncatedPrompt = session.prompt.length > 60
                    ? session.prompt.slice(0, 60) + '…'
                    : session.prompt;
                  const formattedDate = new Date(session.createdAt).toLocaleDateString();
                  const durationStr = `${Math.round(session.transcript.durationSeconds)}s`;

                  return (
                    <div
                      key={session.id}
                      className="group bg-paper-warm border border-rule rounded-2xl p-5 cursor-pointer hover:border-ink transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push('/app'); }}
                    >
                      <div className="flex justify-between items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-display text-[10px] uppercase tracking-widest bg-ink text-paper rounded-full px-2.5 py-1 capitalize">
                              {session.mode}
                            </span>
                          </div>
                          <p className="text-sm text-ink truncate mb-1">{truncatedPrompt}</p>
                          <p className="text-[11px] font-display uppercase tracking-widest text-ink-ghost">
                            {formattedDate} · {durationStr}
                          </p>
                        </div>
                        <div className="flex flex-col items-center shrink-0">
                          <span className={`font-display font-bold text-3xl ${scoreColor}`}>{score}</span>
                          <span className="text-[10px] font-display uppercase tracking-widest text-ink-ghost">/100</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
