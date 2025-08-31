"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Bed,
  Bath,
  Square,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useData } from "@/service/data";
import { PLACEHOLDER_IMAGE } from "@/constants";
import { convertToIDR } from "@/helper/formatter";
import { useRouter } from "next/navigation";

export function RelatedProperties() {
  const { data, isLoading } = useData();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollDistance = window.innerWidth >= 768 ? -400 : -300;
      scrollContainerRef.current.scrollBy({
        left: scrollDistance,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollDistance = window.innerWidth >= 768 ? 400 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollDistance,
        behavior: "smooth",
      });
    }
  };

  if (isLoading || !data) return null;

  return (
    <section className="py-12 lg:py-20 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-primary-600 font-medium mb-2">
              Properti Terkait
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {data?.relatedProperty?.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {data?.relatedProperty?.subtitle}
            </p>
          </div>
        </AnimatedSection>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-3 sm:space-y-0">
          {/* Navigation arrows - visible on medium screens and up */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={scrollLeft}
              className="h-10 w-10 p-0 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollRight}
              className="h-10 w-10 p-0 rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Horizontal scrollable container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {data?.properties?.map((prop) => (
            <motion.div
              key={prop.id}
              whileHover={{ y: -4 }}
              className="group cursor-pointer flex-shrink-0"
              style={{ minWidth: "260px", maxWidth: "300px" }}
            >
              <Card
                className="overflow-hidden w-full"
                onClick={() => {
                  router.push(`/property/${prop.id}`);
                }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={prop.images[0] || PLACEHOLDER_IMAGE}
                    alt={prop.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <Badge
                      variant="secondary"
                      className={`text-xs sm:text-sm ${
                        prop.isAvailable
                          ? "bg-green-600 text-white"
                          : "bg-orange-600 text-white"
                      }`}
                    >
                      {prop.isAvailable ? "Tersedia" : "Tidak Tersedia"}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3 sm:p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 text-sm sm:text-base">
                    {prop.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 flex items-center">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-primary-600 flex-shrink-0" />
                    <span className="line-clamp-1">{prop.address}</span>
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Bed className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600" />
                        <span>{prop.room}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Bath className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600" />
                        <span>{prop.bath}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Square className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600" />
                        <span>{prop.sqft}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs sm:text-sm font-medium">
                        {prop.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-primary-600">
                    {convertToIDR(prop.price)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {false && (
          <div className="text-center mt-8"></div>
        )}
      </div>
    </section>
  );
}
