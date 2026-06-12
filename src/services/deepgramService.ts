export const DEEPGRAM_CONFIG = {
  model: 'nova-2',
  language: 'en-US',
  smart_format: true,
  interim_results: true,
  utterance_end_ms: 1000,
  vad_events: true,
  punctuate: true,
};

export function buildDeepgramUrl(apiKey: string): string {
  const params = new URLSearchParams({
    model: 'nova-2',
    language: 'en-US',
    smart_format: 'true',
    interim_results: 'true',
    utterance_end_ms: '1000',
    vad_events: 'true',
    punctuate: 'true',
  });
  return `wss://api.deepgram.com/v1/listen?${params.toString()}`;
}

export function createDeepgramSocket(apiKey: string): WebSocket {
  const url = buildDeepgramUrl(apiKey);
  const socket = new WebSocket(url, ['token', apiKey]);
  return socket;
}

export interface DeepgramWord {
  word: string;
  start: number;
  end: number;
  confidence: number;
  punctuated_word: string;
}

export interface DeepgramResponse {
  type: string;
  channel: {
    alternatives: Array<{
      transcript: string;
      words: DeepgramWord[];
    }>;
  };
  is_final: boolean;
  speech_final: boolean;
}

export function parseDeepgramMessage(event: MessageEvent): DeepgramResponse | null {
  try {
    const data = JSON.parse(event.data);
    if (data && data.type === 'Results') {
      return data as DeepgramResponse;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const deepgramService = {};
