import { Header } from "@/components/dashboard/header";
import { PracticeArea } from "@/components/dashboard/practice-area";
import { TranscriptPanel } from "@/components/dashboard/transcript-panel";
import { AnalysisPanel } from "@/components/dashboard/analysis-panel";
import { ProgressPanel } from "@/components/dashboard/progress-panel";
import { SessionSummary } from "@/components/dashboard/session-summary";
import Link from "next/link";
import Image from "next/image";

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-paper flex flex-col justify-between">
      {/* Navigation header matching landing page */}
      <header className="mx-auto max-w-5xl w-full px-6 sm:px-8 pt-12 flex justify-between items-center">
        <Link href="/" className="font-display text-3xl font-semibold tracking-tight text-ink hover:text-copper transition-colors">
          Voice<em className="not-italic font-bold text-copper">Scribe</em>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex gap-6 font-mono text-[11px] tracking-wider uppercase text-ink-muted">
            <Link href="/" className="hover:text-copper transition-colors">
              Home
            </Link>
            <span className="text-ink font-bold">Workspace</span>
          </nav>
          <div className="relative h-10 w-10 rounded-full overflow-hidden border border-rule bg-cream p-0.5 shadow-sm flex-shrink-0">
            <Image
              src="/VoiceScribe.png"
              alt="VoiceScribe Mascot"
              fill
              className="object-contain p-0.5 rounded-full"
              priority
            />
          </div>
        </div>
      </header>

      {/* Main Workspace — expanded to max-w-5xl (wider, less horizontal gap) */}
      <main className="mx-auto max-w-5xl w-full px-6 sm:px-8 flex-grow">
        {/* Workspace Intro */}
        <Header />

        {/* Practice Area — centered invitation */}
        <PracticeArea />

        <div className="editorial-rule my-6" />

        {/* Live Transcript — the hero */}
        <section className="py-10 sm:py-14">
          <TranscriptPanel />
        </section>

        <div className="editorial-rule my-6" />

        {/* Session Observations — metrics table */}
        <section className="py-10 sm:py-14">
          <AnalysisPanel />
        </section>

        <div className="editorial-rule my-6" />

        {/* Two-column: Progress + Reflections */}
        <section className="py-10 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
            <ProgressPanel />
            <SessionSummary />
          </div>
        </section>
      </main>

      {/* Footer Colophon */}
      <footer className="mx-auto max-w-5xl w-full px-6 sm:px-8 py-10 border-t border-rule-light flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
        <p className="font-display italic text-sm">Built with care and respect for people who stutter.</p>
        <p className="font-mono tracking-wider uppercase text-[10px]">VoiceScribe © 2026</p>
      </footer>
    </div>
  );
}
