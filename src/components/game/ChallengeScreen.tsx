import { useEffect, useMemo, useState } from "react";
import { AnimalScene } from "./AnimalScene";
import { AnswerOptions, type AnswerValue } from "./AnswerOptions";
import { GameScreen } from "./GameScreen";
import { Mara } from "./Mara";
import { Operation } from "./Operation";
import { ProgressIndicator } from "./ProgressIndicator";
import { PromptCard } from "./PromptCard";
import { ControlButton, ImageNavButton } from "./NavButton";
import { SpeechBubble } from "./SpeechBubble";
import { useInteractionTimers } from "@/lib/useInteractionTimers";
import { useNarration } from "@/lib/useNarration";
import type { Challenge } from "@/data/types";

type Step = "count" | "observe" | "animating" | "ask" | "success" | "numbers";

interface Layout {
  mara: { x: number; height: number; bottom: number };
  bubble: { x: number; y: number; width: number; tail: "left" | "right" } | null;
  answers: { x: number; y: number; width: number };
}

const LAYOUTS: Record<Challenge["composition"], Layout> = {
  A: {
    mara: { x: 18, height: 248, bottom: -8 },
    bubble: { x: 196, y: 452, width: 356, tail: "left" },
    answers: { x: 590, y: 456, width: 560 },
  },
  B: {
    mara: { x: 848, height: 226, bottom: -6 },
    bubble: { x: 512, y: 450, width: 316, tail: "right" },
    answers: { x: 30, y: 456, width: 470 },
  },
  C: {
    mara: { x: 16, height: 206, bottom: -6 },
    bubble: { x: 176, y: 566, width: 440, tail: "left" },
    answers: { x: 210, y: 452, width: 950 },
  },
};

const NAV = { x: 998, y: 598, width: 182 };
const CONTROL = {
  observe: { x: 878, y: 598, width: 302 },
  replay: { x: 946, y: 600, width: 234 },
  numbers: { x: 866, y: 600, width: 314 },
};

