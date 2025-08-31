import { db } from "@/lib/db";
import { Property } from "@prisma/client";
import bcrypt from "bcryptjs";

const PROPERTIES_DATA: Omit<
  Property,
  "id" | "rootId" | "createdAt" | "updatedAt"
>[] = [
  {
    name: "Residensi Golden Oaks",
    address: "Beverly Hills, California",
    price: 850000,
    rating: 4.5,
    sqft: 2500,
    room: 3,
    bath: 3,
    type: "APARTEMEN",
    isAvailable: true,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80",
    ],
    description:
      "Rumah mewah dengan desain kontemporer yang menawarkan kenyamanan maksimal. Dilengkapi dengan fasilitas modern, taman yang indah, dan lokasi strategis di area premium. Cocok untuk keluarga yang mencari kualitas hidup terbaik.",
    features: [
      "Dapur modern dengan peralatan premium",
      "Sistem keamanan 24/7",
      "Garasi untuk 2 mobil",
      "Taman pribadi yang luas",
      "Sistem pendingin dan pemanas terpusat",
      "Ruang keluarga yang nyaman",
    ],
    pdf: "https://res.cloudinary.com/dga0wmldp/image/upload/v1755259135/bliss/1720518370847_eutwci.pdf",
  },
  {
    name: "Villa Sunset Paradise",
    address: "Malibu, California",
    price: 1200000,
    rating: 4.5,
    sqft: 3200,
    room: 4,
    bath: 4,
    type: "VILLA",
    isAvailable: true,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    ],
    description:
      "Villa mewah dengan desain kontemporer yang menawarkan kenyamanan maksimal. Dilengkapi dengan fasilitas modern, taman yang indah, dan lokasi strategis di area premium. Cocok untuk keluarga yang mencari kualitas hidup terbaik.",
    features: [
      "Dapur modern dengan peralatan premium",
      "Sistem keamanan 24/7",
      "Garasi untuk 2 mobil",
      "Taman pribadi yang luas",
      "Sistem pendingin dan pemanas terpusat",
      "Ruang keluarga yang nyaman",
    ],
    pdf: "https://res.cloudinary.com/dga0wmldp/image/upload/v1755259135/bliss/1720518370847_eutwci.pdf",
  },
  {
    name: "Modern Downtown Loft",
    address: "Downtown LA, California",
    price: 650000,
    rating: 4.5,
    sqft: 1800,
    room: 2,
    bath: 2,
    type: "APARTEMEN",
    isAvailable: true,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    ],
    description:
      "Modern loft dengan desain kontemporer yang menawarkan kenyamanan maksimal. Dilengkapi dengan fasilitas modern, taman yang indah, dan lokasi strategis di area premium. Cocok untuk keluarga yang mencari kualitas hidup terbaik.",
    features: [
      "Dapur modern dengan peralatan premium",
      "Sistem keamanan 24/7",
      "Garasi untuk 2 mobil",
      "Taman pribadi yang luas",
      "Sistem pendingin dan pemanas terpusat",
      "Ruang keluarga yang nyaman",
    ],
    pdf: "https://res.cloudinary.com/dga0wmldp/image/upload/v1755259135/bliss/1720518370847_eutwci.pdf",
  },
  {
    name: "Luxury Penthouse",
    address: "Century City, California",
    price: 2500000,
    rating: 4.5,
    sqft: 4500,
    room: 5,
    bath: 5,
    type: "APARTEMEN",
    isAvailable: true,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80",
    ],
    description: "Exclusive penthouse with panoramic city views",
    features: ["Panoramic Views", "Private Terrace", "Luxury Finishes"],
    pdf: "https://res.cloudinary.com/dga0wmldp/image/upload/v1755259135/bliss/1720518370847_eutwci.pdf",
  },
  {
    name: "Cozy Family Home",
    address: "Pasadena, California",
    price: 750000,
    rating: 4.5,
    sqft: 2200,
    room: 3,
    bath: 2,
    type: "APARTEMEN",
    isAvailable: true,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    ],
    description: "Charming family home in quiet neighborhood",
    features: ["Family Friendly", "Large Backyard", "Good Schools"],
    pdf: "https://res.cloudinary.com/dga0wmldp/image/upload/v1755259135/bliss/1720518370847_eutwci.pdf",
  },

  {
    name: "Beachfront Condo",
    address: "Santa Monica, California",
    price: 950000,
    rating: 4.5,
    sqft: 1800,
    room: 2,
    bath: 2,
    type: "APARTEMEN",
    isAvailable: true,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93388?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80",
    ],
    description: "Modern condo with direct beach access",
    features: ["Beach Access", "Modern Amenities", "Great Location"],
    pdf: "https://res.cloudinary.com/dga0wmldp/image/upload/v1755259135/bliss/1720518370847_eutwci.pdf",
  },
  {
    name: "Mountain View Estate",
    address: "Big Bear, California",
    price: 1800000,
    rating: 4.5,
    sqft: 3800,
    room: 4,
    bath: 4,
    type: "APARTEMEN",
    isAvailable: true,
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    ],
    description: "Spacious estate with mountain views",
    features: ["Mountain Views", "Large Property", "Privacy"],
    pdf: "https://res.cloudinary.com/dga0wmldp/image/upload/v1755259135/bliss/1720518370847_eutwci.pdf",
  },
  {
    name: "Urban Townhouse",
    address: "Hollywood, California",
    price: 850000,
    rating: 4.5,
    sqft: 2400,
    room: 3,
    bath: 3,
    type: "APARTEMEN",
    isAvailable: true,
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    ],
    description:
      "Urban townhouse dengan desain kontemporer yang menawarkan kenyamanan maksimal. Dilengkapi dengan fasilitas modern, taman yang indah, dan lokasi strategis di area premium. Cocok untuk keluarga yang mencari kualitas hidup terbaik.",
    features: [
      "Dapur modern dengan peralatan premium",
      "Sistem keamanan 24/7",
      "Garasi untuk 2 mobil",
      "Taman pribadi yang luas",
      "Sistem pendingin dan pemanas terpusat",
      "Ruang keluarga yang nyaman",
    ],
    pdf: "https://res.cloudinary.com/dga0wmldp/image/upload/v1755259135/bliss/1720518370847_eutwci.pdf",
  },
  {
    name: "Garden Villa",
    address: "Brentwood, California",
    price: 1500000,
    rating: 4.5,
    sqft: 3000,
    room: 4,
    bath: 3,
    type: "VILLA",
    isAvailable: true,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80",
    ],
    description: "Beautiful villa with extensive gardens",
    features: ["Garden Views", "Outdoor Space", "Luxury Living"],
    pdf: "https://res.cloudinary.com/dga0wmldp/image/upload/v1755259135/bliss/1720518370847_eutwci.pdf",
  },
];

