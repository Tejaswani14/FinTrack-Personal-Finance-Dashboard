"use client"

import { AppLayout } from "@/components/app-layout"
import { useFinanceStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts"
import { useState } from "react"

export default function AnalyticsPage() {
  const { transactions, getTotalIncome, getTotalExpenses } = useFinanceStore()
  const [timeRange, setTimeRange] = useState("monthly")

  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      },
      {} as Record<string, number>,
    )

  const categoryData = Object.entries(expensesByCategory)
    .map(([category, amount]) => ({
      category,
      amount,
    }))
    .sort((a, b) => b.amount - a.amount)

  const totalIncome = getTotalIncome()
  const totalExpenses = getTotalExpenses()
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0

  const monthlyTrends = [
    { month: "Jul", income: 4500, expenses: 3000, savings: 1500 },
    { month: "Aug", income: 4700, expenses: 3100, savings: 1600 },
    { month: "Sep", income: 4900, expenses: 3300, savings: 1600 },
    { month: "Oct", income: 4800, expenses: 3200, savings: 1600 },
    { month: "Nov", income: 5200, expenses: 3500, savings: 1700 },
    { month: "Dec", income: totalIncome, expenses: totalExpenses, savings: totalIncome - totalExpenses },
  ]

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-balance">Analytics</h1>
            <p className="text-muted-foreground mt-2">Deep insights into your financial patterns</p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Savings Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{savingsRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground mt-2">Of your income saved</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-secondary/20">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Monthly Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-secondary">${(totalExpenses / 1).toFixed(0)}</div>
              <p className="text-xs text-muted-foreground mt-2">This month</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-accent/20">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Top Spending Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-accent">{categoryData[0]?.category || "N/A"}</div>
              <p className="text-xs text-muted-foreground mt-2">
                ${categoryData[0]?.amount.toLocaleString() || 0} spent
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Financial Trends (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="hsl(var(--chart-5))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-5))", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-2))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="category" type="category" stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="amount" fill="hsl(var(--chart-3))" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
