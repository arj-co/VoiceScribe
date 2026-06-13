'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import RecordingStudio from '@/components/app/RecordingStudio';
import { MODES } from '@/lib/app/modeConfig';
import { PracticeMode, WordToken } from '@/types/app';

export default function PracticePage() {
  const router = useRouter();
  const params = useParams();
  const mode = params.mode as PracticeMode;

  const [currentPromptIndex, setCurrentPromptIndex] = useState<number>(0);
  const [isAnalysing, setIsAnalysing] = useState<boolean>(false);

  // Custom mode state
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [customReady, setCustomReady] = useState<boolean>(false);
  const [customInputMode, setCustomInputMode] = useState<'text' | 'paste'>('text');

  const modeConfig = MODES.find((m) => m.id === mode);

  if (!modeConfig) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-paper text-ink p-6">
        <h2 className="font-display text-xl font-bold mb-4">Mode not found</h2>
        <button
          onClick={() => router.push('/app')}
          className="px-7 py-3 rounded-full bg-ink text-paper font-display text-xs uppercase tracking-widest hover:bg-sage transition-colors duration-300 cursor-pointer"
        >
          Back
        </button>
      </div>
    );
  }

  const currentPrompt =
    mode === 'custom'
      ? customPrompt
      : modeConfig.prompts && modeConfig.prompts.length > 0
        ? modeConfig.prompts[currentPromptIndex]
        : "Speak about anything you'd like to practice.";

  const handleAnalyseReady = (words: WordToken[], rawText: string, duration: number) => {
    setIsAnalysing(true);
    sessionStorage.setItem('voicescribe_pending_session', JSON.stringify({
      words, rawText, duration, mode, prompt: currentPrompt,
    }));
    router.push('/app/results');
  };

  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      {/* TOP BAR */}
      <header className="flex justify-between items-center px-6 sm:px-10 border-b border-rule-faint bg-paper/90 backdrop-blur-md h-14">
        <button onClick={() => router.push('/')} className="flex items-center gap-2 group">
          <span className="w-[7px] h-[7px] rounded-full bg-sage group-hover:scale-110 transition-transform duration-300" />
          <span className="font-display text-[15px] font-semibold tracking-tight text-ink">
            Voice<span className="text-sage">Scribe</span>
          </span>
        </button>
        <button
          onClick={() => router.push('/app')}
          className="group flex items-center gap-2 px-4 py-1.5 bg-ink text-paper font-mono text-[10px] tracking-widest uppercase font-bold rounded-full overflow-hidden relative cursor-pointer"
        >
          <span className="absolute inset-0 bg-sage translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[0.21,0.47,0.32,0.98]" />
          <svg className="relative z-10 w-3 h-3 rotate-180 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span className="relative z-10">Back</span>
        </button>
      </header>

      {/* PROMPT PILLS — non-custom modes */}
      {mode !== 'custom' && modeConfig.prompts && modeConfig.prompts.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 py-4 px-8 border-b border-rule bg-paper-warm">
          {modeConfig.prompts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPromptIndex(idx)}
              disabled={isAnalysing}
              className={`px-4 py-1.5 rounded-full text-[11px] font-display uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                idx === currentPromptIndex
                  ? 'bg-ink text-paper'
                  : 'bg-paper-deep text-ink-muted hover:bg-rule hover:text-ink border border-rule'
              }`}
            >
              Prompt {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* MAIN */}
      <main className="flex-1 py-12 flex flex-col justify-center">
        {/* CUSTOM MODE — setup card */}
        {mode === 'custom' && !customReady ? (
          <div className="max-w-xl mx-auto w-full px-6">
            <div className="bg-paper-warm border border-rule rounded-2xl p-8">
              <p className="text-[11px] font-display uppercase tracking-[0.15em] text-ink-muted mb-3">
                Custom Mode
              </p>
              <h2 className="font-display text-2xl font-bold text-ink mb-2">Set your prompt</h2>
              <p className="text-sm text-ink-muted mb-7">
                Type a topic, paste a script, or describe what you want to practice.
              </p>

              {/* Tabs */}
              <div className="flex gap-2 mb-5">
                {(['text', 'paste'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCustomInputMode(tab)}
                    className={`px-4 py-2 rounded-full text-[11px] font-display uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                      customInputMode === tab
                        ? 'bg-ink text-paper'
                        : 'bg-paper-deep text-ink-muted hover:bg-rule border border-rule'
                    }`}
                  >
                    {tab === 'text' ? 'Type a prompt' : 'Paste script'}
                  </button>
                ))}
              </div>

              <textarea
                className={`w-full bg-paper border border-rule rounded-xl p-4 text-sm text-ink resize-none focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all placeholder:text-ink-ghost ${
                  customInputMode === 'paste' ? 'min-h-40' : 'min-h-24'
                }`}
                placeholder={
                  customInputMode === 'text'
                    ? 'e.g. Explain the importance of renewable energy to a general audience'
                    : 'Paste your speech, essay, or script here...'
                }
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
              />

              {customInputMode === 'paste' && (
                <p className="text-[11px] text-ink-ghost mt-2 font-display uppercase tracking-widest">
                  Stays private — only sent to Gemini for analysis
                </p>
              )}

              <button
                onClick={() => setCustomReady(true)}
                disabled={customPrompt.trim().length < 10}
                className={`mt-6 w-full rounded-full py-3 font-display text-xs uppercase tracking-widest transition-all duration-300 ${
                  customPrompt.trim().length >= 10
                    ? 'bg-ink text-paper hover:bg-sage cursor-pointer'
                    : 'bg-rule text-ink-ghost cursor-not-allowed'
                }`}
              >
                Start Practising →
              </button>
            </div>
          </div>
        ) : mode === 'custom' && customReady ? (
          <div className="w-full flex flex-col items-center">
            <button
              onClick={() => setCustomReady(false)}
              className="group text-xs font-display uppercase tracking-widest text-ink-muted hover:text-ink transition-colors duration-200 flex items-center gap-2 mb-6 cursor-pointer"
            >
              <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span>
              <span>Change prompt</span>
            </button>
            <RecordingStudio
              apiKey={process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY || ''}
              mode={mode}
              prompt={customPrompt}
              onAnalyseReady={handleAnalyseReady}
              isAnalysing={isAnalysing}
            />
          </div>
        ) : (
          <RecordingStudio
            apiKey={process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY || ''}
            mode={mode}
            prompt={currentPrompt}
            onAnalyseReady={handleAnalyseReady}
            isAnalysing={isAnalysing}
          />
        )}
      </main>
    </div>
  );
}
