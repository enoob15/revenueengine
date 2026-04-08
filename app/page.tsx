import Link from 'next/link';
import { ArrowRight, Bot, BarChart3, Coins, Radar, Sparkles } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';

import { MetricCard } from '@/components/metric-card';
import { getDashboardData } from '@/lib/services/dashboard';
import { formatCompactCurrency, formatCurrency, formatPercent } from '@/lib/format';

const featureCards = [
  {
    icon: Radar,
    title: 'Revenue dashboard',
    body: 'Track subscriptions, affiliates, one-time revenue, and margin across the full Boone51 portfolio.',
  },
  {
    icon: Sparkles,
    title: 'Affiliate engine',
    body: 'Match products to live partner programs, then suggest placements based on fit and profit density.',
  },
  {
    icon: Coins,
    title: 'Pricing optimizer',
    body: 'Queue price-anchor tests automatically and prioritize the experiments with the highest projected lift.',
  },
  {
    icon: Bot,
    title: 'Passive income automator',
    body: 'Schedule content, email, and social promotion loops from one revenue operations surface.',
  },
];

export default async function HomePage() {
  noStore();
  const data = await getDashboardData();
  const strongestProduct = [...data.products].sort((left, right) => right.monthlyProfit - left.monthlyProfit)[0];

  return (
    <div>
      <header className="shell py-6">
        <nav className="panel flex items-center justify-between px-5 py-4">
          <div>
            <p className="eyebrow">Boone51 Studios</p>
            <div className="mt-1 text-xl font-semibold">RevenueEngine</div>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <Link className="hover:text-white" href="#features">Features</Link>
            <Link className="hover:text-white" href="#pricing">Pricing</Link>
            <Link className="rounded-full bg-white px-4 py-2 text-ink transition hover:bg-signal" href="/dashboard">
              Open dashboard
            </Link>
          </div>
        </nav>
      </header>

      <main className="pb-16">
        <section className="shell pt-8">
          <div className="panel hero-grid overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
            <div className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
              <div>
                <p className="eyebrow">Creation Shift Build</p>
                <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[0.95] sm:text-6xl">
                  Autonomous revenue ops for Boone51’s full product stack.
                </h1>
                <p className="mt-5 max-w-2xl text-lg text-white/70 sm:text-xl">
                  RevenueEngine watches the portfolio, surfaces monetization gaps, tests pricing, and routes affiliate opportunities into a repeatable automation loop.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link className="rounded-full bg-signal px-5 py-3 text-sm font-medium text-ink transition hover:bg-white" href="/dashboard">
                    Launch control room
                  </Link>
                  <a className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white" href="#pricing">
                    View product tiers
                  </a>
                </div>
                <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/70">
                  <span className="chip">{data.portfolio.activeProducts} products connected</span>
                  <span className="chip">{formatCompactCurrency(data.portfolio.totalMrr)} MRR tracked</span>
                  <span className="chip">{formatCompactCurrency(data.portfolio.affiliateLiftPotential)} affiliate lift queued</span>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <MetricCard
                  title="Portfolio MRR"
                  value={formatCompactCurrency(data.portfolio.totalMrr)}
                  detail={`${formatCurrency(data.portfolio.monthlyProfit)} monthly profit across Boone51 products.`}
                  accent="signal"
                />
                <MetricCard
                  title="Affiliate Lift"
                  value={formatCompactCurrency(data.portfolio.affiliateLiftPotential)}
                  detail="Projected monthly upside from official partner placements."
                  accent="cyan"
                />
                <MetricCard
                  title="Automation Coverage"
                  value={`${data.portfolio.automationCoverage}%`}
                  detail="Share of products with monetization plays already mapped."
                  accent="gold"
                />
                <MetricCard
                  title="Best Margin"
                  value={strongestProduct.name}
                  detail={`${formatCurrency(strongestProduct.monthlyProfit)} profit with ${formatPercent(strongestProduct.grossMargin * 100, 0)} gross margin.`}
                  accent="ember"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="shell mt-12">
          <div className="grid gap-5 lg:grid-cols-4">
            {featureCards.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="panel p-6">
                  <div className="inline-flex rounded-2xl bg-white/10 p-3 text-cyan">
                    <Icon size={22} />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold">{feature.title}</h2>
                  <p className="mt-3 text-sm text-white/70">{feature.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="shell mt-12">
          <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
            <article className="panel p-6">
              <p className="eyebrow">Portfolio Insight</p>
              <h2 className="mt-2 text-3xl font-semibold">One operator view for pricing, affiliate, and expansion revenue.</h2>
              <p className="mt-4 text-white/70">
                RevenueEngine is built around Boone51’s actual catalog: FormCatch, Pinpoint, LinkLab, StatusCraft, ShopSmart, CompetitorLens, and Portfoliosys.
              </p>
              <Link className="mt-8 inline-flex items-center gap-2 text-cyan" href="/dashboard">
                Inspect the live dashboard <ArrowRight size={16} />
              </Link>
            </article>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.products.map((product) => (
                <article key={product.slug} className="panel p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p className="mt-1 text-sm text-white/60">{product.category}</p>
                    </div>
                    <span className="chip">{formatCurrency(product.monthlyRevenue)}</span>
                  </div>
                  <p className="mt-4 text-sm text-white/60">{product.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="shell mt-12">
          <div className="panel p-6 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">RevenueEngine Pricing</p>
                <h2 className="mt-2 text-3xl font-semibold">Built to monetize Boone51, then sell as a product.</h2>
              </div>
              <Link className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-signal" href="/dashboard">
                See plan in dashboard <BarChart3 size={16} />
              </Link>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {data.tiers.map((tier) => (
                <article key={tier.name} className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                  <p className="eyebrow">{tier.highlight}</p>
                  <h3 className="mt-3 text-3xl font-semibold">{tier.name}</h3>
                  <p className="mt-2 text-2xl text-signal">{tier.priceLabel}</p>
                  <div className="mt-5 space-y-3 text-sm text-white/70">
                    {tier.features.map((feature) => (
                      <p key={feature}>{feature}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
