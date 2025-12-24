"use client"

import { AppLayout } from "@/components/app-layout"
import { useFinanceStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Upload, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const { currency, setCurrency, transactions, theme, setTheme } = useFinanceStore()

  const handleExport = () => {
    const dataStr = JSON.stringify({ transactions }, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "fintrack-data.json"
    link.click()
  }

  return (
    <AppLayout>
      <div className="space-y-8 max-w-3xl">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-balance">Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your preferences and account settings</p>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your.email@example.com" defaultValue="john@example.com" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={theme} onValueChange={(value) => setTheme(value as "light" | "dark")}>
                <SelectTrigger id="theme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" onClick={handleExport}>
              <Download className="h-5 w-5" />
              Export Data
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
              <Upload className="h-5 w-5" />
              Import Data
            </Button>
            <Button variant="destructive" className="w-full justify-start gap-2">
              <Trash2 className="h-5 w-5" />
              Reset All Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
