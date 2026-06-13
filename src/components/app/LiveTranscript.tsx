'use client';

import { useEffect, useRef } from 'react';
import { WordToken } from '@/types/app';

interface LiveTranscriptProps {
  words: WordToken[];
  isRecording: boolean;
}

export default function LiveTranscript({ words, isRecording }: LiveTranscriptProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [words]);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="min-h-32 max-h-56 overflow-y-auto rounded-2xl p-5 bg-paper-warm border border-rule text-left transition-all"
      >
        {words.length === 0 && !isRecording && (
          <div className="flex items-center justify-center h-full min-h-[96px]">
            <p className="text-ink-ghost italic text-sm font-body">Your speech will appear here...</p>
          </div>
        )}

        {words.length === 0 && isRecording && (
          <div className="flex items-center justify-center h-full min-h-[96px]">
            <div className="flex items-center gap-2 text-ink-muted text-sm font-display uppercase tracking-widest">
              <span>Listening</span>
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sage animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-sage animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-sage animate-bounce [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        )}

        {words.length > 0 && (
          <p className="text-ink text-sm leading-loose">
            {words.map((word, index) => {
              if (word.type === 'pause') {
                return (
                  <span
                    key={index}
                    className="text-[10px] font-display uppercase tracking-widest bg-amber-100 text-amber-700 border border-amber-200 rounded px-1.5 mx-1 inline-block align-middle"
                  >
                    pause
                  </span>
                );
              }

              const stylingMap: Record<string, string> = {
                filler: 'bg-purple-100 text-purple-700 border border-purple-200 rounded px-0.5 font-medium',
                repetition: 'bg-red-100 text-red-700 border border-red-200 rounded px-0.5 font-medium underline decoration-dotted',
                prolongation: 'bg-orange-100 text-orange-700 border border-orange-200 rounded px-0.5 font-medium italic',
              };

              const styling = stylingMap[word.type] ?? '';
              return (
                <span key={index} className={styling ? `${styling} mr-1` : 'mr-1'}>
                  {word.word}
                </span>
              );
            })}
          </p>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 items-center justify-center mt-3">
        {[
          { label: 'Pause', color: 'bg-amber-400' },
          { label: 'Filler', color: 'bg-purple-400' },
          { label: 'Repetition', color: 'bg-red-400' },
          { label: 'Prolongation', color: 'bg-orange-400' },
        ].map(({ label, color }) => (
          <span key={label} className="flex items-center gap-1.5 text-[11px] font-display uppercase tracking-widest text-ink-ghost">
            <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
