export type Product = {
  slug: string;
  name: string;
  description: string;
  url?: string;
  pricingTiers: string[];
  status: "Live" | "Monitoring" | "Optimizing";
  activeCustomers: number;
  monthlyRevenue: number;
};

export const products: Product[] = [
  {
    slug: "formcatch",
    name: "FormCatch",
    description: "Stateless form backend",
    url: "https://formcatch.boone51.com",
    pricingTiers: ["Free", "$5", "$15"],
    status: "Live",
    activeCustomers: 186,
    monthlyRevenue: 1745
  },
  {
    slug: "pinpoint",
    name: "Pinpoint",
    description: "User feedback and AI agent testing",
    url: "https://pinpoint.boone51.com",
    pricingTiers: ["Free", "$19", "$49"],
    status: "Optimizing",
    activeCustomers: 98,
    monthlyRevenue: 2213
  },
  {
    slug: "linklab",
    name: "LinkLab",
    description: "Smart biolinks with metrics",
    url: "https://linklab.boone51.com",
    pricingTiers: ["Free", "$9", "$29"],
    status: "Live",
    activeCustomers: 134,
    monthlyRevenue: 1538
  },
  {
    slug: "statuscraft",
    name: "StatusCraft",
    description: "AI status pages",
    pricingTiers: ["$9", "$29", "$99"],
    status: "Optimizing",
    activeCustomers: 41,
    monthlyRevenue: 1877
  },
  {
    slug: "shopsmart",
    name: "ShopSmart",
    description: "Affiliate shopping comparison",
    pricingTiers: ["Affiliate commissions"],
    status: "Monitoring",
    activeCustomers: 0,
    monthlyRevenue: 1180
  },
  {
    slug: "competitorlens",
    name: "CompetitorLens",
    description: "Competitive intelligence",
    url: "https://competitorlens.boone51.com",
    pricingTiers: ["Free", "$19", "$49"],
    status: "Optimizing",
    activeCustomers: 76,
    monthlyRevenue: 1642
  },
  {
    slug: "portfoliosys",
    name: "Portfoliosys",
    description: "Portfolio builder",
    url: "https://portfoliosys.boone51.com",
    pricingTiers: ["Free tier"],
    status: "Monitoring",
    activeCustomers: 212,
    monthlyRevenue: 0
  }
];
