import { useEffect, useMemo } from "react";
import { ANIMALS, GROUP_OF_TEN, type AnimalKey } from "@/data/assets";
import { useInteractionTimers } from "@/lib/useInteractionTimers";

export type ExitStyle = "swim" | "drift" | "behind";

export interface SceneSpec {
  /** 1 = mostra um grupo de 10 peixes (nunca "cardume = 10"). */
  groupOfTen?: boolean;
  groupLabel?: string;
  units: Array<{ species: AnimalKey; count: number }>;
  /** Quantos de cada espécie saem (sempre os últimos da fila). */
  leaving?: Array<{ species: AnimalKey; count: number }>;
  layout: "row" | "grid" | "group-and-singles" | "mixed";
  exit?: ExitStyle;
}

interface Item {
  key: string;
  species: AnimalKey;
  x: number;
  y: number;
  h: number;
  leaving: boolean;
}

const HEIGHT: Record<AnimalKey, number> = {
  "fish-yellow": 86,
  "fish-turquoise": 86,
  seahorse: 116,
  starfish: 82,
};

const EXIT_KEYFRAME: Record<ExitStyle, string> = {
  swim: "swim-out",
  drift: "drift-out",
  behind: "hide-behind",
};

export const REMOVAL_DURATION = 1450;
export const REMOVAL_STAGGER = 300;

function flatten(spec: SceneSpec): Array<{ species: AnimalKey; leaving: boolean }> {
  const out: Array<{ species: AnimalKey; leaving: boolean }> = [];
  for (const u of spec.units) {
    const leavingCount = spec.leaving?.find((l) => l.species === u.species)?.count ?? 0;
    for (let i = 0; i < u.count; i++) {
      out.push({ species: u.species, leaving: i >= u.count - leavingCount });
    }
  }
  return out;
}

function buildItems(spec: SceneSpec): Item[] {
  const flat = flatten(spec);
  const items: Item[] = [];
  const push = (i: number, x: number, y: number) => {
    const f = flat[i];
    if (!f) return;
    items.push({ key: `${f.species}-${i}`, species: f.species, x, y, h: HEIGHT[f.species], leaving: f.leaving });
  };


  if (spec.layout === "group-and-singles") {
    const n = flat.length;
    const perRow = n <= 3 ? n : 3;
    const spacing = 108;
    const rows = Math.ceil(n / perRow);
    const centerX = 830;
    flat.forEach((_, i) => {
      const row = Math.floor(i / perRow);
      const col = i % perRow;
      const inRow = Math.min(perRow, n - row * perRow);
      const startX = centerX - ((inRow - 1) * spacing) / 2;
      const y = 285 - ((rows - 1) * 112) / 2 + row * 112;
      push(i, startX + col * spacing, y);
    });
    return items;
  }

  if (spec.layout === "mixed") {
    const fish = flat.map((f, i) => ({ ...f, i })).filter((f) => f.species !== "seahorse");
    const seahorses = flat.map((f, i) => ({ ...f, i })).filter((f) => f.species === "seahorse");
    const perRow = 5;
    fish.forEach((f, k) => {
      const row = Math.floor(k / perRow);
      const col = k % perRow;
      const inRow = Math.min(perRow, fish.length - row * perRow);
      const startX = 500 - ((inRow - 1) * 104) / 2;
      push(f.i, startX + col * 104, 205 + row * 96);
    });
    seahorses.forEach((s, k) => {
      const startX = 970 - ((seahorses.length - 1) * 88) / 2;
      push(s.i, startX + k * 88, 330);
    });
    return items;
  }

  if (spec.layout === "grid" && flat.length > 5) {
    const perRow = Math.ceil(flat.length / 2);
    const spacing = Math.min(132, 840 / perRow);
    flat.forEach((_, i) => {
      const row = Math.floor(i / perRow);
      const col = i % perRow;
      const inRow = Math.min(perRow, flat.length - row * perRow);
      const startX = 600 - ((inRow - 1) * spacing) / 2;
      push(i, startX + col * spacing, 232 + row * 116);
    });
    return items;
  }

  const spacing = Math.min(146, 840 / Math.max(flat.length, 1));
  const startX = 600 - ((flat.length - 1) * spacing) / 2;
  flat.forEach((_, i) => push(i, startX + i * spacing, 288 + (i % 2 === 0 ? -12 : 12)));
  return items;
}

