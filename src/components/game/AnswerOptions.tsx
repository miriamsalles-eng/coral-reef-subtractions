export type AnswerValue = number | string;

export interface AnswerOption {
  value: AnswerValue;
  label: string;
  ariaLabel?: string;
}

/**
 * Alternativas matemáticas — sempre logo abaixo (ou diretamente associadas)
 * à cena observada, e visualmente diferentes dos botões de navegação.
 */
export function AnswerOptions({
  options,
  onChoose,
  chosen,
  correct,
  x,
  y,
  width,
  size = "number",
}: {
  options: AnswerOption[];
  onChoose: (value: AnswerValue) => void;
  /** valores já escolhidos e errados */
  chosen: AnswerValue[];
  /** valor correto, definido apenas depois do acerto */
  correct: AnswerValue | null;
  x: number;
  y: number;
  width: number;
  size?: "number" | "operation" | "text";
}) {
  const fontSize = size === "number" ? 48 : size === "operation" ? 42 : 26;
  const padX = size === "number" ? 0 : 20;
  const minW = size === "number" ? 128 : 0;

  return (
    <div
      className="absolute flex items-stretch justify-center gap-5"
      style={{ left: x, top: y, width }}
      role="group"
      aria-label="Escolha a resposta"
    >
      {options.map((opt) => {
        const isWrong = chosen.includes(opt.value) && correct !== opt.value;
        const isCorrect = correct === opt.value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            disabled={isWrong || correct !== null}
            onClick={() => onChoose(opt.value)}
            aria-label={opt.ariaLabel ?? opt.label}
            className={[
              "flex min-h-[92px] flex-1 items-center justify-center rounded-3xl border-[6px] font-display font-semibold shadow-[0_8px_0_rgb(0_0_0_/_0.12)] transition-all",
              isCorrect
                ? "border-correct bg-correct/25 text-correct-foreground scale-105"
                : isWrong
                  ? "animate-nudge border-wrong bg-wrong/20 text-wrong opacity-70"
                  : "border-answer-border bg-answer text-answer-foreground hover:-translate-y-1 hover:bg-secondary",
            ].join(" ")}
            style={{ fontSize, paddingLeft: padX, paddingRight: padX, minWidth: minW, maxWidth: size === "number" ? 170 : undefined }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
