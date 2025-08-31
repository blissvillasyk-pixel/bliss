"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import Image from "next/image";
import { useData } from "@/service/data";
import { PLACEHOLDER_IMAGE } from "@/constants";

export function MiniAboutSection() {
  const { data, isLoading } = useData();

  if (isLoading && !data) return null;

  return (
    <section className="py-12 lg:py-20 bg-white" id="about">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <AnimatedSection>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {data?.about?.title || "Tentang Bliss Villas"}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {data?.about?.subtitle ||
                  "Kami menghadirkan pengalaman menginap berkelas dengan suasana nyaman, privat, dan strategis di Yogyakarta."}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {data?.about?.description ||
                  "Bliss Villas menawarkan pilihan villa eksklusif untuk liburan, staycation, maupun acara spesial Anda."}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                {(data?.about?.aboutData || [
                  { id: "p1", value: "20+", label: "Villa Tersedia" },
                  { id: "p2", value: "4.9★", label: "Rating Tamu" },
                  { id: "p3", value: "1000+", label: "Tamu Puas" },
                  { id: "p4", value: "24/7", label: "Layanan" },
                ]).map((stat: any) => (
                  <div key={stat.id} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-primary-600">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right Image */}
          <AnimatedSection delay={0.2}>
            <div className="relative">
              <Image
                src={data?.about?.image || PLACEHOLDER_IMAGE}
                alt="Bliss Group Office"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
