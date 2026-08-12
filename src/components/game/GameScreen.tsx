import type { ReactNode } from "react";
import { BACKGROUNDS, type BackgroundKey } from "@/data/assets";
import { CANVAS_H, CANVAS_W } from "./GameCanvas";

const BUBBLES = [
  { x: 90, size: 16, delay: 0, dur: 15 },
  { x: 250, size: 10, delay: 4, dur: 18 },
  { x: 1080, size: 14, delay: 2, dur: 16 },
  { x: 960, size: 9, delay: 7, dur: 20 },
  { x: 620, size: 8, delay: 10, dur: 22 },
];

/** Fundo da tela + movimento ambiental discreto. */
export function GameScreen({
  background,
  children,
  ambient = true,
}: {
  background: BackgroundKey;
  children: ReactNode;
  ambient?: boolean;
}) {
  return (
    <div className="absolute inset-0" style={{ width: CANVAS_W, height: CANVAS_H }}>
      <img
        src={BACKGROUNDS[background]}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {ambient && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {BUBBLES.map((b, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white/50"
              style={{
                left: b.x,
                bottom: -30,
                width: b.size,
                height: b.size,
                animation: `bubble-up ${b.dur}s linear ${b.delay}s infinite`,
              }}
            />
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
