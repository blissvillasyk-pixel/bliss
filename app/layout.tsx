import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TanstackProvider } from "@/provider/tanstack-provider";
import { db } from "@/lib/db";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await db.root.findFirst({
    include: {
      logo: true,
      about: true,
      property: true,
      why: true,
      cta: true,
      service: true,
      testimonial: true,
      relatedProperty: true,
    },
  });

  const siteName = data?.logo?.name || "Bliss Villas";
  const description = `${siteName} - blissvillas villajogja. Luxury villas in Jogja.`;
  const keywords = [
    "blissvillas",
    "villa jogja",
    "villajogja",
    "bliss villas",
    "rental villa jogja",
    "sewa villa jogja",
    "luxury villa yogyakarta",
  ];

  return {
    metadataBase: new URL("https://blissgroup.com"),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description,
    keywords,
    openGraph: {
      type: "website",
      url: "/",
      siteName,
      title: siteName,
      description,
      images: [data?.logo?.logo || "/img/logo.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
      images: [data?.logo?.logo || "/img/logo.png"],
    },
    alternates: {
      canonical: "https://blissgroup.com",
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: {
        media: "(prefers-color-scheme: light)",
        url: data?.logo?.logo || "/img/logo.png",
        href: data?.logo?.logo || "/img/logo.png",
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logo = await db.logoInformation.findFirst();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Bliss Villas",
              url: "https://blissgroup.com",
              logo: logo?.logo || "/img/logo.png",
              sameAs: [
                "https://www.instagram.com/blissvillas",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full overflow-x-hidden`}
      >
        <TanstackProvider>
          {children}
          <Toaster />
        </TanstackProvider>
      </body>
    </html>
  );
}
