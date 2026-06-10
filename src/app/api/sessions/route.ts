import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import type { Session } from "@/lib/db/schema";

/**
 * GET /api/sessions
 * Returns all practice sessions ordered by most recent first.
 */
export async function GET() {
  try {
    const db = getDatabase();
    const sessions = db
      .prepare("SELECT * FROM sessions ORDER BY createdAt DESC")
      .all() as Session[];

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Failed to fetch sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/sessions
 * Creates a new practice session.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDatabase();

    const id = crypto.randomUUID();
    const stmt = db.prepare(`
      INSERT INTO sessions (id, transcript, fluencyScore, durationSeconds)
      VALUES (?, ?, ?, ?)
    `);

    stmt.run(id, body.transcript ?? null, body.fluencyScore ?? null, body.durationSeconds ?? null);

    const session = db
      .prepare("SELECT * FROM sessions WHERE id = ?")
      .get(id) as Session;

    return NextResponse.json({ session }, { status: 201 });
  } catch (error) {
    console.error("Failed to create session:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
