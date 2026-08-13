import type { Challenge } from "./types";
import { ficou, havia, quantosFicaram, saiu } from "@/lib/pt";

const PHASE = "Fase 2";
const SECTION = "Explorando o recife";

const nums = (values: number[]) => values.map((v) => ({ value: v, label: String(v) }));

export const PHASE2: Challenge[] = [
  {
    id: "s6",
    narrationId: "fase2.s6",
    phaseLabel: PHASE,
    sectionLabel: SECTION,
    index: 1,
    total: 3,
    background: "cave",
    species: "seahorse",
    composition: "A",
    scene: {
      units: [{ species: "seahorse", count: 7 }],
      leaving: [{ species: "seahorse", count: 3 }],
      layout: "grid",
      exit: "behind",
    },
    poses: { observe: "presenting", ask: "pointing", success: "feedback" },
    compact: true,
    observe: {
      prompt: `Observe: ${havia("seahorse", 7).toLowerCase()} aqui.`,
      mara: "Veja quantos havia e acompanhe os que saírem.",
      button: "Ver o que acontece",
    },
    ask: {
      prompt: quantosFicaram("seahorse"),
      answer: { mode: "number", options: nums([3, 4, 5]), correct: 4 },
    },
    success: {
      mara: `${havia("seahorse", 7)}, ${saiu("seahorse", 3)} para trás dos corais e ${ficou("seahorse", 4)}.`,
    },
    numbers: { a: 7, b: 3, result: 4, mara: "A mesma ideia dos peixes serve aqui também." },
    hints: [
      "Observe novamente os cavalos-marinhos que saíram.",
      "Conte os que ficaram na cena.",
    ],
  },
  {
    id: "s7",
    narrationId: "fase2.s7",
    phaseLabel: PHASE,
    sectionLabel: SECTION,
    index: 2,
    total: 3,
    background: "activity",
    species: "starfish",
    composition: "C",
    scene: {
      units: [{ species: "starfish", count: 9 }],
      leaving: [{ species: "starfish", count: 4 }],
      layout: "grid",
      exit: "drift",
    },
    poses: { observe: "presenting1", ask: "thinking", success: "feedback" },
    compact: true,
    observe: {
      prompt: "Havia 9 estrelas-do-mar.",
      mara: "Uma corrente suave vai levar algumas estrelas para longe.",
      button: "Ver o que acontece",
    },

    ask: {
      prompt: "Complete o que aconteceu.",
      answer: { mode: "number", options: nums([4, 5, 6]), correct: 5 },
      operation: { a: 9, b: 4 },
    },
    success: {
      mara: `${havia("starfish", 9)}, ${saiu("starfish", 4)} com a corrente e ${ficou("starfish", 5)}.`,
    },
    hints: [
      "Observe novamente as estrelas que a corrente levou.",
      "Conte as estrelas-do-mar que ficaram na cena.",
    ],
  },
  {
    id: "s8",
    narrationId: "fase2.s8",
    phaseLabel: PHASE,
    sectionLabel: SECTION,
    index: 3,
    total: 3,
    background: "activity",
    species: "animal",
    composition: "C",
    scene: {
      units: [
        { species: "fish-yellow", count: 5 },
        { species: "fish-turquoise", count: 5 },
        { species: "seahorse", count: 4 },
      ],
      leaving: [
        { species: "fish-turquoise", count: 2 },
        { species: "seahorse", count: 2 },
      ],
      layout: "mixed",
      exit: "swim",
    },
    sceneNote: "No início: 14 animais",
    sceneNoteObserve: "10 peixes + 4 cavalos-marinhos",
    compact: true,
    poses: { observe: "presenting", ask: "thinking", success: "celebrating" },
    observe: {
      prompt: "Observe: há 14 animais ao todo.",
      mara: "Observe o total. Agora veja quem vai sair.",
      button: "Ver o que acontece",
    },

    ask: {
      prompt: "Qual conta mostra o que aconteceu?",
      answer: {
        mode: "operation",
        options: [
          { value: "14-4", label: "14 − 4 = 10", ariaLabel: "14 menos 4 é igual a 10" },
          { value: "14+4", label: "14 + 4 = 18", ariaLabel: "14 mais 4 é igual a 18" },
          { value: "10-4", label: "10 − 4 = 6", ariaLabel: "10 menos 4 é igual a 6" },
        ],
        correct: "14-4",
      },
    },
    success: {
      mara: "Havia 14 animais. Saíram 4 e ficaram 10.",
    },

    hints: [
      "Havia 14 animais no começo. Quantos saíram?",
      "Nesta cena os animais saíram: a conta precisa ter o sinal de menos.",
    ],
  },
];
