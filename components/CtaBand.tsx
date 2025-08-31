"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useData } from "@/service/data";
import Link from "next/link";

export function CtaBand() {
  const { data, isLoading } = useData();

  if (isLoading || !data) return null;

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 lg:p-12 shadow-2xl overflow-hidden relative">
            <div className="relative z-10">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Left Column - Content */}
                <div className="text-white space-y-4 lg:space-y-6">
                  <h2 className="text-2xl lg:text-4xl font-bold leading-tight">
                    {data?.cta?.title}
                  </h2>
                  <p className="text-lg text-primary-100 leading-relaxed">
                    {data?.cta?.subtitle}
                  </p>

                  <div className="mt-6">
                    <Link
                      href={`https://wa.me/${data?.contact?.phone.replace(
                        /-/g,
                        ""
                      )}`}
                      target="_blank"
                      prefetch={false}
                    >
                      <Button
                        size="lg"
                        className="bg-white text-primary-600 hover:bg-gray-50 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus-visible:focus"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {data?.cta?.buttonText}
                      </Button>
                    </Link>
                  </div>
                </div>
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
