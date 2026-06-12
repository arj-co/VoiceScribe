import { useState, useEffect, useCallback } from 'react';
import {
  PracticeSession,
  DysfluencyStats,
  GeminiAnalysis,
  WordToken,
  SessionTranscript,
} from '@/types/app';

const STORAGE_KEY = 'voicescribe_sessions';

export interface UseSessionStoreReturn {
  sessions: PracticeSession[];
  saveSession: (session: Omit<PracticeSession, 'id' | 'createdAt'>) => PracticeSession;
  getSession: (id: string) => PracticeSession | undefined;
  clearSessions: () => void;
  isLoaded: boolean;
}

// Ensure these types are referenced so the import is not considered unused
type _Refs = DysfluencyStats | GeminiAnalysis | WordToken | SessionTranscript;

export default function useSessionStore(): UseSessionStoreReturn {
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load sessions from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as PracticeSession[];
        setSessions(parsed);
      }
    } catch {
      // On parse error, proceed with empty sessions
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveSession = useCallback(
    (session: Omit<PracticeSession, 'id' | 'createdAt'>): PracticeSession => {
      const newSession: PracticeSession = {
        ...session,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };

      setSessions((prev) => {
        const updated = [newSession, ...prev];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // Silently fail if localStorage is unavailable
        }
        return updated;
      });

      // Also write immediately using current sessions for the localStorage call
      // (the functional updater handles state but we need to return the new session)
      return newSession;
    },
    []
  );

  const getSession = useCallback(
    (id: string): PracticeSession | undefined => {
      return sessions.find((s) => s.id === id);
    },
    [sessions]
  );

  const clearSessions = useCallback((): void => {
    setSessions([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Silently fail if localStorage is unavailable
    }
  }, []);

  return { sessions, saveSession, getSession, clearSessions, isLoaded };
}
