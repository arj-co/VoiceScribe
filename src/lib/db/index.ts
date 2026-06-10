import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import {
  CREATE_SESSIONS_TABLE,
  CREATE_SPEECH_EVENTS_TABLE,
  CREATE_INDEXES,
} from "./schema";

const DB_PATH = process.env.DATABASE_PATH || "./data/voicescribe.db";

let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (db) return db;

  // Ensure the data directory exists
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  db = new Database(DB_PATH);

  // Enable WAL mode for better concurrent performance
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  // Initialize tables
  db.exec(CREATE_SESSIONS_TABLE);
  db.exec(CREATE_SPEECH_EVENTS_TABLE);
  // Execute index creation statements individually
  const indexStatements = CREATE_INDEXES.split(";").filter((s) => s.trim());
  for (const stmt of indexStatements) {
    db.exec(stmt);
  }

  return db;
}
