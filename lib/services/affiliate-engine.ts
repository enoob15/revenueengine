import { affiliatePrograms } from "@/lib/data/affiliate-programs";
import { AffiliateMatch, Product } from "@/lib/types";

function overlap(productTags: string[], programTags: string[]) {
  return productTags.filter((tag) => programTags.includes(tag)).length;
}

export function buildAffiliateMatches(products: Product[]): AffiliateMatch[] {
  return products
    .flatMap((product) =>
      affiliatePrograms.map((program) => {
        const sharedTags = overlap(product.tags, program.fitTags);
        const fitScore = Math.min(99, 45 + sharedTags * 12 + product.priorityScore * 0.18);
        const estimatedMonthlyLift = Math.round(
          product.visitorsMonthly * (sharedTags * 0.0025) * (product.monthlyRevenue / Math.max(product.visitorsMonthly, 1)),
        );

        return {
          productSlug: product.slug,
          programId: program.id,
          fitScore,
          estimatedMonthlyLift,
          rationale:
            sharedTags > 0
              ? `${program.name} matches ${sharedTags} high-intent monetization tags for ${product.name}.`
              : `${program.name} is adjacent but needs custom positioning to convert for ${product.name}.`,
          suggestedPlacement: program.placementIdeas[sharedTags > 0 ? 0 : program.placementIdeas.length - 1],
        };
      }),
    )
    .filter((match) => match.fitScore >= 65)
    .sort((left, right) => right.fitScore - left.fitScore || right.estimatedMonthlyLift - left.estimatedMonthlyLift)
    .slice(0, 9);
}
