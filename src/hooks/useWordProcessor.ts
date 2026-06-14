import { useCallback } from 'react';
import { WordToken, DysfluencyType, DysfluencyStats } from '@/types/app';

export const FILLER_WORDS: string[] = [
  'um', 'uh', 'er', 'ah', 'oh', 'uhm', 'like', 'basically', 'literally',
  'actually', 'honestly', 'right', 'okay', 'so', 'well',
  'you know', 'i mean', 'kind of', 'sort of'
];

export const isVocalizedFiller = (word: string): boolean => {
  // Matches variations of:
  // - uh, uhh, uhhh, uhhhh, etc.
  // - um, umm, ummm, ummmm, etc.
  // - uhm, uhmm, uhhmmm, etc.
  // - er, err, errr, etc.
  // - ah, ahh, ahhh, etc.
  // - oh, ohh, ohhh, etc.
  return (
    /^u+h+$/.test(word) ||
    /^u+m+$/.test(word) ||
    /^u+h+m+$/.test(word) ||
    /^e+r+$/.test(word) ||
    /^a+h+$/.test(word) ||
    /^o+h+$/.test(word)
  );
};

const TWO_WORD_FILLERS = ['you know', 'i mean', 'kind of', 'sort of'];

export const PAUSE_THRESHOLD_SECONDS: number = 1.5;
export const PROLONGATION_MULTIPLIER: number = 2.5;
export const MIN_WORDS_FOR_AVERAGE: number = 5;

export interface UseWordProcessorReturn {
  processWords: (words: WordToken[]) => WordToken[];
  computeStats: (words: WordToken[]) => DysfluencyStats;
  computeAverageWordDuration: (words: WordToken[]) => number;
}

export default function useWordProcessor(): UseWordProcessorReturn {
  const computeAverageWordDuration = useCallback((words: WordToken[]): number => {
    const validWords = words.filter((w) => w.end - w.start > 0);
    if (validWords.length < MIN_WORDS_FOR_AVERAGE) {
      return 0.3;
    }
    const totalDuration = validWords.reduce((sum, w) => sum + (w.end - w.start), 0);
    return totalDuration / validWords.length;
  }, []);

  const processWords = useCallback((words: WordToken[]): WordToken[] => {
    const result: WordToken[] = [];
    const avgDuration = computeAverageWordDuration(words);
    const normalizedWords = words.map((w) => w.word.toLowerCase().replace(/[^a-z\s]/g, ''));

    let lastRealWord: WordToken | null = null;

    for (let i = 0; i < words.length; i++) {
      const originalWord = words[i];
      const normalized = normalizedWords[i];
      
      const processedWord: WordToken = { ...originalWord };
      let isClassified = false;

      // RULE 1 — FILLER
      const isTwoWordFiller =
        (i + 1 < words.length && TWO_WORD_FILLERS.includes(`${normalized} ${normalizedWords[i + 1]}`)) ||
        (i - 1 >= 0 && TWO_WORD_FILLERS.includes(`${normalizedWords[i - 1]} ${normalized}`));

      if (FILLER_WORDS.includes(normalized) || isVocalizedFiller(normalized) || isTwoWordFiller) {
        processedWord.type = 'filler';
        isClassified = true;
      }

      // RULE 2 — REPETITION
      if (!isClassified) {
        const matchPrev1 = i >= 1 && normalized === normalizedWords[i - 1];
        const matchPrev2 = i >= 2 && normalized === normalizedWords[i - 2];
        if (matchPrev1 || matchPrev2) {
          processedWord.type = 'repetition';
          isClassified = true;
        }
      }

      // RULE 3 — PAUSE (inject a synthetic pause token BEFORE the current word)
      if (lastRealWord) {
        const gap = processedWord.start - lastRealWord.end;
        if (gap > PAUSE_THRESHOLD_SECONDS) {
          result.push({
            word: '[pause]',
            start: lastRealWord.end,
            end: processedWord.start,
            confidence: 1,
            type: 'pause',
          });
        }
      }

      // RULE 4 — PROLONGATION
      if (!isClassified) {
        const duration = processedWord.end - processedWord.start;
        if (avgDuration > 0 && duration > avgDuration * PROLONGATION_MULTIPLIER) {
          processedWord.type = 'prolongation';
          isClassified = true;
        }
      }

      result.push(processedWord);
      lastRealWord = processedWord;
    }

    return result;
  }, [computeAverageWordDuration]);

  const computeStats = useCallback((words: WordToken[]): DysfluencyStats => {
    let pauses = 0;
    let repetitions = 0;
    let fillers = 0;
    let prolongations = 0;
    let totalWords = 0;

    words.forEach((word) => {
      if (word.type === 'pause') {
        pauses++;
      } else {
        totalWords++;
        if (word.type === 'repetition') {
          repetitions++;
        } else if (word.type === 'filler') {
          fillers++;
        } else if (word.type === 'prolongation') {
          prolongations++;
        }
      }
    });

    const base = 100;
    const fillerDeduction = Math.min(fillers * 3, 30);
    const pauseDeduction = Math.min(pauses * 4, 40);
    const repetitionDeduction = Math.min(repetitions * 2, 20);
    const prolongationDeduction = Math.min(prolongations * 2, 20);

    const rawScore = base - (fillerDeduction + pauseDeduction + repetitionDeduction + prolongationDeduction);
    const fluencyScore = Math.round(Math.max(0, Math.min(rawScore, 100)));

    return {
      pauses,
      repetitions,
      fillers,
      prolongations,
      totalWords,
      fluencyScore,
    };
  }, []);

  return {
    processWords,
    computeStats,
    computeAverageWordDuration,
  };
}