/**
 * Cena com os animais. A retirada é lenta (≈1,45 s por animal), sequencial
 * (≈300 ms entre saídas) e feita por deslocamento real para fora da cena.
 */
export function AnimalScene({
  spec,
  running,
  replayKey,
  onFinished,
  hiddenAfterExit,
}: {
  spec: SceneSpec;
  /** true enquanto a retirada acontece */
  running: boolean;
  replayKey: number;
  onFinished?: () => void;
  /** true depois de concluída a retirada: quem saiu não volta */
  hiddenAfterExit: boolean;
}) {
  const items = useMemo(() => buildItems(spec), [spec]);
  const { after, clearInteractionTimers } = useInteractionTimers();
  const exit = spec.exit ?? "swim";

  const leavingItems = items.filter((i) => i.leaving);

  useEffect(() => {
    clearInteractionTimers();
    if (!running) return;
    const total = REMOVAL_DURATION + Math.max(0, leavingItems.length - 1) * REMOVAL_STAGGER + 250;
    after(total, () => onFinished?.());
    return clearInteractionTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, replayKey]);

  let leavingIndex = -1;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {spec.groupOfTen && (
        <div className="absolute" style={{ left: 200, top: 168, width: 250 }}>
          <div className="rounded-[2rem] border-4 border-dashed border-white/85 bg-white/20 p-2">
            <img
              src={GROUP_OF_TEN.url}
              alt=""
              className="animate-bob w-full"
              style={{ height: 200, objectFit: "contain" }}
              draggable={false}
            />
          </div>
          <p className="mt-1 text-center font-display text-[21px] font-semibold text-white drop-shadow-[0_2px_3px_rgb(0_0_0_/_0.5)]">
            {spec.groupLabel ?? "grupo de 10 peixes"}
          </p>
        </div>
      )}

      {items.map((item, idx) => {
        const a = ANIMALS[item.species];
        const w = item.h * a.ratio;
        const goesLeft = item.x < 560;
        const dx = goesLeft ? -(item.x + 260) : 1460 - item.x;
        const dy = exit === "drift" ? -160 : exit === "behind" ? 40 : 0;
        const isLeaving = item.leaving;
        if (isLeaving) leavingIndex += 1;
        const delay = leavingIndex * REMOVAL_STAGGER;

        const gone = hiddenAfterExit && isLeaving;

        return (
          <div
            key={item.key}
            className={
              gone
                ? "absolute rounded-2xl border-[3px] border-dashed border-reef-coral bg-reef-coral/20 opacity-55"
                : "absolute"
            }
            style={{
              left: item.x - w / 2 - (gone ? 4 : 0),
              top: item.y - item.h / 2 - (gone ? 14 : 0),
              width: w + (gone ? 8 : 0),
              height: item.h + (gone ? 8 : 0),
              transform: gone ? "scale(0.92)" : undefined,
              ["--dx" as string]: `${dx}px`,
              ["--dy" as string]: `${dy}px`,
              animation:
                running && isLeaving
                  ? `${EXIT_KEYFRAME[exit]} ${REMOVAL_DURATION}ms cubic-bezier(0.4,0,0.6,1) ${delay}ms forwards`
                  : undefined,
            }}
          >
            <img
              src={a.url}
              alt=""
              draggable={false}
              className={gone ? "h-full w-full select-none" : "animate-bob h-full w-full select-none"}
              style={{
                animationDelay: gone ? undefined : `${(idx % 5) * 0.4}s`,
                transform: goesLeft ? "scaleX(-1)" : undefined,
                filter: gone ? "grayscale(0.35)" : "drop-shadow(0 6px 8px rgb(0 0 0 / 0.15))",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
