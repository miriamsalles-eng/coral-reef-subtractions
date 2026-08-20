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

type Step = "count" | "observe" | "pause" | "animating" | "ask" | "success" | "numbers";

interface Layout {
  mara: { x: number; height: number; bottom: number; facing: "left" | "right" };
  bubble: {
    x: number;
    y?: number;
    /** ancoragem pela base — o balão cresce para cima e nunca é cortado */
    bottom?: number;
    width: number;
    tailSide: "left" | "right";
  } | null;
  answers: { x: number; y: number; width: number };
  /** operação alinhada ao balão (mesma coluna) quando ambos aparecem */
  operation: { x: number; y: number; width: number };
}

const LAYOUTS: Record<Challenge["composition"], Layout> = {
  A: {
    mara: { x: 6, height: 300, bottom: -8, facing: "right" },
    bubble: { x: 312, y: 452, width: 344, tailSide: "left" },
    answers: { x: 676, y: 456, width: 500 },
    operation: { x: 314, y: 352, width: 340 },
  },
  B: {
    mara: { x: 856, height: 282, bottom: -6, facing: "left" },
    bubble: { x: 498, y: 450, width: 330, tailSide: "right" },
    answers: { x: 30, y: 456, width: 440 },
    operation: { x: 493, y: 350, width: 340 },
  },
  C: {
    mara: { x: 6, height: 258, bottom: -6, facing: "right" },
    bubble: { x: 272, y: 566, width: 440, tailSide: "left" },
    answers: { x: 286, y: 452, width: 874 },
    operation: { x: 430, y: 352, width: 340 },
  },
};

/**
 * Tela "mostrar com números": sem alternativas, os três elementos formam
 * um conjunto horizontal — OPERAÇÃO → BALÃO → MARA.
 */
const NUMBERS_GROUP = {
  operation: { x: 24, y: 470, width: 300 },
  bubble: { x: 336, y: 452, width: 400, tailSide: "right" as const },
  mara: { x: 744, height: 292, bottom: -10, facing: "left" as const },
};

const NAV = { x: 998, y: 598, width: 182 };
const CONTROL = {
  observe: { x: 878, y: 598, width: 302 },
  replay: { x: 946, y: 600, width: 234 },
  numbers: { x: 866, y: 600, width: 314 },
};

/**
 * Fase 2: enunciado no topo, animais no centro, operação e alternativas
 * logo ABAIXO da cena (nunca sobre os animais) e Mara/balão/botões na base.
 */
/**
 * Zona reservada ao conjunto balão + botão de áudio na Fase 2.
 * Ancorada pela BASE: o balão cresce para cima conforme o texto,
 * mantendo ~56 px de margem inferior e ~250 px de distância horizontal
 * do botão "Mostrar com números" (x 34–348).
 */
const PHASE2_FEEDBACK_SAFE_ZONE = {
  x: 590,
  width: 400,
  bottom: 40,
  tailSide: "right" as const,
};

const COMPACT_LAYOUT: Layout = {
  mara: { x: 952, height: 236, bottom: -6, facing: "left" },
  bubble: {
    x: PHASE2_FEEDBACK_SAFE_ZONE.x,
    bottom: PHASE2_FEEDBACK_SAFE_ZONE.bottom,
    width: PHASE2_FEEDBACK_SAFE_ZONE.width,
    tailSide: PHASE2_FEEDBACK_SAFE_ZONE.tailSide,
  },
  answers: { x: 344, y: 424, width: 560 },
  operation: { x: 46, y: 424, width: 272 },
};
const COMPACT_NAV = { x: 34, y: 596, width: 182 };
const COMPACT_CONTROL = {
  observe: { x: 34, y: 596, width: 302 },
  replay: { x: 34, y: 596, width: 234 },
  numbers: { x: 34, y: 596, width: 314 },
};

