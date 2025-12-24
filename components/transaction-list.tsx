"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingBag, Home, Plane, Utensils, FileText, TrendingUp, Calendar } from "lucide-react"

const categoryIcons = {
  Food: Utensils,
  Rent: Home,
  Travel: Plane,
  Shopping: ShoppingBag,
  Bills: FileText,
  Income: TrendingUp,
}

const transactions = [
  { id: 1, date: "2024-12-20", description: "Salary Deposit", category: "Income", amount: 5000, type: "income" },
  { id: 2, date: "2024-12-18", description: "Monthly Rent", category: "Rent", amount: -3200, type: "expense" },
  { id: 3, date: "2024-12-17", description: "Grocery Shopping", category: "Food", amount: -145, type: "expense" },
  { id: 4, date: "2024-12-15", description: "Online Shopping", category: "Shopping", amount: -89, type: "expense" },
  { id: 5, date: "2024-12-14", description: "Flight Tickets", category: "Travel", amount: -450, type: "expense" },
  { id: 6, date: "2024-12-12", description: "Electricity Bill", category: "Bills", amount: -120, type: "expense" },
  { id: 7, date: "2024-12-10", description: "Restaurant Dinner", category: "Food", amount: -75, type: "expense" },
  { id: 8, date: "2024-12-08", description: "Freelance Project", category: "Income", amount: 1200, type: "income" },
]

export function TransactionList() {
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    if (categoryFilter !== "all" && transaction.category !== categoryFilter) return false
    return true
  })

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <p className="text-sm text-muted-foreground">Track all your income and expenses</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="week">Last week</SelectItem>
              <SelectItem value="month">Last month</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              <SelectItem value="Income">Income</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Rent">Rent</SelectItem>
              <SelectItem value="Travel">Travel</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Bills">Bills</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTransactions.map((transaction) => {
          const Icon = categoryIcons[transaction.category as keyof typeof categoryIcons]
          return (
            <div
              key={transaction.id}
              className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  transaction.type === "income" ? "bg-primary/10" : "bg-muted"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${transaction.type === "income" ? "text-primary" : "text-muted-foreground"}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{transaction.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  <Badge variant="secondary" className="text-xs">
                    {transaction.category}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-lg font-semibold ${
                    transaction.type === "income" ? "text-primary" : "text-foreground"
                  }`}
                >
                  {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {transaction.type === "income" ? "Income" : "Expense"}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="outline">View All Transactions</Button>
      </div>
    </Card>
  )
}
