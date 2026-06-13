"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper flex flex-col selection:bg-sage-faint selection:text-ink relative transition-colors duration-700 overflow-x-hidden">
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full px-6 sm:px-10 py-0 flex justify-between items-center z-50 bg-paper/90 backdrop-blur-md border-b border-rule-faint h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-[7px] h-[7px] rounded-full bg-sage group-hover:scale-110 transition-transform duration-300" />
          <h1 className="font-display text-[15px] font-semibold tracking-tight text-ink">
            Voice<span className="text-sage">Scribe</span>
          </h1>
        </Link>

        {/* Nav + CTA */}
        <div className="hidden sm:flex items-center gap-7">
          <nav className="flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase">
            <Link
              href="/about"
              className="px-3 py-1 text-ink-muted hover:text-ink transition-colors duration-200 rounded-md hover:bg-rule-faint"
            >
              About
            </Link>
          </nav>

          <Link
            href="/app"
            className="group flex items-center gap-2 px-4 py-1.5 bg-ink text-paper font-mono text-[10px] tracking-widest uppercase font-bold rounded-full overflow-hidden relative"
          >
            <span className="absolute inset-0 bg-sage translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[0.21,0.47,0.32,0.98]" />
            <span className="relative z-10">Open App</span>
            <svg className="relative z-10 w-3 h-3 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </header>

      <main className="flex-grow w-full">

        {/* ============================================================
            SECTION 1 — HERO
        ============================================================ */}
        <section className="min-h-screen flex items-center bg-paper pt-24 pb-16 px-6">
          <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              {/* Eyebrow */}
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted mb-5 flex items-center gap-3">
                <span className="w-6 h-px bg-sage inline-block" />
                AI-powered speech coaching
              </p>

              {/* Heading */}
              <h1 className="font-display text-[2.8rem] sm:text-[3.6rem] font-bold tracking-tight text-ink leading-[1.05] mb-6">
                Practice speaking.
                <br />
                <em className="not-italic font-light text-sage">Get better.</em>
              </h1>

              {/* Subheading */}
              <p className="font-sans text-[15px] text-ink-muted max-w-sm leading-relaxed mb-8">
                Real-time AI feedback on fluency, pacing, filler words, and speech patterns. For interviews, presentations, and everyday speaking.
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-4 flex-wrap">
                {/* Primary CTA */}
                <Link
                  href="/app"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 bg-ink text-paper font-mono text-[11px] tracking-widest uppercase font-bold rounded-full overflow-hidden"
                >
                  <div className="absolute inset-0 bg-sage translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10">Start practising →</span>
                </Link>

                {/* Ghost */}
                <Link
                  href="/about"
                  className="font-mono text-[11px] tracking-widest uppercase text-ink-muted hover:text-sage transition-colors border-b border-rule-light hover:border-sage pb-px"
                >
                  How it works
                </Link>
              </div>
            </motion.div>

            {/* Right column — Illustration card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="w-full aspect-[4/3] rounded-2xl bg-paper-deep border border-rule overflow-hidden relative flex items-center justify-center">
                {/* Hero image */}
                <Image
                  src="/illustration-hero.png"
                  alt="Person speaking confidently at a presentation"
                  fill
                  className="object-cover"
                  onError={() => {}}
                />

                {/* Waveform overlay — positioned right to sit over the speaker */}
                <div className="absolute right-6 bottom-6 flex items-end gap-2 opacity-20">
                  {[40, 70, 100, 70, 40].map((baseHeight, i) => (
                    <motion.div
                      key={i}
                      className="rounded-full bg-sage"
                      style={{ width: 4 }}
                      animate={{ height: [baseHeight, baseHeight * 1.8, baseHeight] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            SECTION 2 — STATS BAR
        ============================================================ */}
        <section className="w-full bg-paper-deep border-y border-rule py-10">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left sm:divide-x divide-rule-light">
              {/* Stat 1 */}
              <div className="sm:px-8 first:pl-0 last:pr-0">
                <p className="font-display text-4xl sm:text-5xl font-bold text-sage">1 in 14</p>
                <p className="font-sans text-sm text-ink-muted mt-2 max-w-[180px] mx-auto sm:mx-0 leading-snug">
                  people will have a significant fear of public speaking
                </p>
              </div>
              {/* Stat 2 */}
              <div className="sm:px-8">
                <p className="font-display text-4xl sm:text-5xl font-bold text-sage">92%</p>
                <p className="font-sans text-sm text-ink-muted mt-2 max-w-[180px] mx-auto sm:mx-0 leading-snug">
                  of people say public speaking anxiety has limited their career
                </p>
              </div>
              {/* Stat 3 */}
              <div className="sm:px-8 last:pr-0">
                <p className="font-display text-4xl sm:text-5xl font-bold text-sage">$0</p>
                <p className="font-sans text-sm text-ink-muted mt-2 max-w-[180px] mx-auto sm:mx-0 leading-snug">
                  hardware or subscription required to use VoiceScribe
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 3 — HOW IT WORKS
        ============================================================ */}
        <section className="bg-paper py-20 px-6">
          <div className="max-w-5xl mx-auto">
            {/* Section header */}
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-sage mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-sage" />
              The process
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
              Three steps to speaking with confidence.
            </h2>
            <p className="font-sans text-[15px] text-ink-muted max-w-lg mb-14 leading-relaxed">
              No complex setup. No uploads to the cloud. Just your voice and honest AI feedback.
            </p>

            {/* Step cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Step 1 — Speak */}
              <motion.div
                className="bg-paper-deep border border-rule rounded-2xl p-7 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0 }}
              >
                <span className="font-display text-6xl font-bold text-rule absolute top-4 right-5 leading-none select-none">01</span>
                <div className="w-10 h-10 rounded-xl bg-sage-faint flex items-center justify-center mb-5">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="#4A7C59" strokeWidth="2" fill="none" strokeLinecap="round">
                    <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
                    <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-2">Speak.</h3>
                <p className="font-sans text-sm text-ink-muted leading-relaxed">
                  Choose a mode — job interview, presentation, or custom — and start speaking. Your mic streams live audio directly to Deepgram&apos;s speech engine. Nothing is stored or uploaded.
                </p>
              </motion.div>

              {/* Step 2 — See it, live */}
              <motion.div
                className="bg-paper-deep border border-rule rounded-2xl p-7 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <span className="font-display text-6xl font-bold text-rule absolute top-4 right-5 leading-none select-none">02</span>
                <div className="w-10 h-10 rounded-xl bg-sage-faint flex items-center justify-center mb-5">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="#4A7C59" strokeWidth="2.5" fill="none" strokeLinecap="round">
                    <line x1="8" y1="16" x2="8" y2="8" />
                    <line x1="12" y1="18" x2="12" y2="5" />
                    <line x1="16" y1="16" x2="16" y2="8" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-2">See it, live.</h3>
                <p className="font-sans text-sm text-ink-muted leading-relaxed">
                  Every word appears in real time with colour-coded annotations. Filler words, repetitions, prolonged words, and long pauses are flagged the instant they occur — so you can hear yourself differently.
                </p>
              </motion.div>

              {/* Step 3 — Get coached */}
              <motion.div
                className="bg-paper-deep border border-rule rounded-2xl p-7 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="font-display text-6xl font-bold text-rule absolute top-4 right-5 leading-none select-none">03</span>
                <div className="w-10 h-10 rounded-xl bg-sage-faint flex items-center justify-center mb-5">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="#4A7C59" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-2">Get coached.</h3>
                <p className="font-sans text-sm text-ink-muted leading-relaxed">
                  Click Analyse and your anonymised transcript is sent to Gemini. Within seconds you receive a fluency score, specific feedback on your answer, and one concrete tip for your next session.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 4 — TRANSCRIPT FEATURE HIGHLIGHT
        ============================================================ */}
        <section className="bg-paper-deep border-y border-rule py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              {/* Left — Text */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-4">
                  The annotated transcript
                </p>
                <h2 className="font-display text-3xl font-bold text-ink mb-5 leading-tight">
                  Your speech, visible for the first time.
                </h2>
                <p className="font-sans text-[15px] text-ink-muted leading-relaxed mb-8">
                  Most people have no idea how many times they say &lsquo;um&rsquo; in a sentence. VoiceScribe makes every speech pattern visible in real time — not as a judgment, but as information you can act on.
                </p>

                {/* Annotation legend */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-px border-b-2 border-dashed border-copper inline-block flex-shrink-0" />
                    <span className="font-sans text-sm text-ink">Repetition — same word said twice in a row</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-px border-b-2 border-dotted border-sage inline-block flex-shrink-0" />
                    <span className="font-sans text-sm text-ink">Prolongation — word held longer than average</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-ink-muted mr-1">•</span>
                    <span className="font-sans text-sm text-ink">Block — sudden stop mid-word</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-px bg-rule inline-block flex-shrink-0" />
                    <span className="font-sans text-sm text-ink">Long pause — gap over 1.5 seconds</span>
                  </div>
                </div>
              </div>

              {/* Right — Live demo card */}
              <div className="bg-paper border border-rule rounded-2xl p-8 shadow-[0_2px_24px_rgba(0,0,0,0.04)]">
                <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-6">
                  Sample transcript · Job Interview
                </p>

                <p className="font-display text-lg text-ink leading-[1.8]">
                  I{" "}
                  <span className="annotation-repetition text-copper">think think</span>
                  {" "}I&apos;m a strong candidate because{" "}
                  <span className="annotation-prolongation text-sage">reaaally</span>
                  {" "}I{" "}
                  <span className="annotation-block">⌐care</span>
                  {" "}deeply about{" "}
                  <span className="annotation-pause-long inline-block" />
                  {" "}about the work.
                </p>

                {/* Mini legend */}
                <div className="mt-6 pt-4 border-t border-rule-light flex gap-4 flex-wrap font-mono text-[9px] uppercase tracking-widest text-ink-faint">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-copper" />
                    Repetition
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                    Prolongation
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-muted" />
                    Block
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-ghost" />
                    Pause
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* ============================================================
            SECTION 6 — BOTTOM CTA
        ============================================================ */}
        <section className="bg-paper-deep border-t border-rule py-20 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-5 flex items-center justify-center gap-3">
                <span className="w-6 h-px bg-rule" />
                Built for the Steminate Hackathon
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
                Start your first session.{" "}
                <span className="text-sage">It takes 60 seconds.</span>
              </h2>
              <p className="font-sans text-[15px] text-ink-muted mb-10 leading-relaxed">
                No account. No upload. No audience. Just you and honest feedback on how you speak.
              </p>

              <Link
                href="/app"
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-ink text-paper font-mono text-[11px] tracking-widest uppercase font-bold rounded-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-sage translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">Open VoiceScribe →</span>
              </Link>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                Free · Private · Browser-based
              </p>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-paper-deep py-10 border-t border-rule">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div>
              <p className="font-display text-base font-semibold tracking-tight text-ink mb-1">
                Voice<span className="text-sage">Scribe</span>
              </p>
              <p className="font-sans text-xs text-ink-muted max-w-xs leading-relaxed">
                A private practice space for anyone who wants to speak with more confidence.
              </p>
            </div>
            <div className="flex gap-8 font-sans text-xs text-ink-muted">
              <div className="flex flex-col gap-2">
                <span className="font-bold text-ink uppercase tracking-widest text-[9px] mb-1">Product</span>
                <Link href="/practice" className="hover:text-sage transition-colors">Enter Studio</Link>
                <Link href="/about" className="hover:text-sage transition-colors">About</Link>
                <span className="hover:text-ink transition-colors cursor-pointer">How it works</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold text-ink uppercase tracking-widest text-[9px] mb-1">Principles</span>
                <span className="hover:text-ink transition-colors cursor-pointer">Privacy First</span>
                <span className="hover:text-ink transition-colors cursor-pointer">Local Data Only</span>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-rule-light flex justify-between">
            <p className="font-sans text-[11px] text-ink-faint">© 2026 VoiceScribe. Built for dignity.</p>
            <p className="font-sans text-[11px] text-ink-faint">Not a medical tool.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
