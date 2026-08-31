type MetricCardProps = {
  label: string;
  value: string;
  helper: string;
};

export function MetricCard({ label, value, helper }: MetricCardProps) {
  return (
    <div className="rounded-3xl panel p-5">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-3 text-3xl font-semibold text-white">{value}</div>
      <div className="mt-2 text-sm text-blue-200">{helper}</div>
    </div>
  );
}
