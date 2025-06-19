"use client"

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Tooltip
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

// data → chart.js format
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthlyData = [95_000, 108_000, 125_000, 118_000, 142_000, 135_000, 158_000, 145_000, 162_000, 148_000, 138_000, 155_450];


// const monthlyData = [
//   { month: "Jan", revenue: 95000 },
//   { month: "Feb", revenue: 108000 },
//   { month: "Mar", revenue: 125000 },
//   { month: "Apr", revenue: 118000 },
//   { month: "May", revenue: 142000 },
//   { month: "Jun", revenue: 135000 },
//   { month: "Jul", revenue: 158000 },
//   { month: "Aug", revenue: 145000 },
//   { month: "Sep", revenue: 162000 },
//   { month: "Oct", revenue: 148000 },
//   { month: "Nov", revenue: 175000 },
//   { month: "Dec", revenue: 128450 },
// ]

export default function MonthlyRevenue() {
  return (
    <div className="space-y-4">
      {/* header stays the same */}
      <Line
        data={{
          labels,
          datasets: [
            {
              data: monthlyData,
              borderColor: "hsl(var(--primary))",
              backgroundColor: "hsl(var(--primary)/.2)",
              tension: 0.4,
              fill: true,
            },
          ],
        }}
        options={{
          plugins: { legend: { display: false } },
          scales: { y: { display: false }, x: { ticks: { color: "#94a3b8" }, grid: { display: false } } }
        }}
        className="h-[200px] w-full"
      />
    </div>
  );
}
