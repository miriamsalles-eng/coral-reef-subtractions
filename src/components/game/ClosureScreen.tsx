import { GameScreen } from "./GameScreen";
import { Mara } from "./Mara";
import { SpeechBubble } from "./SpeechBubble";
import { ImageNavButton } from "./NavButton";
import { useNarration } from "@/lib/useNarration";

const TITLE = "Você conseguiu!";
const LINES = [
  "Você observou, contou e descobriu quantos ficaram.",
  "Agora já sabe usar a subtração para mostrar o que foi retirado.",
];
const MARA_LINE = "Obrigada por explorar o recife comigo. Quer brincar de novo?";

/**
 * Tela final — layout com espaço reservado para cada bloco:
 * título no topo, duas caixas de síntese logo abaixo (altura automática),
 * Mara no canto inferior esquerdo sem cobrir texto, balão ao lado dela
 * ancorado pela base e RECOMEÇAR no canto inferior direito.
 */
export function ClosureScreen({ onRestart }: { onRestart: () => void }) {
  const { speak } = useNarration("closure");

  return (
    <GameScreen background="final">
      <div className="absolute" style={{ left: 250, top: 26, width: 900 }}>
        <h1
          className="font-display font-bold text-white drop-shadow-[0_6px_10px_rgb(0_0_0_/_0.45)]"
          style={{ fontSize: 58, lineHeight: 1.1 }}
        >
          {TITLE}
        </h1>
        <div className="mt-4 space-y-4">
          {LINES.map((line) => (
            <p
              key={line}
              className="rounded-3xl bg-prompt/95 px-7 py-4 font-display font-semibold text-prompt-foreground shadow-[0_8px_18px_rgb(0_0_0_/_0.18)]"
              style={{ fontSize: 28, lineHeight: 1.35, height: "auto" }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      <Mara pose="celebrating" height={300} x={12} bottom={0} facing="right" />

      <SpeechBubble
        text={MARA_LINE}
        x={300}
        bottom={40}
        width={430}
        tailSide="left"
        onSpeak={(t) => speak(t, "final")}
      />

      <ImageNavButton kind="restart" label="Recomeçar" onClick={onRestart} x={900} y={520} width={250} />
    </GameScreen>
  );
}
