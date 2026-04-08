import { NextResponse } from 'next/server';

import { getDashboardData } from '@/lib/services/dashboard';

export async function GET() {
  const data = await getDashboardData();
  return NextResponse.json({
    generatedAt: data.generatedAt,
    pricingBenchmarks: data.pricingBenchmarks,
    pricingExperiments: data.pricingExperiments,
  });
}
