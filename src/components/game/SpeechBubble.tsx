import { BUTTONS } from "@/data/assets";

/**
 * Balão de fala de Mara — mediação ("como posso pensar?"),
 * nunca repetição do enunciado ("o que preciso fazer?").
 * Sempre com texto visível + botão de áudio com aria-label.
 */
export function SpeechBubble({
  text,
  x,
  y,
  width,
  tail = "left",
  onSpeak,
  tone = "hint",
}: {
  text: string;
  x: number;
  y: number;
  width: number;
  tail?: "left" | "right";
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
      <span
        aria-hidden="true"
        className="absolute -bottom-3 h-6 w-6 rotate-45 border-b-4 border-r-4 border-inherit bg-bubble"
        style={{ left: tail === "left" ? 34 : undefined, right: tail === "right" ? 34 : undefined }}
      />
    </div>
  );
}
