/** Identificação discreta de fase e posição, sempre fora do enunciado. */
export function ProgressIndicator({
  phaseLabel,
  sectionLabel,
  current,
  total,
}: {
  phaseLabel: string;
  sectionLabel: string;
  current?: number;
  total?: number;
}) {
  return (
    <div
      className="absolute rounded-2xl bg-reef-ink/45 px-4 py-2 text-left"
      style={{ left: 20, top: 20, width: 224 }}
      aria-label={`${phaseLabel}. ${sectionLabel}${current ? `, ${current} de ${total}` : ""}`}
    >
      <p className="font-display text-[19px] font-semibold leading-tight text-white">{phaseLabel}</p>
      <p className="text-[15px] leading-tight text-white/85">
        {sectionLabel}
        {current && total ? ` • ${current} de ${total}` : ""}
      </p>
    </div>
  );
}
