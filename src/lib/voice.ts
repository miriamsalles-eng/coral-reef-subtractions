/**
 * Seleção centralizada da voz de Mara para SpeechSynthesis.
 *
 * Preferência: voz FEMININA em português do Brasil.
 * Quando o dispositivo não tem voz feminina pt-BR, cai para a melhor voz
 * pt-BR disponível e, em último caso, para qualquer voz em português
 * (ou o padrão do navegador).
 */
export const VOICE_CONFIG = {
  preferredVoiceGender: "female" as const,
  preferredVoiceLang: "pt-BR" as const,
  /** Nomes conhecidos de vozes femininas pt-BR, em ordem de preferência. */
  preferredVoiceNames: [
    "Luciana",
    "Google português do Brasil",
    "Microsoft Francisca",
    "Microsoft Maria",
    "Microsoft Thalita",
    "Fernanda",
    "Camila",
    "Vitória",
    "Vitoria",
    "Joana",
    "Raquel",
  ],
};

const FEMALE_HINTS = /(female|feminin|mulher|luciana|francisca|maria|thalita|fernanda|camila|vit[óo]ria|joana|raquel|helo[íi]sa|ana|f[ée]e)/i;
const MALE_HINTS = /(male|masculin|homem|daniel|ricardo|felipe|jo[ãa]o|paulo|antonio|ant[óo]nio)/i;

let cached: SpeechSynthesisVoice | null = null;

function pick(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices.length) return null;
  const ptBR = voices.filter((v) => v.lang?.toLowerCase().startsWith("pt-br"));
  const pt = voices.filter((v) => v.lang?.toLowerCase().startsWith("pt"));

  // 1. nomes conhecidos de voz feminina pt-BR, na ordem de preferência
  for (const name of VOICE_CONFIG.preferredVoiceNames) {
    const found = ptBR.find((v) => v.name.toLowerCase().includes(name.toLowerCase()));
    if (found) return found;
  }
  // 2. qualquer voz pt-BR com indício de perfil feminino
  const femaleBR = ptBR.find((v) => FEMALE_HINTS.test(v.name) && !MALE_HINTS.test(v.name));
  if (femaleBR) return femaleBR;
  // 3. melhor voz pt-BR disponível (evitando nomes claramente masculinos)
  const neutralBR = ptBR.find((v) => !MALE_HINTS.test(v.name));
  if (neutralBR) return neutralBR;
  if (ptBR[0]) return ptBR[0];
  // 4. qualquer voz em português
  const femalePT = pt.find((v) => FEMALE_HINTS.test(v.name) && !MALE_HINTS.test(v.name));
  return femalePT ?? pt[0] ?? null;
}

/** Voz preferida de Mara; a escolha é persistida para ficar igual em todas as telas. */
export function getMaraVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  if (cached) return cached;
  cached = pick(window.speechSynthesis.getVoices());
  return cached;
}

/** As vozes chegam de forma assíncrona em alguns navegadores. */
export function primeMaraVoice() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  getMaraVoice();
  window.speechSynthesis.addEventListener?.("voiceschanged", () => {
    cached = pick(window.speechSynthesis.getVoices());
  });
}
