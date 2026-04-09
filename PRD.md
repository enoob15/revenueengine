# Product Requirements Document (PRD)
# RevenueEngine — Autonomous Revenue Optimization for Boone51 Studios

> **Retrospective PRD** — Documented after initial build to capture product decisions, rationale, and context for future development.

---

## 1. Product Overview

### 1.1 Problem Statement

Boone51 Studios operates 7 SaaS products across different market segments. Each product has its own pricing model, user base, and revenue trajectory. Managing this portfolio manually is unsustainable:

- **No unified view** of revenue across products
- **Affiliate opportunities** are identified reactively, not proactively
- **Pricing decisions** are made on intuition, not data
- **Revenue optimization** requires constant manual attention

### 1.2 Product Vision

RevenueEngine is an autonomous revenue optimization dashboard that:
1. **Monitors** all Boone51 products in one view
2. **Identifies** affiliate opportunities matched to each product's audience
3. **Experiments** with pricing using hypothesis-driven A/B tests
4. **Automates** revenue optimization via scheduled cron tasks
5. **Forecasts** revenue growth based on current trajectory

### 1.3 Core Principle

> "If it don't make dollars, it don't make sense."

Every feature must directly contribute to revenue generation or optimization. No vanity metrics. No features that don't move the needle.

---

## 2. Target Users

### 2.1 Primary User: Boone (Founder)

- Needs a single dashboard to monitor all product revenue
- Wants automated optimization so he can focus on building
- Needs pricing recommendations backed by data, not guessing
- Values proactive affiliate identification

### 2.2 Secondary User: AI Agents (Codex, Claude Code, etc.)

- Need structured data APIs to make deployment decisions
- Require machine-readable output for automated analysis
- Will trigger optimization tasks via cron API endpoints

### 2.3 Future User: Other Studio Founders

- Small teams managing multiple SaaS products
- Need the same portfolio-level revenue intelligence
- Will use RevenueEngine as a SaaS tool (Free / $19 / $49 tiers)

---

## 3. Functional Requirements

### 3.1 Revenue Dashboard (P0 — Must Have)

**FR-1.1:** Display total MRR across all Boone51 products  
**FR-1.2:** Show active customer count per product  
**FR-1.3:** Display affiliate revenue potential  
**FR-1.4:** Show month-over-month growth rate  
**FR-1.5:** Provide 6-month revenue forecast with target comparison  

### 3.2 Product Portfolio Table (P0 — Must Have)

**FR-2.1:** List all 7 Boone51 products with key metrics  
**FR-2.2:** Show pricing tiers per product  
**FR-2.3:** Display product status (Live / Monitoring / Optimizing)  
**FR-2.4:** Link to each product's live URL  
**FR-2.5:** Show active customers and monthly revenue per product  

### 3.3 Affiliate Opportunity Engine (P0 — Must Have)

**FR-3.1:** Curate affiliate programs matched to product audiences  
**FR-3.2:** Score programs by priority (High / Medium)  
**FR-3.3:** Show monthly revenue potential per program  
**FR-3.4:** Explain why each program fits specific products  
**FR-3.5:** Display commission structure per program  

### 3.4 Pricing Optimizer (P1 — Should Have)

**FR-4.1:** Manage A/B pricing experiments per product  
**FR-4.2:** Track hypothesis, control variant, and test variant  
**FR-4.3:** Show expected lift per experiment  
**FR-4.4:** Track experiment status lifecycle (Queued → Ready → Running → Analyzed)  
**FR-4.5:** Provide AI-powered pricing recommendations (via Gemini)  

### 3.5 Automation Panel (P1 — Should Have)

**FR-5.1:** Display scheduled optimization tasks  
**FR-5.2:** Show task cadence and last run time  
**FR-5.3:** Trigger tasks via API (cron-ready)  
**FR-5.4:** Track task status (Scheduled / Ready / Running)  

### 3.6 AI Insights (P2 — Nice to Have)

**FR-6.1:** Gemini-powered revenue analysis  
**FR-6.2:** Automated pricing recommendations  
**FR-6.3:** Churn risk alerts  
**FR-6.4:** Market opportunity detection  

---

## 4. Technical Requirements

### 4.1 Architecture

- **Frontend:** Next.js 16 App Router with TypeScript
- **Styling:** Tailwind CSS with dark theme
- **Database:** Supabase (PostgreSQL) with full schema + seed data
- **AI:** Gemini API for revenue insights
- **Payments:** Stripe webhook integration
- **Hosting:** Vercel with custom domain
- **DNS:** revenueengine.boone51.com via Hostinger

### 4.2 API Design

