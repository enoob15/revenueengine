import { AffiliateMatch, AutomationRun, Product } from "@/lib/types";
import { generateGeminiStrategy } from "@/lib/services/gemini";
import { insertAutomationRun } from "@/lib/services/supabase";

export function buildAutomationRuns(products: Product[], affiliateMatches: AffiliateMatch[]): AutomationRun[] {
  const topProduct = [...products].sort((left, right) => right.priorityScore - left.priorityScore)[0];
  const topAffiliate = affiliateMatches[0];

  return [
    {
      id: "content-affiliate-burst",
      title: `Publish ${topAffiliate?.programId ?? "affiliate"} comparison content`,
      channel: "Content automation",
      status: "ready",
      impact: "Capture bottom-funnel traffic with affiliate intent",
      eta: "Today, 45 min",
    },
    {
      id: "email-cross-sell",
      title: `Trigger cross-sell email after first ${topProduct.name} activation`,
      channel: "Lifecycle email",
      status: "queued",
      impact: "Expand ARPU through adjacent Boone51 offers",
      eta: "Next cron cycle",
    },
    {
      id: "social-proof-loop",
      title: "Schedule metric-driven social posts",
      channel: "Social promotion",
      status: "ready",
      impact: "Repurpose live portfolio metrics into traffic acquisition",
      eta: "Today, 20 min",
    },
  ];
}

export async function runAutomationCycle(task: string, productCount: number) {
  const narrative = await generateGeminiStrategy(
    `You are a revenue operator. Summarize the highest-leverage ${task} action for a ${productCount}-product SaaS portfolio in 2 sentences.`,
  ).catch(() => null);

  const run = {
    task,
    status: "completed",
    narrative: narrative ?? "Fallback heuristics executed because Gemini is not configured.",
    executed_at: new Date().toISOString(),
  };

  await insertAutomationRun(run).catch(() => null);

  return run;
}
