"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect } from "react";

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

// --- Signature Experience 3: Progress Visualizer ---
function ProgressJourney() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0.5, 1], [100, -50]);
  const y2 = useTransform(scrollYProgress, [0.5, 1], [200, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 1], [300, 50]);

  return (
    <div className="relative w-full max-w-4xl h-[60vh] flex justify-center items-center perspective-[1000px]">
      <motion.div style={{ y: y3, z: -200, opacity: 0.2 }} className="absolute w-full max-w-2xl bg-paper-warm dark:bg-rule-light border border-rule p-8 shadow-2xl">
        <div className="font-mono text-[10px] text-ink-muted uppercase tracking-widest mb-4">Month 1</div>
        <p className="font-display text-2xl text-ink blur-[1px]">
          <span className="annotation-repetition text-copper">I-I-I</span> wanted to <span className="annotation-block">⌐say</span> that <span className="annotation-pause" /> it <span className="annotation-prolongation">wwwas</span> difficult.
        </p>
      </motion.div>
      
      <motion.div style={{ y: y2, z: -100, opacity: 0.5 }} className="absolute w-full max-w-2xl bg-paper border border-rule p-8 shadow-xl">
        <div className="font-mono text-[10px] text-ink-muted uppercase tracking-widest mb-4">Month 2</div>
        <p className="font-display text-2xl text-ink">
          I wanted to <span className="annotation-block">⌐say</span> that <span className="annotation-pause" /> it was difficult.
        </p>
      </motion.div>

      <motion.div style={{ y: y1, z: 0 }} className="absolute w-full max-w-2xl bg-cream dark:bg-paper border border-copper/30 p-8 shadow-2xl shadow-copper/5">
        <div className="font-mono text-[10px] text-copper uppercase tracking-widest mb-4">Month 4</div>
        <p className="font-display text-2xl text-ink">
          I wanted to say that it was difficult.
        </p>
        <div className="mt-8 flex items-center justify-between border-t border-rule pt-4">
          <span className="font-mono text-[10px] text-sage uppercase tracking-widest">Fluency found</span>
          <motion.div className="w-16 h-[1px] bg-sage" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 1 }} />
        </div>
      </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-paper flex flex-col selection:bg-copper-faint selection:text-ink relative transition-colors duration-700 overflow-x-hidden">
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full px-6 sm:px-8 py-6 flex justify-between items-center z-50 mix-blend-difference text-paper dark:mix-blend-normal dark:text-ink">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Voice<em className="not-italic font-bold">Scribe</em>
        </h1>
        <div className="flex items-center gap-8">
          <nav className="hidden sm:flex gap-6 font-mono text-[10px] tracking-widest uppercase opacity-70">
            <span className="font-bold">Demonstration</span>
          </nav>
          <ThemeToggle />
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
                  <div className="absolute inset-0 w-full h-full bg-copper translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.21,0.47,0.32,0.98]" />
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
            <div className="font-mono text-[10px] text-copper uppercase tracking-widest mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-copper" />
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

        {/* 3. Progress Journey */}
        <section className="relative min-h-[120svh] flex flex-col items-center justify-center px-6 py-32 z-10 overflow-hidden">
          <div className="w-full max-w-5xl mx-auto mb-16 text-center">
            <h3 className="font-display text-4xl sm:text-6xl font-bold text-ink mb-6">Observe your rhythm.</h3>
            <p className="font-display text-xl text-ink-light italic">Progress told through visual subtraction, not generic dashboards.</p>
          </div>
          
          <ProgressJourney />
        </section>
      </main>

      {/* Premium Footer */}
      <footer className="bg-ink dark:bg-[#0A0908] text-paper py-16 sm:py-24 border-t border-ink-light dark:border-rule">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            <div className="md:col-span-1">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-paper mb-6">
                Voice<em className="not-italic font-bold text-copper">Scribe</em>
              </h2>
            </div>
            
            <div className="md:col-span-2 grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-4 font-mono text-[10px] tracking-widest uppercase">
                <span className="text-ink-muted mb-2">The Instrument</span>
                <Link href="/practice" className="text-paper hover:text-copper transition-colors">Enter Studio</Link>
                <span className="text-ink-faint hover:text-paper transition-colors cursor-pointer">Manifesto</span>
              </div>

              <div className="flex flex-col gap-4 font-mono text-[10px] tracking-widest uppercase">
                <span className="text-ink-muted mb-2">Commitment</span>
                <span className="text-ink-faint hover:text-paper transition-colors cursor-pointer">Privacy First</span>
                <span className="text-ink-faint hover:text-paper transition-colors cursor-pointer">Local Data Only</span>
                <span className="text-ink-faint hover:text-paper transition-colors cursor-pointer">Accessibility</span>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-ink-light dark:border-rule flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <p className="font-mono text-[9px] tracking-widest text-ink-muted uppercase">
              © 2026 VoiceScribe. Built for dignity.
            </p>
            <p className="font-mono text-[9px] tracking-widest text-ink-faint max-w-sm text-left sm:text-right leading-relaxed uppercase">
              Not a medical tool. Designed for personal practice and reflection.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
