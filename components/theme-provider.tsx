"use client"

import * as React from "react"
import { useFinanceStore } from "@/lib/store"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useFinanceStore()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (mounted) {
      const root = document.documentElement
      root.classList.remove("light", "dark")
      root.classList.add(theme)
    }
  }, [theme, mounted])

  return <>{children}</>
}
