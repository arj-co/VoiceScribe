"use client";

export function PracticeArea() {
  return (
    <section className="py-6 sm:py-8">
      <div className="flex flex-col items-center text-center">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted font-bold mb-6">
          When you&apos;re ready
        </p>

        {/* Record button */}
        <div className="relative group mb-6">
          <button
            className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border-2 border-copper bg-copper-wash shadow-[0_0_24px_rgba(160,112,74,0.12)] transition-all duration-500 hover:bg-copper-faint hover:border-copper-light hover:shadow-[0_0_40px_rgba(160,112,74,0.22)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-4 focus-visible:ring-offset-paper animate-breathe"
            aria-label="Begin recording"
          >
            <div className="h-4 w-4 rounded-full bg-copper transition-transform duration-500 group-hover:scale-125" />
          </button>
        </div>

        <p className="font-display text-xl sm:text-2xl text-ink font-semibold italic mb-4">
          Tap to begin speaking
        </p>

        <div className="flex items-center gap-5 text-sm">
          <button
            disabled
            className="text-ink-faint cursor-not-allowed font-mono text-xs tracking-wider uppercase font-semibold"
          >
            Stop
          </button>
          <span className="text-rule font-bold">·</span>
          <button className="text-ink hover:text-copper transition-colors duration-300 cursor-pointer font-mono text-xs tracking-wider uppercase font-semibold">
            Upload a recording
          </button>
        </div>

        <div className="mt-8 w-full max-w-sm">
          <div className="flex items-center justify-between font-mono text-[10px] text-ink-muted tracking-widest uppercase font-semibold">
            <span>Duration — : —</span>
            <span>Not recording</span>
          </div>
          <div className="mt-3 flex items-center justify-center gap-[2px] h-6">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="w-[1.5px] rounded-full bg-rule"
                style={{
                  height: `${Math.max(2, Math.sin(i * 0.3) * 6 + 3)}px`,
                  opacity: 0.5 + 0.5 * Math.abs(Math.sin(i * 0.3)),
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
