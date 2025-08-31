"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useData } from "@/service/data";
import Link from "next/link";

export function FinalCta() {
  const { data, isLoading } = useData();

  if (isLoading && !data) return null;

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="bg-gradient-to-r from-primary to-primary rounded-2xl p-8 lg:p-16 text-center shadow-2xl overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {data?.finalCtaSection?.title || "Siap Menginap di Bliss Villas?"}
              </h2>
              <p className="text-lg lg:text-xl text-primary-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                {data?.finalCtaSection?.subtitle || "Temukan villa favorit Anda dan rasakan pengalaman menginap tak terlupakan di Jogja."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/property">
                  <Button
                    size="lg"
                    className="bg-white text-primary-600 hover:bg-gray-100 hover:text-primary-600 font-bold px-8 lg:px-12 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:focus"
                  >
                    {data?.finalCtaSection?.primaryButtonText || "Lihat Properti"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link
                  href={`https://wa.me/${(data?.contact?.phone || "628123456789").replace(/-/g, "")}`}
                  target="_blank"
                  prefetch={false}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-primary-600 border-primary-600 text-white hover:bg-primary-700 hover:border-primary-700 font-bold px-8 lg:px-12 py-4 text-lg rounded-2xl transition-all duration-300 focus-visible:focus"
                  >
                    {data?.finalCtaSection?.secondaryButtonText || "Hubungi Kami"}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-800/20"></div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
