import Link from "next/link";
import { affiliatePrograms } from "@/lib/data/affiliate-programs";
import { products } from "@/lib/data/products";

const features = [
  {
    title: "Revenue Dashboard",
    description: "Monitor Boone51 Studios subscription performance and portfolio health in one view."
  },
  {
    title: "Affiliate Engine",
    description: "Score partner programs and surface the highest-yield revenue opportunities."
  },
  {
    title: "Pricing Optimizer",
    description: "Run simple A/B pricing experiments and track lift before changing production offers."
  }
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] panel px-6 py-12 sm:px-10 sm:py-14">
        <div className="eyebrow">Boone51 mission control</div>
        <div className="mt-4 max-w-4xl">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Autonomous Revenue Optimization for Boone51 Studios
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Track, optimize, and grow revenue across your entire product portfolio
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="rounded-full bg-blue-500 px-5 py-3 font-medium text-white transition hover:bg-blue-400"
          >
            Open Dashboard
          </Link>
          <a
            href="https://revenueengine.boone51.com"
            className="rounded-full border border-white/10 px-5 py-3 font-medium text-slate-200 transition hover:border-blue-400/50 hover:text-white"
          >
            revenueengine.boone51.com
          </a>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[2rem] panel p-6">
          <div className="eyebrow">Tracked products</div>
          <h2 className="mt-3 text-2xl font-semibold text-white">Real Boone51 portfolio coverage</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {products.map((product) => (
              <div key={product.slug} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-lg font-medium text-white">{product.name}</div>
                <div className="mt-1 text-sm text-slate-400">{product.description}</div>
                <div className="mt-3 text-sm text-blue-200">{product.pricingTiers.join(" / ")}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] panel p-6">
          <div className="eyebrow">Partner watchlist</div>
          <h2 className="mt-3 text-2xl font-semibold text-white">Affiliate revenue pipeline</h2>
          <div className="mt-6 space-y-3">
            {affiliatePrograms.map((program) => (
              <div key={program.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-white">{program.name}</span>
                  <span className="text-sm text-blue-200">${program.monthlyPotential}</span>
                </div>
                <div className="mt-2 text-sm text-slate-400">{program.fit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
