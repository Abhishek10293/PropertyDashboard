"use client"

import { PropertyProvider } from "@/contexts/property-context"
import { ThemeProvider } from "@/contexts/theme-context"
import { PropertyDashboard } from "@/components/property-dashboard"

export default function Home() {
  return (
    <ThemeProvider>
      <PropertyProvider>
        <PropertyDashboard />
      </PropertyProvider>
    </ThemeProvider>
  )
}
