'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import RecordingStudio from '@/components/app/RecordingStudio';
import { MODES } from '@/lib/app/modeConfig';
import { PracticeMode, WordToken } from '@/types/app';
import useDeepgram from '@/hooks/useDeepgram';
import useWordProcessor from '@/hooks/useWordProcessor';

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

  // Custom mode recording states
  const { processWords, computeStats } = useWordProcessor();
  const [words, setWords] = useState<WordToken[]>([]);
  const [processedWords, setProcessedWords] = useState<WordToken[]>([]);
  const [rawText, setRawText] = useState<string>('');
  const [hasRecorded, setHasRecorded] = useState<boolean>(false);
  const [durationSeconds, setDurationSeconds] = useState<number>(0);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  const [micDenied, setMicDenied] = useState<boolean>(false);
  const [emptyTranscriptError, setEmptyTranscriptError] = useState<string | null>(null);

  const onWord = useCallback((word: WordToken) => {
    setWords((prev) => {
      const newWords = [...prev, word];
      setProcessedWords(processWords(newWords));
      return newWords;
    });
    setRawText((prev) => prev + word.word + ' ');
  }, [processWords]);

  const onTranscriptFinal = useCallback((finalWords: WordToken[]) => {
    if (recordingStartTime) {
      setDurationSeconds((Date.now() - recordingStartTime) / 1000);
    }
    if (finalWords.length === 0) {
      setEmptyTranscriptError('No speech detected. Please check your microphone and try again.');
      setHasRecorded(false);
      return;
    }
    setProcessedWords(processWords(finalWords));
    setHasRecorded(true);
    setEmptyTranscriptError(null);
  }, [recordingStartTime, processWords]);

  const { isRecording, startRecording, stopRecording, error: deepgramError } = useDeepgram({
    apiKey: process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY || '',
    onWord,
    onTranscriptFinal,
  });

  const handleMicClick = async () => {
    if (isAnalysing) return;
    if (isRecording) {
      stopRecording();
    } else {
      setWords([]);
      setProcessedWords([]);
      setRawText('');
      setHasRecorded(false);
      setDurationSeconds(0);
      setEmptyTranscriptError(null);
      setMicDenied(false);
      setRecordingStartTime(Date.now());
      try {
        await startRecording();
      } catch (err: unknown) {
        const domError = err as DOMException;
        if (domError?.name === 'NotAllowedError' || domError?.name === 'PermissionDeniedError') {
          setMicDenied(true);
        }
      }
    }
  };

  const stats = computeStats(processedWords);

  // Script token alignment computation
  const scriptTokens = useMemo(() => {
    const tokens: { word: string; paragraphIndex: number; tokenIndex: number }[] = [];
    const paras = customPrompt.split(/\n+/).filter((p) => p.trim().length > 0);
    let globalIdx = 0;
    paras.forEach((para, pIdx) => {
      const wordsInPara = para.trim().split(/\s+/);
      wordsInPara.forEach((word) => {
        tokens.push({
          word,
          paragraphIndex: pIdx,
          tokenIndex: globalIdx++,
        });
      });
    });
    return tokens;
  }, [customPrompt]);

  const alignedScript = useMemo(() => {
    const aligned = scriptTokens.map((t) => ({
      ...t,
      status: 'unspoken' as 'unspoken' | 'fluent' | 'repetition' | 'filler' | 'pause' | 'prolongation',
      insertedSpoken: [] as WordToken[],
    }));

    let sIdx = 0;
    let tIdx = 0;

    while (sIdx < processedWords.length && tIdx < aligned.length) {
      const sToken = processedWords[sIdx];
      const sNorm = sToken.word.toLowerCase().replace(/[^a-z0-9]/g, '');

      if (sToken.type === 'pause' || sToken.type === 'filler') {
        aligned[tIdx].insertedSpoken.push(sToken);
        sIdx++;
        continue;
      }

      let matchIdx = -1;
      for (let offset = 0; offset < 5; offset++) {
        const checkIdx = tIdx + offset;
        if (checkIdx < aligned.length) {
          const tNorm = aligned[checkIdx].word.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (tNorm === sNorm) {
            matchIdx = checkIdx;
            break;
          }
        }
      }

      if (matchIdx !== -1) {
        aligned[matchIdx].status = sToken.type === 'fluent' ? 'fluent' : sToken.type;
        tIdx = matchIdx + 1;
        sIdx++;
      } else {
        if (tIdx > 0) {
          const prevNorm = aligned[tIdx - 1].word.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (prevNorm === sNorm) {
            aligned[tIdx - 1].status = 'repetition';
          }
        }
        sIdx++;
      }
    }

    const trailingInserted: WordToken[] = [];
    while (sIdx < processedWords.length) {
      const sToken = processedWords[sIdx];
      if (sToken.type === 'pause' || sToken.type === 'filler') {
        trailingInserted.push(sToken);
      }
      sIdx++;
    }

    return {
      aligned,
      trailingInserted,
    };
  }, [scriptTokens, processedWords]);

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
        <button onClick={() => router.push('/')} className="flex items-center gap-2.5 group cursor-pointer">
          <span className="w-2.5 h-2.5 rounded-full bg-sage group-hover:scale-110 transition-transform duration-300" />
          <span className="font-display text-xl font-bold tracking-tight text-ink">
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
          <div className="w-full max-w-3xl mx-auto px-6 flex flex-col items-center gap-8">
            <button
              onClick={() => {
                if (isRecording) stopRecording();
                setCustomReady(false);
              }}
              className="group text-xs font-display uppercase tracking-widest text-ink-muted hover:text-ink transition-colors duration-200 flex items-center gap-2 mb-2 cursor-pointer self-start"
            >
              <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span>
              <span>Change script</span>
            </button>

            {/* Mic Denied UI */}
            {micDenied ? (
              <div className="w-full bg-paper-warm border border-rule rounded-2xl p-8 text-center">
                <p className="text-3xl mb-4">🎙️</p>
                <p className="font-display font-bold text-ink mb-2">Microphone access denied</p>
                <p className="text-sm text-ink-muted mb-6">
                  Allow microphone access in your browser settings and refresh.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-7 py-3 rounded-full bg-ink text-paper font-display text-xs uppercase tracking-widest hover:bg-sage transition-colors duration-300 cursor-pointer"
                >
                  Refresh Page
                </button>
              </div>
            ) : (
              <>
                {/* SCRIPT CARD */}
                <div className="w-full bg-paper-warm border border-rule rounded-2xl p-8 shadow-sm">
                  <span className="block text-[11px] font-display uppercase tracking-[0.15em] text-ink-muted mb-4 border-b border-rule pb-2">
                    Your Script
                  </span>
                  
                  <div className="text-left leading-relaxed text-base font-sans select-none max-h-96 overflow-y-auto pr-2">
                    {/* Map through paragraphs */}
                    {Object.entries(
                      alignedScript.aligned.reduce((acc, item) => {
                        if (!acc[item.paragraphIndex]) acc[item.paragraphIndex] = [];
                        acc[item.paragraphIndex].push(item);
                        return acc;
                      }, {} as Record<number, typeof alignedScript.aligned>)
                    ).map(([pIdx, items]) => (
                      <p key={pIdx} className="mb-6 font-display text-lg text-ink leading-loose">
                        {items.map((item, idx) => (
                          <span key={idx} className="inline-block mr-1.5">
                            {/* Inserted dysfluencies before this word */}
                            {item.insertedSpoken.map((sp, spIdx) => {
                              if (sp.type === 'pause') {
                                return (
                                  <span
                                    key={`pause-${spIdx}`}
                                    className="bg-amber-100 text-amber-700 border border-amber-200 rounded px-1.5 py-0.5 mx-1 text-[10px] font-mono uppercase tracking-widest inline-block align-middle animate-fade-in"
                                  >
                                    pause
                                  </span>
                                );
                              }
                              return (
                                <span
                                  key={`filler-${spIdx}`}
                                  className="bg-purple-100 text-purple-700 border border-purple-200 rounded px-1.5 py-0.5 mx-1 text-[10px] font-mono uppercase tracking-widest inline-block align-middle animate-fade-in"
                                >
                                  {sp.word}
                                </span>
                              );
                            })}

                            {/* The script word itself */}
                            <span
                              className={
                                item.status === 'unspoken'
                                  ? 'text-ink'
                                  : item.status === 'fluent'
                                    ? 'text-ink-ghost opacity-30 transition-all duration-300'
                                    : item.status === 'repetition'
                                      ? 'bg-red-100 text-red-700 border border-red-200 rounded px-1 font-medium underline decoration-dotted animate-fade-in'
                                      : item.status === 'prolongation'
                                        ? 'bg-orange-100 text-orange-700 border border-orange-200 rounded px-1 font-medium italic animate-fade-in'
                                        : item.status === 'filler'
                                          ? 'bg-purple-100 text-purple-700 border border-purple-200 rounded px-1 font-medium animate-fade-in'
                                          : 'bg-amber-100 text-amber-700 border border-amber-200 rounded px-1 font-medium animate-fade-in' // pause
                              }
                            >
                              {item.word}
                            </span>
                          </span>
                        ))}
                      </p>
                    ))}
                    
                    {/* Trailing inserted spoken elements */}
                    {alignedScript.trailingInserted.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-rule">
                        {alignedScript.trailingInserted.map((sp, spIdx) => (
                          <span
                            key={`trail-${spIdx}`}
                            className={
                              sp.type === 'pause'
                                ? 'bg-amber-100 text-amber-700 border border-amber-200 rounded px-1.5 py-0.5 mx-1 text-[10px] font-mono uppercase tracking-widest inline-block align-middle'
                                : 'bg-purple-100 text-purple-700 border border-purple-200 rounded px-1.5 py-0.5 mx-1 text-[10px] font-mono uppercase tracking-widest inline-block align-middle'
                            }
                          >
                            {sp.type === 'pause' ? 'pause' : sp.word}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* MIC BUTTON */}
                <div className="flex flex-col items-center gap-5">
                  <button
                    onClick={handleMicClick}
                    disabled={isAnalysing}
                    aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
                    className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage ${
                      isRecording
                        ? 'bg-sage text-paper shadow-xl scale-105'
                        : isAnalysing
                          ? 'bg-rule text-ink-ghost cursor-not-allowed'
                          : 'bg-ink text-paper hover:bg-sage hover:scale-105 shadow-lg'
                    }`}
                  >
                    {isRecording && (
                      <span className="absolute inset-0 rounded-full bg-sage animate-ping opacity-20" />
                    )}
                    <span className="text-3xl relative z-10">
                      {isRecording ? '⏹' : '🎙'}
                    </span>
                  </button>

                  {/* Status label */}
                  <div className="text-center">
                    {deepgramError ? (
                      <p className="text-xs font-display uppercase tracking-widest text-red-500">{deepgramError}</p>
                    ) : emptyTranscriptError ? (
                      <p className="text-xs font-display uppercase tracking-widest text-red-500">{emptyTranscriptError}</p>
                    ) : isRecording ? (
                      <p className="text-xs font-display uppercase tracking-[0.15em] text-sage flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse inline-block" />
                        Recording — read the script above
                      </p>
                    ) : hasRecorded ? (
                      <p className="text-xs font-display uppercase tracking-[0.15em] text-sage">
                        Recording complete
                      </p>
                    ) : (
                      <p className="text-xs font-display uppercase tracking-[0.15em] text-ink-muted">
                        Click to start reading
                      </p>
                    )}
                    <span className="block text-[10px] text-ink-ghost mt-1 font-display uppercase tracking-widest">
                      Powered by Deepgram
                    </span>
                  </div>
                </div>

                {/* STATS PILLS */}
                {(hasRecorded || processedWords.length > 0) && (
                  <div className="flex gap-2 flex-wrap justify-center">
                    {[
                      { label: 'Pauses', value: stats.pauses, color: 'bg-amber-100 text-amber-700 border-amber-200' },
                      { label: 'Fillers', value: stats.fillers, color: 'bg-purple-100 text-purple-700 border-purple-200' },
                      { label: 'Repetitions', value: stats.repetitions, color: 'bg-red-100 text-red-700 border-red-200' },
                      { label: 'Prolongations', value: stats.prolongations, color: 'bg-orange-100 text-orange-700 border-orange-200' },
                    ].map(({ label, value, color }) => (
                      <div
                        key={label}
                        className={`px-4 py-1.5 rounded-full border text-[11px] font-display uppercase tracking-widest ${color}`}
                      >
                        {value} {label}
                      </div>
                    ))}
                  </div>
                )}

                {/* REVIEW BANNER */}
                {hasRecorded && !isAnalysing && (
                  <div className="w-full bg-paper-warm border border-rule rounded-xl px-5 py-3 text-center">
                    <p className="text-[11px] font-display uppercase tracking-widest text-sage">
                      Recording complete — review your transcript then click Analyse
                    </p>
                  </div>
                )}

                {/* ANALYSE BUTTON */}
                <button
                  onClick={() => {
                    if (hasRecorded && processedWords.length > 0) {
                      handleAnalyseReady(processedWords, rawText.trim(), durationSeconds);
                    }
                  }}
                  disabled={!hasRecorded || processedWords.length === 0 || isAnalysing}
                  className={`w-full py-4 rounded-full font-display text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 ${
                    hasRecorded && processedWords.length > 0 && !isAnalysing
                      ? 'bg-ink text-paper hover:bg-sage cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5'
                      : 'bg-rule text-ink-ghost cursor-not-allowed'
                  }`}
                >
                  {isAnalysing ? (
                    <>
                      <span className="animate-spin inline-block border-2 border-current border-t-transparent rounded-full w-3.5 h-3.5" />
                      <span>Analysing...</span>
                    </>
                  ) : (
                    <>
                      <span>Analyse My Speech</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </>
            )}
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
