"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Eye, Trash2 } from "lucide-react" // Added Trash2 icon
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog" // Added AlertDialog components
import { useToast } from "@/hooks/use-toast" // For toast notifications
import { useProperty, type Property } from "@/contexts/property-context" // Import useProperty
import Image from "next/image"

interface PropertyCardProps {
  property: Property
  onView: () => void
}

export function PropertyCard({ property, onView }: PropertyCardProps) {
  const { deleteProperty } = useProperty() // Use deleteProperty from context
  const { toast } = useToast()

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

  const handleDelete = () => {
    deleteProperty(property.id)
    toast({
      title: "Property Deleted",
      description: `${property.name} has been removed.`,
    })
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image src={property.image || "/placeholder.svg"} alt={property.name} fill className="object-cover" />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary">{capitalizeType(property.type)}</Badge>
          </div>
          <div className="absolute top-2 right-2">
            <Badge className="bg-primary text-primary-foreground">{formatPrice(property.price)}/month</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{property.name}</h3>

        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.area} sq ft</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{property.description}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        {" "}
        {/* Added flex gap-2 */}
        <Button onClick={onView} className="flex-1">
          {" "}
          {/* Made View button flexible */}
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              {" "}
              {/* Delete button */}
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete property</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the property &quot;{property.name}&quot; from
                your listings.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}
