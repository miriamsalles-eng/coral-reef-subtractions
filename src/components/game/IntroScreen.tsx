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
      <Mara pose="neutral" height={420} x={90} bottom={0} />

      <SpeechBubble
        text={MARA_LINE}
        x={520}
        y={150}
        width={520}
        tail="left"
        onSpeak={(t) => speak(t, "intro.apresentacao")}
      />

      <ImageNavButton kind="next" label="Seguir" onClick={onNext} x={982} y={568} width={182} />
    </GameScreen>
  );
}
