"use client";

import { useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AnimatedSection } from "@/components/ui/animated-section";

import { useData } from "@/service/data";
import Link from "next/link";
import { Button } from "./ui/button";
import { Property, PropertyType } from "@prisma/client";
import { convertToTitleCase } from "@/helper/formatter";

export function PropertyListings() {
  const { data, isLoading } = useData();
  const [activeTab, setActiveTab] = useState("all");

  const filterProperties = (properties: Property[], filter: string) => {
    switch (filter) {
      case "all":
        return properties;
      default:
        return properties.filter((p) => p.type === filter);
    }
  };

  const tabs = [
    { value: "all", label: "Semua Properti" },
    ...Object.values(PropertyType).map((type) => ({
      value: type,
      label: convertToTitleCase(type),
    })),
  ];

  if (isLoading && !data) return null;

  return (
    <section className="py-12 lg:py-20 bg-gray-50" id="listings">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-primary-600 font-medium mb-2">Properti Kami</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {data?.property?.title || "Properti Unggulan"}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {data?.property?.subtitle || "Jelajahi pilihan villa terbaik di Jogja sesuai kebutuhan Anda."}
            </p>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="inline-flex h-auto p-1 bg-white rounded-2xl shadow-sm border border-gray-200 mb-8 justify-center items-center flex-wrap w-full overflow-x-auto">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 data-[state=active]:bg-primary-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900 focus-visible:focus"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
              </TabsList>

              {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className="mt-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {(filterProperties(data?.properties || [], tab.value).length
                      ? filterProperties(data?.properties || [], tab.value)
                      : [])
                      .slice(0, 6)
                      .map((property, index) => (
                        <AnimatedSection key={property.id} delay={index * 0.1}>
                          <PropertyCard property={property} />
                        </AnimatedSection>
                      ))}
                    {(!data?.properties || data?.properties.length === 0) && (
                      <div className="col-span-full text-center text-gray-500">
                        Properti belum tersedia saat ini.
                      </div>
                    )}
                  </div>

                  <div className="text-center mt-8">
                    <Link href="/property" className="cursor-pointer">
                      <Button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 text-lg font-medium cursor-pointer">
                        {data?.property?.buttonText || "Lihat Semua Properti"}
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
