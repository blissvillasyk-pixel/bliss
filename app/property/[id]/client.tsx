"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ArrowLeft,
  Star,
  Bed,
  Bath,
  Square,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Building2Icon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useProperty } from "@/service/property";
import { convertToIDR, convertToTitleCase } from "@/helper/formatter";
import { useData } from "@/service/data";
import { PLACEHOLDER_IMAGE } from "@/constants";
import { useRouter } from "next/navigation";

interface ProductDetailsClientProps {
  id: string;
}
export default function ProductDetailsClient({
  id,
}: ProductDetailsClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data, isLoading, isError } = useProperty(id);
  const { data: rootData } = useData();
  const [isOpenImage, setIsOpenImage] = useState<string | null>(null);

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

  const relatedProperties = useMemo(() => {
    if (!rootData?.properties || !data) return [];

    const currentProperty = data;
    
    // Filter out current property and create scored properties
    const scoredProperties = rootData.properties
      .filter(prop => prop.id !== id)
      .map(prop => {
        let score = 0;
        
        // Type similarity (highest weight)
        if (prop.type === currentProperty.type) {
          score += 10;
        }
        
        // Location similarity (extract city/area from address)
        const currentAddress = currentProperty.address.toLowerCase();
        const propAddress = prop.address.toLowerCase();
        
        // Check if addresses share common words (city, area, etc.)
        const currentWords = currentAddress.split(/[\s,.-]+/).filter(word => word.length > 2);
        const propWords = propAddress.split(/[\s,.-]+/).filter(word => word.length > 2);
        
        const commonWords = currentWords.filter(word => propWords.includes(word));
        if (commonWords.length > 0) {
          score += commonWords.length * 3; // 3 points per common word
        }
        
        // Price range similarity (within 20% range)
        const priceDiff = Math.abs(prop.price - currentProperty.price);
        const priceRange = currentProperty.price * 0.2;
        if (priceDiff <= priceRange) {
          score += 5;
        }
        
        // Size similarity (within 30% range)
        const sizeDiff = Math.abs(prop.sqft - currentProperty.sqft);
        const sizeRange = currentProperty.sqft * 0.3;
        if (sizeDiff <= sizeRange) {
          score += 3;
        }
        
        // Room count similarity
        if (prop.room === currentProperty.room) {
          score += 2;
        }
        
        // Bathroom count similarity
        if (prop.bath === currentProperty.bath) {
          score += 2;
        }
        
        return { ...prop, score };
      })
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, 6); // Take top 6 properties
    
    return scoredProperties;
  }, [rootData, id, data]);

  // Function to navigate to next image
  const nextImage = () => {
    if (data?.images && data.images.length > 0) {
      setSelectedImage((prev) => 
        prev === data.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Function to navigate to previous image
  const prevImage = () => {
    if (data?.images && data.images.length > 0) {
      setSelectedImage((prev) => 
        prev === 0 ? data.images.length - 1 : prev - 1
      );
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [data?.images]);

  if (isLoading || !rootData)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 w-full">
        <Header />

        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200 pt-16 lg:pt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
              <Link
                href="/"
                className="flex items-center space-x-1 hover:text-primary-600"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Beranda</span>
              </Link>
              <span>/</span>
              <span className="text-gray-900">Detail Properti</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] gap-4">
          <Building2Icon className="w-40 h-40 text-red-500 animate-pulse" />
          <h1 className="text-2xl font-bold">Properti tidak ditemukan</h1>
          <p className="text-gray-500">
            Mohon maaf, properti yang Anda cari tidak ditemukan.
          </p>
          <Button variant="outline" className="mt-4">
            <Link href="/property">Kembali ke Properti</Link>
          </Button>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Header />

      {isOpenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 w-full h-full"
          onClick={() => setIsOpenImage(null)}
        >
          <Image
            src={isOpenImage}
            alt="Image"
            width={1000}
            height={1000}
            className="object-contain cursor-pointer w-[90%] h-[90%] rounded-lg"
          />
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 pt-16 lg:pt-20 w-full">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 w-full">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
            <Link
              href="/"
              className="flex items-center space-x-1 hover:text-primary-600"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Beranda</span>
            </Link>
            <span>/</span>
            <span className="text-gray-900">Detail Properti</span>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 w-full">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 w-full">
          {/* Left Column - Images */}
          <div className="space-y-3 sm:space-y-4 w-full md:w-1/2">
            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-lg w-full cursor-pointer group">
              <Image
                src={data?.images[selectedImage] || PLACEHOLDER_IMAGE}
                alt={`${data?.name} - Image ${selectedImage + 1}`}
                fill
                className="object-cover cursor-pointer"
                onClick={() =>
                  setIsOpenImage(data?.images[selectedImage] || null)
                }
              />
              
              {/* Navigation Arrows */}
              {data?.images && data.images.length > 1 && (
                <>
                  {/* Left Arrow */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  {/* Right Arrow */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {selectedImage + 1} / {data.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex flex-row gap-2 overflow-x-auto scrollbar-hide w-full">
              {data?.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all min-w-[100px] flex-shrink-0 ${
                    selectedImage === index
                      ? "border-primary-600 ring-2 ring-primary-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${data?.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-4 sm:space-y-6 w-full md:w-1/2">
            {/* Category & Title */}
            <div>
              <Badge variant="secondary" className="mb-2 text-xs sm:text-sm">
                {convertToTitleCase(data?.type || "")}
              </Badge>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {data?.name}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 flex items-center">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary-600 flex-shrink-0" />
                <span className="line-clamp-2">{data?.address}</span>
              </p>
            </div>

            {/* Price and Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-600">
                {convertToIDR(data?.price || 0)}
              </div>
              <Badge
                variant={data?.isAvailable ? "default" : "secondary"}
                className={`text-xs sm:text-sm px-3 py-1 w-fit ${
                  data?.isAvailable
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-orange-600 hover:bg-orange-700 text-white"
                }`}
              >
                {data?.isAvailable ? "Tersedia" : "Tidak Tersedia"}
              </Badge>
            </div>

            {/* Delivery Info */}
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 bg-primary-50 p-3 rounded-lg w-full">
              <Clock className="h-4 w-4 text-primary-600 flex-shrink-0" />
              <span>
                {data?.isAvailable
                  ? "Segera pesan untuk mendapatkan properti ini"
                  : "Properti sedang tidak tersedia"}
              </span>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 py-4 border-y border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 text-center sm:text-left">
                <Square className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 mx-auto sm:mx-0" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Luas</p>
                  <p className="text-sm sm:text-base font-semibold">
                    {data?.sqft} m²
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 text-center sm:text-left">
                <Bed className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 mx-auto sm:mx-0" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Kamar</p>
                  <p className="text-sm sm:text-base font-semibold">
                    {data?.room}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 text-center sm:text-left">
                <Bath className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 mx-auto sm:mx-0" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Kamar Mandi
                  </p>
                  <p className="text-sm sm:text-base font-semibold">
                    {data?.bath}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="w-full sm:flex-1 bg-primary-600 hover:bg-primary-700 text-white text-sm sm:text-base"
                onClick={() => {
                  window.open(
                    `https://wa.me/${rootData?.contact?.phone}`,
                    "_blank"
                  );
                }}
              >
                Hubungi Agen
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-6 sm:px-8 text-sm sm:text-base border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-200"
                onClick={() => {
                  window.open(data?.pdf || "", "_blank");
                }}
              >
                Lihat Katalog Lengkap
              </Button>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3">
                  Deskripsi & Fitur
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                  {data?.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {data?.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Properties */}
        <div className="mt-12 sm:mt-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-3 sm:space-y-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center sm:text-left">
              Properti Terkait
            </h2>
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
            {relatedProperties && relatedProperties?.length > 0 ? (
              relatedProperties?.map((prop) => (
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
              ))
            ) : (
              <div className="flex items-center justify-center w-full py-8">
                <p className="text-gray-500">
                  Tidak ada properti {convertToTitleCase(data?.type || "")} yang{" "}
                  terkait
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
