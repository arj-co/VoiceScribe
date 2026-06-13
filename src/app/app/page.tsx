'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ModeSelector from '@/components/app/ModeSelector';
import SessionHistoryPanel from '@/components/app/SessionHistoryPanel';
import ProgressSidebar from '@/components/app/ProgressSidebar';
import { WordToken } from '@/types/app';

const DEMO_SESSION: {
  words: WordToken[];
  rawText: string;
  duration: number;
  mode: string;
  prompt: string;
} = {
  words: [
    { word: 'I',          start: 0.0, end: 0.2, confidence: 0.99, type: 'fluent' },
    { word: 'um',         start: 0.2, end: 0.5, confidence: 0.98, type: 'filler' },
    { word: 'I',          start: 0.5, end: 0.7, confidence: 0.99, type: 'repetition' },
    { word: 'have',       start: 0.7, end: 0.9, confidence: 0.97, type: 'fluent' },
    { word: 'always',     start: 0.9, end: 1.3, confidence: 0.96, type: 'fluent' },
    { word: 'been',       start: 1.3, end: 1.5, confidence: 0.98, type: 'fluent' },
    { word: 'passionate', start: 1.5, end: 2.1, confidence: 0.95, type: 'fluent' },
    { word: 'about',      start: 2.1, end: 2.4, confidence: 0.97, type: 'fluent' },
    { word: 'technology', start: 2.4, end: 3.0, confidence: 0.96, type: 'fluent' },
    { word: '[pause]',    start: 3.0, end: 4.8, confidence: 1,    type: 'pause' },
    { word: 'and',        start: 4.8, end: 5.0, confidence: 0.98, type: 'fluent' },
    { word: 'basically',  start: 5.0, end: 5.5, confidence: 0.97, type: 'filler' },
    { word: 'I',          start: 5.5, end: 5.7, confidence: 0.99, type: 'fluent' },
    { word: 'think',      start: 5.7, end: 5.9, confidence: 0.98, type: 'fluent' },
    { word: 'it',         start: 5.9, end: 6.1, confidence: 0.97, type: 'fluent' },
    { word: 'can',        start: 6.1, end: 6.3, confidence: 0.96, type: 'fluent' },
    { word: 'really',     start: 6.3, end: 6.7, confidence: 0.95, type: 'prolongation' },
    { word: 'change',     start: 6.7, end: 7.1, confidence: 0.97, type: 'fluent' },
    { word: 'the',        start: 7.1, end: 7.2, confidence: 0.99, type: 'fluent' },
    { word: 'world',      start: 7.2, end: 7.7, confidence: 0.98, type: 'fluent' },
  ],
  rawText: 'I um I have always been passionate about technology and basically I think it can really change the world',
  duration: 7.7,
  mode: 'job-interview',
  prompt: 'Tell me about yourself.',
};

export default function AppHome() {
  const router = useRouter();

  const handleTryDemo = () => {
    sessionStorage.setItem('voicescribe_pending_session', JSON.stringify(DEMO_SESSION));
    router.push('/app/results');
  };

  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      {/* TOP BAR */}
      <header className="flex justify-between items-center px-6 sm:px-10 border-b border-rule-faint bg-paper/90 backdrop-blur-md h-14">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-[7px] h-[7px] rounded-full bg-sage group-hover:scale-110 transition-transform duration-300" />
          <span className="font-display text-[15px] font-semibold tracking-tight text-ink">
            Voice<span className="text-sage">Scribe</span>
          </span>
        </Link>
        <nav className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase">
          <Link
            href="/app/history"
            className="px-3 py-1 text-ink-muted hover:text-ink transition-colors duration-200 rounded-md hover:bg-rule-faint"
          >
            History
          </Link>
          <Link
            href="/about"
            className="px-3 py-1 text-ink-muted hover:text-ink transition-colors duration-200 rounded-md hover:bg-rule-faint"
          >
            About
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <main className="flex-1 flex flex-col">
        <section className="flex flex-col items-center justify-center text-center pt-20 pb-12 px-6">
          <p className="text-xs font-display uppercase tracking-[0.2em] text-ink-muted mb-6">
            A practice space for your voice
          </p>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-ink leading-tight mb-4">
            Speech,{' '}
            <em className="font-display font-normal italic text-ink-light not-italic" style={{ fontStyle: 'italic' }}>
              practised.
            </em>
          </h1>
          <p className="text-ink-muted max-w-md mt-3 leading-relaxed">
            Choose a mode below and get real-time fluency feedback powered by AI.
          </p>
        </section>

        {/* MODE CARDS */}
        <ModeSelector />

        {/* SESSION HISTORY + PROGRESS */}
        <div className="editorial-rule my-8 w-full max-w-4xl mx-auto" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto px-6 mb-4">
          <div className="md:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted mb-3">
              Sessions
            </p>
            <SessionHistoryPanel />
          </div>
          <div className="md:col-span-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted mb-3">
              Analysis
            </p>
            <ProgressSidebar />
          </div>
        </div>

        {/* DEMO CTA */}
        <div className="flex justify-center pb-16 mt-2">
          <button
            onClick={handleTryDemo}
            className="group inline-flex items-center gap-3 px-7 py-3 rounded-full border border-rule text-ink-muted text-xs font-display uppercase tracking-widest hover:border-ink hover:text-ink transition-all duration-300 cursor-pointer"
          >
            <span>Try a demo</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-rule px-8 py-4 flex justify-between items-center text-[11px] text-ink-ghost font-display uppercase tracking-widest">
        <span>VoiceScribe</span>
        <span>AI-powered speech coaching</span>
      </footer>
    </div>
  );
}
