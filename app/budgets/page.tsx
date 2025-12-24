"use client"

import type React from "react"

import { AppLayout } from "@/components/app-layout"
import { useFinanceStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function BudgetPage() {
  const { budgets, setBudget } = useFinanceStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const [newLimit, setNewLimit] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCategory && newLimit) {
      setBudget(newCategory, Number(newLimit))
      setNewCategory("")
      setNewLimit("")
      setIsDialogOpen(false)
    }
  }

  const getBudgetStatus = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100
    if (percentage >= 100) return { color: "text-destructive", bg: "bg-destructive", status: "Over Budget" }
    if (percentage >= 80) return { color: "text-yellow-500", bg: "bg-yellow-500", status: "Near Limit" }
    return { color: "text-primary", bg: "bg-primary", status: "On Track" }
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-balance">Budget Management</h1>
            <p className="text-muted-foreground mt-2">Set and track your spending limits</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-5 w-5" />
                Set Budget
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set Category Budget</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g., Food, Entertainment"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="limit">Monthly Limit ($)</Label>
                  <Input
                    id="limit"
                    type="number"
                    placeholder="e.g., 500"
                    value={newLimit}
                    onChange={(e) => setNewLimit(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Set Budget
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.limit) * 100
            const status = getBudgetStatus(budget.spent, budget.limit)
            return (
              <Card key={budget.category} className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{budget.category}</CardTitle>
                    <span className={`text-sm font-medium ${status.color}`}>{status.status}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Spent</span>
                      <span className="font-medium">
                        ${budget.spent.toLocaleString()} / ${budget.limit.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${status.bg} transition-all duration-500`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{percentage.toFixed(1)}% used</span>
                      <span className="text-muted-foreground">
                        ${(budget.limit - budget.spent).toLocaleString()} remaining
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {budgets.length === 0 && (
          <Card className="glass-card">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No budgets set yet. Click "Set Budget" to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