export const findRoot = async () => {
  return await db.root.findFirst({
    include: {
      socialMedia: true,
      about: {
        include: {
          aboutData: true,
        },
      },
      contact: true,
      copyright: true,
      logo: true,
      hero: true,
      property: true,
      why: {
        include: {
          whyData: true,
        },
      },
      cta: true,
      service: {
        include: {
          serviceData: true,
        },
      },
      finalCtaSection: true,
      testimonial: {
        include: {
          testimonialData: true,
        },
      },
      relatedProperty: true,
      propertyPage: true,
      properties: true,
    },
  });
};

export const seedRoot = async () => {
  const root = await db.root.create({
    data: {
      hero: {
        create: {
          title: "Temukan Properti Impian Anda",
          subtitle:
            "Bliss Group membantu Anda menemukan properti terbaik dengan lokasi strategis dan harga terjangkau",
          buttonText: "Jelajahi Properti",
          image:
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        },
      },
      about: {
        create: {
          title: "Tentang Bliss Group",
          subtitle: "Lebih dari 15 tahun pengalaman di industri properti",
          description:
            "Bliss Group merupakan Developer Perumahan dan Villa terpercaya di Yogyakarta. Hampir setiap bulan meluncurkan produk-produk terbaik menjadikan Bliss Group sebagai salah satu developer properti terbesar di Yogyakarta.",
          image:
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        },
      },
      property: {
        create: {
          title: "Properti Unggulan",
          subtitle:
            "Pilihan properti terbaik dengan lokasi strategis dan fasilitas lengkap",
          buttonText: "Lihat Semua Properti",
        },
      },
      why: {
        create: {
          title: "Mengapa Memilih Bliss Group?",
          subtitle: "Keunggulan yang membedakan kami dari yang lain",
        },
      },
      cta: {
        create: {
          title: "Siap Memulai Perjalanan Properti Anda?",
          subtitle: "Hubungi tim kami hari ini dan dapatkan konsultasi gratis",
          buttonText: "Konsultasi Gratis",
        },
      },
      service: {
        create: {
          title: "Layanan Kami",
          subtitle: "Berbagai layanan properti yang kami tawarkan",
        },
      },
      testimonial: {
        create: {
          title: "Testimoni Klien",
          subtitle: "Apa yang mereka katakan tentang kami",
        },
      },
      relatedProperty: {
        create: {
          title: "Properti Terkait",
          subtitle: "Properti lain yang mungkin Anda sukai",
          buttonText: "Lihat Semua",
        },
      },
      finalCtaSection: {
        create: {
          title: "Bergabunglah dengan Klien Puas Kami",
          subtitle:
            "Mulai perjalanan properti Anda hari ini dan jadilah bagian dari kisah sukses berikutnya",
          primaryButtonText: "Lihat Properti",
          secondaryButtonText: "Hubungi Kami",
        },
      },
      logo: {
        create: {
          logo: "https://res.cloudinary.com/dga0wmldp/image/upload/v1755123345/logo_b5bjmu.png",
          alt: "Bliss Group Logo",
          name: "Bliss Group",
        },
      },
      contact: {
        create: {
          address:
            "Ruko Bliss Villas, Jalan Kaliurang KM 10, Gadingan, Sinduharjo, Ngaglik, Sleman",
          phone: "6287778683388",
          email: "info@blissgroup.com",
        },
      },
      copyright: {
        create: {
          text: "© 2025 Bliss Group. Semua Hak Dilindungi.",
        },
      },
      socialMedia: {
        createMany: {
          data: [
            {
              icon: "FACEBOOK",
              label: "Facebook",
              href: "https://www.facebook.com/blissgroup",
            },
            {
              icon: "TWITTER",
              label: "Twitter",
              href: "https://www.twitter.com/blissgroup",
            },
            {
              icon: "INSTAGRAM",
              label: "Instagram",
              href: "https://www.instagram.com/blissgroup",
            },
            {
              icon: "LINKEDIN",
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/blissgroup",
            },
            {
              icon: "YOUTUBE",
              label: "YouTube",
              href: "https://www.youtube.com/blissgroup",
            },
          ],
        },
      },
      propertyPage: {
        create: {
          title: "Properti Kami",
          subtitle:
            "Jelajahi koleksi properti terbaik kami dengan berbagai pilihan lokasi dan harga",
          ctaTitle: "Tidak Menemukan Properti yang Cocok?",
          ctaSubtitle:
            "Hubungi tim kami untuk konsultasi personal dan temukan properti impian Anda",
          ctaButtonText: "Hubungi Kami",
        },
      },
      properties: {
        createMany: {
          data: PROPERTIES_DATA,
        },
      },
    },
    include: {
      socialMedia: true,
      about: {
        include: {
          aboutData: true,
        },
      },
      contact: true,
      copyright: true,
      logo: true,
      hero: true,
      property: true,
      why: {
        include: {
          whyData: true,
        },
      },
      cta: true,
      service: {
        include: {
          serviceData: true,
        },
      },
      finalCtaSection: true,
      testimonial: {
        include: {
          testimonialData: true,
        },
      },
      relatedProperty: true,
      propertyPage: true,
      properties: true,
    },
  });

  if (root.about) {
    root.about.aboutData = await seedAboutData(root.about.id);
  }
  if (root.why) {
    root.why.whyData = await seedWhyData(root.why.id);
  }

  if (root.service) {
    root.service.serviceData = await seedServiceData(root.service.id);
  }
  if (root.testimonial) {
    root.testimonial.testimonialData = await seedTestimonialData(
      root.testimonial.id
    );
  }

  return root;
};

