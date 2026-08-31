import { NextRequest, NextResponse } from "next/server";
import { affiliatePrograms } from "@/lib/data/affiliate-programs";
import { pricingExperiments } from "@/lib/data/pricing-experiments";
import { products } from "@/lib/data/products";
import { generateGeminiPricingInsight } from "@/lib/services/gemini";

async function runSyncTask() {
  return {
    task: "sync",
    syncedProducts: products.length,
    syncedAffiliatePrograms: affiliatePrograms.length,
    syncedExperiments: pricingExperiments.length,
    status: "ok"
  };
}

async function runOptimizeTask() {
  const fallback =
    "Focus the next optimization cycle on Pinpoint annual pricing and StatusCraft mid-tier conversion.";
  const insight =
    (await generateGeminiPricingInsight(
      `Create one concise revenue optimization note for Boone51 Studios using these products: ${products
        .map((product) => product.name)
        .join(", ")}.`
    )) ?? fallback;

  return {
    task: "optimize",
    status: "ok",
    reviewedExperiments: pricingExperiments.length,
    insight
  };
}

export async function GET(request: NextRequest) {
  const task = request.nextUrl.searchParams.get("task");

  if (task === "sync") {
    return NextResponse.json(await runSyncTask());
  }

  if (task === "optimize") {
    return NextResponse.json(await runOptimizeTask());
  }

  return NextResponse.json(
    {
      error: "Unsupported task. Use task=sync or task=optimize."
    },
    { status: 400 }
  );
}
