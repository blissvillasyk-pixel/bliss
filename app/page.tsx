"use client";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MiniAboutSection } from "@/components/MiniAboutSection";
import { PropertyListings } from "@/components/PropertyListings";
import { WhyHousaSection } from "@/components/WhyHousaSection";
import { RelatedProperties } from "@/components/RelatedProperties";
import { CtaBand } from "@/components/CtaBand";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { useData } from "@/service/data";

export default function Home() {
  const { data, isLoading } = useData();
  if (isLoading || !data)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <MiniAboutSection />
      <PropertyListings />
      <WhyHousaSection />
      <CtaBand />
      <ServicesSection />
      <TestimonialsSection />
      <RelatedProperties />
      <FinalCta />
      <Footer />
    </main>
  );
}
