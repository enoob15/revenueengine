'use client';

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { RevenueSeriesPoint } from '@/lib/types';
import { formatCompactCurrency } from '@/lib/format';

export function RevenueChart({ data }: { data: RevenueSeriesPoint[] }) {
  return (
    <div className="panel p-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Revenue Dashboard</p>
          <h2 className="mt-2 text-2xl font-semibold">Income streams by month</h2>
        </div>
        <p className="max-w-sm text-sm text-white/60">Subscriptions stay dominant while affiliate lift accelerates through March and April.</p>
      </div>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="subs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#75d8ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#75d8ff" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="affiliate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7cf7c2" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#7cf7c2" stopOpacity={0.04} />
              </linearGradient>
            </defs>
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
            <Area type="monotone" dataKey="subscriptions" stroke="#75d8ff" fill="url(#subs)" strokeWidth={2.5} />
            <Area type="monotone" dataKey="affiliate" stroke="#7cf7c2" fill="url(#affiliate)" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
