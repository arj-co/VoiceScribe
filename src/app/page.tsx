"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

// --- Signature Experience 1: Speech Landscape ---
function SpeechLandscape() {
  const fragments = [
    { text: "s-s-sometimes", top: "25%", left: "65%", delay: 1.5, opacity: 0.5, type: "rep" },
    { text: "⌐to find", top: "75%", left: "70%", delay: 2.5, opacity: 0.4, type: "block" },
    { text: "the right woooords", top: "45%", left: "80%", delay: 4, opacity: 0.55, type: "pro" }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      {/* Atmospheric warm glows */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-copper/15 blur-[120px]"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-sage/15 blur-[130px] -translate-x-1/4 translate-y-1/4"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-paper-deep/80 blur-[80px] translate-x-1/3 -translate-y-1/4"
      />

      {/* Subliminal Waveform */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-15">
        {[2, 4, 3, 6, 8, 12, 7, 4, 9, 5, 3, 2].map((h, i) => (
          <motion.div
            key={i}
            animate={{ height: [h * 8, h * 16, h * 8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
            className="w-[2px] rounded-full bg-ink"
          />
        ))}
      </div>

      {/* Floating Fragments */}
      {fragments.map((frag, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: frag.opacity, y: [0, -20, 0] }}
          transition={{
            y: { duration: 8 + i, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 3, delay: frag.delay }
          }}
          className="absolute font-display text-xl sm:text-3xl tracking-wide whitespace-nowrap text-ink blur-[0.5px] select-none"
          style={{ top: frag.top, left: frag.left }}
        >
          {frag.type === "rep" ? <span className="annotation-repetition text-copper">{frag.text}</span> :
           frag.type === "block" ? <span className="annotation-block">{frag.text}</span> :
           frag.type === "pro" ? <span className="annotation-prolongation text-sage">{frag.text}</span> :
           frag.text}
        </motion.div>
      ))}
    </div>
  );
}

// --- Signature Experience 2: Living Transcript Word ---
function AnimatedWord({ children, delay, type = "normal" }: { children?: React.ReactNode, delay: number, type?: "normal" | "rep" | "block" | "pro" | "pause" }) {
  return (
    <motion.span
      initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="inline-block mr-[0.25em] mb-[0.1em]"
    >
      {type === "pause" ? (
        <span className="annotation-pause" />
      ) : type === "rep" ? (
        <span className="annotation-repetition text-copper relative">
          {children}
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.4, duration: 0.5 }}
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-copper uppercase tracking-widest opacity-0 group-hover:opacity-100"
          >
            Repetition
          </motion.span>
        </span>
      ) : type === "block" ? (
        <span className="annotation-block relative">
          {children}
        </span>
      ) : type === "pro" ? (
        <span className="annotation-prolongation relative text-sage">
          {children}
        </span>
      ) : (
        children
      )}
    </motion.span>
  );
}

// --- Signature Experience 3: Longitudinal Dashboard ---
const sessionMilestones = [
  { id: "01", date: "Mar 12, 2026", duration: "04:12" },
  { id: "12", date: "Apr 04, 2026", duration: "05:30" },
  { id: "24", date: "May 18, 2026", duration: "06:15" },
  { id: "40", date: "Jun 22, 2026", duration: "12:45" },
];

function AnimatedNumber({ value }: { value: number }) {
  return <span>{Math.round(value)}</span>;
}

function ProgressJourney() {
  // Wheel-capture approach:
  // Section is exactly h-screen with card centered.
  // When section is in view, wheel events drive internal progress 0→1.
  // At progress=0 + scroll-up → release (page scrolls up).
  // At progress=1 + scroll-down → release (page scrolls to footer).
  // No 500vh container, no blank space.
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const hasSnapped = useRef(false);

  // Observe section visibility — activate when 60%+ visible
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          setIsActive(true);
        } else if (!entry.isIntersecting) {
          setIsActive(false);
          hasSnapped.current = false;
        }
      },
      { threshold: [0.6] }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Snap section into view when first activated (only if progress near 0)
  useEffect(() => {
    if (isActive && !hasSnapped.current && progressRef.current < 0.05) {
      hasSnapped.current = true;
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isActive]);

  // Capture wheel events to drive progress internally
  useEffect(() => {
    if (!isActive) return;

    const handleWheel = (e: WheelEvent) => {
      const p = progressRef.current;

      // At boundaries, let page scroll naturally
      if (e.deltaY > 0 && p >= 1) return;
      if (e.deltaY < 0 && p <= 0) return;

      e.preventDefault();
      e.stopPropagation();

      const step = e.deltaY / 2000;
      progressRef.current = Math.max(0, Math.min(1, p + step));
      setProgress(progressRef.current);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isActive]);

  // Derived animation values from progress
  const activeIndex = progress < 0.25 ? 0 : progress < 0.5 ? 1 : progress < 0.75 ? 2 : 3;
  const activeSession = sessionMilestones[activeIndex];

  const fluency = 41 + progress * 55;
  const rep = 18 * (1 - progress);
  const pro = 11 - progress * 10;
  const block = 9 * (1 - progress);
  const pause = 14 - progress * 13;

  // Transcript disfluency fade-out values
  const repOpacity = Math.max(0, 1 - progress / 0.25);
  const repWidthEm = Math.max(0, 2 * (1 - progress / 0.3));
  const pauseOpacity = progress < 0.2 ? 1 : Math.max(0, 1 - (progress - 0.2) / 0.3);
  const pauseWidthEm = progress < 0.2 ? 3 : Math.max(0, 3 * (1 - (progress - 0.2) / 0.4));
  const proOpacity = progress < 0.5 ? 1 : Math.max(0, 1 - (progress - 0.5) / 0.25);
  const proWidthEm = progress < 0.5 ? 1.5 : Math.max(0, 1.5 * (1 - (progress - 0.5) / 0.3));
  const blockOpacity = progress < 0.7 ? 1 : Math.max(0, 1 - (progress - 0.7) / 0.2);
  const blockWidthEm = progress < 0.7 ? 1 : Math.max(0, 1 * (1 - (progress - 0.7) / 0.25));
  const pauseMargin = pauseWidthEm > 0 ? "0 0.25em" : "0";

  return (
    <div
      ref={sectionRef}
      className="h-screen w-full flex flex-col items-center justify-center gap-4 px-6 bg-paper"
    >
      {/* Label */}
      <div className="w-full max-w-2xl">
        <p className="font-mono text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-1">
          Longitudinal Analysis
        </p>
        <p className="font-display text-xl sm:text-2xl font-medium text-ink tracking-tight">
          Speech data across sessions.
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl bg-paper border border-rule shadow-[0_4px_32px_rgba(160,112,74,0.07)] rounded-xl p-5 sm:p-6 flex flex-col gap-5">
        {/* Header row */}
        <div className="flex justify-between items-start border-b border-rule pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-sans text-[10px] font-bold tracking-widest text-ink uppercase">
                Session {activeSession.id}
              </h4>
              <span className="font-mono text-[9px] text-ink-muted uppercase tracking-widest bg-rule-faint px-2 py-0.5 rounded-sm">
                {activeSession.date}
              </span>
            </div>
            <p className="font-mono text-[9px] text-ink-muted uppercase tracking-widest">
              Duration: {activeSession.duration}
            </p>
          </div>
          <div className="text-right">
            <div className="font-display text-2xl sm:text-3xl font-bold text-ink">
              <AnimatedNumber value={fluency} />
              <span className="text-base sm:text-lg text-ink-muted">%</span>
            </div>
            <div className="font-sans text-[9px] uppercase tracking-widest font-bold mt-0.5 text-sage">
              Fluency Index • up
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Rep.", value: rep },
            { label: "Prol.", value: pro },
            { label: "Blocks", value: block },
            { label: "Pauses", value: pause },
          ].map(({ label, value }) => (
            <div key={label} className="bg-paper-deep rounded-md p-3 border border-rule-light">
              <div className="font-mono text-[9px] text-ink-muted uppercase tracking-widest mb-1">{label}</div>
              <div className="font-sans text-lg font-semibold text-ink"><AnimatedNumber value={value} /></div>
            </div>
          ))}
        </div>

        {/* Transcript fragment */}
        <div className="flex flex-col gap-3 border-t border-rule pt-4">
          <div className="flex justify-between items-end">
            <div className="font-mono text-[9px] text-ink-muted uppercase tracking-widest">Transcript Fragment</div>
            <div className="font-sans text-[9px] text-ink-muted bg-rule-faint px-2 py-0.5 rounded">Quarterly Metrics</div>
          </div>
          <p className="font-display text-lg sm:text-xl text-ink leading-relaxed">
            The{" "}
            <span
              style={{ opacity: repOpacity, width: `${repWidthEm}em`, display: "inline-flex", overflow: "hidden", whiteSpace: "nowrap", transition: "all 0.15s ease-out" }}
              className="annotation-repetition text-copper"
            >q-q-</span>
            quarterly metrics indicate a
            <span
              style={{ opacity: pauseOpacity, width: `${pauseWidthEm}em`, display: "inline-flex", margin: pauseMargin, transition: "all 0.15s ease-out" }}
              className="annotation-pause-long"
            />{" "}
            <span
              style={{ opacity: proOpacity, width: `${proWidthEm}em`, display: "inline-flex", overflow: "hidden", whiteSpace: "nowrap", transition: "all 0.15s ease-out" }}
              className="annotation-prolongation text-sage"
            >sss</span>
            slight increase in{" "}
            <span
              style={{ opacity: blockOpacity, width: `${blockWidthEm}em`, display: "inline-flex", overflow: "hidden", whiteSpace: "nowrap", transition: "all 0.15s ease-out" }}
              className="annotation-block mr-1"
            />
            revenue.
          </p>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="w-full max-w-2xl flex items-center justify-between">
        <div className="flex gap-1.5">
          {sessionMilestones.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: i === activeIndex ? 1 : 0.2,
                width: i === activeIndex ? "20px" : "6px",
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="h-[3px] rounded-full bg-copper"
            />
          ))}
        </div>
        <p className="font-mono text-[9px] text-ink-faint uppercase tracking-widest">
          Scroll to advance
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-paper flex flex-col selection:bg-copper-faint selection:text-ink relative transition-colors duration-700 overflow-x-hidden">
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full px-6 sm:px-10 py-4 flex justify-between items-center z-50 bg-paper/85 backdrop-blur-sm border-b border-rule-faint">
        <h1 className="font-display text-lg font-semibold tracking-tight text-ink">
          Voice<span className="font-bold text-copper">Scribe</span>
        </h1>
        <nav className="hidden sm:flex gap-6 font-mono text-[10px] tracking-widest uppercase text-ink-muted">
          <span className="text-ink font-bold">Demonstration</span>
        </nav>
      </header>

      <main className="flex-grow w-full">
        {/* 1. Hero */}
        <section className="relative flex flex-col items-center justify-center px-6 min-h-screen bg-paper overflow-hidden">
          <SpeechLandscape />
          
          <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mb-5">
                A practice space for your voice
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ink leading-[1.1] mb-4">
                Speech,{" "}
                <span className="italic font-light text-ink-muted">visualized.</span>
              </h2>
              <p className="font-sans text-sm text-ink-muted max-w-sm leading-relaxed mb-8">
                A private, browser-based instrument for people who stutter — not a clinic, a sanctuary.
              </p>
              
              <Link 
                href="/practice"
                className="group relative inline-flex items-center gap-2.5 px-6 py-3 bg-ink text-paper text-[11px] font-mono tracking-widest uppercase font-bold overflow-hidden rounded-full"
              >
                <div className="absolute inset-0 w-full h-full bg-copper translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[0.21,0.47,0.32,0.98]" />
                <span className="relative z-10 flex items-center gap-2">
                  Open The Instrument
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-0.5 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 2. Living Transcript */}
        <section className="relative px-6 py-16 bg-paper-deep border-y border-rule z-10">
          <div className="w-full max-w-3xl mx-auto">
            <div className="font-mono text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
              <span className="w-6 h-px bg-rule" />
              The Living Transcript
            </div>
            
            <div className="font-display text-2xl sm:text-3xl leading-[1.4] text-ink tracking-tight">
              <AnimatedWord delay={0.1}>I</AnimatedWord>
              <AnimatedWord delay={0.3} type="rep">w-w-want</AnimatedWord>
              <AnimatedWord delay={0.8}>to</AnimatedWord>
              <AnimatedWord delay={1.0}>speak</AnimatedWord>
              <AnimatedWord delay={1.2}>more</AnimatedWord>
              <AnimatedWord delay={1.4}>confidently.</AnimatedWord>
              <AnimatedWord delay={1.8} type="pause" />
              <AnimatedWord delay={2.4}>But</AnimatedWord>
              <AnimatedWord delay={2.8} type="pro">ssssometimes</AnimatedWord>
              <AnimatedWord delay={3.6}>my</AnimatedWord>
              <AnimatedWord delay={3.8}>voice</AnimatedWord>
              <AnimatedWord delay={4.2} type="block">⌐stops.</AnimatedWord>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 4.5, duration: 1 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-[10px] uppercase tracking-widest text-ink-muted border-t border-rule-light pt-6"
            >
              <div><span className="block text-copper mb-1 font-sans font-medium text-xs">Dashed underline</span>Repetition</div>
              <div><span className="block text-sage mb-1 font-sans font-medium text-xs">Dotted underline</span>Prolongation</div>
              <div><span className="block text-ink font-bold mb-1 font-sans font-medium text-xs">Bullet prefix</span>Block</div>
              <div><span className="block text-ink-faint mb-1 font-sans font-medium text-xs">Line gap</span>Long Pause</div>
            </motion.div>
          </div>
        </section>

        {/* 3. Longitudinal — wheel-captured scroll section.
            h-screen with card centered. Wheel events drive internal animation.
            Footer is hidden until progress reaches 1. */}
        <section className="relative w-full z-10">
          <ProgressJourney />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-paper-deep py-10 border-t border-rule">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div>
              <p className="font-display text-base font-semibold tracking-tight text-ink mb-1">
                Voice<span className="text-copper">Scribe</span>
              </p>
              <p className="font-sans text-xs text-ink-muted max-w-xs leading-relaxed">
                A private practice space for people who stutter.
              </p>
            </div>
            <div className="flex gap-8 font-sans text-xs text-ink-muted">
              <div className="flex flex-col gap-2">
                <span className="font-bold text-ink uppercase tracking-widest text-[9px] mb-1">Product</span>
                <Link href="/practice" className="hover:text-copper transition-colors">Enter Studio</Link>
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
