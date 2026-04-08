# RevenueEngine

RevenueEngine is an autonomous revenue optimization system for Boone51 Studios. It watches Boone51 products, tracks monetization performance, matches official affiliate programs, queues pricing experiments, and exposes cron-ready automation routes for revenue ops.

## What ships in this repo

- Next.js 15 + TypeScript app router application
- Landing page and operator dashboard
- Portfolio model covering FormCatch, Pinpoint, LinkLab, StatusCraft, ShopSmart, CompetitorLens, and Portfoliosys
- Affiliate opportunity engine with official program references
- Pricing optimizer and benchmark model
- Cron endpoint for automated optimization loops
- Stripe webhook ingestion route
- Supabase-ready REST persistence layer and schema
- Gemini-ready strategy hook with deterministic fallback

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` for the landing page and `http://localhost:3000/dashboard` for the operator view.

## Environment

Copy `.env.example` to `.env.local` and provide the keys you want active.

Required for full automation:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `CRON_SECRET`
- `GEMINI_API_KEY`

Optional metric endpoint env vars are included for each Boone51 product so the seeded model can be replaced with live API pulls later.

## API routes

- `GET /api/portfolio`
- `GET /api/affiliate-opportunities`
- `GET /api/pricing-experiments`
- `GET /api/cron?task=sync|optimize`
- `POST /api/stripe/webhook`

## Supabase

Apply [`supabase/schema.sql`](./supabase/schema.sql) to provision the storage tables used by webhook and automation persistence.

## Deployment

1. Create GitHub repo `enoob15/revenueengine`.
2. Push this directory as the repo root.
3. Import the repo into Vercel.
4. Set the production domain to `revenueengine.boone51.com`.
5. Add the environment variables from `.env.example`.
6. Redeploy after Stripe and Supabase credentials are in place.

## Official affiliate references used in the seed catalog

- HubSpot: <https://www.hubspot.com/partners/affiliates/f937>
- beehiiv: <https://www.beehiiv.com/support/article/23352219299095-getting-started-with-the-beehiiv-partner-program>
- Better Stack: <https://betterstack.com/affiliates>
- Semrush: <https://www.semrush.com/lp/affiliate-program/en/>
- Webflow: <https://webflow.com/affiliates>
- Framer: <https://www.framer.com/partners/>
- Amazon Associates: <https://affiliate-program.amazon.com/>
