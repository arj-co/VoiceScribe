'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MODES } from '@/lib/app/modeConfig';
import { PracticeMode } from '@/types/app';

const MODE_LABELS: Record<PracticeMode, string> = {
  'job-interview': 'JOB INTERVIEW',
  'presentation': 'PRESENTATION',
  'custom': 'CUSTOM',
};

const MODE_DESCRIPTIONS: Record<PracticeMode, string> = {
  'job-interview': 'Answer common interview questions with clarity and confidence.',
  'presentation': 'Practise delivering structured talks and pitches.',
  'custom': 'Bring your own topic, script, or question.',
};

import React from 'react';

const ICONS: Record<PracticeMode, React.ReactNode> = {
  'job-interview': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  'presentation': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  'custom': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  )
};

export default function AppHome() {
  const router = useRouter();

  const handleNavigate = (id: PracticeMode) => {
    router.push(`/app/practice/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      {/* TOP BAR */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 sm:px-10 border-b border-rule-faint bg-paper/90 backdrop-blur-md h-14 z-50">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-2.5 h-2.5 rounded-full bg-sage group-hover:scale-110 transition-transform duration-300" />
          <span className="font-display text-xl font-bold tracking-tight text-ink">
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
            href="/app/analysis"
            className="px-3 py-1 text-ink-muted hover:text-ink transition-colors duration-200 rounded-md hover:bg-rule-faint"
          >
            Analysis
          </Link>
          <Link
            href="/about"
            className="px-3 py-1 text-ink-muted hover:text-ink transition-colors duration-200 rounded-md hover:bg-rule-faint"
          >
            About
          </Link>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col px-6 pt-6 pb-24 max-w-6xl mx-auto w-full mt-14">
        {/* HEADING SECTION */}
        <div className="max-w-2xl mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-rule inline-block" />
            YOUR PRACTICE SPACE
          </p>
          <h1 className="font-display text-5xl sm:text-6xl text-ink leading-[1.1] mb-5">
            <span className="font-bold">Select a mode.</span>
            <br />
            <em className="font-normal italic text-sage not-italic" style={{ fontStyle: 'italic' }}>
              Begin your session.
            </em>
          </h1>
          <p className="font-sans text-[15px] text-ink-muted leading-relaxed max-w-md">
            Choose a format below to start recording. You'll receive real-time fluency analysis as you speak.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="editorial-rule mb-8 w-full" />

        {/* MODE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MODES.map((mode, index) => (
            <div key={mode.id} className="relative group">
              {/* Green shadow holder — sits behind the card */}
              <div
                className="absolute top-2.5 left-2.5 w-full h-full rounded-2xl transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #3E8B5C 0%, #2D6B44 50%, #1F5233 100%)',
                  boxShadow: '4px 4px 20px rgba(62,139,92,0.25)',
                }}
              />
              <button
                onClick={() => handleNavigate(mode.id)}
                className="relative w-full h-full flex flex-col text-left p-8 bg-paper-warm border border-rule rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage min-h-[250px] overflow-hidden"
              >
                {/* Background decorative numeral */}
                <span className="absolute top-[-0.05em] right-4 font-display text-8xl font-bold text-ink-ghost opacity-20 pointer-events-none select-none z-0 transition-opacity duration-300 group-hover:opacity-30">
                  0{index + 1}
                </span>

                {/* Icon */}
                <span className="relative z-10 text-sage mb-6 block transition-transform duration-300 group-hover:scale-110 origin-left">
                  {ICONS[mode.id]}
                </span>

                {/* Title */}
                <h3 className="relative z-10 font-mono font-bold text-[11px] uppercase tracking-[0.15em] text-ink mb-3">
                  {MODE_LABELS[mode.id]}
                </h3>

                {/* Description */}
                <p className="relative z-10 font-sans text-[15px] font-medium text-ink/80 leading-relaxed max-w-[85%]">
                  {MODE_DESCRIPTIONS[mode.id]}
                </p>

                {/* Footer */}
                <div className="relative z-10 mt-auto pt-8 flex items-center justify-between w-full">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-ink-ghost transition-colors duration-300 group-hover:text-ink-muted">
                    {mode.id === 'custom' ? 'YOUR CONTENT' : `${mode.prompts.length} PROMPTS`}
                  </span>
                  <span className="text-sage transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-rule px-8 py-4 flex justify-between items-center text-[11px] text-ink-ghost font-display uppercase tracking-widest mt-auto">
        <span>VoiceScribe</span>
        <span>AI-powered speech coaching</span>
      </footer>
    </div>
  );
}
