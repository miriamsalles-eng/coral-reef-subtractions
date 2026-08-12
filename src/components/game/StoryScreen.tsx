import type { BackgroundKey, MaraPose } from "@/data/assets";
import { GameScreen } from "./GameScreen";
import { Mara } from "./Mara";
import { SpeechBubble } from "./SpeechBubble";
import { ImageNavButton } from "./NavButton";
import { useNarration } from "@/lib/useNarration";

/**
 * Telas narrativas (capa, transições, síntese, encerramento):
 * texto grande, Mara mediando e um único caminho adiante.
 */
export function StoryScreen({
  id,
  narrationId,
  background,
  title,
  lines,
  mara,
  pose,
  buttonKind = "next",
  buttonLabel,
  onNext,
  side = "left",
}: {
  id: string;
  narrationId?: string;
  background: BackgroundKey;
  title?: string;
  lines: string[];
  mara: string;
  pose: MaraPose;
  buttonKind?: "start" | "next" | "restart";
  buttonLabel: string;
  onNext: () => void;
  side?: "left" | "right";
}) {
  const { speak } = useNarration(id);
  const maraX = side === "left" ? 26 : 890;
  const bubbleX = side === "left" ? 320 : 424;
  const bubbleWidth = side === "left" ? 470 : 440;
  const textX = side === "left" ? 250 : 60;

  return (
    <GameScreen background={background}>
      <div className="absolute" style={{ left: textX, top: title ? 90 : 130, width: 700 }}>
        {title && (
          <h1
            className="font-display font-bold text-white drop-shadow-[0_6px_10px_rgb(0_0_0_/_0.45)]"
            style={{ fontSize: 62, lineHeight: 1.05 }}
          >
            {title}
          </h1>
        )}
        <div className="mt-5 space-y-3">
          {lines.map((line) => (
            <p
              key={line}
              className="rounded-3xl bg-prompt/92 px-6 py-3 font-display font-semibold text-prompt-foreground shadow-[0_8px_18px_rgb(0_0_0_/_0.18)]"
              style={{ fontSize: 30, lineHeight: 1.25 }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      <Mara pose={pose} height={370} x={maraX} bottom={-10} facing={side === "left" ? "right" : "left"} />

      <SpeechBubble
        text={mara}
        x={bubbleX}
        y={470}
        width={bubbleWidth}
        tailSide={side === "left" ? "left" : "right"}
        onSpeak={(t) => speak(t, narrationId)}
      />


      <ImageNavButton kind={buttonKind} label={buttonLabel} onClick={onNext} x={998} y={598} width={182} />
    </GameScreen>
  );
}
