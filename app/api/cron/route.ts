import { NextRequest, NextResponse } from 'next/server';

import { getDashboardData } from '@/lib/services/dashboard';
import { getCronSecret } from '@/lib/services/env';
import { runAutomationCycle } from '@/lib/services/automation';

function authorized(request: NextRequest) {
  const secret = getCronSecret();
  if (!secret) {
    return true;
  }

  const bearer = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  const header = request.headers.get('x-cron-secret');
  const query = request.nextUrl.searchParams.get('secret');

  return bearer === secret || header === secret || query === secret;
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const task = request.nextUrl.searchParams.get('task') ?? 'optimize';
  const data = await getDashboardData();
  const run = await runAutomationCycle(task, data.products.length);

  return NextResponse.json({
    ok: true,
    task,
    executedAt: run.executed_at,
    narrative: run.narrative,
    portfolioMrr: data.portfolio.totalMrr,
    queuedAutomations: data.automationRuns.length,
  });
}
