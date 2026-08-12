/** Enunciado — responde "o que eu preciso fazer?". Sempre no topo da tela. */
export function PromptCard({
  text,
  y = 16,
  x = 268,
  width = 820,
}: {
  text: string;
  y?: number;
  x?: number;
  width?: number;
}) {
  return (
    <div
      className="animate-soft-in absolute rounded-3xl border-4 border-reef-sun bg-prompt px-7 py-3 text-center shadow-[0_8px_20px_rgb(0_0_0_/_0.16)]"
      style={{ left: x, top: y, width }}
    >
      <h1
        className="font-display font-semibold text-prompt-foreground"
        style={{ fontSize: 32, lineHeight: 1.15 }}
      >
        {text}
      </h1>
    </div>
  );
}
