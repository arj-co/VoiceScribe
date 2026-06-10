import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper flex flex-col justify-between">
      {/* Editorial Navigation */}
      <header className="mx-auto max-w-5xl w-full px-6 sm:px-8 pt-12 flex justify-between items-baseline">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          Voice<em className="not-italic font-bold text-copper">Scribe</em>
        </h1>
        <nav className="flex gap-6 font-mono text-[11px] tracking-wider uppercase text-ink-muted">
          <span className="text-ink">Home</span>
          <Link href="/practice" className="hover:text-copper transition-colors">
            Workspace
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-5xl w-full px-6 sm:px-8 py-16 sm:py-24 flex-grow flex flex-col justify-center">
        <div className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-copper font-semibold mb-6">
            A Thoughtful Speech Space
          </p>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.15] mb-8">
            Centering the dignity of human speech.
          </h2>
          <p className="font-display text-2xl sm:text-3xl font-medium text-ink-light leading-relaxed italic mb-10">
            For those who stutter, repeat, prolong, or pause — your voice has a unique rhythm. VoiceScribe is a quiet, premium practice space designed to help you listen, reflect, and find confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/practice"
              className="inline-flex justify-center items-center px-8 py-4 bg-ink text-paper text-sm font-mono tracking-wider uppercase font-semibold hover:bg-copper transition-all duration-300 shadow-sm"
            >
              Enter the Workspace
            </Link>
            <a 
              href="#philosophy"
              className="inline-flex justify-center items-center px-8 py-4 border border-rule text-ink text-sm font-mono tracking-wider uppercase font-semibold hover:border-ink transition-all duration-300"
            >
              Read Our Philosophy
            </a>
          </div>
        </div>

        {/* Feature Grid / Editorial Columns */}
        <section id="philosophy" className="mt-24 sm:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 border-t border-rule pt-12">
          <div>
            <span className="font-mono text-xs text-copper font-bold tracking-widest uppercase block mb-3">01 / The Transcript</span>
            <h3 className="font-display text-2xl font-bold text-ink mb-4">Typographic visualization</h3>
            <p className="text-ink-light text-[15px] leading-relaxed">
              We do not treat dysfluency as an error. Your speech is visualized through elegant, non-intrusive typography — double underlines for repetitions, spaced italics for prolongations, and simple rules for pauses.
            </p>
          </div>
          <div>
            <span className="font-mono text-xs text-copper font-bold tracking-widest uppercase block mb-3">02 / Observations</span>
            <h3 className="font-display text-2xl font-bold text-ink mb-4">Clinical warmth</h3>
            <p className="text-ink-light text-[15px] leading-relaxed">
              Ditching cold SaaS charts and harsh red warnings, VoiceScribe offers gentle observations. View statistics presented cleanly, like a premium print publication, paired with thoughtful, constructive feedback.
            </p>
          </div>
          <div>
            <span className="font-mono text-xs text-copper font-bold tracking-widest uppercase block mb-3">03 / Privacy</span>
            <h3 className="font-display text-2xl font-bold text-ink mb-4">A private sanctuary</h3>
            <p className="text-ink-light text-[15px] leading-relaxed">
              Your voice remains yours. All data is stored locally in your workspace, providing a secure, quiet environment for daily practice, self-reflection, and therapeutic speech exercises.
            </p>
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
