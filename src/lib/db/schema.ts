/**
 * VoiceScribe Database Schema Definitions
 *
 * These SQL statements define the SQLite tables used by VoiceScribe.
 * Tables:
 *   - sessions: Stores practice session metadata and results
 *   - speech_events: Stores individual dysfluency events detected during sessions
 */

export const CREATE_SESSIONS_TABLE = `
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    transcript TEXT,
    fluencyScore REAL,
    durationSeconds INTEGER
  );
`;

export const CREATE_SPEECH_EVENTS_TABLE = `
  CREATE TABLE IF NOT EXISTS speech_events (
    id TEXT PRIMARY KEY,
    sessionId TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('repetition', 'prolongation', 'block', 'filler', 'long_pause')),
    timestamp REAL NOT NULL,
    severity TEXT NOT NULL CHECK(severity IN ('mild', 'moderate', 'severe')),
    FOREIGN KEY (sessionId) REFERENCES sessions(id) ON DELETE CASCADE
  );
`;

export const CREATE_INDEXES = `
  CREATE INDEX IF NOT EXISTS idx_speech_events_session ON speech_events(sessionId);
  CREATE INDEX IF NOT EXISTS idx_sessions_created ON sessions(createdAt);
`;

/** TypeScript types mirroring the schema */

export interface Session {
  id: string;
  createdAt: string;
  transcript: string | null;
  fluencyScore: number | null;
  durationSeconds: number | null;
}

export interface SpeechEvent {
  id: string;
  sessionId: string;
  type: "repetition" | "prolongation" | "block" | "filler" | "long_pause";
  timestamp: number;
  severity: "mild" | "moderate" | "severe";
}
