create table if not exists products (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  description text not null,
  url text,
  pricing_tiers text[] not null,
  status text not null,
  active_customers integer not null default 0,
  monthly_revenue integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists affiliate_opportunities (
  id bigint generated always as identity primary key,
  name text unique not null,
  category text not null,
  fit text not null,
  commission text not null,
  priority text not null,
  monthly_potential integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists pricing_experiments (
  id bigint generated always as identity primary key,
  experiment_key text unique not null,
  product text not null,
  hypothesis text not null,
  control_variant text not null,
  test_variant text not null,
  metric text not null,
  status text not null,
  expected_lift text not null,
  created_at timestamptz not null default now()
);

create table if not exists revenue_snapshots (
  id bigint generated always as identity primary key,
  snapshot_month text unique not null,
  forecast_revenue integer not null,
  target_revenue integer not null,
  created_at timestamptz not null default now()
);

create table if not exists automation_runs (
  id bigint generated always as identity primary key,
  task_name text unique not null,
  cadence text not null,
  objective text not null,
  last_run_at timestamptz,
  status text not null,
  created_at timestamptz not null default now()
);

insert into products (slug, name, description, url, pricing_tiers, status, active_customers, monthly_revenue)
values
  ('formcatch', 'FormCatch', 'Stateless form backend', 'https://formcatch.boone51.com', array['Free', '$5', '$15'], 'Live', 186, 1745),
  ('pinpoint', 'Pinpoint', 'User feedback and AI agent testing', 'https://pinpoint.boone51.com', array['Free', '$19', '$49'], 'Optimizing', 98, 2213),
  ('linklab', 'LinkLab', 'Smart biolinks with metrics', 'https://linklab.boone51.com', array['Free', '$9', '$29'], 'Live', 134, 1538),
  ('statuscraft', 'StatusCraft', 'AI status pages', null, array['$9', '$29', '$99'], 'Optimizing', 41, 1877),
  ('shopsmart', 'ShopSmart', 'Affiliate shopping comparison', null, array['Affiliate commissions'], 'Monitoring', 0, 1180),
  ('competitorlens', 'CompetitorLens', 'Competitive intelligence', 'https://competitorlens.boone51.com', array['Free', '$19', '$49'], 'Optimizing', 76, 1642),
  ('portfoliosys', 'Portfoliosys', 'Portfolio builder', 'https://portfoliosys.boone51.com', array['Free tier'], 'Monitoring', 212, 0)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  url = excluded.url,
  pricing_tiers = excluded.pricing_tiers,
  status = excluded.status,
  active_customers = excluded.active_customers,
  monthly_revenue = excluded.monthly_revenue;

insert into affiliate_opportunities (name, category, fit, commission, priority, monthly_potential)
values
  ('HubSpot', 'CRM', 'Strong fit for FormCatch and Pinpoint onboarding content.', 'Bounty-based payouts', 'High', 850),
  ('Semrush', 'SEO', 'Pairs with CompetitorLens and growth content.', 'Recurring referral payouts', 'High', 720),
  ('Webflow', 'Site builder', 'Cross-sell for Portfoliosys users moving upmarket.', 'Referral payouts', 'Medium', 480),
  ('Framer', 'Site builder', 'Relevant for LinkLab and Portfoliosys creator workflows.', 'Referral payouts', 'Medium', 410),
  ('Amazon Associates', 'Commerce', 'Supports ShopSmart comparison-driven buying journeys.', 'Category-based referral rates', 'High', 930),
  ('Better Stack', 'Observability', 'Natural add-on for StatusCraft reliability workflows.', 'Referral payouts', 'High', 540),
  ('beehiiv', 'Newsletter', 'Useful for Boone51 product launches and lifecycle email flows.', 'Referral payouts', 'Medium', 360)
on conflict (name) do update set
  category = excluded.category,
  fit = excluded.fit,
  commission = excluded.commission,
  priority = excluded.priority,
  monthly_potential = excluded.monthly_potential;

insert into pricing_experiments (experiment_key, product, hypothesis, control_variant, test_variant, metric, status, expected_lift)
values
  ('pinpoint-annual', 'Pinpoint', 'Annual anchor pricing should improve paid conversion from the free plan.', 'Monthly only: Free / $19 / $49', 'Add annual anchor with two months free messaging', 'Visitor to paid conversion', 'Running', '+12%'),
  ('linklab-bundles', 'LinkLab', 'A creator bundle upsell can raise average revenue per customer.', 'Free / $9 / $29', 'Highlight a creator bundle on the $29 plan', 'ARPU', 'Ready', '+9%'),
  ('formcatch-seats', 'FormCatch', 'Usage-based positioning will convert more pro users than feature-only copy.', 'Feature-led plan copy', 'Submission-volume-led plan copy', 'Starter to pro upgrades', 'Queued', '+7%'),
  ('statuscraft-social-proof', 'StatusCraft', 'Reliability proof points should increase demand for the $29 tier.', 'Generic pricing table', 'Reliability-led pricing table with uptime outcomes', 'Mid-tier selection rate', 'Running', '+11%')
on conflict (experiment_key) do update set
  product = excluded.product,
  hypothesis = excluded.hypothesis,
  control_variant = excluded.control_variant,
  test_variant = excluded.test_variant,
  metric = excluded.metric,
  status = excluded.status,
  expected_lift = excluded.expected_lift;

insert into revenue_snapshots (snapshot_month, forecast_revenue, target_revenue)
values
  ('Apr', 10195, 10500),
  ('May', 10840, 11200),
  ('Jun', 11630, 11950),
  ('Jul', 12420, 12800),
  ('Aug', 13310, 13650),
  ('Sep', 14225, 14500)
on conflict (snapshot_month) do update set
  forecast_revenue = excluded.forecast_revenue,
  target_revenue = excluded.target_revenue;

insert into automation_runs (task_name, cadence, objective, last_run_at, status)
values
  ('Portfolio sync', 'Daily 06:00 UTC', 'Refresh Boone51 product metrics and pricing context.', now(), 'Scheduled'),
  ('Affiliate scan', 'Daily 06:15 UTC', 'Re-score affiliate opportunities against live Boone51 traffic.', now(), 'Ready'),
  ('Pricing optimizer', 'Daily 06:30 UTC', 'Review A/B experiments and recommend the next pricing move.', now(), 'Ready')
on conflict (task_name) do update set
  cadence = excluded.cadence,
  objective = excluded.objective,
  last_run_at = excluded.last_run_at,
  status = excluded.status;
