"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useData } from "@/service/data";
import { PLACEHOLDER_IMAGE } from "@/constants";
import Link from "next/link";

export function Hero() {
  const { data, isLoading } = useData();

  if (isLoading && !data) return null;

  const stats = [
  {
    label:"Jumlah Properti",
    value: `${data?.properties?.length} +`
  },
  {
    label: "Terjual",
    value: `${data?.properties?.filter((property) => !property.isAvailable).length} +`
  },
  {
    label: "Tersedia",
    value: `${data?.properties?.filter((property) => property.isAvailable).length} +`
  }
  ]

  return (
    <section className="pt-24 lg:pt-32 pb-12 lg:pb-20 bg-gray-50" id="hero">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <AnimatedSection className="space-y-6 lg:space-y-8">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {data?.hero?.title || "Rasakan Kenyamanan di Bliss Villas Jogja"}
            </motion.h1>

            <motion.p
              className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {data?.hero?.subtitle ||
                "Nikmati pengalaman menginap mewah dan privat di villajogja bersama Bliss Villas. Lokasi strategis, fasilitas lengkap, dan pelayanan istimewa."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/property">
                <Button
                  size="lg"
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:focus"
                >
                  {data?.hero?.buttonText || "Lihat Properti"}
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex space-x-8 pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {stats.map((stat, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatedSection>

          {/* Right Column - Image */}
          <AnimatedSection delay={0.4} className="relative">
            <motion.div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={data?.hero?.image || PLACEHOLDER_IMAGE}
                alt="Hero Image"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
