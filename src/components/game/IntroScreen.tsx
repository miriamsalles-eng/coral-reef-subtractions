import { GameScreen } from "./GameScreen";
import { Mara } from "./Mara";
import { SpeechBubble } from "./SpeechBubble";
import { ImageNavButton } from "./NavButton";
import { useNarration } from "@/lib/useNarration";

const MARA_LINE =
  "Oi! Eu sou Mara. Vamos explorar o recife e descobrir o que acontece quando alguns animais saem?";

/** Tela 2 — apresentação da Mara: fundo de reflexão, Mara neutra, balão com áudio e SEGUIR. */
export function IntroScreen({ onNext }: { onNext: () => void }) {
  const { speak } = useNarration("intro");

  return (
    <GameScreen background="reflection">
      {/* Mara à esquerda, olhando para o balão que está à sua direita */}
      <Mara pose="neutral" height={440} x={70} bottom={0} facing="right" />

      <SpeechBubble
        text={MARA_LINE}
        x={444}
        y={196}
        width={520}
        tailSide="left"
        onSpeak={(t) => speak(t, "intro.apresentacao")}
      />

      <ImageNavButton kind="next" label="Seguir" onClick={onNext} x={982} y={568} width={182} />
    </GameScreen>
  );
}
