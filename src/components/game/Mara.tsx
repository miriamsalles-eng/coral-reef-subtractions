import { MARA_POSES, MARA_RATIO, type MaraPose } from "@/data/assets";

/**
 * Mara, a tartaruga mediadora. Posição e pose variam conforme a função
 * pedagógica da tela. O PNG nunca é deformado: a largura vem da proporção.
 */
export function Mara({
  pose,
  height,
  x,
  bottom,
  flip = false,
  className = "",
  style,
}: {
  pose: MaraPose;
  height: number;
  x: number;
  bottom: number;
  flip?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const width = height * MARA_RATIO[pose];
  return (
    <img
      src={MARA_POSES[pose]}
      alt="Mara, a tartaruga que acompanha a atividade"
      draggable={false}
      className={`absolute select-none ${className}`}
      style={{
        left: x,
        bottom,
        width,
        height,
        transform: flip ? "scaleX(-1)" : undefined,
        filter: "drop-shadow(0 8px 12px rgb(0 0 0 / 0.18))",
        ...style,
      }}
    />
  );
}

export const MARA_WIDTH = (pose: MaraPose, height: number) => height * MARA_RATIO[pose];