const seedAboutData = async (aboutId: string) => {
  return await db.aboutData.createManyAndReturn({
    data: [
      {
        aboutId: aboutId,
        label: "Dijual",
        value: "180+",
      },
      {
        aboutId: aboutId,
        label: "Dibeli",
        value: "120+",
      },
      {
        aboutId: aboutId,
        label: "Tersedia",
        value: "150+",
      },
    ],
  });
};

const seedWhyData = async (whyId: string) => {
  return await db.whyData.createManyAndReturn({
    data: [
      {
        icon: "🏠",
        title: "Lokasi Strategis",
        description:
          "Setiap properti kami dipilih dengan lokasi yang strategis dan mudah dijangkau",
        whyId: whyId,
      },
      {
        icon: "💰",
        title: "Harga Terjangkau",
        description:
          "Kami menawarkan properti berkualitas dengan harga yang kompetitif",
        whyId: whyId,
      },
      {
        icon: "🛡️",
        title: "Legalitas Terjamin",
        description:
          "Semua properti kami memiliki legalitas yang jelas dan terjamin",
        whyId: whyId,
      },
      {
        icon: "🎯",
        title: "Layanan Profesional",
        description:
          "Tim kami siap membantu Anda dengan layanan yang profesional dan ramah",
        whyId: whyId,
      },
    ],
  });
};

