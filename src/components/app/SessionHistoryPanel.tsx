'use client';

import { useState, useEffect } from 'react';
import { PracticeSession } from '@/types/app';
import { useRouter } from 'next/navigation';

function relativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  if (mins < 60) return mins <= 1 ? 'just now' : `${mins} minutes ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (hours < 48) return 'yesterday';
  return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function scoreColor(score: number): string {
  if (score >= 75) return 'text-sage';
  if (score >= 50) return 'text-copper';
  return 'text-red-400';
}

export default function SessionHistoryPanel() {
  const router = useRouter();
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
          No sessions yet.
        </p>
        <p className="font-sans text-xs text-ink-muted mt-1">
          Complete your first practice session to see it here.
        </p>
      </div>
    );
  }

  const filteredSessions = sessions.filter(
    (s) =>
      s.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.mode.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      {/* SECTION 1 — Recent Sessions */}
      <div className="flex justify-between items-center mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
          Recent Sessions
        </span>
        {sessions.length > 3 && (
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="font-mono text-[10px] uppercase tracking-widest text-copper hover:text-ink transition-colors cursor-pointer"
          >
            {isExpanded ? 'Close ×' : `View all ${sessions.length} →`}
          </button>
        )}
      </div>

      {sessions.slice(0, 3).map((session) => {
        const score = session.analysis?.fluencyScore ?? session.stats.fluencyScore;
        const truncatedPrompt =
          session.prompt.length > 50 ? session.prompt.slice(0, 50) + '…' : session.prompt;
        const modeLabel = session.mode.replace(/-/g, ' ');

        return (
          <div
            key={session.id}
            onClick={() => router.push('/app/session/' + session.id)}
            className="bg-paper-deep border border-rule-light rounded-xl px-4 py-3 mb-2 flex justify-between items-center cursor-pointer hover:border-copper transition-colors duration-150"
          >
            {/* LEFT */}
            <div className="flex-1 min-w-0 mr-4">
              <div className="flex items-center">
                <span className="font-mono text-[9px] uppercase tracking-widest bg-rule-faint text-ink-muted px-2 py-0.5 rounded-sm mr-2 shrink-0">
                  {modeLabel}
                </span>
                <span className="font-sans text-sm text-ink truncate">{truncatedPrompt}</span>
              </div>
              <p className="font-mono text-[9px] text-ink-faint uppercase tracking-widest mt-1">
                {relativeTime(session.createdAt)} · {session.transcript.durationSeconds.toFixed(0)}s
              </p>
            </div>

            {/* RIGHT */}
            <div className="text-right shrink-0">
              <p className={`font-display text-xl font-bold ${scoreColor(score)}`}>{score}</p>
              <p className="font-mono text-[9px] text-ink-faint">/100</p>
            </div>
          </div>
        );
      })}

      {/* SECTION 2 — View All dropdown */}
      <div
        style={{
          maxHeight: isExpanded ? '600px' : '0px',
          opacity: isExpanded ? 1 : 0,
        }}
        className="overflow-hidden transition-all duration-300 ease-in-out mt-2"
      >
        <div className="bg-paper-deep border border-rule rounded-xl overflow-hidden">
          {/* Search bar */}
          <div className="px-4 py-3 border-b border-rule-light flex items-center gap-2">
            <span className="text-ink-faint font-mono text-sm">⌕</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sessions..."
              className="flex-1 bg-transparent font-mono text-[11px] text-ink placeholder:text-ink-faint outline-none border-none"
            />
          </div>

          {/* Session list */}
          {filteredSessions.length === 0 ? (
            <div className="py-6 text-center font-mono text-[10px] text-ink-faint uppercase tracking-widest">
              No sessions match
            </div>
          ) : (
            filteredSessions.map((session) => {
              const score = session.analysis?.fluencyScore ?? session.stats.fluencyScore;
              const truncatedPrompt =
                session.prompt.length > 60 ? session.prompt.slice(0, 60) + '…' : session.prompt;
              const modeLabel = session.mode.replace(/-/g, ' ');

              return (
                <div
                  key={session.id}
                  onClick={() => router.push('/app/session/' + session.id)}
                  className="px-4 py-3 border-b border-rule-light last:border-b-0 flex justify-between items-center hover:bg-rule-faint cursor-pointer transition-colors duration-100"
                >
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="font-sans text-sm text-ink truncate">{truncatedPrompt}</p>
                    <p className="font-mono text-[9px] text-ink-faint uppercase tracking-widest">
                      {modeLabel} · {relativeTime(session.createdAt)}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`font-display text-base font-bold ${scoreColor(score)}`}>
                      {score}
                    </p>
                    <p className="font-mono text-[9px] text-ink-faint">/100</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
