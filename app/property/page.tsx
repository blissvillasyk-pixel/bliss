"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Search, Filter } from "lucide-react";
import { useData } from "@/service/data";
import { PropertyType } from "@prisma/client";
import { convertToTitleCase } from "@/helper/formatter";

export default function PropertyListPage() {
  const { data, isLoading } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState("all");
  const [selectedSort, setSelectedSort] = useState<
    "newest" | "price-low" | "price-high" | "rating"
  >("newest");
  // Filter properties based on search and filters
  const filteredProperties = data?.properties
    .filter((property) => {
      const matchesSearch =
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        selectedType === "all" || property.type === selectedType;
      const matchesPrice =
        selectedPrice === "all" ||
        (selectedPrice === "low" && property.price < 800000000) ||
        (selectedPrice === "medium" &&
          property.price >= 800000000 &&
          property.price < 1500000000) ||
        (selectedPrice === "high" && property.price >= 1500000000);
      const matchesAvailability =
        selectedAvailability === "all" ||
        (selectedAvailability === "available" && property.isAvailable) ||
        (selectedAvailability === "unavailable" && !property.isAvailable);
      return (
        matchesSearch && matchesType && matchesPrice && matchesAvailability
      );
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  if (isLoading || !data)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-t-transparent border-b-transparent border-r-transparent border-l-transparent border-2 border-primary-600 rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary-50 to-primary-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                {data?.propertyPage?.title}
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                {data?.propertyPage?.subtitle}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari properti atau lokasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Tipe Properti" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  {Object.values(PropertyType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {convertToTitleCase(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Range Harga" />
                </SelectTrigger>
                <SelectContent>
                  {PRICE_RANGES.map((range, index) => (
                    <SelectItem key={index} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedAvailability}
                onValueChange={setSelectedAvailability}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABILITY_STATUS.map((range, index) => (
                    <SelectItem key={index} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              className="bg-primary-600 hover:bg-primary-700 text-white"
              onClick={() => {
                setSearchTerm("");
                setSelectedType("all");
                setSelectedPrice("all");
                setSelectedAvailability("all");
                setSelectedSort("newest");
              }}
            >
              Reset Filter
            </Button>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-600">
              Menampilkan {filteredProperties?.length || 0} properti
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Urutkan:</span>
              <Select
                value={selectedSort}
                onValueChange={(value) =>
                  setSelectedSort(
                    value as "newest" | "price-low" | "price-high" | "rating"
                  )
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Pilih urutan" />
                </SelectTrigger>
                <SelectContent>
                  {SORTING_OPTIONS.map((sort) => (
                    <SelectItem key={sort.value} value={sort.value}>
                      {sort.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties?.map((property, index) => (
              <AnimatedSection key={property.id} delay={index * 0.1}>
                <PropertyCard property={property} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {data?.propertyPage?.ctaTitle}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {data?.propertyPage?.ctaSubtitle}
            </p>
            <Button
              size="lg"
              className="bg-primary-600 hover:bg-primary-700 text-white"
              onClick={() => {
                window.open(
                  `https://wa.me/${data?.contact?.phone.replace(/-/g, "")} `,
                  "_blank"
                );
              }}
            >
              {data?.propertyPage?.ctaButtonText}
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const PRICE_RANGES = [
  { label: "Semua Harga", value: "all" },
  { label: "Dibawah 800 Juta", value: "low" },
  { label: "800 Juta - 1.5 Milyar", value: "medium" },
  { label: "Diatas 1.5 Milyar", value: "high" },
];

const AVAILABILITY_STATUS = [
  { label: "Semua Status", value: "all" },
  { label: "Tersedia", value: "available" },
  { label: "Tidak Tersedia", value: "unavailable" },
];

const SORTING_OPTIONS = [
  { label: "Terbaru", value: "newest" },
  { label: "Harga Terendah", value: "price-low" },
  { label: "Harga Tertinggi", value: "price-high" },
  { label: "Rating Tertinggi", value: "rating" },
];
