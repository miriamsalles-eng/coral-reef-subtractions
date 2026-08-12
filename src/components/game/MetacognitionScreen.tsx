import { useState } from "react";
import { GameScreen } from "./GameScreen";
import { Mara } from "./Mara";
import { SpeechBubble } from "./SpeechBubble";
import { PromptCard } from "./PromptCard";
import { ImageNavButton } from "./NavButton";
import { AnswerOptions, type AnswerValue } from "./AnswerOptions";
import { useNarration } from "@/lib/useNarration";

interface Reflection {
  prompt: string;
  mara: string;
  options: Array<{ value: string; label: string }>;
  /** Quando existe, há uma resposta correta; senão toda escolha é acolhida. */
  correct?: string;
  feedback: Record<string, string>;
  retry?: string;
}

const QUESTIONS: Reflection[] = [
  {
    prompt: "Como você descobriu quantos animais ficaram?",
    mara: "Não existe pressa. Pense em como você fez.",
    options: [
      { value: "contei", label: "Contei os que ficaram" },
      { value: "voltei", label: "Voltei contando de trás" },
      { value: "grupo", label: "Usei o grupo de 10" },
    ],
    feedback: {
      contei: "Contar quem ficou é um jeito seguro de conferir a resposta.",
      voltei: "Voltar contando também funciona: tirar é andar para trás na contagem.",
      grupo: "Usar o grupo de 10 ajuda muito quando há muitos animais.",
    },
  },
  {
    prompt: "O que o sinal de menos (−) mostra na conta?",
    mara: "Lembre das cenas: os animais saíram do recife.",
    options: [
      { value: "retirada", label: "Que uma quantidade foi retirada" },
      { value: "juntar", label: "Que juntamos duas quantidades" },
      { value: "repetir", label: "Que repetimos a quantidade" },
    ],
    correct: "retirada",
    feedback: {
      retirada: "Isso mesmo! O sinal de menos mostra que algo foi retirado do total.",
    },
    retry: "Nas cenas, os animais saíram. O que acontece com o total quando alguém sai?",
  },
];

export function MetacognitionScreen({ onFinish }: { onFinish: () => void }) {
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [wrong, setWrong] = useState<AnswerValue[]>([]);

  const q = QUESTIONS[index]!;
  const { speak } = useNarration(`meta-${index}`);

  const choose = (value: AnswerValue) => {
    const v = String(value);
    if (q.correct && v !== q.correct) {
      setWrong((w) => [...w, v]);
      return;
    }
    setChosen(v);
  };

  const next = () => {
    if (index + 1 < QUESTIONS.length) {
      setIndex(index + 1);
      setChosen(null);
      setWrong([]);
    } else {
      onFinish();
    }
  };

  const maraText = chosen
    ? (q.feedback[chosen] ?? "Boa reflexão!")
    : wrong.length > 0
      ? (q.retry ?? q.mara)
      : q.mara;

  return (
    <GameScreen background="reflection">
      <PromptCard text={q.prompt} />

      <Mara
        pose={chosen ? "feedback" : "thinking"}
        height={252}
        x={20}
        bottom={-8}
      />

      <SpeechBubble
        text={maraText}
        x={200}
        y={452}
        width={400}
        tail="left"
        tone={chosen ? "correct" : wrong.length > 0 ? "retry" : "hint"}
        onSpeak={(t) => speak(t, `reflexao.${index}`)}
      />

      <AnswerOptions
        options={q.options}
        onChoose={choose}
        chosen={wrong}
        correct={chosen}
        x={190}
        y={200}
        width={960}
        size="text"
      />

      {chosen && (
        <ImageNavButton kind="next" label="Seguir" onClick={next} x={998} y={598} width={182} />
      )}
    </GameScreen>
  );
}
