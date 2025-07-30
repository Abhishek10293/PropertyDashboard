"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Property } from "@/contexts/property-context"
import Image from "next/image"

interface PropertyModalProps {
  property: Property
  onClose: () => void
}

export function PropertyModal({ property, onClose }: PropertyModalProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const capitalizeType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{property.name}</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <Image src={property.image || "/placeholder.svg"} alt={property.name} fill className="object-cover" />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary">{capitalizeType(property.type)}</Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary text-primary-foreground text-lg px-3 py-1">
                {formatPrice(property.price)}/month
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-lg">{property.location}</span>
            </div>

            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center">
                <Bed className="h-5 w-5 mr-2" />
                <span>{property.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-5 w-5 mr-2" />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center">
                <Square className="h-5 w-5 mr-2" />
                <span>{property.area} sq ft</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            {property.coordinates && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Location</h3>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Coordinates: {property.coordinates.lat.toFixed(4)}, {property.coordinates.lng.toFixed(4)}
                  </p>
                  <div className="bg-background rounded border h-32 flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">Map integration would be displayed here</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
