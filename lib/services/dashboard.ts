import { affiliatePrograms } from "@/lib/data/affiliate-programs";
import { booneProducts, forecastSeries, pricingBenchmarks, revenueEngineTiers, revenueSeries } from "@/lib/data/portfolio";
import { DashboardData, ProductSnapshot } from "@/lib/types";
import { buildAffiliateMatches } from "@/lib/services/affiliate-engine";
import { buildAutomationRuns } from "@/lib/services/automation";
import { buildPricingExperiments } from "@/lib/services/pricing-optimizer";
import {
  buildMarketSignals,
  buildOptimizationSuggestions,
  buildPortfolioSummary,
} from "@/lib/services/revenue-intelligence";

function buildProductSnapshots(): ProductSnapshot[] {
  return booneProducts.map((product) => ({
    ...product,
    monthlyProfit: product.monthlyRevenue - product.monthlyCosts,
    revenuePerVisitor: Number((product.monthlyRevenue / Math.max(product.visitorsMonthly, 1)).toFixed(2)),
  }));
}

export async function getDashboardData(): Promise<DashboardData> {
  const products = buildProductSnapshots();
  const affiliateMatches = buildAffiliateMatches(products);
  const pricingExperiments = buildPricingExperiments(products);
  const automationRuns = buildAutomationRuns(products, affiliateMatches);

  const baseData: DashboardData = {
    generatedAt: new Date().toISOString(),
    portfolio: buildPortfolioSummary(products, affiliateMatches),
    revenueSeries,
    forecast: forecastSeries,
    products,
    affiliatePrograms,
    affiliateMatches,
    pricingExperiments,
    automationRuns,
    marketSignals: [],
    optimizationSuggestions: [],
    tiers: revenueEngineTiers,
    pricingBenchmarks,
  };

  return {
    ...baseData,
    marketSignals: buildMarketSignals(baseData),
    optimizationSuggestions: buildOptimizationSuggestions(baseData),
  };
}
