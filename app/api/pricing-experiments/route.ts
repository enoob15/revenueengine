import { NextResponse } from "next/server";
import { pricingExperiments } from "@/lib/data/pricing-experiments";

export async function GET() {
  return NextResponse.json({
    company: "Boone51 Studios",
    pricingExperiments
  });
}