All data endpoints return structured JSON for AI agent consumption:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/portfolio` | GET | Product data with revenue metrics |
| `/api/affiliate-opportunities` | GET | Scored affiliate programs |
| `/api/pricing-experiments` | GET | A/B test definitions and results |
| `/api/stripe/webhook` | POST | Billing event processing |
| `/api/cron` | GET | Task triggering (sync / optimize) |

### 4.3 Database Schema

5 tables with upsert seed data:
- `products` — Portfolio with pricing and revenue
- `affiliate_opportunities` — Scored programs with fit analysis
- `pricing_experiments` — A/B test tracking
- `revenue_snapshots` — Monthly forecast data
- `automation_runs` — Scheduled task state

### 4.4 Performance Requirements

- Dashboard load time < 3 seconds
- API response time < 500ms
- Mobile-responsive design
- Static page pre-rendering where possible

---

## 5. Product Decisions & Rationale

### 5.1 Why Dark Theme?

The Boone51 Studios brand uses a dark, professional aesthetic. The dashboard needs to feel like mission control, not a spreadsheet.

### 5.2 Why Mock Data First?

Shipping fast matters more than perfect data integration. Mock data lets us:
- Validate the UI and feature set immediately
- Deploy and get feedback before building integrations
- Demonstrate the product vision to stakeholders

### 5.3 Why Affiliate Engine vs. Ad Network?

Affiliate programs align with our product audience (developers, founders). They generate recurring revenue without polluting the user experience. An ad network would degrade product quality.

### 5.4 Why Hypothesis-Driven Pricing?

Random price changes are reckless. Each experiment starts with a clear hypothesis, tracks a specific metric, and has a measured expected lift. This protects revenue while optimizing.

### 5.5 Why Gemini for AI Insights?

Gemini API is already configured in the Boone51 stack (used by Engram, Pinpoint, and other products). No new vendor needed. Gemini 2.5 Flash provides fast, cost-effective analysis.

---

## 6. Product Portfolio Context

RevenueEngine tracks these Boone51 products:

| Product | MRR | Customers | Status | Key Insight |
|---------|-----|-----------|--------|-------------|
| FormCatch | $1,745 | 186 | Live | Stateless forms, growing free→paid funnel |
| Pinpoint | $2,213 | 98 | Optimizing | AI agent testing differentiator, high ARPU |
| LinkLab | $1,538 | 134 | Live | Creator-focused, bundle opportunity |
| StatusCraft | $1,877 | 41 | Optimizing | High ARPU, social proof could boost mid-tier |
| ShopSmart | $1,180 | N/A | Monitoring | Affiliate-only model, Amazon Associates fit |
| CompetitorLens | $1,642 | 76 | Optimizing | Competitive intel, Semrush affiliate fit |
| Portfoliosys | $0 | 212 | Monitoring | Large free user base, monetization opportunity |

**Portfolio MRR:** ~$10,195  
**Affiliate Potential:** ~$4,290/month  

---

## 7. Out of Scope (V1)

These features were considered but explicitly excluded from the initial build:

- **Real Stripe integration** — Mock data sufficient for V1
- **User authentication** — Internal tool, no multi-tenant yet
- **Email alerts** — Dashboard is sufficient, notifications later
- **Competitive analysis** — That's CompetitorLens's job
- **Multi-tenant SaaS** — Boone51-only for now
- **White-label** — Future enterprise feature

---

## 8. Success Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Portfolio MRR visibility | Real-time dashboard | ✅ Built |
| Affiliate programs tracked | 7+ programs | ✅ 7 programs |
| Pricing experiments | 3+ active | ✅ 4 experiments |
| Automation tasks | 3+ scheduled | ✅ 3 tasks |
| Revenue forecast | 6-month projection | ✅ Built |
| Deployment | Live on custom domain | ✅ revenueengine.boone51.com |

---

## 9. Build History

### Build 1: Codex (2026-04-08) — FAILED
- **Agent:** Codex (GPT-5.4)
- **Result:** Ignored instructions, built generic "RevenueEngineOS" showcase
- **Issues:** Wrong company (traviseric.com), wrong products (Teneo.io, BookRadar.io), wrong year (2025), wrong branding entirely
- **Lesson:** Codex needs extremely explicit constraints — it will fill in its own ideas if given any creative latitude

### Build 2: Codex with Strict Constraints (2026-04-08) — PARTIAL
- **Agent:** Codex (GPT-5.4) with explicit rules
- **Result:** Source code was correct (Boone51 branding, real products)
- **Issues:** Vercel deployment served cached old build, not new code
- **Lesson:** Always verify deployed content matches source. Never trust a green build.

### Build 3: Clean Vercel Project (2026-04-08) — SUCCESS
- **Action:** Deleted old Vercel project, upgraded Next.js (15→16), fresh deployment
- **Result:** ✅ Correct content live at revenueengine.boone51.com
- **Lesson:** When Vercel serves stale content, delete and recreate the project. Also, keep Next.js updated to avoid security vulnerability blocking deployments.

---

## 10. Known Issues

1. **Vercel caching** — Stale builds can persist; requires project deletion to fix
2. **Mock data only** — No live Stripe/Supabase connection yet
3. **No authentication** — Dashboard is publicly accessible
4. **No real-time updates** — Data is static until manually refreshed
5. **Next.js version** — Upgraded from 15 to 16 to fix security vulnerability

---

## 11. Open Questions

1. **Should RevenueEngine be a standalone product?** The affiliate engine and pricing optimizer could serve other studios. Is there a market?
2. **How to connect real Stripe data?** Webhook endpoint exists but needs actual Stripe key and event processing.
3. **Should automation tasks actually run?** Cron endpoint exists but tasks are mock-only. Need real Supabase writes.
4. **What's the right cadence for pricing experiments?** Daily? Weekly? Needs real traffic data to determine.
5. **Should we add email/slack alerts?** Would require notification infrastructure.

---

## Document Info

- **Author:** Alice (Boone51 Studios AI)
- **Created:** 2026-04-09
- **Last Updated:** 2026-04-09
- **Status:** V1 shipped, retrospective documentation
- **Repository:** github.com/enoob15/revenueengine
- **Live URL:** revenueengine.boone51.com