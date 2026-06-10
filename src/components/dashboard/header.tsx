"use client";

import Image from "next/image";

export function Header() {
  return (
    <header className="pt-12 pb-8 sm:pt-16 sm:pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="max-w-2xl">
          {/* Wordmark */}
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ink leading-[1.1]">
            Voice<em className="not-italic font-extrabold text-copper">Scribe</em>
          </h1>

          {/* Tagline — set like a book subtitle */}
          <p className="mt-3 text-ink-light text-base sm:text-lg font-medium leading-relaxed">
            A practice space for your voice.
            <br className="hidden sm:block" />
            <span className="text-ink-muted">
              Speak freely. See clearly. Grow gently.
            </span>
          </p>
        </div>

        {/* Mascot element — clean rectangular image on the right */}
        <div className="flex-shrink-0 flex justify-center sm:justify-end items-center">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36">
            <Image
              src="/VoiceScribe.png"
              alt="VoiceScribe Illustration"
              fill
              sizes="(max-width: 640px) 112px, 144px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Thin editorial rule */}
      <div className="mt-8 sm:mt-10 editorial-rule" />
    </header>
  );
}
