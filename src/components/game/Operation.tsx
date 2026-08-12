import { MINUS } from "@/lib/pt";

/** Representação simbólica — só aparece depois da compreensão da situação. */
export function Operation({
  a,
  b,
  result,
  x,
  y,
  width,
  highlight,
  fontSize = 48,
}: {
  a: number;
  b: number;
  result: number | string;
  x: number;
  y: number;
  width: number;
  highlight?: "b" | null;
  fontSize?: number;
}) {
  return (
    <div
      className="animate-soft-in absolute flex items-center justify-center rounded-3xl border-4 border-reef-sun bg-prompt px-6 py-2 shadow-[0_8px_18px_rgb(0_0_0_/_0.18)]"
      style={{ left: x, top: y, width, minHeight: 78 }}
      aria-label={`${a} menos ${b} é igual a ${result}`}
    >
      <p className="font-display font-semibold text-prompt-foreground" style={{ fontSize }}>

        <span>{a}</span> <span className="text-reef-coral">{MINUS}</span>{" "}
        <span className={highlight === "b" ? "rounded-xl bg-reef-sun/70 px-2" : undefined}>{b}</span>{" "}
        <span>=</span> <span>{result}</span>
      </p>
    </div>
  );
}