export function ChallengeScreen({
  challenge,
  onFinish,
}: {
  challenge: Challenge;
  onFinish: () => void;
}) {
  const layout = LAYOUTS[challenge.composition];
  const { after, clearInteractionTimers } = useInteractionTimers();
  const { speak, stop } = useNarration(challenge.id);

  const [step, setStep] = useState<Step>(challenge.countStep ? "count" : "observe");
  const [wrong, setWrong] = useState<AnswerValue[]>([]);
  const [countWrong, setCountWrong] = useState<AnswerValue[]>([]);
  const [countDone, setCountDone] = useState(false);
  const [hintIndex, setHintIndex] = useState(-1);
  const [replayKey, setReplayKey] = useState(0);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    clearInteractionTimers();
    stop();
    setStep(challenge.countStep ? "count" : "observe");
    setWrong([]);
    setCountWrong([]);
    setCountDone(false);
    setHintIndex(-1);
    setReplayKey(0);
    setRemoved(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge.id]);

  const startRemoval = () => {
    clearInteractionTimers();
    setRemoved(false);
    setReplayKey((k) => k + 1);
    setStep("animating");
  };

  const replay = () => {
    clearInteractionTimers();
    stop();
    setRemoved(false);
    setStep("animating");
    after(500, () => setReplayKey((k) => k + 1));
  };

  const onRemovalFinished = () => {
    setRemoved(true);
    setStep("ask");
  };

  const handleCount = (value: AnswerValue) => {
    if (value === challenge.countStep?.answer.correct) {
      setCountDone(true);
      setHintIndex(-1);
      after(1200, () => setStep("observe"));
    } else {
      setCountWrong((w) => [...w, value]);
      setHintIndex((i) => i + 1);
    }
  };

  const handleAnswer = (value: AnswerValue) => {
    if (value === challenge.ask.answer.correct) {
      setHintIndex(-1);
      setStep("success");
    } else {
      setWrong((w) => [...w, value]);
      setHintIndex((i) => i + 1);
    }
  };

  const hint = hintIndex >= 0 ? challenge.hints[Math.min(hintIndex, challenge.hints.length - 1)] : null;

  const { prompt, maraText, pose, tone } = useMemo(() => {
    switch (step) {
      case "count":
        return {
          prompt: challenge.countStep!.prompt,
          maraText: countDone ? challenge.countStep!.success : (hint ?? challenge.countStep!.mara),
          pose: countDone ? challenge.poses.success : challenge.poses.observe,
          tone: countDone ? ("correct" as const) : hint ? ("retry" as const) : ("hint" as const),
        };
      case "observe":
        return {
          prompt: challenge.observe.prompt,
          maraText: challenge.observe.mara,
          pose: challenge.poses.observe,
          tone: "hint" as const,
        };
      case "animating":
        return {
          prompt: "Observe com atenção o que está acontecendo.",
          maraText: undefined,
          pose: challenge.poses.observe,
          tone: "hint" as const,
        };
      case "ask":
        return {
          prompt: challenge.ask.prompt,
          maraText: hint ?? challenge.ask.mara,
          pose: challenge.poses.ask,
          tone: hint ? ("retry" as const) : ("hint" as const),
        };
      case "success":
        return {
          prompt: challenge.ask.prompt,
          maraText: challenge.success.mara,
          pose: challenge.poses.success,
          tone: "correct" as const,
        };
      case "numbers":
        return {
          prompt: "Agora veja a mesma situação com números.",
          maraText: challenge.numbers?.mara,
          pose: challenge.poses.success,
          tone: "correct" as const,
        };
    }
  }, [step, hint, countDone, challenge]);

  const showAnswers = step === "count" || step === "ask" || step === "success";
  const answerSpec = step === "count" ? challenge.countStep!.answer : challenge.ask.answer;
  const chosen = step === "count" ? countWrong : wrong;
  const correctValue =
    step === "count"
      ? countDone
        ? challenge.countStep!.answer.correct
        : null
      : step === "success"
        ? challenge.ask.answer.correct
        : null;

  const askOperation = step === "ask" || step === "success" ? challenge.ask.operation : undefined;
  const bubbleY = askOperation && challenge.composition === "C" ? 592 : layout.bubble?.y;

  return (
    <GameScreen background={challenge.background}>
      <ProgressIndicator
        phaseLabel={challenge.phaseLabel}
        sectionLabel={challenge.sectionLabel}
        current={challenge.total ? challenge.index : undefined}
        total={challenge.total || undefined}
      />
      <PromptCard text={prompt} />

      <AnimalScene
        spec={challenge.scene}
        running={step === "animating"}
        replayKey={replayKey}
        hiddenAfterExit={removed}
        onFinished={onRemovalFinished}
      />

      <Mara pose={pose} height={layout.mara.height} x={layout.mara.x} bottom={layout.mara.bottom} />

      {maraText && layout.bubble && (
        <SpeechBubble
          text={maraText}
          x={layout.bubble.x}
          y={bubbleY ?? layout.bubble.y}
          width={layout.bubble.width}
          tail={layout.bubble.tail}
          tone={tone}
          onSpeak={(t) => speak(t, challenge.narrationId)}
        />
      )}

      {askOperation && (
        <Operation
          a={askOperation.a}
          b={askOperation.b}
          result={step === "success" ? challenge.ask.answer.correct : "?"}
          x={430}
          y={362}
          width={340}
        />
      )}

      {showAnswers && (
        <AnswerOptions
          options={answerSpec.options}
          onChoose={step === "count" ? handleCount : handleAnswer}
          chosen={chosen}
          correct={correctValue}
          x={layout.answers.x}
          y={layout.answers.y}
          width={layout.answers.width}
          size={answerSpec.mode}
        />
      )}

      {step === "observe" && (
        <ControlButton
          label={challenge.observe.button}
          onClick={startRemoval}
          x={CONTROL.observe.x}
          y={CONTROL.observe.y}
          width={CONTROL.observe.width}
        />
      )}

      {step === "ask" && (
        <ControlButton
          label="Ver novamente"
          onClick={replay}
          x={CONTROL.replay.x}
          y={CONTROL.replay.y}
          width={CONTROL.replay.width}
        />
      )}

      {step === "success" && challenge.numbers && (
        <ControlButton
          label="Mostrar com números"
          onClick={() => setStep("numbers")}
          x={CONTROL.numbers.x}
          y={CONTROL.numbers.y}
          width={CONTROL.numbers.width}
        />
      )}

      {step === "success" && !challenge.numbers && (
        <ImageNavButton kind="next" label="Seguir" onClick={onFinish} x={NAV.x} y={NAV.y} width={NAV.width} />
      )}

      {step === "numbers" && challenge.numbers && (
        <>
          <Operation
            a={challenge.numbers.a}
            b={challenge.numbers.b}
            result={challenge.numbers.result}
            x={430}
            y={362}
            width={340}
          />
          <ImageNavButton kind="next" label="Seguir" onClick={onFinish} x={NAV.x} y={NAV.y} width={NAV.width} />
        </>
      )}
    </GameScreen>
  );
}
