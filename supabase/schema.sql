create table if not exists products (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  status text default 'active',
  monthly_revenue numeric default 0,
  monthly_costs numeric default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists revenue_events (
  id bigint generated always as identity primary key,
  provider text not null,
  stripe_event_id text,
  event_type text not null,
  product_slug text,
  amount numeric,
  currency text default 'usd',
  raw jsonb,
  occurred_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists affiliate_links (
  id bigint generated always as identity primary key,
  product_slug text not null,
  program_id text not null,
  destination_url text not null,
  placement text not null,
  clicks integer default 0,
  conversions integer default 0,
  revenue numeric default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists pricing_experiments (
  id bigint generated always as identity primary key,
  product_slug text not null,
  status text default 'draft',
  current_anchor numeric not null,
  candidate_anchor numeric not null,
  estimated_lift_percent numeric,
  confidence text,
  started_at timestamptz,
  ended_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists automation_runs (
  id bigint generated always as identity primary key,
  task text not null,
  status text not null,
  narrative text,
  executed_at timestamptz,
  created_at timestamptz default now()
);

create index if not exists revenue_events_product_slug_idx on revenue_events(product_slug);
create index if not exists affiliate_links_product_slug_idx on affiliate_links(product_slug);
create index if not exists pricing_experiments_product_slug_idx on pricing_experiments(product_slug);
create index if not exists automation_runs_task_idx on automation_runs(task);
