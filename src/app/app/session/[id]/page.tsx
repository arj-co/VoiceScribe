'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PracticeSession } from '@/types/app';

function scoreColor(score: number): string {
  if (score >= 75) return 'text-sage';
  if (score >= 50) return 'text-copper';
  return 'text-red-400';
}

export default function SessionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [session, setSession] = useState<PracticeSession | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('voicescribe_sessions');
      if (raw) {
        const parsed: PracticeSession[] = JSON.parse(raw);
        const found = parsed.find((s) => s.id === params.id);
        setSession(found ?? null);
      }
    } catch {
      setSession(null);
    }
    setIsLoaded(true);
  }, [params.id]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-paper">
        <div className="w-6 h-6 border-2 border-copper border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-paper">
        <p className="font-display text-xl text-ink">Session not found.</p>
        <button
          onClick={() => router.push('/app')}
          className="font-mono text-[10px] uppercase tracking-widest text-copper mt-4 cursor-pointer hover:text-ink transition-colors"
        >
          ← Back to practice
        </button>
      </div>
    );
  }

  const score = session.analysis?.fluencyScore ?? session.stats.fluencyScore;
  const modeLabel = session.mode.replace(/-/g, ' ');
  const truncatedPrompt =
    session.prompt.length > 60 ? session.prompt.slice(0, 60) + '…' : session.prompt;

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

      {/* METADATA BAR */}
      <div className="bg-paper-deep border-b border-rule-light px-6 py-3 flex gap-6 items-center flex-wrap">
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint bg-rule-faint text-ink-muted px-2 py-0.5 rounded-sm">
          {modeLabel}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink">
          {truncatedPrompt}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
          {session.transcript.durationSeconds.toFixed(0)}s
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
          {new Date(session.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </div>

      {/* CONTENT */}
      <div className="max-w-2xl mx-auto px-6 py-10 w-full">
        {/* SECTION 1 — Score hero */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-28 h-28 rounded-full border-2 border-rule flex items-center justify-center mx-auto mb-4">
            <span className={`font-display text-4xl font-bold ${scoreColor(score)}`}>{score}</span>
          </div>
          <p className="font-mono text-[10px] text-ink-faint uppercase tracking-widest text-center">
            /100
          </p>
          <p className="font-mono text-[9px] text-ink-faint uppercase tracking-widest text-center mt-1 mb-6">
            Fluency Score
          </p>
          {session.analysis?.overallFeedback && (
            <p className="font-sans text-base text-ink-muted leading-relaxed text-center max-w-lg mx-auto">
              {session.analysis.overallFeedback}
            </p>
          )}
        </div>

        {/* SECTION 2 — Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          <div className="bg-paper-deep border border-rule-light rounded-xl p-4 text-center">
            <p className="font-display text-3xl font-bold text-copper">{session.stats.pauses}</p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mt-1">
              Pauses
            </p>
          </div>
          <div className="bg-paper-deep border border-rule-light rounded-xl p-4 text-center">
            <p className="font-display text-3xl font-bold text-sage">{session.stats.fillers}</p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mt-1">
              Fillers
            </p>
          </div>
          <div className="bg-paper-deep border border-rule-light rounded-xl p-4 text-center">
            <p className="font-display text-3xl font-bold text-copper">
              {session.stats.repetitions}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mt-1">
              Repetitions
            </p>
          </div>
          <div className="bg-paper-deep border border-rule-light rounded-xl p-4 text-center">
            <p className="font-display text-3xl font-bold text-sage">
              {session.stats.prolongations}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mt-1">
              Prolongations
            </p>
          </div>
        </div>

        {/* SECTION 3 — Question feedback */}
        {session.analysis?.questionFeedback && (
          <>
            <div className="editorial-rule mb-6" />
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted mb-3">
              About Your Answer
            </p>
            <p className="font-sans text-base text-ink leading-relaxed">
              {session.analysis.questionFeedback}
            </p>
          </>
        )}

        {/* SECTION 4 — Coaching tip */}
        {session.analysis?.coachingTip && (
          <>
            <div className="editorial-rule my-6" />
            <div className="border-l-2 border-copper pl-5 py-1">
              <p className="font-mono text-[9px] uppercase tracking-widest text-copper mb-2">
                Coaching Tip
              </p>
              <p className="font-sans text-base text-ink leading-relaxed">
                {session.analysis.coachingTip}
              </p>
            </div>
          </>
        )}

        {/* SECTION 5 — Strengths and improvements */}
        {session.analysis && (
          <>
            <div className="editorial-rule my-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-sage mb-3">
                  What You Did Well
                </p>
                {session.analysis.strengths.map((strength, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <span className="text-sage font-mono text-xs">✓</span>
                    <span className="font-sans text-sm text-ink">{strength}</span>
                  </div>
                ))}
              </div>

              {/* Improvements */}
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-copper mb-3">
                  Areas To Improve
                </p>
                {session.analysis.improvements.map((improvement, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <span className="text-copper font-mono text-xs">→</span>
                    <span className="font-sans text-sm text-ink">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* SECTION 6 — Full transcript */}
        {session.transcript.words.length > 0 && (
          <>
            <div className="editorial-rule my-6" />
            <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-4">
              Full Transcript
            </p>
            <div className="bg-paper-deep border border-rule-light rounded-xl p-5 font-display text-base leading-relaxed text-ink">
              {session.transcript.words.map((token, i) => {
                if (token.type === 'pause') {
                  return (
                    <span key={i}>
                      <span className="font-mono text-[9px] bg-rule-faint text-ink-faint rounded px-1 mx-1">
                        [ pause ]
                      </span>{' '}
                    </span>
                  );
                }
                if (token.type === 'filler') {
                  return (
                    <span key={i}>
                      <span className="text-copper underline decoration-dotted">{token.word}</span>{' '}
                    </span>
                  );
                }
                if (token.type === 'repetition') {
                  return (
                    <span key={i}>
                      <span className="text-copper opacity-70 line-through decoration-1">
                        {token.word}
                      </span>{' '}
                    </span>
                  );
                }
                if (token.type === 'prolongation') {
                  return (
                    <span key={i}>
                      <span className="text-sage italic">{token.word}</span>{' '}
                    </span>
                  );
                }
                return <span key={i}>{token.word} </span>;
              })}
            </div>
          </>
        )}

        {/* BOTTOM ACTION ROW */}
        <div className="flex gap-4 justify-center mt-12 pb-12">
          <button
            onClick={() => router.push('/app/practice/' + session.mode)}
            className="border border-rule rounded-full px-6 py-2.5 font-mono text-[10px] uppercase tracking-widest text-ink-muted hover:border-copper hover:text-copper transition-colors"
          >
            Practice Again
          </button>
          <button
            onClick={() => router.push('/app')}
            className="border border-rule rounded-full px-6 py-2.5 font-mono text-[10px] uppercase tracking-widest text-ink-muted hover:border-copper hover:text-copper transition-colors"
          >
            ← All Sessions
          </button>
        </div>
      </div>
    </div>
  );
}
