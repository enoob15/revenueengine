'use client';

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { ForecastPoint } from '@/lib/types';
import { formatCompactCurrency } from '@/lib/format';

export function ForecastChart({ data }: { data: ForecastPoint[] }) {
  return (
    <div className="panel p-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Revenue Intelligence</p>
          <h2 className="mt-2 text-2xl font-semibold">Forecast vs actuals</h2>
        </div>
        <p className="max-w-sm text-sm text-white/60">Projection line assumes current pricing tests and affiliate placements ship on schedule.</p>
      </div>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.45)" tickLine={false} axisLine={false} />
            <YAxis tickFormatter={formatCompactCurrency} stroke="rgba(255,255,255,0.45)" tickLine={false} axisLine={false} />
            <Tooltip
              formatter={(value) => (typeof value === "number" ? formatCompactCurrency(value) : "-")}
              contentStyle={{
                background: 'rgba(6,16,31,0.96)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
              }}
            />
            <Line type="monotone" dataKey="actual" stroke="#f7c35f" strokeWidth={3} dot={{ r: 4 }} connectNulls={false} />
            <Line type="monotone" dataKey="projected" stroke="#ff8c61" strokeWidth={3} strokeDasharray="6 6" dot={{ r: 4 }} connectNulls={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
