export function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

export function getAppUrl(): string {
  return getEnv("NEXT_PUBLIC_APP_URL") ?? "http://localhost:3000";
}

export function isSupabaseConfigured(): boolean {
  return Boolean(getEnv("NEXT_PUBLIC_SUPABASE_URL") && getEnv("SUPABASE_SERVICE_ROLE_KEY"));
}

export function isStripeConfigured(): boolean {
  return Boolean(getEnv("STRIPE_SECRET_KEY") && getEnv("STRIPE_WEBHOOK_SECRET"));
}

export function isGeminiConfigured(): boolean {
  return Boolean(getEnv("GEMINI_API_KEY"));
}

export function getCronSecret(): string | undefined {
  return getEnv("CRON_SECRET");
}
