import { BUTTONS } from "@/data/assets";

type ImageButtonKind = "start" | "next" | "back" | "restart";

/** Botão de navegação com PNG oficial (INICIAR, SEGUIR, VOLTAR, RECOMEÇAR). */
export function ImageNavButton({
  kind,
  label,
  onClick,
  x,
  y,
  width = 190,
}: {
  kind: ImageButtonKind;
  label: string;
  onClick: () => void;
  x: number;
  y: number;
  width?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="animate-soft-in absolute rounded-2xl transition-transform hover:scale-105 active:scale-95"
      style={{ left: x, top: y, width }}
    >
      <img src={BUTTONS[kind]} alt="" aria-hidden="true" className="w-full" draggable={false} />
    </button>
  );
}

/**
 * Botão de controle sem PNG correspondente (VER NOVAMENTE, MOSTRAR COM NÚMEROS).
 * Visual claramente diferente das alternativas matemáticas.
 */
export function ControlButton({
  label,
  onClick,
  x,
  y,
  width,
  icon = false,
}: {
  label: string;
  onClick: () => void;
  x: number;
  y: number;
  width?: number;
  icon?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="animate-soft-in absolute flex items-center justify-center gap-2 rounded-full border-4 border-reef-deep bg-reef-deep/85 px-5 py-2 text-center font-display text-[20px] leading-tight font-semibold uppercase tracking-wide text-white shadow-[0_6px_14px_rgb(0_0_0_/_0.22)] transition-transform hover:scale-105 active:scale-95"
      style={{ left: x, top: y, width, minHeight: 54 }}
    >
      {icon && <img src={BUTTONS.hint} alt="" aria-hidden="true" className="h-9 w-auto" />}
      {label}
    </button>
  );
}
