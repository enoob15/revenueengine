import { AffiliateOpportunities } from "@/components/affiliate-opportunities";
import { AutomationPanel } from "@/components/automation-panel";
import { ForecastChart } from "@/components/forecast-chart";
import { MetricCard } from "@/components/metric-card";
import { PricingPanel } from "@/components/pricing-panel";
import { ProductTable } from "@/components/product-table";
import { getDashboardSnapshot } from "@/lib/services/dashboard";

export default async function DashboardPage() {
  const snapshot = await getDashboardSnapshot();

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] panel px-6 py-8 sm:px-8">
        <div className="eyebrow">RevenueEngine</div>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-white">RevenueEngine</h1>
            <p className="mt-2 text-lg text-slate-300">by Boone51 Studios</p>
          </div>
          <div className="max-w-2xl rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">
            Autonomous monitoring for product revenue, affiliate expansion, and pricing performance.
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Total MRR"
            value={`$${snapshot.summary.totalMRR.toLocaleString()}`}
            helper="Subscription and product-linked recurring revenue"
          />
          <MetricCard
            label="Active Products"
            value={snapshot.summary.activeProducts.toString()}
            helper="All Boone51 Studios products represented"
          />
          <MetricCard
            label="Affiliate Revenue"
            value={`$${snapshot.summary.affiliateRevenue.toLocaleString()}`}
            helper="Modeled monthly upside from current partner set"
          />
          <MetricCard
            label="Growth Rate"
            value={`${snapshot.summary.growthRate}%`}
            helper="Projected month-over-month lift"
          />
        </div>
      </section>

      <ProductTable products={snapshot.products} />
      <AffiliateOpportunities programs={snapshot.affiliatePrograms} />
      <PricingPanel experiments={snapshot.pricingExperiments} insight={snapshot.insight} />
      <ForecastChart points={snapshot.forecast} />
      <AutomationPanel tasks={snapshot.automationTasks} />
    </div>
  );
}
