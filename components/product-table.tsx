import { Product } from "@/lib/data/products";

type ProductTableProps = {
  products: Product[];
};

export function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl panel">
      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="text-xl font-semibold text-white">Boone51 product portfolio</h2>
        <p className="mt-1 text-sm text-slate-400">
          RevenueEngine tracks all seven Boone51 Studios products in one operating view.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Pricing tiers</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Active customers</th>
              <th className="px-6 py-4 font-medium">Monthly revenue</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.slug} className="border-t border-white/5">
                <td className="px-6 py-4 align-top">
                  <div className="font-medium text-white">{product.name}</div>
                  <div className="mt-1 text-slate-400">{product.description}</div>
                  {product.url ? (
                    <a href={product.url} className="mt-2 inline-block text-blue-300 transition hover:text-blue-200">
                      {product.url.replace("https://", "")}
                    </a>
                  ) : (
                    <span className="mt-2 inline-block text-slate-500">Internal Boone51 channel</span>
                  )}
                </td>
                <td className="px-6 py-4 align-top text-slate-200">{product.pricingTiers.join(" / ")}</td>
                <td className="px-6 py-4 align-top">
                  <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-200">
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 align-top text-slate-200">{product.activeCustomers}</td>
                <td className="px-6 py-4 align-top text-slate-200">
                  ${product.monthlyRevenue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
