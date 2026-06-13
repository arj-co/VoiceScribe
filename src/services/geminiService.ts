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

// Active model
const MODELS = [
  'gemini-3.5-flash',
];

async function callGemini(
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string
): Promise<Response> {
  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey,
      },
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
          maxOutputTokens: 2048,
          responseMimeType: 'application/json',
        },
      }),
    }
  );
}

export async function analyseWithGemini(
  options: GeminiServiceOptions
): Promise<GeminiServiceResult> {
  const systemPrompt = `You are a brutally honest, no-nonsense speech coach. Your job is to give the speaker unfiltered, specific feedback — not to make them feel good. Every piece of feedback must be grounded in what actually happened in their transcript. Do not give hollow encouragement. Do not soften criticism. If the answer was weak, say so clearly. If the fluency was poor, the score must reflect that. Your feedback should feel like tough love from a coach who genuinely wants them to improve, not a cheerleader who wants them to feel validated. Return a single valid JSON object. No markdown, no code fences, no explanation.`;

  // JSON-encode both strings so that quotes or newlines inside them
  // cannot break the model's JSON output or prematurely end the string.
  const encodedTranscript = JSON.stringify(options.transcript);
  const encodedPrompt = JSON.stringify(options.prompt);

  const userPrompt = `The user was practising: ${options.mode}
The question or prompt they were answering: ${encodedPrompt}

Their speech transcript:
${encodedTranscript}

Measured speech statistics:
- Total words spoken: ${options.stats.totalWords}
- Filler words (um, uh, like, basically, etc): ${options.stats.fillers}
- Long pauses (>1.5s): ${options.stats.pauses}
- Word repetitions: ${options.stats.repetitions}
- Prolonged words: ${options.stats.prolongations}
- Algorithm-computed fluency score: ${options.stats.fluencyScore}/100

Your instructions:
1. overallFeedback: 2-3 sentences. Be direct. Call out the biggest problem explicitly. Do not open with a compliment. Reference what actually happened in their transcript.
2. questionFeedback: Did they actually answer the question well? If not, say so bluntly. If the answer was vague, generic, or too short, name it. 1-2 sentences.
3. coachingTip: One hyper-specific drill or technique they can do RIGHT NOW in their next session. Not generic advice like "practice more." Give a method, structure, or exercise.
4. strengths: Maximum 2 items. Only list genuine strengths that are actually visible in the transcript. If there are no real strengths beyond "they tried," say so honestly with one item.
5. improvements: Minimum 2, maximum 3. These must be specific to what happened in the transcript — reference actual words, patterns, or moments. No vague advice.
6. fluencyScore: Your honest reassessment. The algorithm gave ${options.stats.fluencyScore}. If the content was weak, the answer was off-topic, or the delivery had obvious issues, adjust DOWN accordingly. If they performed well despite some stumbles, you can adjust UP. Do not just echo the algorithm.

Return ONLY a valid JSON object with exactly these fields:
{
  "overallFeedback": "...",
  "questionFeedback": "...",
  "coachingTip": "...",
  "strengths": ["...", "..."],
  "improvements": ["...", "...", "..."],
  "fluencyScore": <number 0-100>
}`;

  let lastError: Error = new Error('No models available');
  let lastStatus: number | null = null;
  let lastBody: string = '';

  for (const model of MODELS) {
    try {
      console.log(`[Gemini] Trying model: ${model}`);
      const response = await callGemini(options.apiKey, model, systemPrompt, userPrompt);

      if (response.status === 429) {
        const body = await response.text();
        console.warn(`[Gemini] ${model} rate limited (429):`, body);
        lastStatus = 429;
        lastBody = body;
        continue;
      }

      if (!response.ok) {
        const body = await response.text();
        console.error(`[Gemini] ${model} error ${response.status}:`, body);
        lastStatus = response.status;
        lastBody = body;
        lastError = new Error(`Gemini API error: ${response.status} — ${body}`);
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

  // All models exhausted — surface the real error
  const statusHint = lastStatus ? ` (HTTP ${lastStatus})` : '';
  console.error(`[Gemini] All models failed${statusHint}. Last error:`, lastError.message);
  if (lastBody) console.error('[Gemini] Last API response body:', lastBody);

  return {
    overallFeedback: `Analysis could not be completed — the Gemini API returned an error${statusHint}. Your session has been saved. Check the browser console for details.`,
    questionFeedback: `API error${statusHint}: ${lastError.message}`,
    coachingTip: 'Open the browser console (F12 → Console) to see the exact error from Gemini and verify your API key has the correct permissions.',
    strengths: ['You completed a practice session'],
    improvements: ['Retry once the API issue is resolved'],
    fluencyScore: options.stats.fluencyScore,
  };
}
