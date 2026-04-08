import { AffiliateMatch, DashboardData, MarketSignal, OptimizationSuggestion, PortfolioSummary, ProductSnapshot } from "@/lib/types";

export function buildPortfolioSummary(products: ProductSnapshot[], affiliateMatches: AffiliateMatch[]): PortfolioSummary {
  const totalMrr = products.reduce((sum, product) => sum + product.monthlyRevenue, 0);
  const monthlyProfit = products.reduce((sum, product) => sum + product.monthlyProfit, 0);
  const avgGrossMargin = products.reduce((sum, product) => sum + product.grossMargin, 0) / products.length;
  const affiliateLiftPotential = affiliateMatches.reduce((sum, match) => sum + match.estimatedMonthlyLift, 0);
  const automationCoverage = Math.round((affiliateMatches.length / Math.max(products.length * 2, 1)) * 100);

  return {
    totalMrr,
    monthlyProfit,
    activeProducts: products.length,
    avgGrossMargin,
    affiliateLiftPotential,
    automationCoverage,
  };
}

export function buildMarketSignals(data: DashboardData): MarketSignal[] {
  const topAffiliate = data.affiliateMatches[0];
  const weakestChurn = [...data.products].sort((left, right) => right.churnRate - left.churnRate)[0];
  const bestMargin = [...data.products].sort((left, right) => right.grossMargin - left.grossMargin)[0];

  return [
    {
      title: "Affiliate whitespace is concentrated in creator and ops products",
      summary: topAffiliate
        ? `${topAffiliate.productSlug} has the highest immediate partner fit, making it the fastest path to non-subscription lift.`
        : "No affiliate matches are active yet.",
      confidence: "high",
      action: "Deploy the top two placement experiments before adding more partner programs.",
    },
    {
      title: `${weakestChurn.name} needs a churn-prevention offer before traffic scaling`,
      summary: `Its ${weakestChurn.churnRate.toFixed(1)}% churn rate is high relative to the rest of the portfolio.`,
      confidence: weakestChurn.churnRate > 4 ? "high" : "medium",
      action: "Bundle a higher-value onboarding asset instead of discounting the core plan.",
    },
    {
      title: `${bestMargin.name} can absorb higher pricing with minimal risk`,
      summary: `The product is operating at ${(bestMargin.grossMargin * 100).toFixed(0)}% gross margin and strong health.`,
      confidence: "medium",
      action: "Run a two-tier price anchor test for 14 days before opening outbound partnerships.",
    },
  ];
}

export function buildOptimizationSuggestions(data: DashboardData): OptimizationSuggestion[] {
  const bestPricing = data.pricingExperiments[0];
  const bestAffiliate = data.affiliateMatches[0];

  return [
    {
      title: `Raise ${bestPricing.productName} anchor price`,
      impact: `Estimated +${bestPricing.estimatedLiftPercent}% MRR`,
      owner: "Pricing Optimizer",
      rationale: bestPricing.rationale,
    },
    {
      title: `Launch ${bestAffiliate.programId} placement on ${bestAffiliate.productSlug}`,
      impact: `Estimated +$${bestAffiliate.estimatedMonthlyLift}/mo affiliate lift`,
      owner: "Affiliate Engine",
      rationale: bestAffiliate.rationale,
    },
    {
      title: "Automate post-conversion email cross-sells",
      impact: "Lift expansion revenue without more traffic",
      owner: "Passive Income Automator",
      rationale: "Every Boone51 product already has a clear adjacent offer. The bottleneck is distribution, not packaging.",
    },
  ];
}