const seedServiceData = async (serviceId: string) => {
  return await db.serviceData.createManyAndReturn({
    data: [
      {
        servicesSectionId: serviceId,
        icon: "🏘️",
        title: "Jual Beli Properti",
        description:
          "Layanan jual beli properti dengan proses yang aman dan transparan",
      },
      {
        servicesSectionId: serviceId,
        icon: "🏢",
        title: "Sewa Menyewa",
        description: "Layanan sewa menyewa properti dengan kontrak yang jelas",
      },
      {
        servicesSectionId: serviceId,
        icon: "📋",
        title: "Konsultasi Properti",
        description:
          "Konsultasi gratis untuk membantu Anda memilih properti yang tepat",
      },
      {
        servicesSectionId: serviceId,
        icon: "📊",
        title: "Investasi Properti",
        description:
          "Panduan investasi properti untuk keuntungan jangka panjang",
      },
    ],
  });
};

const seedTestimonialData = async (testimonialId: string) => {
  return await db.testimonialData.createManyAndReturn({
    data: [
      {
        testimonialSectionId: testimonialId,
        name: "Sarah Williams",
        role: "Pengusaha",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&crop=w=150&q=80",
        rating: 5,
        content:
          "Bliss Group membantu saya menemukan properti investasi yang sempurna. Tim mereka sangat profesional!",
        urlVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        testimonialSectionId: testimonialId,
        name: "Michael Rodriguez",
        role: "Dokter",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&crop=w=150&q=80",
        rating: 5,
        content:
          "Keahlian dan dedikasi tim Bliss Group melampaui harapan kami. Mereka menemukan properti sempurna untuk kami sesuani anggaran dan jadwal kami.",
        urlVideo:
          "https://www.youtube.com/embed/rjNcoNcnX_E?si=XzgC5FWLBIiHacT6",
      },
    ],
  });
};

export type RootData = Awaited<ReturnType<typeof findRoot>>;

export const seedUser = async () => {
  const count = await db.user.findUnique({
    where: {
      email: "admin@blissgroup.com",
    },
    select: {
      email: true,
    },
  });
  if (count?.email) return;
  const hashed = await bcrypt.hash("12345678", 10);
  await db.user.create({
    data: {
      name: "Admin",
      email: "admin@blissgroup.com",
      password: hashed,
    },
  });
};
