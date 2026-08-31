export type ForecastPoint = {
  month: string;
  revenue: number;
  target: number;
};

export const forecast: ForecastPoint[] = [
  { month: "Apr", revenue: 10195, target: 10500 },
  { month: "May", revenue: 10840, target: 11200 },
  { month: "Jun", revenue: 11630, target: 11950 },
  { month: "Jul", revenue: 12420, target: 12800 },
  { month: "Aug", revenue: 13310, target: 13650 },
  { month: "Sep", revenue: 14225, target: 14500 }
];
