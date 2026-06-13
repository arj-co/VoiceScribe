'use client';

import { useState, useCallback } from 'react';
import useDeepgram from '@/hooks/useDeepgram';
import useWordProcessor from '@/hooks/useWordProcessor';
import LiveTranscript from '@/components/app/LiveTranscript';
import { WordToken, PracticeMode } from '@/types/app';

interface RecordingStudioProps {
  mode: PracticeMode;
  prompt: string;
  apiKey: string;
  onAnalyseReady: (words: WordToken[], rawText: string, duration: number) => void;
  isAnalysing?: boolean;
}

export default function RecordingStudio({
  mode,
  prompt,
  apiKey,
  onAnalyseReady,
  isAnalysing = false,
}: RecordingStudioProps) {
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

  const { isRecording, startRecording, stopRecording, error } = useDeepgram({
    apiKey, onWord, onTranscriptFinal,
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

  // Mic denied
  if (micDenied) {
    return (
      <div className="w-full max-w-lg mx-auto px-6">
        <div className="bg-paper-warm border border-rule rounded-2xl p-8 text-center">
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
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-6 flex flex-col items-center gap-8">

      {/* PROMPT CARD */}
      <div className="w-full bg-paper-warm border border-rule rounded-2xl p-6">
        <span className="block text-[11px] font-display uppercase tracking-[0.15em] text-ink-muted mb-3">
          Your prompt
        </span>
        <p className="text-base font-medium text-ink leading-relaxed">{prompt}</p>
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
          {/* Pulse ring when recording */}
          {isRecording && (
            <span className="absolute inset-0 rounded-full bg-sage animate-ping opacity-20" />
          )}
          <span className="text-3xl relative z-10">
            {isRecording ? '⏹' : '🎙'}
          </span>
        </button>

        {/* Status label */}
        <div className="text-center">
          {error ? (
            <p className="text-xs font-display uppercase tracking-widest text-red-500">{error}</p>
          ) : emptyTranscriptError ? (
            <p className="text-xs font-display uppercase tracking-widest text-red-500">{emptyTranscriptError}</p>
          ) : isRecording ? (
            <p className="text-xs font-display uppercase tracking-[0.15em] text-sage flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse inline-block" />
              Recording — click to stop
            </p>
          ) : hasRecorded ? (
            <p className="text-xs font-display uppercase tracking-[0.15em] text-sage">
              Recording complete
            </p>
          ) : (
            <p className="text-xs font-display uppercase tracking-[0.15em] text-ink-muted">
              Click to start
            </p>
          )}
          <span className="block text-[10px] text-ink-ghost mt-1 font-display uppercase tracking-widest">
            Powered by Deepgram
          </span>
        </div>
      </div>

      {/* LIVE TRANSCRIPT */}
      <div className="w-full">
        <LiveTranscript words={processedWords} isRecording={isRecording} />
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
        <div className="w-full bg-sage-faint border border-sage-light rounded-xl px-5 py-3 text-center">
          <p className="text-[11px] font-display uppercase tracking-widest text-sage">
            Recording complete — review your transcript then click Analyse
          </p>
        </div>
      )}

      {/* ANALYSE BUTTON */}
      <button
        onClick={() => {
          if (hasRecorded && processedWords.length > 0) {
            onAnalyseReady(processedWords, rawText.trim(), durationSeconds);
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
    </div>
  );
}
