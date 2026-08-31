import { AutomationTask } from "@/lib/data/automation";

type AutomationPanelProps = {
  tasks: AutomationTask[];
};

export function AutomationPanel({ tasks }: AutomationPanelProps) {
  return (
    <section className="rounded-3xl panel p-6">
      <div className="eyebrow">Automation panel</div>
      <h2 className="mt-3 text-2xl font-semibold text-white">Cron-ready optimization tasks</h2>
      <p className="mt-2 text-sm text-slate-400">
        RevenueEngine can hand these tasks directly to a Vercel cron or an external scheduler.
      </p>
      <div className="mt-6 space-y-4">
        {tasks.map((task) => (
          <div
            key={task.name}
            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <div className="text-lg font-medium text-white">{task.name}</div>
              <div className="mt-1 text-sm text-slate-400">{task.objective}</div>
            </div>
            <div className="grid gap-2 text-sm text-slate-200 sm:grid-cols-3">
              <div>Cadence: {task.cadence}</div>
              <div>Last run: {task.lastRun}</div>
              <div>Status: {task.status}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
