import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from "lucide-react"

const stats = [
  {
    name: "Total Income",
    value: "$12,450",
    change: "+12.5%",
    trend: "up" as const,
    icon: TrendingUp,
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    name: "Total Expenses",
    value: "$8,234",
    change: "+8.2%",
    trend: "up" as const,
    icon: TrendingDown,
    bgColor: "bg-destructive/10",
    iconColor: "text-destructive",
  },
  {
    name: "Savings",
    value: "$4,216",
    change: "+18.3%",
    trend: "up" as const,
    icon: PiggyBank,
    bgColor: "bg-success/10",
    iconColor: "text-success",
  },
  {
    name: "Balance",
    value: "$28,642",
    change: "+4.1%",
    trend: "up" as const,
    icon: DollarSign,
    bgColor: "bg-secondary/10",
    iconColor: "text-secondary",
  },
]

export function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.name} className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className={`text-sm font-medium ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
                {stat.change}
              </span>
              <span className="text-sm text-muted-foreground">from last month</span>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
