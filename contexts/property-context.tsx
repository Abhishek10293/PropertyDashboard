"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Property {
  id: string
  name: string
  type: "apartment" | "house" | "condo" | "townhouse"
  price: number
  location: string
  description: string
  image: string
  coordinates?: { lat: number; lng: number }
  bedrooms: number
  bathrooms: number
  area: number
}

interface PropertyContextType {
  properties: Property[]
  addProperty: (property: Omit<Property, "id">) => void
  deleteProperty: (id: string) => void
  filteredProperties: Property[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedType: string
  setSelectedType: (type: string) => void
  loading: boolean
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined)

// Mock API data with real image URLs from Unsplash
const mockProperties: Property[] = [
  {
    id: "1",
    name: "Modern Downtown Apartment",
    type: "apartment",
    price: 2500,
    location: "Downtown, New York",
    description:
      "A beautiful modern apartment in the heart of downtown with stunning city views and premium amenities.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    coordinates: { lat: 40.7128, lng: -74.006 },
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
  },
  {
    id: "2",
    name: "Cozy Suburban House",
    type: "house",
    price: 3200,
    location: "Suburbia, California",
    description: "A charming family house with a large backyard, perfect for families with children and pets.",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    bedrooms: 4,
    bathrooms: 3,
    area: 2400,
  },
  {
    id: "3",
    name: "Luxury Waterfront Condo",
    type: "condo",
    price: 4500,
    location: "Miami Beach, Florida",
    description: "Exclusive waterfront condominium with private beach access and world-class amenities.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    coordinates: { lat: 25.7617, lng: -80.1918 },
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
  },
  {
    id: "4",
    name: "Historic Townhouse",
    type: "townhouse",
    price: 2800,
    location: "Boston, Massachusetts",
    description: "Beautiful historic townhouse with original architecture and modern renovations.",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    coordinates: { lat: 42.3601, lng: -71.0589 },
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
  },
  {
    id: "5",
    name: "Studio Loft",
    type: "apartment",
    price: 1800,
    location: "Brooklyn, New York",
    description: "Trendy studio loft in a converted warehouse with high ceilings and industrial features.",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    coordinates: { lat: 40.6782, lng: -73.9442 },
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
  },
  {
    id: "6",
    name: "Mountain View House",
    type: "house",
    price: 3800,
    location: "Denver, Colorado",
    description: "Stunning house with panoramic mountain views and outdoor recreation access.",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    coordinates: { lat: 39.7392, lng: -104.9903 },
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
  },
]

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [loading, setLoading] = useState(true)

  // Simulate API fetch
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProperties(mockProperties)
      setLoading(false)
    }

    fetchProperties()
  }, [])

  const addProperty = (newProperty: Omit<Property, "id">) => {
    // Generate a random property image for new properties if none is provided
    const propertyImages = [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ]

    const finalImage = newProperty.image || propertyImages[Math.floor(Math.random() * propertyImages.length)]

    const property: Property = {
      ...newProperty,
      id: Date.now().toString(),
      image: finalImage, // Use the provided image or a random one
    }
    setProperties((prev) => [property, ...prev])
  }

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((property) => property.id !== id))
  }

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedType === "all" || property.type === selectedType

    return matchesSearch && matchesType
  })

  return (
    <PropertyContext.Provider
      value={{
        properties,
        addProperty,
        deleteProperty,
        filteredProperties,
        searchTerm,
        setSearchTerm,
        selectedType,
        setSelectedType,
        loading,
      }}
    >
      {children}
    </PropertyContext.Provider>
  )
}

export function useProperty() {
  const context = useContext(PropertyContext)
  if (!context) {
    throw new Error("useProperty must be used within a PropertyProvider")
  }
  return context
}
