"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { ForecastPoint } from "@/lib/data/forecast";

type ForecastChartProps = {
  points: ForecastPoint[];
};

export function ForecastChart({ points }: ForecastChartProps) {
  return (
    <section className="rounded-3xl panel p-6">
      <div className="eyebrow">Revenue forecast</div>
      <h2 className="mt-3 text-2xl font-semibold text-white">Forward revenue view</h2>
      <p className="mt-2 text-sm text-slate-400">
        Forecast model blends subscription momentum, affiliate upside, and pricing experiment impact.
      </p>
      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={points}>
            <defs>
              <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
            <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid rgba(148, 163, 184, 0.24)",
                borderRadius: "16px"
              }}
            />
            <Area type="monotone" dataKey="target" stroke="#38bdf8" strokeDasharray="4 4" fill="transparent" />
            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#forecastGradient)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
