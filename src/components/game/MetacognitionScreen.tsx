import { useState } from "react";
import { GameScreen } from "./GameScreen";
import { Mara } from "./Mara";
import { Operation } from "./Operation";
import { SpeechBubble } from "./SpeechBubble";
import { PromptCard } from "./PromptCard";
import { ImageNavButton } from "./NavButton";
import { AnswerOptions, type AnswerValue } from "./AnswerOptions";
import { StaticScene, type StaticGroup } from "./StaticScene";
import { useNarration } from "@/lib/useNarration";

interface Situation {
  prompt: string;
  mara: string;
  groups: StaticGroup[];
  sceneNote: string;
  operation?: { a: number; b: number; result: number };
  options: Array<{ value: string; label: string; ariaLabel?: string }>;
  correct: string;
  size: "operation" | "text";
  success: string;
  retry: string;
}

const SITUATIONS: Situation[] = [
  {
    prompt: "Qual conta mostra o que aconteceu?",
    mara: "Veja quantos peixes havia, quais saíram e quantos ficaram.",
    groups: [{ species: "fish-yellow", count: 8, leaving: 3 }],
    sceneNote: "Havia 8 peixes — 3 saíram — ficaram 5",
    options: [
      { value: "8-3", label: "8 − 3 = 5", ariaLabel: "8 menos 3 é igual a 5" },
      { value: "8+3", label: "8 + 3 = 11", ariaLabel: "8 mais 3 é igual a 11" },
      { value: "5-3", label: "5 − 3 = 2", ariaLabel: "5 menos 3 é igual a 2" },
    ],
    correct: "8-3",
    size: "operation",
    success: "Isso mesmo! Havia 8 peixes, 3 saíram e ficaram 5.",
    retry: "Observe quantos peixes havia, quantos saíram e quantos ficaram.",
  },
  {
    prompt: "O que o número 4 mostra nessa situação?",
    mara: "Compare a conta com a cena do recife.",
    groups: [
      { species: "fish-yellow", count: 5 },
      { species: "fish-turquoise", count: 5, leaving: 2 },
      { species: "seahorse", count: 4, leaving: 2 },
    ],
    sceneNote: "Havia 14 animais — 4 saíram — ficaram 10",
    operation: { a: 14, b: 4, result: 10 },
    options: [
      { value: "havia", label: "Quantos animais havia" },
      { value: "sairam", label: "Quantos animais saíram" },
      { value: "ficaram", label: "Quantos animais ficaram" },
    ],
    correct: "sairam",
    size: "text",
    success: "Isso mesmo! O 4 mostra quantos animais saíram.",
    retry: "Observe a conta e veja qual quantidade foi retirada.",
  },
];

export function MetacognitionScreen({ onFinish }: { onFinish: () => void }) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [wrong, setWrong] = useState<AnswerValue[]>([]);

  const q = SITUATIONS[index]!;
  const { speak } = useNarration(`meta-${index}`);

  const choose = (value: AnswerValue) => {
    if (String(value) === q.correct) {
      setDone(true);
    } else {
      setWrong((w) => [...w, value]);
    }
  };

  const next = () => {
    if (index + 1 < SITUATIONS.length) {
      setIndex(index + 1);
      setDone(false);
      setWrong([]);
    } else {
      onFinish();
    }
  };

  const maraText = done ? q.success : wrong.length > 0 ? q.retry : q.mara;

  return (
    <GameScreen background="reflection">
      <PromptCard text={q.prompt} />

      <StaticScene
        groups={q.groups}
        x={230}
        y={q.operation ? 90 : 110}
        width={740}
        height={q.operation ? 52 : 62}
        note={q.sceneNote}
      />

      {q.operation && (
        <Operation
          a={q.operation.a}
          b={q.operation.b}
          result={q.operation.result}
          x={430}
          y={232}
          width={340}
          highlight="b"
        />
      )}

      <AnswerOptions
        options={q.options}
        onChoose={choose}
        chosen={wrong}
        correct={done ? q.correct : null}
        x={200}
        y={q.operation ? 336 : 300}
        width={800}
        size={q.size}
      />

      <Mara pose={done ? "feedback" : "thinking"} height={228} x={20} bottom={-8} />

      <SpeechBubble
        text={maraText}
        x={196}
        y={468}
        width={420}
        tail="left"
        tone={done ? "correct" : wrong.length > 0 ? "retry" : "hint"}
        onSpeak={(t) => speak(t, `reflexao.${index}`)}
      />

      {done && (
        <ImageNavButton kind="next" label="Seguir" onClick={next} x={998} y={598} width={182} />
      )}
    </GameScreen>
  );
}
