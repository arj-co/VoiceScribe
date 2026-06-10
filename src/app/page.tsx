"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

const fadeIn: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

function WaveformBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-30 dark:opacity-10 mix-blend-multiply dark:mix-blend-screen">
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[20%] left-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-copper to-transparent"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-[35%] left-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-sage to-transparent opacity-50"
      />
      <motion.div 
        animate={{
          scaleY: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 w-[1px] h-32 bg-gradient-to-b from-transparent via-copper to-transparent origin-center"
      />
      <motion.div 
        animate={{
          scaleY: [1, 1.5, 1],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[40%] right-1/3 w-[1px] h-48 bg-gradient-to-b from-transparent via-sage to-transparent origin-center"
      />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-paper flex flex-col justify-between selection:bg-copper-faint selection:text-ink relative transition-colors duration-500">
      <WaveformBackground />

      {/* Navigation */}
      <header className="mx-auto max-w-5xl w-full px-6 sm:px-8 pt-12 flex justify-between items-baseline relative z-10">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink group">
          Voice<em className="not-italic font-bold text-copper group-hover:text-sage transition-colors duration-500">Scribe</em>
        </h1>
        <div className="flex items-center gap-8">
          <nav className="flex gap-6 font-mono text-[11px] tracking-wider uppercase text-ink-muted">
            <span className="text-ink font-bold">Home</span>
            <Link href="/practice" className="hover:text-copper transition-colors">
              Workspace
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow w-full">
        <section className="mx-auto max-w-5xl w-full px-6 sm:px-8 py-20 sm:py-32 flex flex-col justify-center min-h-[85vh]">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center"
          >
            <div className="md:col-span-2 max-w-2xl">
              <motion.p variants={fadeIn} className="font-mono text-xs tracking-[0.2em] uppercase text-copper font-semibold mb-6">
                A Thoughtful Speech Space
              </motion.p>
              <motion.h2 variants={fadeIn} className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-ink leading-[1.05] mb-8">
                Centering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink to-ink-muted dark:from-ink dark:to-ink-faint">dignity</span> of human speech.
              </motion.h2>
              <motion.p variants={fadeIn} className="font-display text-2xl sm:text-3xl font-medium text-ink-light leading-relaxed italic mb-12 max-w-xl">
                For those who stutter, repeat, prolong, or pause — your voice has a unique rhythm.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-6">
                <Link 
                  href="/practice"
                  className="group relative inline-flex justify-center items-center px-10 py-5 bg-ink text-paper text-sm font-mono tracking-wider uppercase font-semibold overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-copper translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.21,0.47,0.32,0.98]" />
                  <span className="relative z-10 flex items-center gap-3">
                    Enter the Workspace
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </div>

            <motion.div variants={fadeIn} className="flex justify-center md:justify-end items-center relative">
              <div className="absolute inset-0 bg-gradient-radial from-paper-warm to-transparent blur-3xl opacity-50 dark:opacity-20" />
              <div className="relative w-full max-w-[280px] aspect-square sm:max-w-[320px] md:max-w-[360px] animate-breathe drop-shadow-2xl">
                <Image
                  src="/VoiceScribe.png"
                  alt="VoiceScribe Illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Accessibility Promise */}
        <section className="bg-paper-warm border-y border-rule py-24 sm:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="mx-auto max-w-4xl px-6 sm:px-8 text-center"
          >
            <span className="font-mono text-xs text-sage font-bold tracking-widest uppercase block mb-6">Our Promise</span>
            <h3 className="font-display text-4xl sm:text-5xl font-bold text-ink mb-10 leading-tight">
              We reject the idea that stuttering is a failure of communication.
            </h3>
            <p className="text-xl sm:text-2xl text-ink-light font-display italic leading-relaxed">
              Traditional tools flag stuttered words like spelling mistakes. VoiceScribe was built from the ground up to offer an alternative: a private sanctuary where speech blocks, repetitions, and prolongations are visualized with dignity, allowing you to reflect without feeling judged.
            </p>
          </motion.div>
        </section>

        {/* How VoiceScribe Works / Experience */}
        <section className="py-24 sm:py-40 mx-auto max-w-5xl px-6 sm:px-8">
          <div className="mb-20">
            <h3 className="font-display text-4xl font-bold text-ink mb-4">The Experience</h3>
            <div className="w-24 h-px bg-copper" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group"
            >
              <div className="mb-8 overflow-hidden bg-paper-warm border border-rule aspect-[4/3] flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-paper opacity-50 z-10" />
                 <div className="font-mono text-[10px] text-ink-faint tracking-widest uppercase absolute top-4 left-4 z-20">Step 01</div>
                 <div className="w-16 h-16 rounded-full border border-copper flex items-center justify-center animate-gentle-pulse">
                   <div className="w-4 h-4 rounded-full bg-copper" />
                 </div>
              </div>
              <h4 className="font-display text-2xl font-bold text-ink mb-3 group-hover:text-copper transition-colors">1. Practice Studio</h4>
              <p className="text-ink-light text-[15px] leading-relaxed">
                Enter a quiet, warm paper workspace. Zero setups, no time pressure. Record your voice locally, fostering a steady breathing rhythm.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group"
            >
              <div className="mb-8 overflow-hidden bg-paper-warm border border-rule aspect-[4/3] flex items-center justify-center relative p-8 text-center">
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-paper opacity-50 z-10" />
                 <div className="font-mono text-[10px] text-ink-faint tracking-widest uppercase absolute top-4 left-4 z-20">Step 02</div>
                 <p className="font-display text-xl z-20 relative">
                   Your speech, <span className="annotation-repetition">visualised</span> with care.
                 </p>
              </div>
              <h4 className="font-display text-2xl font-bold text-ink mb-3 group-hover:text-copper transition-colors">2. Living Transcript</h4>
              <p className="text-ink-light text-[15px] leading-relaxed">
                Speech is mapped as a fluid artistic medium. Dysfluencies appear gracefully as typographic annotations rather than glaring red warnings.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group"
            >
              <div className="mb-8 overflow-hidden bg-paper-warm border border-rule aspect-[4/3] flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-paper opacity-50 z-10" />
                 <div className="font-mono text-[10px] text-ink-faint tracking-widest uppercase absolute top-4 left-4 z-20">Step 03</div>
                 <div className="flex items-end gap-2 h-16 z-20">
                   <motion.div initial={{ height: '30%' }} whileInView={{ height: '70%' }} className="w-3 bg-rule" transition={{ duration: 1 }} />
                   <motion.div initial={{ height: '40%' }} whileInView={{ height: '50%' }} className="w-3 bg-rule" transition={{ duration: 1, delay: 0.1 }} />
                   <motion.div initial={{ height: '20%' }} whileInView={{ height: '90%' }} className="w-3 bg-copper" transition={{ duration: 1, delay: 0.2 }} />
                   <motion.div initial={{ height: '60%' }} whileInView={{ height: '40%' }} className="w-3 bg-rule" transition={{ duration: 1, delay: 0.3 }} />
                 </div>
              </div>
              <h4 className="font-display text-2xl font-bold text-ink mb-3 group-hover:text-copper transition-colors">3. Progress Dashboard</h4>
              <p className="text-ink-light text-[15px] leading-relaxed">
                Review your journey through clinical-warmth observations and paragraph-style insights, moving away from gamified checkmarks.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Technology Architecture & Research */}
        <section className="bg-paper-deep py-24 sm:py-32 border-t border-rule">
          <div className="mx-auto max-w-5xl px-6 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="font-display text-3xl font-bold text-ink mb-6">Research & Effectiveness</h3>
                <p className="text-ink-light mb-6 text-[15px] leading-relaxed">
                  Deliberate, unpressured speech practice has been shown to reduce communication-related anxiety. VoiceScribe creates a low-stakes environment, allowing individuals to habituate to their own speech patterns.
                </p>
                <p className="text-ink-light mb-6 text-[15px] leading-relaxed">
                  By reviewing transcriptions thoughtfully, users can identify secondary behaviors and specific dysfluency contexts without the urgency of live social interaction.
                </p>
                <p className="font-mono text-[10px] text-ink-muted tracking-wider uppercase border-t border-rule pt-4 mt-8">
                  Note: VoiceScribe is a tool for self-guided practice, not a replacement for clinical speech-language therapy.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="font-display text-3xl font-bold text-ink mb-6">Technology Pipeline</h3>
                
                <div className="flex flex-col gap-4 font-mono text-[11px] tracking-wider uppercase">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded border border-rule flex items-center justify-center text-ink-light bg-paper">01</div>
                    <div className="flex-grow border border-rule p-4 bg-paper relative overflow-hidden group">
                      <div className="absolute inset-0 bg-copper/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                      Browser Audio Capture
                    </div>
                  </div>
                  <div className="w-px h-4 bg-rule ml-[15px]" />
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded border border-copper text-copper flex items-center justify-center bg-paper">02</div>
                    <div className="flex-grow border border-copper/30 p-4 bg-paper relative overflow-hidden group shadow-[0_0_15px_rgba(176,132,91,0.1)]">
                      <div className="absolute inset-0 bg-copper/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                      Gemini 2.5 Analysis Engine
                    </div>
                  </div>
                  <div className="w-px h-4 bg-rule ml-[15px]" />
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded border border-rule flex items-center justify-center text-ink-light bg-paper">03</div>
                    <div className="flex-grow border border-rule p-4 bg-paper relative overflow-hidden group">
                      <div className="absolute inset-0 bg-copper/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                      Dysfluency Detection & Local SQLite
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 sm:py-32 mx-auto max-w-3xl px-6 sm:px-8">
          <h3 className="font-display text-4xl font-bold text-ink mb-16 text-center">Frequently Asked Questions</h3>
          
          <div className="space-y-12">
            {[
              { q: "Is my voice data stored in the cloud?", a: "No. Your voice audio is processed ephemerally. Only the text transcript and the structural analysis of your speech patterns are saved, and these reside entirely within your local browser database. Complete privacy." },
              { q: "Does this replace my speech therapist?", a: "VoiceScribe is designed as an elegant supplement to formal therapy. It provides a sanctuary for daily practice and reflection, rather than medical diagnosis or clinical correction plans." },
              { q: "How does the AI detect dysfluencies?", a: "We utilize advanced natural language processing via the Gemini engine. It is specifically prompted to recognize linguistic structures typical of repetitions, blocks, and prolongations without penalizing the speaker." }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                <h4 className="font-display text-2xl font-bold text-ink mb-3 group-hover:text-copper transition-colors">{faq.q}</h4>
                <p className="text-ink-light leading-relaxed">{faq.a}</p>
                <div className="h-px bg-rule mt-12 w-12 group-hover:w-full transition-all duration-700 ease-out" />
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Premium Footer */}
      <footer className="bg-ink text-paper py-16 sm:py-24 border-t border-ink-light">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-paper mb-6">
                Voice<em className="not-italic font-bold text-copper">Scribe</em>
              </h2>
              <p className="text-ink-faint font-display italic text-lg max-w-sm">
                Centering the dignity of human speech. A private sanctuary built with care for people who stutter.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 font-mono text-[11px] tracking-wider uppercase">
              <span className="text-ink-muted mb-2">Product</span>
              <Link href="/practice" className="text-paper hover:text-copper transition-colors">Workspace</Link>
              <span className="text-paper hover:text-copper transition-colors cursor-pointer">Manifesto</span>
              <span className="text-paper hover:text-copper transition-colors cursor-pointer">Accessibility</span>
            </div>

            <div className="flex flex-col gap-4 font-mono text-[11px] tracking-wider uppercase">
              <span className="text-ink-muted mb-2">Legal</span>
              <span className="text-ink-faint hover:text-paper transition-colors cursor-pointer">Privacy Policy</span>
              <span className="text-ink-faint hover:text-paper transition-colors cursor-pointer">Terms of Service</span>
              <span className="text-ink-faint hover:text-paper transition-colors cursor-pointer">Data Ownership</span>
            </div>
          </div>
          
          <div className="pt-8 border-t border-ink-light flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <p className="font-mono text-[10px] tracking-widest text-ink-muted uppercase">
              © 2026 VoiceScribe. All rights reserved.
            </p>
            <p className="font-mono text-[9px] tracking-widest text-ink-faint max-w-md text-left sm:text-right leading-relaxed uppercase">
              Medical Disclaimer: Not intended for diagnosis or clinical treatment. Designed for personal reflection.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
