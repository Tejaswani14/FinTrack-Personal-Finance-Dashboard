"use client"

import { Card } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Food", value: 1850, color: "var(--chart-1)" },
  { name: "Rent", value: 3200, color: "var(--chart-2)" },
  { name: "Travel", value: 890, color: "var(--chart-3)" },
  { name: "Shopping", value: 1450, color: "var(--chart-4)" },
  { name: "Bills", value: 844, color: "var(--chart-5)" },
]

export function ExpenseChart() {
  return (
    <Card className="p-6">
      <div className="space-y-1 mb-4">
        <h3 className="text-lg font-semibold">Expense Breakdown</h3>
        <p className="text-sm text-muted-foreground">Monthly expenses by category</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `$${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
          />
          <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-sm">{value}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}
