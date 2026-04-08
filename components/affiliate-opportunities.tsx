import { AffiliateMatch, AffiliateProgram } from '@/lib/types';
import { formatCurrency } from '@/lib/format';

export function AffiliateOpportunities({
  matches,
  programs,
}: {
  matches: AffiliateMatch[];
  programs: AffiliateProgram[];
}) {
  const programMap = new Map(programs.map((program) => [program.id, program]));

  return (
    <div className="panel p-6">
      <p className="eyebrow">Affiliate Opportunity Engine</p>
      <h2 className="mt-2 text-2xl font-semibold">Top partner placements</h2>
      <div className="mt-5 space-y-4">
        {matches.map((match) => {
          const program = programMap.get(match.programId);
          if (!program) {
            return null;
          }

          return (
            <article key={`${match.productSlug}-${match.programId}`} className="rounded-3xl border border-white/10 bg-white/4 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-medium">{program.name}</div>
                  <div className="mt-1 text-sm text-white/60">{match.productSlug} · {program.commissionSummary}</div>
                </div>
                <span className="chip">Fit {match.fitScore}</span>
              </div>
              <p className="mt-3 text-sm text-white/70">{match.rationale}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/60">
                <span>Placement: {match.suggestedPlacement}</span>
                <span>Lift: {formatCurrency(match.estimatedMonthlyLift)}/mo</span>
                <a className="text-cyan underline-offset-4 hover:underline" href={program.sourceUrl} target="_blank" rel="noreferrer">
                  Official program
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
