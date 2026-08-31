import { affiliatePrograms } from "@/lib/data/affiliate-programs";
import { automationTasks } from "@/lib/data/automation";
import { forecast } from "@/lib/data/forecast";
import { pricingExperiments } from "@/lib/data/pricing-experiments";
import { products } from "@/lib/data/products";
import { generateGeminiPricingInsight } from "@/lib/services/gemini";

const growthRate = 14.6;

export function getRevenueSummary() {
  const totalMRR = products.reduce((total, product) => total + product.monthlyRevenue, 0);
  const affiliateRevenue = affiliatePrograms.reduce(
    (total, program) => total + program.monthlyPotential,
    0
  );

  return {
    totalMRR,
    activeProducts: products.length,
    affiliateRevenue,
    growthRate
  };
}

export async function getDashboardSnapshot() {
  const summary = getRevenueSummary();
  const fallbackInsight =
    "Prioritize Pinpoint annual anchors and StatusCraft reliability-led pricing copy before expanding new affiliate placements.";

  const generatedInsight =
    (await generateGeminiPricingInsight(
      `You are analyzing Boone51 Studios revenue operations. Products: ${products
        .map((product) => `${product.name} (${product.pricingTiers.join("/")})`)
        .join(", ")}. Experiments: ${pricingExperiments
        .map((experiment) => `${experiment.product}: ${experiment.hypothesis}`)
        .join(" | ")}. Reply with one concise pricing recommendation.`
    )) ?? fallbackInsight;

  return {
    summary,
    products,
    affiliatePrograms,
    pricingExperiments,
    forecast,
    automationTasks,
    insight: generatedInsight
  };
}
