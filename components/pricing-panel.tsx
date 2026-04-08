import { PricingBenchmark, PricingExperiment } from '@/lib/types';
import { formatCurrency } from '@/lib/format';

export function PricingPanel({
  experiments,
  benchmarks,
}: {
  experiments: PricingExperiment[];
  benchmarks: PricingBenchmark[];
}) {
  const benchmarkMap = new Map(benchmarks.map((entry) => [entry.productSlug, entry]));

  return (
    <div className="panel p-6">
      <p className="eyebrow">Pricing Optimizer</p>
      <h2 className="mt-2 text-2xl font-semibold">Active pricing experiments</h2>
      <div className="mt-5 space-y-4">
        {experiments.slice(0, 5).map((experiment) => {
          const benchmark = benchmarkMap.get(experiment.productSlug);

          return (
            <article key={experiment.productSlug} className="rounded-3xl border border-white/10 bg-white/4 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-medium">{experiment.productName}</h3>
                <span className="chip capitalize">{experiment.confidence}</span>
              </div>
              <p className="mt-3 text-sm text-white/70">{experiment.rationale}</p>
              <div className="mt-4 grid gap-3 text-sm text-white/70 sm:grid-cols-3">
                <div>
                  <div className="data-kicker">Current</div>
                  <div className="mt-1 text-lg text-white">{formatCurrency(experiment.currentAnchor)}</div>
                </div>
                <div>
                  <div className="data-kicker">Recommended</div>
                  <div className="mt-1 text-lg text-white">{formatCurrency(experiment.recommendedAnchor)}</div>
                </div>
                <div>
                  <div className="data-kicker">Expected lift</div>
                  <div className="mt-1 text-lg text-white">+{experiment.estimatedLiftPercent}%</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/60">Benchmark: {benchmark?.reference ?? 'Internal pricing benchmark'}.</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
