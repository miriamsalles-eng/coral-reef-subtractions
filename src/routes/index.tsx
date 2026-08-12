import { useCallback, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { GameCanvas } from "@/components/game/GameCanvas";
import { ChallengeScreen } from "@/components/game/ChallengeScreen";
import { StoryScreen } from "@/components/game/StoryScreen";
import { MetacognitionScreen } from "@/components/game/MetacognitionScreen";
import { PHASE1, TUTORIAL } from "@/data/phase1";
import { PHASE2 } from "@/data/phase2";

const TITLE = "Mara e as Subtrações no Recife de Corais";
const DESCRIPTION =
  "Atividade de matemática do 1º ano: com Mara, a tartaruga, a criança observa animais saindo do recife e descobre a subtração como retirada.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Stage =
  | { kind: "cover" }
  | { kind: "intro" }
  | { kind: "tutorial" }
  | { kind: "phase1"; index: number }
  | { kind: "transition" }
  | { kind: "phase2"; index: number }
  | { kind: "synthesis" }
  | { kind: "metacognition" }
  | { kind: "closure" };

function Index() {
  const [stage, setStage] = useState<Stage>({ kind: "cover" });

  const advance = useCallback(() => {
    setStage((current) => {
      switch (current.kind) {
        case "cover":
          return { kind: "intro" };
        case "intro":
          return { kind: "tutorial" };
        case "tutorial":
          return { kind: "phase1", index: 0 };
        case "phase1":
          return current.index + 1 < PHASE1.length
            ? { kind: "phase1", index: current.index + 1 }
            : { kind: "transition" };
        case "transition":
          return { kind: "phase2", index: 0 };
        case "phase2":
          return current.index + 1 < PHASE2.length
            ? { kind: "phase2", index: current.index + 1 }
            : { kind: "synthesis" };
        case "synthesis":
          return { kind: "metacognition" };
        case "metacognition":
          return { kind: "closure" };
        case "closure":
          return { kind: "cover" };
      }
    });
  }, []);

  const screen = useMemo(() => {
    switch (stage.kind) {
      case "cover":
        return (
          <StoryScreen
            id="cover"
            narrationId="capa"
            background="cover"
            title={TITLE}
            lines={["Uma aventura de contar e retirar no fundo do mar."]}
            mara="Oi! Eu sou Mara. Vamos descobrir juntos o que acontece quando alguns animais vão embora?"
            pose="celebrating"
            buttonKind="start"
            buttonLabel="Iniciar"
            onNext={advance}
          />
        );
      case "tutorial":
        return <ChallengeScreen challenge={TUTORIAL} onFinish={advance} />;
      case "phase1":
        return <ChallengeScreen challenge={PHASE1[stage.index]!} onFinish={advance} />;
      case "transition":
        return (
          <StoryScreen
            id="transition"
            narrationId="transicao"
            background="cave"
            title="Novos vizinhos do recife"
            lines={[
              "Agora vamos conhecer cavalos-marinhos e estrelas-do-mar.",
              "A ideia continua a mesma: alguns saem e outros ficam.",
            ]}
            mara="Se funciona com os peixes, funciona com qualquer animal do recife."
            pose="presenting"
            buttonLabel="Seguir"
            onNext={advance}
            side="right"
          />
        );
      case "phase2":
        return <ChallengeScreen challenge={PHASE2[stage.index]!} onFinish={advance} />;
      case "synthesis":
        return (
          <StoryScreen
            id="synthesis"
            narrationId="sintese"
            background="ten"
            title="O que aprendemos"
            lines={[
              "Quando alguns animais saem, a quantidade que fica é menor.",
              "O sinal de menos (−) mostra a retirada: 8 − 3 = 5.",
            ]}
            mara="Retirar é tirar de dentro do total. O que sobra é o resultado."
            pose="presenting1"
            buttonLabel="Seguir"
            onNext={advance}
          />
        );
      case "metacognition":
        return <MetacognitionScreen onFinish={advance} />;
      case "closure":
        return (
          <StoryScreen
            id="closure"
            narrationId="encerramento"
            background="final"
            title="Você conseguiu!"
            lines={[
              "Você observou, contou e descobriu quantos ficaram.",
              "Agora sabe usar a subtração para mostrar o que foi retirado.",
            ]}
            mara="Obrigada por explorar o recife comigo. Quer brincar de novo?"
            pose="celebrating"
            buttonKind="restart"
            buttonLabel="Recomeçar"
            onNext={advance}
          />
        );
    }
  }, [stage, advance]);

  return (
    <main className="min-h-screen bg-reef-deep">
      <h1 className="sr-only">{TITLE}</h1>
      <GameCanvas>{screen}</GameCanvas>
    </main>
  );
}
