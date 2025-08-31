"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useData } from "@/service/data";

export function ServicesSection() {
  const { data, isLoading } = useData();

  if (isLoading && !data) return null;

  return (
    <section className="py-12 lg:py-20 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-primary-600 font-medium mb-2">Layanan Kami</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {data?.service?.title || "Layanan Kami"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {data?.service?.subtitle ||
                "Kami menyediakan layanan pengelolaan villa, penyewaan harian, dan concierge untuk kenyamanan Anda."}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {(data?.service?.serviceData || [
            { id: "s1", icon: "🏠", title: "Penginapan Nyaman", description: "Villa bersih, privat, dan lokasi strategis." },
            { id: "s2", icon: "🧹", title: "Housekeeping", description: "Layanan kebersihan profesional." },
            { id: "s3", icon: "🛎️", title: "Concierge", description: "Bantuan pemesanan dan kebutuhan tamu." },
            { id: "s4", icon: "🔐", title: "Keamanan", description: "Keamanan dan privasi terjamin." },
          ]).map((service: any, index: number) => (
            <AnimatedSection key={service.id} delay={index * 0.1}>
              <Card className="text-center p-6 lg:p-8 rounded-2xl shadow-lg border-0 bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <CardHeader>
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 transition-colors duration-300">
                    <div className="text-2xl lg:text-3xl group-hover:text-white transition-colors duration-300">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
