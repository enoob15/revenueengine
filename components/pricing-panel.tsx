import { PricingExperiment } from "@/lib/data/pricing-experiments";

type PricingPanelProps = {
  experiments: PricingExperiment[];
  insight: string;
};

export function PricingPanel({ experiments, insight }: PricingPanelProps) {
  return (
    <section className="rounded-3xl panel p-6">
      <div className="eyebrow">Pricing optimizer</div>
      <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">A/B experiment framework</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-400">
            Each experiment includes a control, a variant, and a single conversion metric so pricing moves stay measurable.
          </p>
        </div>
        <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">
          Gemini insight: {insight}
        </div>
      </div>
      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {experiments.map((experiment) => (
          <article key={experiment.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-medium text-white">{experiment.product}</div>
                <p className="mt-2 text-sm text-slate-300">{experiment.hypothesis}</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200">
                {experiment.status}
              </span>
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-200">
              <div>Control: {experiment.control}</div>
              <div>Variant: {experiment.variant}</div>
              <div>Metric: {experiment.metric}</div>
              <div>Expected lift: {experiment.expectedLift}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
