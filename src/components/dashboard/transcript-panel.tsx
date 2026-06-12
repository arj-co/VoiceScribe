"use client";

import { mockTranscript, type TranscriptSegment } from "@/lib/mock-data";

function TranscriptWord({ segment }: { segment: TranscriptSegment }) {
  switch (segment.type) {
    case "text":
      return <span>{segment.content}</span>;

    case "repetition":
      return (
        <span
          className="annotation-repetition"
          title="Repetition"
        >
          {segment.content}
        </span>
      );

    case "prolongation":
      return (
        <span
          className="annotation-prolongation"
          title="Prolongation"
        >
          {segment.content}
        </span>
      );

    case "block":
      return (
        <span className="annotation-block" title="Block">
          {segment.content}
        </span>
      );

    case "pause":
      return (
        <span
          className="annotation-pause"
          title={`Pause · ${segment.duration}s`}
        />
      );

    case "long_pause":
      return (
        <span
          className="annotation-pause-long"
          title={`Long pause · ${segment.duration}s`}
        />
      );

    default:
      return <span>{segment.content}</span>;
  }
}

export function TranscriptPanel() {
  const hasTranscript = mockTranscript.length > 0;

  return (
    <section>
      {/* Section heading */}
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
          Transcript
        </h2>
        {hasTranscript && (
          <span className="font-mono text-[11px] text-ink-muted tracking-widest uppercase font-bold">
            Session 12 · Jun 8
          </span>
        )}
      </div>

      <div className="editorial-rule-fine mb-8" />

      {hasTranscript ? (
        <div>
          {/* The living transcript */}
          <blockquote className="font-display text-xl sm:text-2xl font-semibold leading-[1.6] text-ink tracking-[-0.01em]">
            {mockTranscript.map((segment, i) => (
              <TranscriptWord key={i} segment={segment} />
            ))}
          </blockquote>

          {/* Annotation key — like a footnote */}
          <div className="mt-12 pt-6 border-t border-rule-light">
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-muted font-bold mb-4">
              Annotation Key
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-light">
              <span className="flex items-center gap-2">
                <span className="annotation-repetition text-ink font-display text-lg font-bold">word</span>
                <span className="font-mono text-[11px] text-ink-muted font-semibold">Repetition</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="annotation-prolongation text-ink font-display text-lg font-bold">sound</span>
                <span className="font-mono text-[11px] text-ink-muted font-semibold">Prolongation</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="annotation-block text-ink font-display text-lg font-bold">word</span>
                <span className="font-mono text-[11px] text-ink-muted font-semibold">Block</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="annotation-pause" />
                <span className="font-mono text-[11px] text-ink-muted font-semibold">Pause</span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Empty state — like a blank page waiting */
        <div className="py-20 text-center">
          <p className="font-display text-3xl sm:text-4xl font-semibold italic text-ink-muted leading-snug">
            Your words will appear here,<br />
            exactly as you speak them.
          </p>
          <p className="mt-6 text-sm text-ink-light font-medium max-w-sm mx-auto">
            Begin a recording session to see your speech transcribed in
            real time, with gentle annotations marking moments of dysfluency.
          </p>
        </div>
      )}
    </section>
  );
}
