import { getEnv } from "@/lib/services/env";

type JsonRecord = Record<string, unknown>;

async function requestSupabase(path: string, init?: RequestInit) {
  const baseUrl = getEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!baseUrl || !serviceRoleKey) {
    return null;
  }

  const response = await fetch(`${baseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: "return=representation",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase request failed: ${response.status}`);
  }

  return response;
}

export async function insertRevenueEvent(payload: JsonRecord) {
  const response = await requestSupabase("revenue_events", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response ? response.json() : null;
}

export async function insertAutomationRun(payload: JsonRecord) {
  const response = await requestSupabase("automation_runs", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response ? response.json() : null;
}

export async function listStoredProducts() {
  const response = await requestSupabase("products?select=slug,name,status,monthly_revenue,monthly_costs");
  return response ? response.json() : null;
}
