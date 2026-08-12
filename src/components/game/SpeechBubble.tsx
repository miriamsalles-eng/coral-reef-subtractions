import { BUTTONS } from "@/data/assets";

/**
 * Balão de fala de Mara — mediação ("como posso pensar?"),
 * nunca repetição do enunciado ("o que preciso fazer?").
 * Sempre com texto visível + botão de áudio com aria-label.
 *
 * `tailSide` indica de que lado do balão Mara está: o rabicho sai do canto
 * inferior desse lado e aponta na diagonal para a personagem.
 */
export function SpeechBubble({
  text,
  x,
  y,
  width,
  tailSide = "left",
  onSpeak,
  tone = "hint",
}: {
  text: string;
  x: number;
  y: number;
  width: number;
  /** lado do balão em que Mara está */
  tailSide?: "left" | "right";
  onSpeak: (text: string) => void;
  tone?: "hint" | "correct" | "retry";
}) {
  const toneRing =
    tone === "correct"
      ? "border-correct"
      : tone === "retry"
        ? "border-reef-coral"
        : "border-white/80";

  return (
    <div
      className={`animate-soft-in absolute rounded-3xl border-4 bg-bubble px-5 py-4 shadow-[0_10px_24px_rgb(0_0_0_/_0.18)] ${toneRing}`}
      style={{ left: x, top: y, width }}
    >
      <div className="flex items-start gap-3">
        <p
          className="flex-1 text-bubble-foreground"
          style={{ fontSize: 25, lineHeight: 1.24 }}
        >
          {text}
        </p>
        <button
          type="button"
          onClick={() => onSpeak(text)}
          aria-label={`Ouvir a fala de Mara: ${text}`}
          className="shrink-0 rounded-2xl transition-transform hover:scale-110 active:scale-95"
        >
          <img src={BUTTONS.audio} alt="" aria-hidden="true" className="h-14 w-auto" draggable={false} />
        </button>
      </div>
      {/* rabicho: sempre no canto do lado em que Mara está, apontando para ela */}
      <span
        aria-hidden="true"
        className={
          tailSide === "left"
            ? "absolute h-7 w-7 rotate-45 border-b-4 border-l-4 border-inherit bg-bubble"
            : "absolute h-7 w-7 rotate-45 border-b-4 border-r-4 border-inherit bg-bubble"
        }
        style={{
          bottom: -14,
          left: tailSide === "left" ? -10 : undefined,
          right: tailSide === "right" ? -10 : undefined,
        }}
      />
    </div>
  );
}
