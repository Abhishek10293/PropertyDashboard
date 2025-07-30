"use client"

import { useState } from "react"
import { PropertyList } from "./property-list"
import { AddPropertyForm } from "./add-property-form"
import { PropertyModal } from "./property-modal"
import { SearchAndFilter } from "./search-and-filter"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Plus, Home } from "lucide-react"
import { useProperty, type Property } from "@/contexts/property-context"

export function PropertyDashboard() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const { filteredProperties, loading } = useProperty()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Property Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <SearchAndFilter />

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {loading ? "Loading properties..." : `${filteredProperties.length} Properties Found`}
            </h2>
          </div>

          <PropertyList onViewProperty={setSelectedProperty} />
        </div>
      </main>

      {showAddForm && <AddPropertyForm onClose={() => setShowAddForm(false)} />}

      {selectedProperty && <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />}
    </div>
  )
}
