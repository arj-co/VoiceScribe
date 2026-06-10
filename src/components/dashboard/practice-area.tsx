"use client";

export function PracticeArea() {
  return (
    <section className="py-8 sm:py-12">
      <div className="flex flex-col items-center text-center">
        {/* The invitation */}
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted font-bold mb-8">
          When you&apos;re ready
        </p>

        {/* Record — a calm, warm circle */}
        <div className="relative group mb-8">
          <button
            className="relative flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-full border-2 border-copper bg-copper-wash transition-all duration-500 hover:bg-copper-faint hover:border-copper-light cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-4 focus-visible:ring-offset-paper animate-breathe"
            aria-label="Begin recording"
          >
            {/* Inner circle with gentle breathing */}
            <div className="h-5 w-5 rounded-full bg-copper transition-transform duration-500 group-hover:scale-125" />
          </button>
        </div>

        <p className="font-display text-2xl sm:text-3xl text-ink font-semibold italic mb-6">
          Tap to begin speaking
        </p>

        {/* Secondary actions */}
        <div className="flex items-center gap-6 text-sm">
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

        {/* Status line */}
        <div className="mt-10 w-full max-w-md">
          <div className="flex items-center justify-between font-mono text-[11px] text-ink-muted tracking-widest uppercase font-semibold">
            <span>Duration — : —</span>
            <span>Not recording</span>
          </div>
          {/* Subtle resting waveform */}
          <div className="mt-4 flex items-center justify-center gap-[2px] h-8">
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                className="w-[1.5px] rounded-full bg-rule"
                style={{
                  height: `${Math.max(2, Math.sin(i * 0.3) * 8 + 4)}px`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
