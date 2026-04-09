# RevenueEngine

> Autonomous revenue optimization for the Boone51 Studios product portfolio.

RevenueEngine is a mission control dashboard that tracks subscription revenue, surfaces affiliate opportunities, runs pricing experiments, and automates optimization across all Boone51 products — designed to make money while you sleep.

**Live:** [revenueengine.boone51.com](https://revenueengine.boone51.com)

---

## Table of Contents

- [Overview](#overview)
- [Product Portfolio](#product-portfolio)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Affiliate Programs](#affiliate-programs)
- [Pricing Experiments](#pricing-experiments)
- [Automation Tasks](#automation-tasks)
- [Revenue Model](#revenue-model)
- [Deployment](#deployment)
- [Future Roadmap](#future-roadmap)

---

## Overview

RevenueEngine was born from a simple insight: **"If it don't make dollars, it don't make sense."**

Boone51 Studios has 7 live products, each with its own pricing, users, and revenue trajectory. Manually tracking all of this is impossible for a small team. RevenueEngine automates the monitoring, analysis, and optimization of revenue across the entire portfolio.

### Core Principles

1. **Autonomous by default** — Cron jobs sync data, scan affiliates, and optimize pricing without human intervention
2. **Revenue-first** — Every feature must directly contribute to making money
3. **Data-driven** — Pricing experiments and affiliate decisions backed by real metrics
4. **Portfolio-aware** — Understands relationships between products (e.g., Portfoliosys users are good Webflow affiliate candidates)

---

## Product Portfolio

| Product | Description | Pricing | Status |
|---------|-------------|---------|--------|
| [FormCatch](https://formcatch.boone51.com) | Stateless form backend | Free / $5 / $15 | Live |
| [Pinpoint](https://pinpoint.boone51.com) | User feedback & AI agent testing | Free / $19 / $49 | Optimizing |
| [LinkLab](https://linklab.boone51.com) | Smart biolinks with live metrics | Free / $9 / $29 | Live |
| StatusCraft | AI status pages | $9 / $29 / $99 | Optimizing |
| ShopSmart | Affiliate shopping comparison | Affiliate commissions | Monitoring |
| [CompetitorLens](https://competitorlens.boone51.com) | Competitive intelligence | Free / $19 / $49 | Optimizing |
| [Portfoliosys](https://portfoliosys.boone51.com) | Portfolio builder | Free tier | Monitoring |

**Total Portfolio MRR:** ~$10,195 (projected)  
**Total Active Customers:** ~747

---

## Features

### 📊 Revenue Dashboard
- Real-time MRR tracking across all products
- Active customer counts and growth rates
- Affiliate revenue modeling
- Month-over-month growth projection

### 💰 Affiliate Opportunity Engine
- Curated affiliate programs scored by fit and priority
- Product-to-affiliate matching (e.g., CompetitorLens → Semrush)
- Monthly potential revenue estimates per program
- 7 active programs with $4,290 combined monthly potential

### 📈 Pricing Optimizer
- A/B pricing experiment framework
- Hypothesis-driven testing with control/test variants
- Expected lift tracking per experiment
- Status management: Queued → Ready → Running → Analyzed

### 📉 Revenue Forecasting
- 6-month forward projections
- Target vs. forecast comparison
- Growth rate modeling based on product trends

### 🤖 Automation Panel
- Scheduled tasks for portfolio sync, affiliate scanning, and pricing optimization
- Daily cron-ready workflows
- Task status tracking (Scheduled / Ready / Running)

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   RevenueEngine                      │
│                                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │ Landing   │  │Dashboard │  │  API Routes       │  │
│  │ Page      │  │          │  │  /portfolio       │  │
│  │           │  │ • MRR    │  │  /affiliate-*      │  │
│  │ • Hero    │  │ • Table  │  │  /pricing-*        │  │
│  │ • Features│  │ • Charts │  │  /cron             │  │
│  │ • CTA     │  │ • Alerts │  │  /stripe/webhook   │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │              Data Layer                          │ │
│  │  products.ts │ affiliate-programs.ts            │ │
│  │  pricing-experiments.ts │ forecast.ts            │ │
│  │  automation.ts │ dashboard.ts                    │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │              Services                            │ │
│  │  dashboard.ts → Snapshot aggregation             │ │
│  │  gemini.ts → AI-powered insights                 │ │
│  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
         │                    │                │
    ┌────▼────┐         ┌─────▼─────┐   ┌─────▼─────┐
    │Supabase │         │ Gemini API │   │  Stripe   │
    │ (Data)  │         │ (Insights)│   │ (Billing) │
    └─────────┘         └───────────┘   └───────────┘
```

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 16 (App Router) | Server rendering, API routes |
| Language | TypeScript | Type safety across codebase |
| Styling | Tailwind CSS | Dark theme, responsive design |
| Database | Supabase (PostgreSQL) | Persistent storage, real-time |
| AI | Gemini API | Revenue insights, recommendations |
| Payments | Stripe | Webhook-driven billing events |
| Hosting | Vercel | Production deployment, edge functions |
| DNS | revenueengine.boone51.com | Custom domain via Hostinger |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase project (or use mock data mode)
- Gemini API key (optional, for AI insights)

### Installation

```bash
# Clone the repository
git clone https://github.com/enoob15/revenueengine.git
cd revenueengine

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your keys

# Run development server
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anonymous key |
| `GEMINI_API_KEY` | No | Google Gemini API key for AI insights |
| `CRON_SECRET` | No | Secret for authenticating cron requests |
| `STRIPE_SECRET_KEY` | No | Stripe secret key for billing |
| `STRIPE_WEBHOOK_SECRET` | No | Stripe webhook signing secret |

> **Note:** The app runs with mock data when Supabase/Gemini keys are not configured. All dashboard features work with the built-in seed data.

---

## Project Structure

```
revenueengine/
├── app/
│   ├── api/
│   │   ├── affiliate-opportunities/route.ts  # Affiliate program data API
│   │   ├── cron/route.ts                     # Automated task trigger
│   │   ├── portfolio/route.ts                # Product portfolio API
│   │   ├── pricing-experiments/route.ts      # A/B test data API
│   │   └── stripe/webhook/route.ts           # Stripe billing webhook
│   ├── dashboard/
│   │   └── page.tsx                          # Main revenue dashboard
│   ├── globals.css                           # Tailwind + custom styles
│   ├── layout.tsx                            # Root layout with nav/footer
│   └── page.tsx                              # Landing page
├── components/
│   ├── affiliate-opportunities.tsx           # Affiliate program cards
│   ├── automation-panel.tsx                  # Cron task status panel
│   ├── forecast-chart.tsx                    # Revenue projection chart
│   ├── metric-card.tsx                       # KPI display card
│   ├── pricing-panel.tsx                     # A/B experiment table
│   └── product-table.tsx                     # Portfolio overview table
├── lib/
│   ├── data/
│   │   ├── affiliate-programs.ts             # Affiliate program definitions
│   │   ├── automation.ts                     # Cron task definitions
│   │   ├── forecast.ts                       # Revenue projection data
│   │   ├── pricing-experiments.ts            # A/B test definitions
│   │   └── products.ts                       # Product portfolio data
│   └── services/
│       ├── dashboard.ts                      # Dashboard data aggregation
│       └── gemini.ts                         # Gemini API integration
├── supabase/
│   └── schema.sql                            # Full database schema + seed data
├── tailwind.config.ts                        # Tailwind configuration
├── vercel.json                               # Vercel deployment config
└── package.json
```

---

## API Reference

### `GET /api/portfolio`

Returns all Boone51 products with pricing, status, and revenue data.

```json
{
  "products": [
    {
      "slug": "formcatch",
      "name": "FormCatch",
      "description": "Stateless form backend",
      "url": "https://formcatch.boone51.com",
      "pricingTiers": ["Free", "$5", "$15"],
      "status": "Live",
      "activeCustomers": 186,
      "monthlyRevenue": 1745
    }
  ]
}
```

### `GET /api/affiliate-opportunities`

Returns scored affiliate programs with fit analysis and revenue potential.

```json
{
  "programs": [
    {
      "name": "HubSpot",
      "category": "CRM",
      "fit": "Strong fit for FormCatch and Pinpoint onboarding content.",
      "commission": "Bounty-based payouts",
      "priority": "High",
      "monthlyPotential": 850
    }
  ]
}
```

### `GET /api/pricing-experiments`

Returns active and queued A/B pricing experiments.

```json
{
  "experiments": [
    {
      "experimentKey": "pinpoint-annual",
      "product": "Pinpoint",
      "hypothesis": "Annual anchor pricing should improve paid conversion from the free plan.",
      "controlVariant": "Monthly only: Free / $19 / $49",
      "testVariant": "Add annual anchor with two months free messaging",
      "metric": "Visitor to paid conversion",
      "status": "Running",
      "expectedLift": "+12%"
    }
  ]
}
```

### `POST /api/stripe/webhook`

Receives Stripe billing events (checkout completed, subscription changes, etc.) to keep revenue data in sync.

**Headers:** `Stripe-Signature` for webhook verification.

### `GET /api/cron?task=sync|optimize`

Triggers automated tasks. Supported tasks:
- `sync` — Refresh product metrics from live sources
- `optimize` — Run pricing optimization analysis

**Auth:** Requires `CRON_SECRET` query parameter or header.

---

## Database Schema

### Products Table
```sql
create table products (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  description text not null,
  url text,
  pricing_tiers text[] not null,
  status text not null,           -- Live | Monitoring | Optimizing
  active_customers integer default 0,
  monthly_revenue integer default 0,
  created_at timestamptz default now()
);
```

### Affiliate Opportunities Table
```sql
create table affiliate_opportunities (
  id bigint generated always as identity primary key,
  name text unique not null,
  category text not null,
  fit text not null,
  commission text not null,
  priority text not null,          -- High | Medium
  monthly_potential integer default 0,
  created_at timestamptz default now()
);
```

### Pricing Experiments Table
```sql
create table pricing_experiments (
  id bigint generated always as identity primary key,
  experiment_key text unique not null,
  product text not null,
  hypothesis text not null,
  control_variant text not null,
  test_variant text not null,
  metric text not null,
  status text not null,            -- Queued | Ready | Running | Analyzed
  expected_lift text not null,
  created_at timestamptz default now()
);
```

### Revenue Snapshots Table
```sql
create table revenue_snapshots (
  id bigint generated always as identity primary key,
  snapshot_month text unique not null,
  forecast_revenue integer not null,
  target_revenue integer not null,
  created_at timestamptz default now()
);
```

### Automation Runs Table
```sql
create table automation_runs (
  id bigint generated always as identity primary key,
  task_name text unique not null,
  cadence text not null,
  objective text not null,
  last_run_at timestamptz,
  status text not null,            -- Scheduled | Ready | Running
  created_at timestamptz default now()
);
```

Full schema with seed data: [`supabase/schema.sql`](supabase/schema.sql)

---

## Affiliate Programs

RevenueEngine tracks 7 affiliate programs matched to the Boone51 product portfolio:

| Program | Category | Priority | Monthly Potential | Product Fit |
|---------|----------|----------|-------------------|-------------|
| Amazon Associates | Commerce | High | $930 | ShopSmart |
| HubSpot | CRM | High | $850 | FormCatch, Pinpoint |
| Semrush | SEO | High | $720 | CompetitorLens |
| Better Stack | Observability | High | $540 | StatusCraft |
| Webflow | Site Builder | Medium | $480 | Portfoliosys |
| Framer | Site Builder | Medium | $410 | LinkLab, Portfoliosys |
| beehiiv | Newsletter | Medium | $360 | All products |

**Total Affiliate Revenue Potential:** $4,290/month

---

## Pricing Experiments

4 active experiments targeting conversion and ARPU improvements:

| Experiment | Product | Hypothesis | Expected Lift | Status |
|-----------|---------|------------|---------------|--------|
| Annual anchor pricing | Pinpoint | Annual pricing improves free→paid conversion | +12% | Running |
| Creator bundle upsell | LinkLab | Bundle offer raises ARPU | +9% | Ready |
| Usage-led copy | FormCatch | Volume positioning converts more pro users | +7% | Queued |
| Social proof pricing | StatusCraft | Reliability proof increases mid-tier selection | +11% | Running |

---

## Automation Tasks

Daily scheduled tasks running on cron:

| Task | Cadence | Objective | Status |
|------|---------|-----------|--------|
| Portfolio sync | Daily 06:00 UTC | Refresh product metrics and pricing context | Scheduled |
| Affiliate scan | Daily 06:15 UTC | Re-score affiliate opportunities against live traffic | Ready |
| Pricing optimizer | Daily 06:30 UTC | Review A/B experiments and recommend next move | Ready |

---

## Revenue Model

RevenueEngine itself could be offered as a SaaS product:

| Tier | Price | Features |
|------|-------|----------|
| Free | $0/mo | Track up to 3 products, basic analytics |
| Pro | $19/mo | Unlimited products, affiliate engine, pricing optimizer |
| Enterprise | $49/mo | Full automation, AI insights, white label, API access |

---

## Deployment

### Vercel (Production)

```bash
# Deploy to production
vercel --prod --token $VERCEL_TOKEN
```

**Production URL:** https://revenueengine.boone51.com  
**Vercel Dashboard:** https://vercel.com/boones-projects-4080c510/revenueengine

### DNS Configuration

- **Domain:** revenueengine.boone51.com
- **Type:** A record → 76.76.21.21 (Vercel)
- **TTL:** 1800s
- **Provider:** Hostinger DNS API

### Supabase Setup

1. Create a new Supabase project
2. Run `supabase/schema.sql` in the SQL editor
3. Add the project URL and anon key to `.env.local`

---

## Future Roadmap

### Phase 1: Live Data Integration (Next)
- Connect to real Stripe billing data
- Pull actual customer counts from Supabase
- Real-time revenue updates via webhooks

### Phase 2: AI-Powered Optimization
- Gemini-driven pricing recommendations
- Automated affiliate program discovery
- Churn prediction and prevention alerts

### Phase 3: Autonomous Revenue Generation
- Self-optimizing pricing based on conversion data
- Automated affiliate link placement
- Email sequence triggers for upsells

### Phase 4: Multi-Tenant SaaS
- Offer RevenueEngine as a service to other studios
- White-label dashboard option
- API access for third-party integrations

---

## License

Private repository. © 2026 Boone51 Studios. All rights reserved.

---

## Contact

- **Email:** hello@boone51.com
- **GitHub:** [enoob15/revenueengine](https://github.com/enoob15/revenueengine)
- **Live:** [revenueengine.boone51.com](https://revenueengine.boone51.com)