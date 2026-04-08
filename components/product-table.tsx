import { ProductSnapshot } from '@/lib/types';
import { formatCurrency, formatPercent } from '@/lib/format';

export function ProductTable({ products }: { products: ProductSnapshot[] }) {
  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
        <div>
          <p className="eyebrow">Portfolio Monitor</p>
          <h2 className="mt-2 text-2xl font-semibold">Boone51 product health</h2>
        </div>
        <p className="text-sm text-white/60">Focus on profit density, conversion efficiency, and churn risk.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 text-white/60">
            <tr>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">MRR</th>
              <th className="px-6 py-4 font-medium">Profit</th>
              <th className="px-6 py-4 font-medium">Visitors</th>
              <th className="px-6 py-4 font-medium">Trial to paid</th>
              <th className="px-6 py-4 font-medium">Churn</th>
              <th className="px-6 py-4 font-medium">Gaps</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.slug} className="border-t border-white/10 text-white/80">
                <td className="px-6 py-4 align-top">
                  <div className="font-medium">{product.name}</div>
                  <div className="mt-1 text-xs text-white/50">{product.domain}</div>
                </td>
                <td className="px-6 py-4 align-top">{formatCurrency(product.monthlyRevenue)}</td>
                <td className="px-6 py-4 align-top">{formatCurrency(product.monthlyProfit)}</td>
                <td className="px-6 py-4 align-top">{product.visitorsMonthly.toLocaleString()}</td>
                <td className="px-6 py-4 align-top">{formatPercent(product.trialToPaidRate)}</td>
                <td className="px-6 py-4 align-top">{formatPercent(product.churnRate)}</td>
                <td className="px-6 py-4 align-top">
                  <div className="flex max-w-xs flex-wrap gap-2">
                    {product.monetizationGaps.map((gap) => (
                      <span key={gap} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                        {gap}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
