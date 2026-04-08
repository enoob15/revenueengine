import { unstable_noStore as noStore } from 'next/cache';

import { AffiliateOpportunities } from '@/components/affiliate-opportunities';
import { AutomationPanel } from '@/components/automation-panel';
import { ForecastChart } from '@/components/forecast-chart';
import { MetricCard } from '@/components/metric-card';
import { PricingPanel } from '@/components/pricing-panel';
import { ProductTable } from '@/components/product-table';
import { RevenueChart } from '@/components/revenue-chart';
import { getDashboardData } from '@/lib/services/dashboard';
import { formatCompactCurrency, formatCurrency, formatPercent } from '@/lib/format';

export default async function DashboardPage() {
  noStore();
  const data = await getDashboardData();

  return (
    <main className="shell py-10">
      <section className="panel overflow-hidden px-6 py-8 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">RevenueEngine Control Room</p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Autonomous revenue optimization dashboard</h1>
          </div>
          <p className="max-w-xl text-sm text-white/60">
            Generated {new Date(data.generatedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' })} UTC.
            Built for Boone51’s full portfolio with affiliate, pricing, and automation intelligence on one surface.
          </p>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          <MetricCard
            title="Total MRR"
            value={formatCompactCurrency(data.portfolio.totalMrr)}
            detail={`${data.portfolio.activeProducts} products monitored in this workspace.`}
            accent="signal"
          />
          <MetricCard
            title="Monthly Profit"
            value={formatCompactCurrency(data.portfolio.monthlyProfit)}
            detail={`${formatPercent(data.portfolio.avgGrossMargin * 100, 0)} blended gross margin across the stack.`}
            accent="cyan"
          />
          <MetricCard
            title="Affiliate Lift"
            value={formatCompactCurrency(data.portfolio.affiliateLiftPotential)}
            detail="Modeled from official partner programs and current traffic intent." 
            accent="gold"
          />
          <MetricCard
            title="Automation Coverage"
            value={`${data.portfolio.automationCoverage}%`}
            detail="Products with active monetization plays already scheduled or queued."
            accent="ember"
          />
        </div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        <RevenueChart data={data.revenueSeries} />
        <ForecastChart data={data.forecast} />
      </section>

      <section className="mt-8">
        <ProductTable products={data.products} />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        <AffiliateOpportunities matches={data.affiliateMatches} programs={data.affiliatePrograms} />
        <PricingPanel experiments={data.pricingExperiments} benchmarks={data.pricingBenchmarks} />
      </section>

      <section className="mt-8">
        <AutomationPanel runs={data.automationRuns} signals={data.marketSignals} />
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        {data.optimizationSuggestions.map((suggestion) => (
          <article key={suggestion.title} className="panel p-6">
            <p className="eyebrow">{suggestion.owner}</p>
            <h2 className="mt-2 text-2xl font-semibold">{suggestion.title}</h2>
            <p className="mt-4 text-2xl text-signal">{suggestion.impact}</p>
            <p className="mt-4 text-sm text-white/70">{suggestion.rationale}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        {data.products.slice(0, 3).map((product) => (
          <article key={product.slug} className="panel p-6">
            <p className="eyebrow">Top Revenue Surface</p>
            <h2 className="mt-2 text-2xl font-semibold">{product.name}</h2>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-white/70">
              <span>MRR {formatCurrency(product.monthlyRevenue)}</span>
              <span>RPV {formatCurrency(product.revenuePerVisitor)}</span>
              <span>Churn {formatPercent(product.churnRate)}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {product.integrations.map((integration) => (
                <span key={integration} className="chip">{integration}</span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
