import { Header } from "@/components/dashboard/header";
import { PracticeArea } from "@/components/dashboard/practice-area";
import { TranscriptPanel } from "@/components/dashboard/transcript-panel";
import { AnalysisPanel } from "@/components/dashboard/analysis-panel";
import { ProgressPanel } from "@/components/dashboard/progress-panel";
import { SessionSummary } from "@/components/dashboard/session-summary";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-paper flex flex-col justify-between selection:bg-copper-faint selection:text-ink transition-colors duration-500">
      {/* Navigation header matching landing page */}
      <header className="mx-auto max-w-3xl w-full px-6 sm:px-8 pt-8 flex justify-between items-baseline">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-ink hover:text-copper transition-colors">
          Voice<em className="not-italic font-bold text-copper">Scribe</em>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex gap-5 font-mono text-[10px] tracking-wider uppercase text-ink-muted">
            <Link href="/" className="hover:text-copper transition-colors">
              Home
            </Link>
            <span className="text-ink font-bold">Workspace</span>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-3xl w-full px-6 sm:px-8 flex-grow">
        <Header />
        <PracticeArea />
        <div className="editorial-rule my-4" />
        <section className="py-8"><TranscriptPanel /></section>
        <div className="editorial-rule my-4" />
        <section className="py-8"><AnalysisPanel /></section>
        <div className="editorial-rule my-4" />
        <section className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ProgressPanel />
            <SessionSummary />
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-3xl w-full px-6 sm:px-8 py-8 border-t border-rule-light flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-muted">
        <p className="font-display italic text-sm">Built with care and respect for people who stutter.</p>
        <p className="font-mono tracking-wider uppercase text-[10px]">VoiceScribe © 2026</p>
      </footer>
    </div>
  );
}
