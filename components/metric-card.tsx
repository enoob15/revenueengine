const accentMap = {
  signal: "from-signal/40 to-transparent",
  cyan: "from-cyan/40 to-transparent",
  ember: "from-ember/40 to-transparent",
  gold: "from-gold/40 to-transparent",
};

export function MetricCard({
  title,
  value,
  detail,
  accent,
}: {
  title: string;
  value: string;
  detail: string;
  accent: keyof typeof accentMap;
}) {
  return (
    <article className="panel relative overflow-hidden p-5">
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accentMap[accent]}`} />
      <p className="data-kicker">{title}</p>
      <p className="metric-number mt-4">{value}</p>
      <p className="mt-2 text-sm text-white/70">{detail}</p>
    </article>
  );
}
