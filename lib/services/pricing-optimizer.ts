import { pricingBenchmarks } from "@/lib/data/portfolio";
import { PricingExperiment, Product } from "@/lib/types";

function getBenchmark(productSlug: string) {
  return pricingBenchmarks.find((entry) => entry.productSlug === productSlug);
}

export function buildPricingExperiments(products: Product[]): PricingExperiment[] {
  return products
    .filter((product) => product.revenueMix.subscriptions > 0.6)
    .map((product) => {
      const benchmark = getBenchmark(product.slug);
      const currentAnchor = product.tiers[1]?.price ?? product.tiers[0]?.price ?? 0;
      const recommendedAnchor = benchmark?.growthPrice ?? Math.round(currentAnchor * 1.15);
      const delta = recommendedAnchor - currentAnchor;
      const confidence: PricingExperiment["confidence"] =
        delta >= 10 && product.healthScore >= 78 ? "high" : delta >= 5 ? "medium" : "watch";

      return {
        productSlug: product.slug,
        productName: product.name,
        currentAnchor,
        recommendedAnchor,
        estimatedLiftPercent: Math.max(5, Math.round((delta / Math.max(currentAnchor, 1)) * 32)),
        confidence,
        rationale:
          benchmark?.note ??
          `${product.name} is monetizing a higher-value workflow than its current mid-tier suggests.`,
        experiment: `Test current price against $${recommendedAnchor} with annual savings framed around ROI rather than features.`,
      };
    })
    .sort((left, right) => right.estimatedLiftPercent - left.estimatedLiftPercent);
}
