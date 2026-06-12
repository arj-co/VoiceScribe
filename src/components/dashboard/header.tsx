"use client";


export function Header() {
  return (
    <header className="pt-8 pb-5 sm:pt-10 sm:pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="max-w-xl">
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink leading-[1.1]">
            Your Workspace
          </h1>
          <p className="mt-1.5 text-ink-muted text-sm font-medium leading-relaxed">
            Speak freely. See clearly. Grow gently.
          </p>
        </div>
      </div>
      <div className="mt-6 editorial-rule" />
    </header>
  );
}
