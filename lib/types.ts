export type RevenueStream = "subscriptions" | "affiliate" | "one-time" | "services";
export type BillingInterval = "monthly" | "annual" | "one-time";

export interface ProductTier {
  name: string;
  price: number;
  billing: BillingInterval;
  conversionRate: number;
  audience: string;
}

export interface Product {
  slug: string;
  name: string;
  domain: string;
  category: string;
  summary: string;
  monthlyRevenue: number;
  monthlyCosts: number;
  visitorsMonthly: number;
  trialToPaidRate: number;
  churnRate: number;
  grossMargin: number;
  ltv: number;
  priorityScore: number;
  healthScore: number;
  revenueMix: Record<RevenueStream, number>;
  tags: string[];
  tiers: ProductTier[];
  monetizationGaps: string[];
  integrations: string[];
}

export interface RevenueSeriesPoint {
  month: string;
  subscriptions: number;
  affiliate: number;
  oneTime: number;
  services: number;
}

export interface ForecastPoint {
  month: string;
  actual: number | null;
  projected: number | null;
}

export interface AffiliateProgram {
  id: string;
  name: string;
  vertical: string;
  commissionSummary: string;
  payoutModel: string;
  cookieWindow: string;
  network: string;
  sourceUrl: string;
  lastVerifiedAt: string;
  fitTags: string[];
  placementIdeas: string[];
}

export interface AffiliateMatch {
  productSlug: string;
  programId: string;
  fitScore: number;
  estimatedMonthlyLift: number;
  rationale: string;
  suggestedPlacement: string;
}

export interface PricingBenchmark {
  productSlug: string;
  reference: string;
  entryPrice: number;
  growthPrice: number;
  premiumPrice: number;
  note: string;
}

export interface PricingExperiment {
  productSlug: string;
  productName: string;
  currentAnchor: number;
  recommendedAnchor: number;
  estimatedLiftPercent: number;
  confidence: "high" | "medium" | "watch";
  rationale: string;
  experiment: string;
}

export interface AutomationRun {
  id: string;
  title: string;
  channel: string;
  status: "queued" | "ready" | "running";
  impact: string;
  eta: string;
}

export interface MarketSignal {
  title: string;
  summary: string;
  confidence: "high" | "medium" | "watch";
  action: string;
}

export interface OptimizationSuggestion {
  title: string;
  impact: string;
  owner: string;
  rationale: string;
}

export interface SaaSTier {
  name: string;
  priceLabel: string;
  highlight: string;
  features: string[];
}

export interface PortfolioSummary {
  totalMrr: number;
  monthlyProfit: number;
  activeProducts: number;
  avgGrossMargin: number;
  affiliateLiftPotential: number;
  automationCoverage: number;
}

export interface ProductSnapshot extends Product {
  monthlyProfit: number;
  revenuePerVisitor: number;
}

export interface DashboardData {
  generatedAt: string;
  portfolio: PortfolioSummary;
  revenueSeries: RevenueSeriesPoint[];
  forecast: ForecastPoint[];
  products: ProductSnapshot[];
  affiliatePrograms: AffiliateProgram[];
  affiliateMatches: AffiliateMatch[];
  pricingExperiments: PricingExperiment[];
  automationRuns: AutomationRun[];
  marketSignals: MarketSignal[];
  optimizationSuggestions: OptimizationSuggestion[];
  tiers: SaaSTier[];
  pricingBenchmarks: PricingBenchmark[];
}
