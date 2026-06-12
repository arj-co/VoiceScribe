import { useRef, useState, useCallback, useEffect } from 'react';
import { createDeepgramSocket, parseDeepgramMessage, DeepgramWord } from '@/services/deepgramService';
import { WordToken, DysfluencyType } from '@/types/app';

export interface UseDeepgramOptions {
  apiKey: string;
  onWord: (word: WordToken) => void;
  onTranscriptFinal: (words: WordToken[]) => void;
}

export interface UseDeepgramReturn {
  isConnected: boolean;
  isRecording: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  error: string | null;
}

export default function useDeepgram(options: UseDeepgramOptions): UseDeepgramReturn {
  const { apiKey, onWord, onTranscriptFinal } = options;

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const wordBufferRef = useRef<WordToken[]>([]);

  // KEY FIX: Store callbacks in refs so closures inside startRecording / stopRecording
  // always call the latest version without needing to be in the dependency array.
  // This prevents the "new function every render → stale useCallback" loop that
  // was silently preventing getUserMedia from ever being reached.
  const onWordRef = useRef<(word: WordToken) => void>(onWord);
  const onTranscriptFinalRef = useRef<(words: WordToken[]) => void>(onTranscriptFinal);

  useEffect(() => {
    onWordRef.current = onWord;
  }, [onWord]);

  useEffect(() => {
    onTranscriptFinalRef.current = onTranscriptFinal;
  }, [onTranscriptFinal]);

  const convertDeepgramWord = useCallback((dw: DeepgramWord): WordToken => {
    return {
      word: dw.punctuated_word || dw.word,
      start: dw.start,
      end: dw.end,
      confidence: dw.confidence,
      type: 'fluent' as DysfluencyType,
    };
  }, []);

  const startRecording = useCallback(async () => {
    console.log('[Deepgram] startRecording called, apiKey length:', apiKey.length);

    setError(null);
    wordBufferRef.current = [];

    // Guard: mediaDevices not available in non-secure contexts
    if (!navigator.mediaDevices?.getUserMedia) {
      console.error('[Deepgram] navigator.mediaDevices.getUserMedia is not available');
      setError('Microphone API not available. Please use HTTPS or localhost.');
      return;
    }

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      console.log('[Deepgram] getUserMedia granted');
    } catch (err: unknown) {
      const domError = err as DOMException;
      console.error('[Deepgram] getUserMedia error:', domError?.name, domError?.message);
      if (domError?.name === 'NotAllowedError' || domError?.name === 'PermissionDeniedError') {
        throw err; // RecordingStudio catches this and shows the denied UI
      }
      setError('Microphone access failed: ' + (domError?.message ?? 'unknown error'));
      return;
    }

    streamRef.current = stream;

    const socket = createDeepgramSocket(apiKey);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('[Deepgram] WebSocket connected');
      setIsConnected(true);

      const getSupportedMimeType = (): string => {
        const types = [
          'audio/webm;codecs=opus',
          'audio/webm',
          'audio/ogg;codecs=opus',
          'audio/ogg',
          '',
        ];
        for (const type of types) {
          if (type === '' || MediaRecorder.isTypeSupported(type)) {
            return type;
          }
        }
        return '';
      };

      const mimeType = getSupportedMimeType();
      const mediaRecorderOptions = mimeType ? { mimeType } : {};
      console.log('[Deepgram] Using mimeType:', mimeType || '(browser default)');

      const mediaRecorder = new MediaRecorder(stream, mediaRecorderOptions);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (socket.readyState === WebSocket.OPEN && event.data.size > 0) {
          socket.send(event.data);
        }
      };

      mediaRecorder.start(250);
      setIsRecording(true);
    };

    socket.onmessage = (event) => {
      console.log('[Deepgram] message received:', String(event.data).slice(0, 120));

      const result = parseDeepgramMessage(event);
      if (!result) return;

      if (result.is_final && result.channel.alternatives[0]?.words?.length > 0) {
        const words = result.channel.alternatives[0].words;
        const mappedWords = words.map(convertDeepgramWord);

        mappedWords.forEach((word) => {
          onWordRef.current(word);          // always calls the latest onWord
          wordBufferRef.current.push(word);
        });
      }
    };

    socket.onerror = (ev) => {
      console.error('[Deepgram] WebSocket error', ev);
      setError('Connection error. Check your Deepgram API key.');
      setIsConnected(false);
    };

    socket.onclose = (ev) => {
      console.log('[Deepgram] WebSocket closed — code:', ev.code, 'reason:', ev.reason);
      setIsConnected(false);
    };
  // Only apiKey in deps — onWord/onTranscriptFinal are accessed via refs
  }, [apiKey, convertDeepgramWord]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (socketRef.current) {
      if (socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ type: 'CloseStream' }));
      }
      socketRef.current.close();
      socketRef.current = null;
    }

    setIsRecording(false);
    setIsConnected(false);

    onTranscriptFinalRef.current(wordBufferRef.current); // always calls the latest callback
  // No deps needed — everything is accessed via refs
  }, []);

  return {
    isConnected,
    isRecording,
    startRecording,
    stopRecording,
    error,
  };
}