export function ChallengeScreen({
  challenge,
  onFinish,
}: {
  challenge: Challenge;
  onFinish: () => void;
}) {
  const base = LAYOUTS[challenge.composition];
  const layout: Layout = challenge.compact ? COMPACT_LAYOUT : base;
  const nav = challenge.compact ? COMPACT_NAV : NAV;
  const control = challenge.compact ? COMPACT_CONTROL : CONTROL;

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

  /** Uma única repetição: limpa timers, restaura a cena, espera e anima uma vez. */
  const replayRemovalAnimation = () => {
    clearInteractionTimers();
    stop();
    setRemoved(false);
    setStep("pause");
    after(500, () => {
      setReplayKey((k) => k + 1);
      setStep("animating");
    });
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

  const pickMessage = (list: string[] | undefined, i: number) =>
    list && list.length > 0 ? list[Math.min(i, list.length - 1)] : null;

  /** Retomadas da subtração (após a retirada). */
  const hint = hintIndex >= 0 ? pickMessage(challenge.hints, hintIndex) : null;
  /** Retomadas exclusivas da contagem inicial — nunca falam de retirada. */
  const countHint = hintIndex >= 0 ? pickMessage(challenge.countStep?.retries, hintIndex) : null;

  const { prompt, maraText, pose, tone } = useMemo(() => {
    switch (step) {
      case "count":
        return {
          prompt: challenge.countStep!.prompt,
          maraText: countDone
            ? challenge.countStep!.success
            : (countHint ?? challenge.countStep!.mara),
          pose: countDone ? challenge.poses.success : challenge.poses.observe,
          tone: countDone ? ("correct" as const) : countHint ? ("retry" as const) : ("hint" as const),
        };
      case "observe":
        return {
          prompt: challenge.observe.prompt,
          maraText: challenge.observe.mara,
          pose: challenge.poses.observe,
          tone: "hint" as const,
        };
      case "pause":
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
  }, [step, hint, countHint, countDone, challenge]);

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
  const isNumbers = step === "numbers" && !!challenge.numbers;

  // Na etapa "mostrar com números" os três elementos formam um conjunto horizontal.
  const maraSpec = isNumbers ? NUMBERS_GROUP.mara : layout.mara;
  const bubbleSpec: Layout["bubble"] = isNumbers ? NUMBERS_GROUP.bubble : layout.bubble;
  const bubbleY =
    !isNumbers && !challenge.compact && askOperation && challenge.composition === "C"
      ? 592
      : bubbleSpec?.y;

  const isObserving = step === "count" || step === "observe" || step === "pause" || step === "animating";
  const sceneNote = (isObserving && challenge.sceneNoteObserve) || challenge.sceneNote;


  return (
    <GameScreen background={challenge.background}>
      <ProgressIndicator
        phaseLabel={challenge.phaseLabel}
        sectionLabel={challenge.sectionLabel}
        current={challenge.total ? challenge.index : undefined}
        total={challenge.total || undefined}
      />
      <PromptCard text={prompt} />

      {sceneNote && (
        <div
          className="animate-soft-in absolute rounded-full border-4 border-white/80 bg-prompt/92 px-5 py-1 text-center"
          style={{ left: 420, top: 92, width: 360 }}
        >
          <p className="font-display text-[21px] font-semibold text-prompt-foreground">
            {sceneNote}
          </p>
        </div>
      )}




      <AnimalScene
        spec={challenge.scene}
        running={step === "animating"}
        replayKey={replayKey}
        hiddenAfterExit={removed}
        onFinished={onRemovalFinished}
      />

      <Mara
        pose={pose}
        height={maraSpec.height}
        x={maraSpec.x}
        bottom={maraSpec.bottom}
        facing={maraSpec.facing}
      />

      {maraText && bubbleSpec && (
        <SpeechBubble
          text={maraText}
          x={bubbleSpec.x}
          {...(bubbleSpec.bottom !== undefined
            ? { bottom: bubbleSpec.bottom }
            : { y: bubbleY ?? 0 })}
          width={bubbleSpec.width}
          tailSide={bubbleSpec.tailSide}
          tone={tone}
          onSpeak={(t) => speak(t, challenge.narrationId)}
        />
      )}

      {askOperation && (
        <Operation
          a={askOperation.a}
          b={askOperation.b}
          result={step === "success" ? challenge.ask.answer.correct : "?"}
          x={layout.operation.x}
          y={layout.operation.y}
          width={layout.operation.width}
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
          x={control.observe.x}
          y={control.observe.y}
          width={control.observe.width}
        />
      )}

      {step === "ask" && (
        <ControlButton
          label="Ver novamente"
          onClick={replayRemovalAnimation}
          x={control.replay.x}
          y={control.replay.y}
          width={control.replay.width}
        />
      )}

      {step === "success" && challenge.numbers && (
        <ControlButton
          label="Mostrar com números"
          onClick={() => setStep("numbers")}
          x={control.numbers.x}
          y={control.numbers.y}
          width={control.numbers.width}
        />
      )}

      {step === "success" && !challenge.numbers && (
        <ImageNavButton kind="next" label="Seguir" onClick={onFinish} x={nav.x} y={nav.y} width={nav.width} />
      )}

      {step === "numbers" && challenge.numbers && (
        <>
          <Operation
            a={challenge.numbers.a}
            b={challenge.numbers.b}
            result={challenge.numbers.result}
            x={NUMBERS_GROUP.operation.x}
            y={NUMBERS_GROUP.operation.y}
            width={NUMBERS_GROUP.operation.width}
            fontSize={44}
          />

          {/* SEGUIR sempre no canto inferior direito nesta etapa. */}
          <ImageNavButton kind="next" label="Seguir" onClick={onFinish} x={NAV.x} y={NAV.y} width={NAV.width} />
        </>
      )}
    </GameScreen>
  );
}
