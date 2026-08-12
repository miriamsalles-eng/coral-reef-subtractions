import { useEffect, useRef, useState, type ReactNode } from "react";

export const CANVAS_W = 1200;
export const CANVAS_H = 675;

/**
 * Canvas lógico fixo de 1200 × 675 (16:9), escalado proporcionalmente.
 * Redimensionar apenas altera a escala — nunca remonta o conteúdo,
 * então o progresso da criança é preservado.
 */
export function GameCanvas({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);
  const outer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const el = outer.current;
      const w = el?.clientWidth || window.innerWidth;
      const h = el?.clientHeight || window.innerHeight;
      setScale(Math.min(w / CANVAS_W, h / CANVAS_H));
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return (
    <div
      ref={outer}
      className="fixed inset-0 flex items-center justify-center overflow-hidden bg-reef-deep"
    >
      <div
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        className="relative shrink-0 overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
}
