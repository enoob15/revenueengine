export type PricingExperiment = {
  id: string;
  product: string;
  hypothesis: string;
  control: string;
  variant: string;
  metric: string;
  status: "Running" | "Ready" | "Queued";
  expectedLift: string;
};

export const pricingExperiments: PricingExperiment[] = [
  {
    id: "pinpoint-annual",
    product: "Pinpoint",
    hypothesis: "Annual anchor pricing should improve paid conversion from the free plan.",
    control: "Monthly only: Free / $19 / $49",
    variant: "Add annual anchor with two months free messaging",
    metric: "Visitor to paid conversion",
    status: "Running",
    expectedLift: "+12%"
  },
  {
    id: "linklab-bundles",
    product: "LinkLab",
    hypothesis: "A creator bundle upsell can raise average revenue per customer.",
    control: "Free / $9 / $29",
    variant: "Highlight a creator bundle on the $29 plan",
    metric: "ARPU",
    status: "Ready",
    expectedLift: "+9%"
  },
  {
    id: "formcatch-seats",
    product: "FormCatch",
    hypothesis: "Usage-based positioning will convert more pro users than feature-only copy.",
    control: "Feature-led plan copy",
    variant: "Submission-volume-led plan copy",
    metric: "Starter to pro upgrades",
    status: "Queued",
    expectedLift: "+7%"
  },
  {
    id: "statuscraft-social-proof",
    product: "StatusCraft",
    hypothesis: "Reliability proof points should increase demand for the $29 tier.",
    control: "Generic pricing table",
    variant: "Reliability-led pricing table with uptime outcomes",
    metric: "Mid-tier selection rate",
    status: "Running",
    expectedLift: "+11%"
  }
];
