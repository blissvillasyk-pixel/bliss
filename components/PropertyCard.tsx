"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square } from "lucide-react";
import { motion } from "framer-motion";
import { Property } from "@prisma/client";
import { PLACEHOLDER_IMAGE } from "@/constants";
import { convertToIDR, convertToTitleCase } from "@/helper/formatter";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const isAvailable = property.isAvailable;
  const availabilityLabel = isAvailable ? "Tersedia" : "Tidak Tersedia";
  const availabilityColor = isAvailable ? "bg-green-600" : "bg-orange-600";

  return (
    <Link href={`/property/${property.id}`} className="block">
      <motion.div
        whileHover={{
          y: -4,
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        className="group"
      >
        <Card className="overflow-hidden rounded-2xl shadow-lg border-0 bg-white hover:shadow-xl hover:ring-2 hover:ring-primary-foreground transition-all duration-300">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={property?.images?.[0] || PLACEHOLDER_IMAGE}
                alt={`Tampilan eksterior ${property.name}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Badges and Availability Status */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
              <div className="flex flex-col gap-2">
                {/* Availability Status Badge */}
                <Badge
                  className={`${availabilityColor} text-white font-medium px-3 py-1 rounded-lg shadow-sm`}
                >
                  {availabilityLabel}
                </Badge>
              </div>
            </div>
          </div>

          <CardContent className="p-4 lg:p-6">
            <div className="space-y-3">
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                  {property.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{property.address}</p>
                <Badge variant="outline" className="text-xs mt-2">
                  {convertToTitleCase(property.type)}
                </Badge>
              </div>

              <div className="text-xl lg:text-2xl font-bold text-primary-600">
                {convertToIDR(property.price)}
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Square className="h-4 w-4" />
                  <span className="line-clamp-1">{property.sqft} m²</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Bed className="h-4 w-4" />
                  <span className="line-clamp-1">{property.room} Kamar</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Bath className="h-4 w-4" />
                  <span className="line-clamp-1">
                    {property.bath} Kamar Mandi
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
