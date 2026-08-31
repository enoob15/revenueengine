import { AffiliateProgram } from "@/lib/data/affiliate-programs";

type AffiliateOpportunitiesProps = {
  programs: AffiliateProgram[];
};

export function AffiliateOpportunities({ programs }: AffiliateOpportunitiesProps) {
  return (
    <section className="rounded-3xl panel p-6">
      <div className="eyebrow">Affiliate engine</div>
      <h2 className="mt-3 text-2xl font-semibold text-white">Affiliate opportunities</h2>
      <p className="mt-2 max-w-3xl text-sm text-slate-400">
        Current partner targets scored for fit against the Boone51 Studios portfolio.
      </p>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {programs.map((program) => (
          <div key={program.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-medium text-white">{program.name}</div>
                <div className="text-sm text-slate-400">{program.category}</div>
              </div>
              <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-200">
                {program.priority}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-300">{program.fit}</p>
            <div className="mt-4 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
              <div>Commission: {program.commission}</div>
              <div>Monthly potential: ${program.monthlyPotential}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
