'use client';

import Link from 'next/link';
import Image from 'next/image';

const creators = [
  {
    name: 'Arjun S',
    role: 'Builder & Designer',
    bio: 'Built VoiceScribe to make honest speech feedback accessible to everyone.',
    initials: 'AS',
  },
  {
    name: 'Neytiri C',
    role: 'Research & Product',
    bio: 'Shaped VoiceScribe\'s approach to fluency analysis and coaching.',
    initials: 'NC',
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      {/* TOP BAR */}
      <header className="flex justify-between items-center px-6 sm:px-10 border-b border-rule-faint bg-paper/90 backdrop-blur-md h-14">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-2.5 h-2.5 rounded-full bg-sage group-hover:scale-110 transition-transform duration-300" />
          <span className="font-display text-xl font-bold tracking-tight text-ink">
            Voice<span className="text-sage">Scribe</span>
          </span>
        </Link>
        <nav className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase">
          <Link
            href="/app"
            className="px-3 py-1 text-ink-muted hover:text-ink transition-colors duration-200 rounded-md hover:bg-rule-faint"
          >
            Practice
          </Link>
          <Link
            href="/"
            className="group flex items-center gap-2 px-4 py-1.5 bg-ink text-paper font-mono text-[10px] tracking-widest uppercase font-bold rounded-full overflow-hidden relative"
          >
            <span className="absolute inset-0 bg-sage translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[0.21,0.47,0.32,0.98]" />
            <svg className="relative z-10 w-3 h-3 rotate-180 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span className="relative z-10">Home</span>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* HERO */}
        <section className="max-w-3xl mx-auto px-6 pt-20 pb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sage mb-5">
            About
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink leading-tight mb-6">
            Practice speaking. Get better.
          </h1>
          <p className="font-sans text-base text-ink-muted leading-relaxed max-w-xl">
            Real-time feedback on your speech. Private, browser-based, no account needed.
          </p>
        </section>

        <div className="editorial-rule max-w-3xl mx-auto px-6" />

        {/* HACKATHON BADGE */}
        <section className="max-w-3xl mx-auto px-6 py-12">
          <div className="bg-paper-deep border border-rule-light rounded-xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-rule-light bg-paper-deep flex items-center justify-center">
                <Image
                  src="/steminate-logo.png"
                  alt="Steminate logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-sage mb-1">
                Hackathon Project
              </p>
              <p className="font-display text-lg font-semibold text-ink">
                Steminate Hackathon
              </p>
              <p className="font-sans text-sm text-ink-muted mt-1 leading-relaxed">
                Built at the Steminate Hackathon.
              </p>
            </div>
          </div>
        </section>

        <div className="editorial-rule max-w-3xl mx-auto px-6" />

        {/* CREATORS */}
        <section className="max-w-3xl mx-auto px-6 py-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted mb-8">
            The Team
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {creators.map((person) => (
              <div
                key={person.name}
                className="bg-paper-deep border border-rule-light rounded-xl p-6"
              >
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-rule-faint border border-rule flex items-center justify-center mb-4">
                  <span className="font-display text-lg font-bold text-ink-muted">
                    {person.initials}
                  </span>
                </div>

                {/* Name + role */}
                <p className="font-display text-xl font-semibold text-ink mb-0.5">
                  {person.name}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-sage mb-4">
                  {person.role}
                </p>

                {/* Bio */}
                <p className="font-sans text-sm text-ink-muted leading-relaxed">
                  {person.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="editorial-rule max-w-3xl mx-auto px-6" />

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="max-w-3xl mx-auto px-6 py-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted mb-6">
            How It Works
          </p>

          <div className="space-y-0">
            {[
              {
                n: '01',
                title: 'You speak. We listen locally.',
                body: 'Your audio never leaves your device.',
              },
              {
                n: '02',
                title: 'Every word is classified.',
                body: 'Fillers, repetitions, prolongations, and pauses are highlighted as you speak.',
              },
              {
                n: '03',
                title: 'Gemini gives you honest coaching.',
                body: 'Your transcript is sent to Gemini for scoring, feedback, and one specific tip.',
              },
              {
                n: '04',
                title: 'Your history stays private.',
                body: 'All session data stays on your device.',
              },
            ].map((step, i, arr) => (
              <div
                key={step.n}
                className={`flex gap-5 py-5 ${i < arr.length - 1 ? 'border-b border-rule-light' : ''}`}
              >
                <span className="font-mono text-[9px] text-ink-faint uppercase tracking-widest pt-0.5 shrink-0">
                  {step.n}
                </span>
                <div>
                  <p className="font-display text-base font-semibold text-ink mb-1">
                    {step.title}
                  </p>
                  <p className="font-sans text-sm text-ink-muted leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 pb-20 flex gap-4">
          <Link
            href="/app"
            className="border border-rule rounded-full px-6 py-2.5 font-mono text-[10px] uppercase tracking-widest text-ink-muted hover:border-sage hover:text-sage transition-colors"
          >
            Open the studio →
          </Link>
          <Link
            href="/"
            className="border border-rule rounded-full px-6 py-2.5 font-mono text-[10px] uppercase tracking-widest text-ink-muted hover:border-sage hover:text-sage transition-colors"
          >
            ← Back home
          </Link>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-rule px-8 py-4 flex justify-between items-center text-[11px] text-ink-faint font-mono uppercase tracking-widest">
        <span>VoiceScribe</span>
        <span>Steminate Hackathon · 2026</span>
      </footer>
    </div>
  );
}
