import { useState } from "react";
import { ANIMALS } from "@/data/assets";
import { GameScreen } from "./GameScreen";
import { Mara } from "./Mara";
import { Operation } from "./Operation";
import { PromptCard } from "./PromptCard";
import { SpeechBubble } from "./SpeechBubble";
import { ImageNavButton } from "./NavButton";
import { StaticScene } from "./StaticScene";
import { useNarration } from "@/lib/useNarration";

const LINES = [
  "Os animais eram diferentes, mas em todas essas situações alguns saíram.",
  "Quando sabemos quantos havia e quantos saíram, podemos descobrir quantos ficaram.",
];

const CARDS = [
  { label: "Peixes", species: ["fish-yellow", "fish-turquoise", "fish-yellow"] as const },
  { label: "Cavalos-marinhos", species: ["seahorse", "seahorse", "seahorse"] as const },
  { label: "Estrelas-do-mar", species: ["starfish", "starfish", "starfish"] as const },
];

export function SynthesisScreen({ onFinish }: { onFinish: () => void }) {
  const [line, setLine] = useState(0);
  const { speak } = useNarration("synthesis");

  const next = () => (line + 1 < LINES.length ? setLine(line + 1) : onFinish());

  return (
    <GameScreen background="ten">
      <PromptCard text="O que aprendemos" />

      <div className="absolute flex justify-center gap-6" style={{ left: 40, top: 92, width: 1120 }}>
        {CARDS.map((card) => (
          <div
            key={card.label}
            className="animate-soft-in flex w-[330px] flex-col items-center rounded-3xl border-4 border-white/70 bg-white/20 px-3 py-2"
          >
            <div className="flex h-[72px] items-end justify-center gap-2">
              {card.species.map((s, i) => {
                const a = ANIMALS[s];
                return (
                  <img
                    key={`${card.label}-${i}`}
                    src={a.url}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="select-none object-contain"
                    style={{ height: 62, width: 62 * a.ratio }}
                  />
                );
              })}
            </div>
            <p className="mt-1 font-display text-[21px] font-semibold text-white drop-shadow-[0_2px_3px_rgb(0_0_0_/_0.5)]">
              {card.label}
            </p>
          </div>
        ))}
      </div>

      <StaticScene
        groups={[{ species: "fish-yellow", count: 10, leaving: 3 }]}
        x={260}
        y={238}
        width={880}
        height={54}
      />

      <p
        className="absolute text-center font-display text-[24px] font-semibold text-white drop-shadow-[0_2px_3px_rgb(0_0_0_/_0.5)]"
        style={{ left: 430, top: 322, width: 340 }}
      >
        Ficaram 7
      </p>

      <Operation a={10} b={3} result={7} x={430} y={368} width={340} />


      <Mara
        pose={line === 0 ? "presenting1" : "celebrating"}
        height={306}
        x={16}
        bottom={-8}
        facing="right"
      />

      <SpeechBubble
        text={LINES[line]!}
        x={266}
        y={470}
        width={430}
        tailSide="left"
        tone="correct"
        onSpeak={(t) => speak(t, `sintese.${line}`)}
      />


      <ImageNavButton kind="next" label="Seguir" onClick={next} x={998} y={598} width={182} />
    </GameScreen>
  );
}
