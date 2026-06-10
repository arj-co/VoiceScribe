/**
 * Mock data for VoiceScribe editorial dashboard.
 * This data will be replaced with real data from the database
 * once the AI analysis pipeline is integrated.
 */

export const mockProgressData = [
  { date: "May 1", fluencyScore: 62 },
  { date: "May 5", fluencyScore: 65 },
  { date: "May 8", fluencyScore: 58 },
  { date: "May 12", fluencyScore: 71 },
  { date: "May 15", fluencyScore: 68 },
  { date: "May 19", fluencyScore: 74 },
  { date: "May 22", fluencyScore: 72 },
  { date: "May 26", fluencyScore: 78 },
  { date: "May 30", fluencyScore: 76 },
  { date: "Jun 2", fluencyScore: 81 },
  { date: "Jun 5", fluencyScore: 79 },
  { date: "Jun 8", fluencyScore: 85 },
];

export const mockMetrics = {
  fluencyScore: 85,
  repetitions: 3,
  prolongations: 1,
  blocks: 2,
  longPauses: 4,
};

export const mockSessionSummary = {
  duration: "4:32",
  totalWords: 287,
  wordsPerMinute: 63,
  improvement: "+6",
  topStrength: "Fewer prolongations compared to your last session",
  topArea: "Initial word repetitions — try gentle onset techniques",
};

/**
 * A mock transcript showing how dysfluency annotations appear as
 * typographic treatments rather than badges or icons.
 *
 * Types:
 *  - "text"          : normal spoken text
 *  - "repetition"    : word/syllable repeated (double underline)
 *  - "prolongation"  : sound stretched (letter-spaced italic)
 *  - "block"         : speech block (⌐ prefix mark)
 *  - "pause"         : short pause (em-dash)
 *  - "long_pause"    : long pause (wide rule)
 */
export interface TranscriptSegment {
  type:
    | "text"
    | "repetition"
    | "prolongation"
    | "block"
    | "pause"
    | "long_pause";
  content: string;
  /** Duration in seconds, for pauses */
  duration?: number;
}

export const mockTranscript: TranscriptSegment[] = [
  { type: "text", content: "I've been thinking about " },
  { type: "repetition", content: "the the " },
  { type: "text", content: "way we talk about " },
  { type: "prolongation", content: "sspeech " },
  { type: "text", content: "and how it shapes the way people " },
  { type: "pause", content: "", duration: 1.2 },
  { type: "text", content: "perceive us. " },
  { type: "text", content: "It's not just about " },
  { type: "block", content: "fluency" },
  { type: "text", content: ", it's about " },
  { type: "long_pause", content: "", duration: 3.1 },
  { type: "text", content: "finding your own rhythm. " },
  { type: "text", content: "And I think " },
  { type: "repetition", content: "I I " },
  { type: "text", content: "think that's something " },
  { type: "prolongation", content: "bbeautiful " },
  { type: "text", content: "about the human voice — every voice " },
  { type: "text", content: "has its own " },
  { type: "pause", content: "", duration: 0.8 },
  { type: "text", content: "cadence." },
];
