'use client';

import { useRouter } from 'next/navigation';
import { MODES } from '@/lib/app/modeConfig';
import { PracticeMode } from '@/types/app';

const MODE_LABELS: Record<PracticeMode, string> = {
  'job-interview': 'JOB INTERVIEW',
  'presentation': 'PRESENTATION',
  'custom': 'CUSTOM',
};

const MODE_DESCRIPTIONS: Record<PracticeMode, string> = {
  'job-interview': 'Answer common interview questions with clarity and confidence.',
  'presentation': 'Practise delivering structured talks and pitches.',
  'custom': 'Bring your own topic, script, or question.',
};

const MODE_ICONS: Record<PracticeMode, string> = {
  'job-interview': '◈',
  'presentation': '◉',
  'custom': '◌',
};

export default function ModeSelector() {
  const router = useRouter();

  const handleNavigate = (id: PracticeMode) => {
    router.push(`/app/practice/${id}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 pb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {MODES.map((mode, index) => (
          <button
            key={mode.id}
            onClick={() => handleNavigate(mode.id)}
            className="group relative text-left p-7 bg-paper-warm border border-rule rounded-2xl cursor-pointer transition-all duration-300 hover:bg-paper-deep hover:border-ink hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper"
          >
            {/* Number label */}
            <span className="absolute top-6 right-6 text-[11px] font-display text-ink-ghost tracking-widest">
              0{index + 1}
            </span>

            {/* Icon */}
            <span className="block text-2xl text-ink-muted mb-5 transition-colors duration-300 group-hover:text-copper">
              {MODE_ICONS[mode.id]}
            </span>

            {/* Title */}
            <h3 className="font-display font-bold text-xs uppercase tracking-[0.15em] text-ink-muted mb-2 transition-colors duration-300 group-hover:text-ink">
              {MODE_LABELS[mode.id]}
            </h3>

            {/* Description */}
            <p className="text-sm text-ink-muted leading-relaxed mb-8">
              {MODE_DESCRIPTIONS[mode.id]}
            </p>

            {/* Prompt count */}
            <div className="absolute bottom-6 left-7 right-7 flex justify-between items-center">
              <span className="text-[11px] font-display uppercase tracking-widest text-ink-ghost">
                {mode.id === 'custom' ? 'Your content' : `${mode.prompts.length} prompts`}
              </span>
              <span className="text-ink-ghost text-sm transition-all duration-300 group-hover:translate-x-1 group-hover:text-copper">
                →
              </span>
            </div>

            {/* Bottom border accent on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-copper rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        ))}
      </div>
    </div>
  );
}
