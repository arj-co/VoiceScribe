"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent, MotionValue } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect, useRef } from "react";

// --- Signature Experience 1: Speech Landscape ---
function SpeechLandscape() {
  const fragments = [
    { text: "s-s-sometimes", top: "25%", left: "65%", delay: 1.5, opacity: 0.6, type: "rep" },
    { text: "⌐to find", top: "75%", left: "70%", delay: 2.5, opacity: 0.5, type: "block" },
    { text: "the right woooords", top: "45%", left: "80%", delay: 4, opacity: 0.7, type: "pro" }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      {/* Atmospheric Cinematic Glows */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-copper/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-sage/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen -translate-x-1/4 translate-y-1/4"
      />

      {/* Subliminal Waveform Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-20 dark:opacity-40">
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
           frag.type === "pro" ? <span className="annotation-prolongation">{frag.text}</span> :
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
        <span className="annotation-prolongation relative text-sage dark:text-sage-light">
          {children}
        </span>
      ) : (
        children
      )}
    </motion.span>
  );
}

// --- Signature Experience 3: Longitudinal Dashboard ---
const sessionsData = [
  {
    id: "01",
    date: "Oct 12, 2025",
    duration: "04:12",
    fluency: 41,
    trend: "Baseline",
    trendDir: "neutral",
    metrics: { rep: 18, pro: 11, block: 9, pause: 14 },
    phrase: "Project overview",
    transcript: (
      <>
        The <span className="annotation-repetition text-copper">q-q-quarterly</span> metrics indicate a 
        <span className="annotation-pause-long" /> <span className="annotation-prolongation">sssslight</span> 
        increase in <span className="annotation-block">revenue</span>.
      </>
    )
  },
  {
    id: "12",
    date: "Nov 04, 2025",
    duration: "05:30",
    fluency: 78,
    trend: "+37%",
    trendDir: "up",
    metrics: { rep: 9, pro: 5, block: 3, pause: 8 },
    phrase: "Revenue breakdown",
    transcript: (
      <>
        The quarterly metrics indicate a 
        <span className="annotation-pause" /> <span className="annotation-prolongation">sssslight</span> 
        increase in <span className="annotation-block">revenue</span>.
      </>
    )
  },
  {
    id: "24",
    date: "Dec 18, 2025",
    duration: "06:15",
    fluency: 89,
    trend: "+11%",
    trendDir: "up",
    metrics: { rep: 3, pro: 2, block: 1, pause: 3 },
    phrase: "Growth summary",
    transcript: (
      <>
        The quarterly metrics indicate a slight 
        increase in <span className="annotation-block">revenue</span>.
      </>
    )
  },
  {
    id: "40",
    date: "Jan 22, 2026",
    duration: "12:45",
    fluency: 96,
    trend: "+7%",
    trendDir: "up",
    metrics: { rep: 0, pro: 1, block: 0, pause: 1 },
    phrase: "Board presentation",
    transcript: (
      <>
        The quarterly metrics indicate a <span className="annotation-prolongation">ssslight</span> increase in revenue.
      </>
    )
  }
];

function AnimatedNumber({ value }: { value: MotionValue<number> }) {
  const ref = useRef<HTMLSpanElement>(null);
  useMotionValueEvent(value, "change", (latest) => {
    if (ref.current) {
      ref.current.textContent = Math.round(latest).toString();
    }
  });
  return <span ref={ref}>{Math.round(value.get())}</span>;
}

function ProgressJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end end"] });
  
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) setActiveIndex(0);
    else if (latest < 0.5) setActiveIndex(1);
    else if (latest < 0.75) setActiveIndex(2);
    else setActiveIndex(3);
  });

  const activeSession = sessionsData[activeIndex];

  // Interpolate numerical metrics smoothly across the scroll
  const fluencyValue = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [41, 78, 89, 96]);
  const repValue = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [18, 9, 3, 0]);
  const proValue = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [11, 5, 2, 1]);
  const blockValue = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [9, 3, 1, 0]);
  const pauseValue = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [14, 8, 3, 1]);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pt-24 sm:pt-32">
        <div className="w-full max-w-3xl bg-paper dark:bg-[#141211] border border-rule shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 transition-colors duration-500">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b border-rule pb-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h4 className="font-sans text-xs font-bold tracking-widest text-ink uppercase">
                  Session {activeSession.id}
                </h4>
                <span className="font-mono text-[9px] text-ink-muted uppercase tracking-widest bg-rule-light/50 px-2 py-0.5 rounded-sm">
                  {activeSession.date}
                </span>
              </div>
              <p className="font-mono text-[10px] text-ink-muted uppercase tracking-widest mt-1">
                Duration: {activeSession.duration}
              </p>
            </div>
            <div className="text-right">
              <div className="font-display text-3xl sm:text-4xl font-bold text-ink dark:text-white">
                <AnimatedNumber value={fluencyValue} /><span className="text-xl sm:text-2xl text-ink-muted">%</span>
              </div>
              <div className={`font-sans text-[9px] sm:text-[10px] uppercase tracking-widest font-bold mt-1 ${activeSession.trendDir === 'up' ? 'text-sage dark:text-sage-light' : 'text-ink-muted'}`}>
                Fluency Index • {activeSession.trend}
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-cream dark:bg-white/5 rounded-lg p-3 sm:p-4 border border-rule-faint dark:border-white/5">
              <div className="font-mono text-[9px] text-ink-muted uppercase tracking-widest mb-1">Repetitions</div>
              <div className="font-sans text-xl font-medium text-ink dark:text-white">
                <AnimatedNumber value={repValue} />
              </div>
            </div>
            <div className="bg-cream dark:bg-white/5 rounded-lg p-3 sm:p-4 border border-rule-faint dark:border-white/5">
              <div className="font-mono text-[9px] text-ink-muted uppercase tracking-widest mb-1">Prolongations</div>
              <div className="font-sans text-xl font-medium text-ink dark:text-white">
                <AnimatedNumber value={proValue} />
              </div>
            </div>
            <div className="bg-cream dark:bg-white/5 rounded-lg p-3 sm:p-4 border border-rule-faint dark:border-white/5">
              <div className="font-mono text-[9px] text-ink-muted uppercase tracking-widest mb-1">Blocks</div>
              <div className="font-sans text-xl font-medium text-ink dark:text-white">
                <AnimatedNumber value={blockValue} />
              </div>
            </div>
            <div className="bg-cream dark:bg-white/5 rounded-lg p-3 sm:p-4 border border-rule-faint dark:border-white/5">
              <div className="font-mono text-[9px] text-ink-muted uppercase tracking-widest mb-1">Long Pauses</div>
              <div className="font-sans text-xl font-medium text-ink dark:text-white">
                <AnimatedNumber value={pauseValue} />
              </div>
            </div>
          </div>

          {/* Affected Phrase & Transcript */}
          <div className="flex flex-col gap-4 border-t border-rule pt-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2">
              <div className="font-mono text-[9px] text-ink-muted uppercase tracking-widest">Transcript Fragment</div>
              <div className="font-sans text-[10px] text-ink-muted bg-rule-light/50 dark:bg-white/5 px-2 py-1 rounded-md w-fit">Context: {activeSession.phrase}</div>
            </div>
            <div className="relative min-h-[5rem] sm:min-h-[4rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeIndex}
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-2xl sm:text-3xl text-ink dark:text-white leading-relaxed absolute inset-0"
                >
                  {activeSession.transcript}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-paper flex flex-col selection:bg-copper-faint selection:text-ink relative transition-colors duration-700 overflow-x-hidden">
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full px-6 sm:px-8 py-6 flex justify-between items-center z-50 text-ink">
        <h1 className="font-display text-2xl font-medium tracking-tight">
          Voice<span className="font-bold">Scribe</span>
        </h1>
        <div className="flex items-center gap-8">
          <nav className="hidden sm:flex gap-6 font-mono text-[10px] tracking-widest uppercase opacity-70">
            <span className="font-bold text-ink">Demonstration</span>
          </nav>
        </div>
      </header>

      <main className="flex-grow w-full">
        {/* 1. Speech Landscape Hero */}
        <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-6">
          <SpeechLandscape />
          
          <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-start justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="max-w-4xl mix-blend-darken dark:mix-blend-lighten"
            >
              <h2 className="font-display text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-ink dark:text-white leading-[0.9] mb-8">
                Speech, <br />
                <span className="italic font-light text-ink-light dark:text-ink-ghost">visualized.</span>
              </h2>
              <p className="font-sans text-xs sm:text-sm tracking-widest uppercase text-ink-muted dark:text-ink-ghost max-w-md leading-relaxed">
                A private, browser-based instrument built for people who stutter. Not a dashboard. Not a clinic. A sanctuary.
              </p>
              
              <motion.div className="mt-16">
                <Link 
                  href="/practice"
                  className="group relative inline-flex justify-center items-center px-8 py-4 bg-ink dark:bg-paper text-paper dark:text-ink text-[11px] font-mono tracking-widest uppercase font-bold overflow-hidden rounded-full"
                >
                  <div className="absolute inset-0 w-full h-full bg-rule-light translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.21,0.47,0.32,0.98]" />
                  <span className="relative z-10 flex items-center gap-3">
                    Open The Instrument
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2. Living Transcript */}
        <section className="relative min-h-[100svh] flex items-center justify-center px-6 py-24 bg-paper-warm dark:bg-[#110F0E] border-y border-rule z-10">
          <div className="w-full max-w-6xl mx-auto">
            <div className="font-sans font-bold text-xs text-ink-muted uppercase tracking-[0.2em] mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-rule" />
              The Living Transcript
            </div>
            
            <div className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.15] text-ink dark:text-white tracking-tight">
              <AnimatedWord delay={0.1}>I</AnimatedWord>
              <AnimatedWord delay={0.3} type="rep">w-w-want</AnimatedWord>
              <AnimatedWord delay={0.8}>to</AnimatedWord>
              <AnimatedWord delay={1.0}>speak</AnimatedWord>
              <AnimatedWord delay={1.2}>more</AnimatedWord>
              <AnimatedWord delay={1.4}>confidently.</AnimatedWord>
              <br className="hidden md:block" />
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
              transition={{ delay: 5, duration: 1 }}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-[10px] uppercase tracking-widest text-ink-muted border-t border-rule pt-8"
            >
              <div>
                <span className="block text-copper mb-2 font-sans font-medium">Double Underline</span>
                Repetition
              </div>
              <div>
                <span className="block text-sage dark:text-sage-light mb-2 font-sans font-medium">Spaced Italic</span>
                Prolongation
              </div>
              <div>
                <span className="block text-ink dark:text-white font-bold mb-2 font-sans font-medium">Bracket Marker</span>
                Block
              </div>
              <div>
                <span className="block text-ink-light dark:text-ink-faint mb-2 font-sans font-medium">Line Break</span>
                Long Pause
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. Longitudinal Dashboard */}
        <section className="relative min-h-[120svh] flex flex-col items-center justify-center px-6 py-32 z-10 overflow-hidden">
          <div className="w-full max-w-5xl mx-auto mb-16 text-center">
            <h3 className="font-sans text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-ink-muted mb-4">Longitudinal Analysis</h3>
            <p className="font-display text-4xl sm:text-5xl font-medium text-ink dark:text-white tracking-tight">Speech data across recorded sessions.</p>
          </div>
          
          <ProgressJourney />
        </section>
      </main>

      {/* Useful Footer */}
      <footer className="bg-rule-faint py-16 sm:py-24 border-t border-rule">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <h2 className="font-display text-2xl font-medium tracking-tight text-ink mb-4">
                Voice<span className="font-bold">Scribe</span>
              </h2>
              <p className="font-sans text-sm text-ink-muted max-w-xs leading-relaxed">
                A private, browser-based instrument built to help people who stutter practice speaking freely.
              </p>
            </div>
            
            <div className="md:col-span-1 flex flex-col gap-3 font-sans text-xs font-medium text-ink-muted">
              <span className="font-bold text-ink uppercase tracking-widest mb-2 text-[10px]">Product</span>
              <Link href="/practice" className="hover:text-ink transition-colors">Enter Studio</Link>
              <span className="hover:text-ink transition-colors cursor-pointer">How it works</span>
              <span className="hover:text-ink transition-colors cursor-pointer">Manifesto</span>
            </div>

            <div className="md:col-span-1 flex flex-col gap-3 font-sans text-xs font-medium text-ink-muted">
              <span className="font-bold text-ink uppercase tracking-widest mb-2 text-[10px]">Principles</span>
              <span className="hover:text-ink transition-colors cursor-pointer">Privacy First</span>
              <span className="hover:text-ink transition-colors cursor-pointer">Local Data Only</span>
              <span className="hover:text-ink transition-colors cursor-pointer">Accessibility</span>
            </div>
          </div>
          
          <div className="pt-8 border-t border-rule flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <p className="font-sans text-xs text-ink-faint">
              © 2026 VoiceScribe. Built for dignity.
            </p>
            <p className="font-sans text-xs text-ink-faint text-left sm:text-right">
              Not a medical tool. Designed for personal practice and reflection.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
