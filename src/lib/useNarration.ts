import { useCallback, useEffect, useRef } from "react";
import { narrationUrl } from "@/data/audio";
import { VOICE_CONFIG, getMaraVoice, primeMaraVoice } from "@/lib/voice";

/**
 * Narração das falas de Mara.
 * - Nunca inicia sozinha: só toca depois de um clique da criança.
 * - Trocar de tela interrompe o áudio anterior.
 */
export function useNarration(screenKey: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  useEffect(() => {
    stop();
    return stop;
  }, [screenKey, stop]);

  const speak = useCallback(
    (text: string, id?: string) => {
      stop();
      const url = narrationUrl(id);
      if (url) {
        const audio = new Audio(url);
        audioRef.current = audio;
        void audio.play().catch(() => undefined);
        return;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = "pt-BR";
        utter.rate = 0.92;
        utter.pitch = 1.15;
        window.speechSynthesis.speak(utter);
      }
    },
    [stop],
  );

  return { speak, stop };
}
