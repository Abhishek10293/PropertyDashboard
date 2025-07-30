"use client"

import { PropertyCard } from "./property-card"
import { PropertyCardSkeleton } from "./property-card-skeleton"
import { useProperty, type Property } from "@/contexts/property-context"

interface PropertyListProps {
  onViewProperty: (property: Property) => void
}

export function PropertyList({ onViewProperty }: PropertyListProps) {
  const { filteredProperties, loading } = useProperty()

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (filteredProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No properties found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProperties.map((property) => (
        <PropertyCard key={property.id} property={property} onView={() => onViewProperty(property)} />
      ))}
    </div>
  )
}
