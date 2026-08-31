export type AutomationTask = {
  name: string;
  cadence: string;
  objective: string;
  lastRun: string;
  status: "Ready" | "Scheduled";
};

export const automationTasks: AutomationTask[] = [
  {
    name: "Portfolio sync",
    cadence: "Daily 06:00 UTC",
    objective: "Refresh Boone51 product metrics and pricing context.",
    lastRun: "2026-04-08 06:00 UTC",
    status: "Scheduled"
  },
  {
    name: "Affiliate scan",
    cadence: "Daily 06:15 UTC",
    objective: "Re-score affiliate opportunities against live Boone51 traffic.",
    lastRun: "2026-04-08 06:15 UTC",
    status: "Ready"
  },
  {
    name: "Pricing optimizer",
    cadence: "Daily 06:30 UTC",
    objective: "Review A/B experiments and recommend the next pricing move.",
    lastRun: "2026-04-08 06:30 UTC",
    status: "Ready"
  }
];
