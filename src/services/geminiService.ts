export interface GeminiServiceOptions {
  apiKey: string;
  transcript: string;
  mode: string;
  prompt: string;
  stats: {
    pauses: number;
    repetitions: number;
    fillers: number;
    prolongations: number;
    totalWords: number;
    fluencyScore: number;
  };
}

export interface GeminiServiceResult {
  overallFeedback: string;
  questionFeedback: string;
  coachingTip: string;
  strengths: string[];
  improvements: string[];
  fluencyScore: number;
}

// Models in priority order — falls back automatically on quota errors.
// gemini-2.5-flash is the primary; gemini-2.0-flash-lite is cheaper on quota.
const MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash-lite',
  'gemini-2.0-flash',
];

async function callGemini(
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string
): Promise<Response> {
  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: [
          {
            parts: [{ text: userPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 512,
        },
      }),
    }
  );
}

export async function analyseWithGemini(
  options: GeminiServiceOptions
): Promise<GeminiServiceResult> {
  const systemPrompt = `You are an expert speech coach and communication trainer. 
You are analysing a speech practice session and must return a JSON object only. 
No markdown, no explanation, no code fences. Raw JSON only.`;

  const userPrompt = `The user was practising: ${options.mode}
The question or prompt they were answering: "${options.prompt}"

Their speech transcript:
"${options.transcript}"

Speech statistics:
- Total words spoken: ${options.stats.totalWords}
- Filler words (um, uh, like, etc): ${options.stats.fillers}
- Pauses longer than 1.5 seconds: ${options.stats.pauses}
- Word repetitions: ${options.stats.repetitions}
- Prolonged words: ${options.stats.prolongations}
- Calculated fluency score: ${options.stats.fluencyScore}/100

Return ONLY a valid JSON object with exactly these fields:
{
  "overallFeedback": "2-3 sentence overall assessment of their performance, specific and encouraging",
  "questionFeedback": "1-2 sentences specifically about how well they answered this particular question or prompt",
  "coachingTip": "One specific, actionable tip they can apply in their very next practice session. Be concrete, not generic.",
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2"],
  "fluencyScore": a number between 0 and 100 representing your assessment of fluency
}`;

  let lastError: Error = new Error('No models available');

  // Try each model in order — if one is rate-limited (429) move to the next
  for (const model of MODELS) {
    try {
      console.log(`[Gemini] Trying model: ${model}`);
      const response = await callGemini(options.apiKey, model, systemPrompt, userPrompt);

      if (response.status === 429) {
        console.warn(`[Gemini] ${model} quota exceeded, trying next model...`);
        continue;
      }

      if (!response.ok) {
        const body = await response.text();
        console.error(`[Gemini] ${model} error ${response.status}:`, body);
        lastError = new Error(`Gemini API error: ${response.status} ${response.statusText}`);
        continue;
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        lastError = new Error('No content returned from Gemini API');
        continue;
      }

      console.log(`[Gemini] Success with model: ${model}`);
      const cleanedText = rawText.replace(/```json|```/g, '').trim();
      const result = JSON.parse(cleanedText) as GeminiServiceResult;

      return {
        overallFeedback: result.overallFeedback || '',
        questionFeedback: result.questionFeedback || '',
        coachingTip: result.coachingTip || '',
        strengths: Array.isArray(result.strengths) ? result.strengths : [],
        improvements: Array.isArray(result.improvements) ? result.improvements : [],
        fluencyScore: typeof result.fluencyScore === 'number' ? result.fluencyScore : options.stats.fluencyScore,
      };
    } catch (err) {
      console.error(`[Gemini] ${model} threw:`, err);
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }

  // All models exhausted
  console.error('[Gemini] All models failed. Last error:', lastError);
  return {
    overallFeedback: 'Analysis could not be completed right now — the Gemini API quota may be temporarily exhausted. Your session has been saved.',
    questionFeedback: 'Unable to analyse this session due to API quota limits.',
    coachingTip: 'Try again in a few minutes. Free-tier Gemini quotas reset regularly.',
    strengths: ['You completed a practice session — that takes courage'],
    improvements: ['Retry analysis in a few minutes for detailed feedback'],
    fluencyScore: options.stats.fluencyScore,
  };
}
