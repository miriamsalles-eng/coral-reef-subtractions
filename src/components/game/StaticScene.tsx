import { ANIMALS, type AnimalKey } from "@/data/assets";

export interface StaticGroup {
  species: AnimalKey;
  count: number;
  /** Quantos, dentre os últimos, saíram da cena. */
  leaving?: number;
}

/**
 * Representação estática (sem animação) de uma situação já resolvida:
 * quem havia, quem saiu (marcado) e quem ficou.
 */
export function StaticScene({
  groups,
  x,
  y,
  width,
  height = 66,
  gap = 12,
  note,
}: {
  groups: StaticGroup[];
  x: number;
  y: number;
  width: number;
  height?: number;
  gap?: number;
  note?: string;
}) {
  const items: Array<{ key: string; species: AnimalKey; leaving: boolean }> = [];
  groups.forEach((g, gi) => {
    const leavingCount = g.leaving ?? 0;
    for (let i = 0; i < g.count; i++) {
      items.push({ key: `${gi}-${g.species}-${i}`, species: g.species, leaving: i >= g.count - leavingCount });
    }
  });

  return (
    <div className="absolute" style={{ left: x, top: y, width }}>
      <div className="flex flex-wrap items-end justify-center" style={{ gap }}>
        {items.map((item) => {
          const a = ANIMALS[item.species];
          const w = height * a.ratio;
          return (
            <div
              key={item.key}
              className={
                item.leaving
                  ? "rounded-2xl border-[3px] border-dashed border-reef-coral bg-reef-coral/15 p-1 opacity-70"
                  : "p-1"
              }
              style={{ width: w + 8, height: height + 8 }}
            >
              <img
                src={a.url}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="h-full w-full select-none object-contain"
                style={{ filter: "drop-shadow(0 4px 6px rgb(0 0 0 / 0.18))" }}
              />
            </div>
          );
        })}
      </div>
      {note && (
        <p className="mt-2 text-center font-display text-[22px] font-semibold text-white drop-shadow-[0_2px_3px_rgb(0_0_0_/_0.5)]">
          {note}
        </p>
      )}
    </div>
  );
}
