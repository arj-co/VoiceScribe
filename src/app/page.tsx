"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-text-main flex flex-col font-sans selection:bg-panel transition-colors duration-300">
      
      {/* Navbar */}
      <header className="sticky top-0 w-full px-6 py-4 flex justify-between items-center z-50 bg-bg/80 backdrop-blur-md">
        <div className="font-bold text-lg tracking-tight">VoiceScribe</div>
        <div className="flex items-center gap-6">
          <Link href="/practice" className="text-sm font-medium hover:text-accent transition-colors">
            Sign In
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-grow w-full pb-32">
        
        {/* --- HERO: Product Showcase --- */}
        <section className="w-full max-w-7xl mx-auto px-6 pt-24 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Copy */}
          <div className="flex flex-col items-start gap-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Practice speaking.<br />
              <span className="text-text-muted">See what happens.</span>
            </h1>
            <p className="text-lg text-text-muted max-w-md leading-relaxed">
              A private, browser-based instrument built for people who stutter. Analyze your speech patterns in real-time, completely locally.
            </p>
            <Link 
              href="/practice"
              className="px-6 py-3 bg-text-main text-bg rounded-lg font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              Open VoiceScribe
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* Right: Actual Interface Mockup */}
          <div className="w-full rounded-xl border border-border bg-panel shadow-2xl overflow-hidden flex flex-col h-[400px] sm:h-[500px]">
            {/* Window Header */}
            <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-bg/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-text-muted bg-bg px-2 py-1 rounded border border-border">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Recording Session
              </div>
            </div>
            
            {/* Interface Body */}
            <div className="p-6 sm:p-8 flex-grow flex flex-col justify-center relative">
              <div className="font-sans text-2xl sm:text-3xl text-text-main leading-relaxed font-medium">
                I <span className="underline decoration-rep decoration-2 underline-offset-4">w-w-want</span> to talk 
                about the meeting. It went <span className="tracking-[0.2em] text-pro">wwwell</span>, but 
                <span className="font-bold border-l-2 border-block pl-1 ml-1">sometimes</span> I felt stuck.
              </div>

              {/* Data Overlays */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-6 left-6 right-6 flex items-end justify-between"
              >
                <div className="space-y-2">
                  <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Live Analysis</div>
                  <div className="flex gap-2">
                    <div className="px-2 py-1 rounded bg-bg text-text-main text-xs border border-border font-mono shadow-sm">
                      <span className="text-rep font-bold mr-1">R</span> Repetition
                    </div>
                    <div className="px-2 py-1 rounded bg-bg text-text-main text-xs border border-border font-mono shadow-sm">
                      <span className="text-pro font-bold mr-1">P</span> Prolongation
                    </div>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-bg border border-border flex items-center justify-center shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted">
                    <path d="M12 2v20M17 5v14M7 5v14M22 9v6M2 9v6" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SECTION 1: Live Transcript --- */}
        <section className="w-full max-w-7xl mx-auto px-6 py-32 flex flex-col items-center">
          <div className="text-center mb-16 max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">The Live Transcript</h2>
            <p className="text-text-muted">
              Watch your speech transform into structured data. Every repetition, prolongation, and block is visually categorized in real-time. Not decoration—clinical feedback.
            </p>
          </div>

          <div className="w-full max-w-4xl bg-panel border border-border rounded-xl p-8 sm:p-12 shadow-sm">
            <div className="text-2xl sm:text-4xl font-medium leading-[1.6] text-text-main">
              <span className="opacity-50">I</span>{" "}
              <span className="inline-flex flex-col relative">
                <span className="underline decoration-rep decoration-2 underline-offset-4">w-w-want</span>
                <span className="absolute -top-5 left-0 text-[9px] font-mono text-rep uppercase font-bold tracking-widest">Repetition</span>
              </span>{" "}
              <span className="opacity-50">to speak more confidently.</span>
              <br /><br />
              <span className="opacity-50">Sometimes my voice</span>{" "}
              <span className="inline-flex flex-col relative">
                <span className="tracking-[0.2em] text-pro">sssssstretches.</span>
                <span className="absolute -top-5 left-0 text-[9px] font-mono text-pro uppercase font-bold tracking-widest">Prolongation</span>
              </span>
              <br /><br />
              <span className="opacity-50">And occasionally it</span>{" "}
              <span className="inline-flex flex-col relative">
                <span className="font-bold border-l-2 border-block pl-1 ml-1">blocks.</span>
                <span className="absolute -top-5 left-0 text-[9px] font-mono text-block uppercase font-bold tracking-widest">Block</span>
              </span>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: Analysis Engine --- */}
        <section className="w-full bg-panel py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-4">Analysis Engine</h2>
              <p className="text-text-muted max-w-xl">
                Raw audio goes in. Structured cognitive insights come out. See exactly what patterns dominate your speech.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Raw Speech */}
              <div className="bg-bg border border-border rounded-xl p-8 shadow-sm">
                <div className="text-xs font-mono text-text-muted uppercase tracking-wider border-b border-border pb-4 mb-6">Input: Raw Audio</div>
                <div className="h-48 flex items-center justify-center border border-dashed border-border rounded-lg bg-panel/50">
                   <div className="flex items-center gap-1 opacity-50">
                     {[2, 4, 3, 6, 8, 12, 16, 12, 8, 5, 3, 2, 4].map((h, i) => (
                        <div key={i} className="w-1 bg-text-muted rounded-full" style={{ height: `${h * 4}px` }} />
                     ))}
                   </div>
                </div>
              </div>

              {/* Insights */}
              <div className="bg-bg border border-border rounded-xl p-8 shadow-sm flex flex-col">
                <div className="text-xs font-mono text-text-muted uppercase tracking-wider border-b border-border pb-4 mb-6">Output: Insights</div>
                
                <div className="space-y-4 flex-grow">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-panel">
                    <span className="font-medium text-sm text-rep">Repetitions</span>
                    <span className="font-mono text-xs font-bold">12 detected</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-panel">
                    <span className="font-medium text-sm text-pro">Prolongations</span>
                    <span className="font-mono text-xs font-bold">4 detected</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-panel">
                    <span className="font-medium text-sm text-block">Blocks</span>
                    <span className="font-mono text-xs font-bold">2 detected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: Progress Timeline --- */}
        <section className="w-full max-w-5xl mx-auto px-6 py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Track Your Reality</h2>
            <p className="text-text-muted">A personal speech journal mapping your fluency over time.</p>
          </div>

          <div className="relative border-l border-border ml-4 sm:ml-8 pl-8 space-y-16">
            
            {/* Month 1 */}
            <div className="relative">
              <div className="absolute w-3 h-3 rounded-full bg-border -left-[38px] top-1.5" />
              <div className="text-sm font-mono text-text-muted mb-2">Month 1</div>
              <div className="p-6 bg-panel border border-border rounded-lg shadow-sm">
                <p className="text-xl">
                  <span className="text-rep underline decoration-rep">I-I-I</span> wanted to <span className="border-l-2 border-block pl-1 ml-1 font-bold">say</span> that it <span className="text-pro tracking-widest">wwwas</span> difficult.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="px-2 py-1 bg-bg border border-border rounded text-[10px] font-mono text-rep">High Dysfluency</span>
                </div>
              </div>
            </div>

            {/* Month 2 */}
            <div className="relative">
              <div className="absolute w-3 h-3 rounded-full bg-border -left-[38px] top-1.5" />
              <div className="text-sm font-mono text-text-muted mb-2">Month 2</div>
              <div className="p-6 bg-panel border border-border rounded-lg shadow-sm">
                <p className="text-xl">
                  I wanted to <span className="border-l-2 border-block pl-1 ml-1 font-bold">say</span> that it was difficult.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="px-2 py-1 bg-bg border border-border rounded text-[10px] font-mono text-block">Moderate</span>
                </div>
              </div>
            </div>

            {/* Month 4 */}
            <div className="relative">
              <div className="absolute w-3 h-3 rounded-full bg-accent -left-[38px] top-1.5 shadow-[0_0_8px_rgba(58,100,115,0.5)] dark:shadow-[0_0_8px_rgba(142,197,214,0.5)]" />
              <div className="text-sm font-mono text-accent font-bold mb-2">Month 4</div>
              <div className="p-6 bg-bg border-2 border-accent rounded-lg shadow-md">
                <p className="text-xl font-medium">
                  I wanted to say that it was difficult.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="px-2 py-1 bg-panel border border-accent rounded text-[10px] font-mono text-accent font-bold">Fluency Found</span>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      <footer className="w-full bg-panel py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-text-muted uppercase tracking-wider">
          <div>© 2026 VoiceScribe. Built for dignity.</div>
          <div className="flex gap-6">
            <Link href="/practice" className="hover:text-text-main transition-colors">Enter Studio</Link>
            <span className="cursor-not-allowed opacity-50">Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
