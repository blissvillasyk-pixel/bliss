"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useData } from "@/service/data";
import { PLACEHOLDER_IMAGE } from "@/constants";

export function WhyHousaSection() {
  const { data, isLoading } = useData();

  if (isLoading || !data) return null;

  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Features */}
          <AnimatedSection>
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {data?.why?.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {data?.why?.subtitle}
                </p>
              </div>

              <div className="space-y-6">
                {data?.why?.whyData.map((reason, index) => (
                  <AnimatedSection key={reason.id} delay={index * 0.1}>
                    <Card className="p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{reason.icon}</div>
                        <div className="space-y-3 flex-1">
                          <h3 className="text-xl font-bold text-gray-900">
                            {reason.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {reason.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column - Image */}
          <AnimatedSection delay={0.3}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={data?.why?.image ?? PLACEHOLDER_IMAGE}
                alt="Rumah modern dengan desain arsitektur yang elegan"
                fill
                className="object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
