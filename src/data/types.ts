import type { BackgroundKey, MaraPose } from "@/data/assets";
import type { SceneSpec } from "@/components/game/AnimalScene";
import type { SpeciesKey } from "@/lib/pt";

export type Composition = "A" | "B" | "C";

export interface AnswerSpec {
  mode: "number" | "operation" | "text";
  options: Array<{ value: number | string; label: string; ariaLabel?: string }>;
  correct: number | string;
}

export interface Challenge {
  id: string;
  narrationId: string;
  phaseLabel: string;
  sectionLabel: string;
  index: number;
  total: number;
  background: BackgroundKey;
  species: SpeciesKey;
  composition: Composition;
  scene: SceneSpec;
  /** Lembrete curto da quantidade inicial, visível durante toda a situação. */
  sceneNote?: string;
  /** Selo alternativo, mais discreto, exibido antes da retirada. */
  sceneNoteObserve?: string;
  /** Composição mais leve (balão menor/mais alto, Mara menor). */
  compact?: boolean;
  poses: { observe: MaraPose; ask: MaraPose; success: MaraPose };
  /** Etapa opcional: contar quantos há antes da retirada. */
  countStep?: {
    prompt: string;
    mara?: string;
    answer: AnswerSpec;
    success: string;
    /** Retomadas próprias da contagem inicial (nunca falam de retirada). */
    retries?: string[];
  };
  observe: { prompt: string; mara?: string; button: string };
  ask: {
    prompt: string;
    mara?: string;
    answer: AnswerSpec;
    /** Operação incompleta exibida acima das alternativas. */
    operation?: { a: number; b: number };
  };
  success: { mara: string };
  numbers?: { a: number; b: number; result: number; mara?: string };
  hints: string[];
}
