export type AffiliateProgram = {
  name: string;
  category: string;
  fit: string;
  commission: string;
  priority: "High" | "Medium";
  monthlyPotential: number;
};

export const affiliatePrograms: AffiliateProgram[] = [
  {
    name: "HubSpot",
    category: "CRM",
    fit: "Strong fit for FormCatch and Pinpoint onboarding content.",
    commission: "Bounty-based payouts",
    priority: "High",
    monthlyPotential: 850
  },
  {
    name: "Semrush",
    category: "SEO",
    fit: "Pairs with CompetitorLens and growth content.",
    commission: "Recurring referral payouts",
    priority: "High",
    monthlyPotential: 720
  },
  {
    name: "Webflow",
    category: "Site builder",
    fit: "Cross-sell for Portfoliosys users moving upmarket.",
    commission: "Referral payouts",
    priority: "Medium",
    monthlyPotential: 480
  },
  {
    name: "Framer",
    category: "Site builder",
    fit: "Relevant for LinkLab and Portfoliosys creator workflows.",
    commission: "Referral payouts",
    priority: "Medium",
    monthlyPotential: 410
  },
  {
    name: "Amazon Associates",
    category: "Commerce",
    fit: "Supports ShopSmart comparison-driven buying journeys.",
    commission: "Category-based referral rates",
    priority: "High",
    monthlyPotential: 930
  },
  {
    name: "Better Stack",
    category: "Observability",
    fit: "Natural add-on for StatusCraft reliability workflows.",
    commission: "Referral payouts",
    priority: "High",
    monthlyPotential: 540
  },
  {
    name: "beehiiv",
    category: "Newsletter",
    fit: "Useful for Boone51 product launches and lifecycle email flows.",
    commission: "Referral payouts",
    priority: "Medium",
    monthlyPotential: 360
  }
];
