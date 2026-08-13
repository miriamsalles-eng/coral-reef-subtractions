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
    mara: "Veja quantos animais havia, quais saíram e quantos ficaram.",
    groups: [{ species: "fish-yellow", count: 9, leaving: 3 }],
    sceneNote: "Havia 9 animais — 3 saíram — ficaram 6",
    options: [
      { value: "9-3", label: "9 − 3 = 6", ariaLabel: "9 menos 3 é igual a 6" },
      { value: "9+3", label: "9 + 3 = 12", ariaLabel: "9 mais 3 é igual a 12" },
      { value: "6-3", label: "6 − 3 = 3", ariaLabel: "6 menos 3 é igual a 3" },
    ],
    correct: "9-3",
    size: "operation",
    success: "Isso mesmo! Havia 9 animais, 3 saíram e ficaram 6.",
    retry: "Observe quantos havia, quantos saíram e quantos ficaram.",
  },
  {
    prompt: "O que o número 3 mostra nessa situação?",
    mara: "Compare a conta com a cena do recife.",
    groups: [
      { species: "fish-yellow", count: 4 },
      { species: "fish-turquoise", count: 4, leaving: 2 },
      { species: "seahorse", count: 3, leaving: 1 },
    ],
    sceneNote: "Havia 11 animais — 3 saíram — ficaram 8",
    operation: { a: 11, b: 3, result: 8 },
    options: [
      { value: "havia", label: "Quantos animais havia" },
      { value: "sairam", label: "Quantos animais saíram" },
      { value: "ficaram", label: "Quantos animais ficaram" },
    ],
    correct: "sairam",
    size: "text",
    success: "Isso mesmo! O 3 mostra quantos animais saíram.",
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
        x={q.operation ? 150 : 180}
        y={q.operation ? 84 : 110}
        width={q.operation ? 900 : 860}
        height={q.operation ? 42 : 62}
        gap={8}
        {...(done ? { note: q.sceneNote } : {})}
      />

      {q.operation && (
        <Operation
          a={q.operation.a}
          b={q.operation.b}
          result={q.operation.result}
          x={430}
          y={206}
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
        y={q.operation ? 320 : 300}
        width={800}
        size={q.size}
      />


      <Mara pose={done ? "feedback" : "thinking"} height={286} x={16} bottom={-8} facing="right" />

      <SpeechBubble
        text={maraText}
        x={320}
        y={468}
        width={420}
        tailSide="left"
        tone={done ? "correct" : wrong.length > 0 ? "retry" : "hint"}
        onSpeak={(t) => speak(t, `reflexao.${index}`)}
      />


      {done && (
        <ImageNavButton kind="next" label="Seguir" onClick={next} x={998} y={598} width={182} />
      )}
    </GameScreen>
  );
}
