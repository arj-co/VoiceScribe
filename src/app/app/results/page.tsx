'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ResultsPanel from '@/components/app/ResultsPanel';
import { analyseWithGemini } from '@/services/geminiService';
import useWordProcessor from '@/hooks/useWordProcessor';
import useSessionStore from '@/hooks/useSessionStore';
import { WordToken, DysfluencyStats, GeminiAnalysis, PracticeMode } from '@/types/app';

const CONFETTI_COLORS = ['bg-copper', 'bg-sage', 'bg-amber-400', 'bg-purple-400', 'bg-ink'];
const CONFETTI_LEFTS = ['5%','15%','25%','35%','45%','55%','65%','75%','85%','95%','10%','70%'];

export default function ResultsPage() {
  const router = useRouter();
  const { computeStats } = useWordProcessor();
  const { saveSession } = useSessionStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<GeminiAnalysis | null>(null);
  const [stats, setStats] = useState<DysfluencyStats | null>(null);
  const [words, setWords] = useState<WordToken[]>([]);
  const [mode, setMode] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [savedSessionId, setSavedSessionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const pendingSessionStr = sessionStorage.getItem('voicescribe_pending_session');
        if (!pendingSessionStr) {
          setError('No session data found. Please record a session first.');
          setIsLoading(false);
          return;
        }
        const session = JSON.parse(pendingSessionStr);
        const sessionWords: WordToken[] = session.words || [];
        const rawText: string = session.rawText || '';
        const sessionDuration: number = typeof session.duration === 'number' ? session.duration : 0;
        const sessionMode: string = session.mode || '';
        const sessionPrompt: string = session.prompt || '';
        const computedStats = computeStats(sessionWords);
        setWords(sessionWords);
        setMode(sessionMode);
        setPrompt(sessionPrompt);
        setDuration(sessionDuration);
        setStats(computedStats);
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
        const result = await analyseWithGemini({ apiKey, transcript: rawText, mode: sessionMode, prompt: sessionPrompt, stats: computedStats });
        setAnalysis(result);
        const saved = saveSession({
          mode: sessionMode as PracticeMode,
          prompt: sessionPrompt,
          transcript: { words: sessionWords, rawText, durationSeconds: sessionDuration },
          stats: computedStats,
          analysis: result,
        });
        setSavedSessionId(saved.id);
        setIsLoading(false);
        sessionStorage.removeItem('voicescribe_pending_session');
      } catch (err) {
        console.error('Failed to parse or analyze session:', err);
        setError('An error occurred during speech analysis. Please try again.');
        setIsLoading(false);
      }
    };
    fetchAnalysis();
  }, [computeStats]);

  // Loading
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-paper text-ink p-6">
        <div className="relative w-20 h-20 mb-8">
          <div className="absolute inset-0 rounded-full border-[3px] border-rule" />
          <div className="absolute inset-0 rounded-full border-[3px] border-t-copper border-l-transparent border-r-transparent border-b-transparent animate-spin" />
        </div>
        <p className="font-display text-xs uppercase tracking-[0.2em] text-ink-muted mb-2">
          Analysing your speech
        </p>
        <p className="text-sm text-ink-ghost">This usually takes 5–10 seconds</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-paper text-ink p-6 text-center">
        <p className="text-5xl mb-6">⚠</p>
        <h2 className="font-display text-xl font-bold mb-2 text-ink">{error}</h2>
        <p className="text-sm text-ink-muted mb-8">Please record a session first.</p>
        <button
          onClick={() => router.push('/app')}
          className="px-7 py-3 rounded-full bg-ink text-paper font-display text-xs uppercase tracking-widest hover:bg-copper transition-colors duration-300 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!analysis || !stats) return null;

  const showConfetti = analysis.fluencyScore >= 80;
  const truncatedPrompt = prompt.length > 50 ? prompt.slice(0, 50) + '…' : prompt;

  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink relative">
      {/* Confetti keyframes */}
      {showConfetti && (
        <style>{`
          @keyframes fall {
            from { transform: translateY(-20px) rotate(0deg); opacity: 1; }
            to   { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
        `}</style>
      )}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          {CONFETTI_LEFTS.map((left, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-sm absolute top-0 ${CONFETTI_COLORS[i % CONFETTI_COLORS.length]}`}
              style={{ left, animation: 'fall 2s ease-in forwards', animationDelay: `${(i * 0.1).toFixed(1)}s` }}
            />
          ))}
        </div>
      )}

      {/* TOP BAR */}
      <header className="flex justify-between items-center px-8 py-5 border-b border-rule">
        <span className="font-display font-bold text-lg tracking-tight">VoiceScribe</span>
        <button
          onClick={() => router.push('/app')}
          className="group text-xs font-display uppercase tracking-widest text-ink-muted hover:text-ink transition-colors duration-200 flex items-center gap-2 cursor-pointer"
        >
          <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span>
          <span>Back</span>
        </button>
      </header>

      {/* SESSION META BAR */}
      <div className="bg-paper-warm border-b border-rule px-8 py-2.5 flex flex-wrap gap-5 items-center">
        <span className="font-display text-[10px] uppercase tracking-widest bg-ink text-paper rounded-full px-3 py-1 capitalize">
          {mode}
        </span>
        <span className="text-xs text-ink-muted truncate max-w-xs">{truncatedPrompt}</span>
        <span className="text-[11px] font-display uppercase tracking-widest text-ink-ghost">{Math.round(duration)}s</span>
        <span className="text-[11px] font-display uppercase tracking-widest text-ink-ghost">{new Date().toLocaleDateString()}</span>
      </div>

      {/* CONTENT */}
      <main className="flex-1 py-8">
        <h1 className="font-display font-bold text-2xl text-center mb-2 text-ink">Session Complete</h1>
        <p className="text-center text-xs font-display uppercase tracking-[0.2em] text-ink-muted mb-10">
          Here is your feedback
        </p>
        <ResultsPanel
          analysis={analysis}
          stats={stats}
          words={words}
          mode={mode}
          prompt={prompt}
          onPracticeAgain={() => router.push(`/app/practice/${mode}`)}
          onGoHome={() => router.push('/app')}
        />
      </main>
    </div>
  );
}
