"use client"

import { Card } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { month: "Jan", savings: 3800 },
  { month: "Feb", savings: 3700 },
  { month: "Mar", savings: 4200 },
  { month: "Apr", savings: 4200 },
  { month: "May", savings: 4700 },
  { month: "Jun", savings: 4216 },
]

export function SavingsTrendChart() {
  return (
    <Card className="p-6">
      <div className="space-y-1 mb-4">
        <h3 className="text-lg font-semibold">Savings Trend</h3>
        <p className="text-sm text-muted-foreground">Monthly savings progress</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="var(--muted-foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip
            formatter={(value: number) => `$${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
          />
          <Area
            type="monotone"
            dataKey="savings"
            stroke="var(--chart-1)"
            strokeWidth={2}
            fill="url(#savingsGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
