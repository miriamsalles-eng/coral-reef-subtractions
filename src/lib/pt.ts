/** Concordância em português — singular e plural centralizados. */

export type SpeciesKey = "fish" | "seahorse" | "starfish" | "animal";

const WORDS: Record<SpeciesKey, { one: string; many: string }> = {
  fish: { one: "peixe", many: "peixes" },
  seahorse: { one: "cavalo-marinho", many: "cavalos-marinhos" },
  starfish: { one: "estrela-do-mar", many: "estrelas-do-mar" },
  animal: { one: "animal", many: "animais" },
};

export function noun(species: SpeciesKey, n: number): string {
  const w = WORDS[species];
  return n === 1 ? w.one : w.many;
}

export function countNoun(species: SpeciesKey, n: number): string {
  return `${n} ${noun(species, n)}`;
}

/** "Havia 5 peixes." — nunca "Haviam". */
export function havia(species: SpeciesKey, n: number): string {
  return `Havia ${countNoun(species, n)}`;
}

/** "saiu 1 peixe" / "saíram 2 peixes" */
export function saiu(species: SpeciesKey, n: number): string {
  return `${n === 1 ? "saiu" : "saíram"} ${countNoun(species, n)}`;
}

/** "ficou 1 peixe" / "ficaram 5 peixes" */
export function ficou(species: SpeciesKey, n: number): string {
  return `${n === 1 ? "ficou" : "ficaram"} ${countNoun(species, n)}`;
}

/** "Quantos peixes ficaram?" */
export function quantosFicaram(species: SpeciesKey): string {
  return `Quantos ${noun(species, 2)} ficaram?`;
}

export const MINUS = "−";

export function operationText(a: number, b: number, r: number | string): string {
  return `${a} ${MINUS} ${b} = ${r}`;
}
