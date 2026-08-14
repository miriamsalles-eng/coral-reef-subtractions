import { GameScreen } from "./GameScreen";
import { ImageNavButton } from "./NavButton";

/** Tela 1 — capa limpa: apenas a arte cover-title e o botão INICIAR. */
export function CoverScreen({ onStart }: { onStart: () => void }) {
  return (
    <GameScreen background="cover" ambient={false}>
      <ImageNavButton kind="start" label="Iniciar" onClick={onStart} x={900} y={520} width={250} />
    </GameScreen>
  );
}
