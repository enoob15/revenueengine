import { AutomationRun, MarketSignal } from '@/lib/types';

const statusClass = {
  queued: 'text-gold',
  ready: 'text-signal',
  running: 'text-cyan',
};

export function AutomationPanel({ runs, signals }: { runs: AutomationRun[]; signals: MarketSignal[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
      <div className="panel p-6">
        <p className="eyebrow">Passive Income Automator</p>
        <h2 className="mt-2 text-2xl font-semibold">Scheduled automation</h2>
        <div className="mt-5 space-y-4">
          {runs.map((run) => (
            <article key={run.id} className="rounded-3xl border border-white/10 bg-white/4 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-medium">{run.title}</h3>
                  <p className="mt-1 text-sm text-white/60">{run.channel}</p>
                </div>
                <span className={`text-sm font-medium uppercase tracking-[0.2em] ${statusClass[run.status]}`}>{run.status}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/70">
                <span>Impact: {run.impact}</span>
                <span>ETA: {run.eta}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="panel p-6">
        <p className="eyebrow">Revenue Intelligence</p>
        <h2 className="mt-2 text-2xl font-semibold">Market signals</h2>
        <div className="mt-5 space-y-4">
          {signals.map((signal) => (
            <article key={signal.title} className="rounded-3xl border border-white/10 bg-white/4 p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-medium">{signal.title}</h3>
                <span className="chip capitalize">{signal.confidence}</span>
              </div>
              <p className="mt-3 text-sm text-white/70">{signal.summary}</p>
              <p className="mt-4 text-sm text-cyan">{signal.action}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
