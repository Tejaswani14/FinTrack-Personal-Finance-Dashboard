"use client"

import { Card } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  { month: "Jan", income: 12000, expenses: 8200 },
  { month: "Feb", income: 11500, expenses: 7800 },
  { month: "Mar", income: 12800, expenses: 8600 },
  { month: "Apr", income: 12200, expenses: 8000 },
  { month: "May", income: 13100, expenses: 8400 },
  { month: "Jun", income: 12450, expenses: 8234 },
]

export function IncomeVsExpenseChart() {
  return (
    <Card className="p-6">
      <div className="space-y-1 mb-4">
        <h3 className="text-lg font-semibold">Income vs Expenses</h3>
        <p className="text-sm text-muted-foreground">Last 6 months comparison</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
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
          <Legend
            wrapperStyle={{ fontSize: "14px" }}
            formatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
          />
          <Bar dataKey="income" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
          <Bar dataKey="expenses" fill="var(--chart-5)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
