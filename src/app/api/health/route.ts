import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";

/**
 * GET /api/health
 * Health check endpoint — verifies database connectivity.
 */
export async function GET() {
  try {
    const db = getDatabase();
    const result = db.prepare("SELECT 1 as ok").get() as { ok: number };

    return NextResponse.json({
      status: "healthy",
      database: result.ok === 1 ? "connected" : "error",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      {
        status: "unhealthy",
        database: "disconnected",
        error: String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
