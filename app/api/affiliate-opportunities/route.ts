import { NextResponse } from "next/server";
import { affiliatePrograms } from "@/lib/data/affiliate-programs";

export async function GET() {
  return NextResponse.json({
    company: "Boone51 Studios",
    affiliatePrograms
  });
}
