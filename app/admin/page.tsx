"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUpload } from "@/components/ui/file-upload";
import { Plus, Edit, Save, X, Trash2, LogOut, FileIcon } from "lucide-react";
import { useData, useSave } from "@/service/data";
import { Property } from "@prisma/client";

import {
  $Enums,
  AboutData,
  AboutSection,
  ContactInformation,
  CopyrightInformation,
  CtaSection,
  FinalCtaSection,
  HeroSection,
  LogoInformation,
  PropertyPageSection,
  PropertySection,
  RelatedPropertiesSection,
  ServiceData,
  ServicesSection,
  SocialMediaInformation,
  TestimonialData,
  TestimonialSection,
  WhyData,
  WhySection,
} from "@prisma/client";
import { convertToIDR, convertToTitleCase } from "@/helper/formatter";
import { isValidYouTubeUrl } from "@/helper/youtube";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { MultiFileUpload } from "@/components/ui/multi-file-upload";
import { withAuth } from "@/components/with-auth";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const { data, isLoading } = useData();

  const router = useRouter();

  // ====== Mutations (create/update) ======
  const mHero = useSave("post", "/admin/hero", () => setHero(null));
  const mAbout = useSave("post", "/admin/about", () => setAbout(null));
  const mAboutData = useSave("post", "/admin/about-data", () => setAboutItem(null));
  const mProperty = useSave("post", "/admin/property", () => setPropertySec(null));
  const mWhy = useSave("post", "/admin/why", () => setWhy(null));
  const mWhyData = useSave("post", "/admin/why-data", () => setWhyItem(null));
  const mCTA = useSave("post", "/admin/cta", () => setCta(null));
  const mServices = useSave("post", "/admin/services", () => setServices(null));
  const mServiceData = useSave("post", "/admin/service-data", () => setServiceItem(null));
  const mTestimonials = useSave("post", "/admin/testimonials", () => setTestimonials(null));
  const mTestimonialData = useSave("post", "/admin/testimonial-data", () => setTestimonialItem(null));
  const mRelated = useSave("post", "/admin/related", () => setRelated(null));
  const mFinalCTA = useSave("post", "/admin/final-cta", () => setFinalCta(null));
  const mPropertyPage = useSave("post", "/admin/property-page", () => setPropertyPage(null));
  const mLogo = useSave("post", "/admin/logo", () => setLogo(null));
  const mContact = useSave("post", "/admin/contact", () => setContact(null));
  const mCopyright = useSave("post", "/admin/copyright", () => setCopyright(null));
  const mSocial = useSave("post", "/admin/social", () => setSocialItem(null));
  const mPropertyItem = useSave("post", "/admin/property-item", () => setPropertyItem(null));

  // ====== Mutations (delete) ======
  const dAboutData = useSave("patch", "/admin/about-data", () => setAboutItem(null));
  const dWhyData = useSave("patch", "/admin/why-data", () => setWhyItem(null));
  const dServiceData = useSave("patch", "/admin/service-data", () => setServiceItem(null));
  const dTestimonialData = useSave("patch", "/admin/testimonial-data", () => setTestimonialItem(null));
  const dSocial = useSave("patch", "/admin/social", () => setSocialItem(null));
  const dPropertyItem = useSave("patch", "/admin/property-item", () => setPropertyItem(null));

  // ====== Edit states per section ======
  const [hero, setHero] = useState<Partial<HeroSection> | null>(null);
  const [about, setAbout] = useState<Partial<AboutSection> | null>(null);
  const [aboutItem, setAboutItem] = useState<Partial<AboutData> | null>(null);

  const [propertySec, setPropertySec] =
    useState<Partial<PropertySection> | null>(null);

  const [why, setWhy] = useState<Partial<WhySection> | null>(null);
  const [whyItem, setWhyItem] = useState<Partial<WhyData> | null>(null);

  const [cta, setCta] = useState<Partial<CtaSection> | null>(null);

  const [services, setServices] = useState<Partial<ServicesSection> | null>(
    null
  );
  const [serviceItem, setServiceItem] = useState<Partial<ServiceData> | null>(
    null
  );

  const [propertyItem, setPropertyItem] = useState<Partial<Property> | null>(
    null
  );

  const [testimonials, setTestimonials] =
    useState<Partial<TestimonialSection> | null>(null);
  const [testimonialItem, setTestimonialItem] =
    useState<Partial<TestimonialData> | null>(null);

  const [related, setRelated] =
    useState<Partial<RelatedPropertiesSection> | null>(null);
  const [finalCta, setFinalCta] = useState<Partial<FinalCtaSection> | null>(
    null
  );
  const [propertyPage, setPropertyPage] =
    useState<Partial<PropertyPageSection> | null>(null);

  // Pagination state for property list in Property Page tab
  const [propertyListPage, setPropertyListPage] = useState(1);

  const [logo, setLogo] = useState<Partial<LogoInformation> | null>(null);
  const [contact, setContact] = useState<Partial<ContactInformation> | null>(
    null
  );
  const [copyright, setCopyright] =
    useState<Partial<CopyrightInformation> | null>(null);
  const [socialItem, setSocialItem] =
    useState<Partial<SocialMediaInformation> | null>(null);

  // Loading state UI
  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Loading Skeleton */}
          <div className="flex flex-row justify-between items-center mb-8">
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 rounded-lg w-64 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-80 animate-pulse"></div>
            </div>
            <div className="h-9 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Tabs Loading Skeleton */}
          <div className="space-y-6">
            <div className="flex gap-2 overflow-x-auto">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 w-24 bg-gray-200 rounded-xl animate-pulse flex-shrink-0"></div>
              ))}
            </div>

            {/* Content Loading Skeleton */}
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Derived pagination values (safe after data check)
  const propPageSize = 6;
  const sortedProps = [...(data.properties ?? [])].sort((a, b) => {
    const availDiff = Number(!!b.isAvailable) - Number(!!a.isAvailable);
    if (availDiff !== 0) return availDiff;
    // fallback sort by name to keep stable-ish order
    const an = (a.name || "").toLowerCase();
    const bn = (b.name || "").toLowerCase();
    return an.localeCompare(bn);
  });
  const propTotal = sortedProps.length;
  const propTotalPages = Math.max(1, Math.ceil(propTotal / propPageSize));
  const propCurrentPage = Math.min(propertyListPage, propTotalPages);
  const propStart = (propCurrentPage - 1) * propPageSize;
  const propEnd = propStart + propPageSize;
  const propItems = sortedProps.slice(propStart, propEnd);


  const stats = [
    {
      label: "Jumlah Properti",
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

  /* ---------------------- Render ---------------------- */
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-row justify-between items-center mb-8">
          <div className="">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dasbor Admin
            </h1>
            <p className="text-gray-600">
              Kelola seluruh konten di website Anda
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              router.push("/logout");
            }}
          >
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>

        <Tabs defaultValue="home" className="space-y-6">
          <TabsList className="md:grid md:w-full md:grid-cols-5 flex flex-nowrap items-center gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory justify-start md:justify-center">
            <TabsTrigger
              value="home"
              className="px-3 md:px-4 py-2 text-sm md:text-base rounded-xl transition-all duration-200 data-[state=active]:bg-primary-600 data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-gray-900 min-w-[120px] md:min-w-0 flex-none whitespace-nowrap snap-start truncate"
            >
              Beranda
            </TabsTrigger>
            <TabsTrigger
              value="sections"
              className="px-3 md:px-4 py-2 text-sm md:text-base rounded-xl transition-all duration-200 data-[state=active]:bg-primary-600 data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-gray-900 min-w-[120px] md:min-w-0 flex-none whitespace-nowrap snap-start truncate"
            >
              Bagian
            </TabsTrigger>
            <TabsTrigger
              value="property-page"
              className="px-3 md:px-4 py-2 text-sm md:text-base rounded-xl transition-all duration-200 data-[state=active]:bg-primary-600 data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-gray-900 min-w-[120px] md:min-w-0 flex-none whitespace-nowrap snap-start truncate"
            >
              Halaman Properti
            </TabsTrigger>
            <TabsTrigger
              value="branding"
              className="px-3 md:px-4 py-2 text-sm md:text-base rounded-xl transition-all duration-200 data-[state=active]:bg-primary-600 data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-gray-900 min-w-[120px] md:min-w-0 flex-none whitespace-nowrap snap-start truncate"
            >
              Merek
            </TabsTrigger>
            <TabsTrigger
              value="social"
              className="px-3 md:px-4 py-2 text-sm md:text-base rounded-xl transition-all duration-200 data-[state=active]:bg-primary-600 data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-gray-900 min-w-[120px] md:min-w-0 flex-none whitespace-nowrap snap-start truncate"
            >
              Sosial
            </TabsTrigger>
          </TabsList>

          {/* BERANDA */}
          <TabsContent value="home" className="space-y-6">
            {/* Hero */}
            <Card className="hover:bg-gray-50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                  Bagian Hero
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setHero(
                        data.hero ?? {
                          title: "",
                          subtitle: "",
                          buttonText: "",
                          image: "",
                        }
                      )
                    }
                    aria-label="Ubah Hero"
                    title="Ubah"
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Judul:</strong> {data.hero?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.hero?.subtitle}
                </p>
                <p>
                  <strong>Teks Tombol:</strong> {data.hero?.buttonText}
                </p>
                <div>
                  <strong>Pratinjau Gambar:</strong>
                  <div className="mt-2 h-32 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                    {data.hero?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={data.hero.image}
                        alt="Hero preview"
                        className="h-full w-auto object-cover"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">Tidak ada gambar</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Final CTA */}
            <Card className="hover:bg-gray-50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                  CTA Terakhir
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setFinalCta(
                        data.finalCtaSection ?? {
                          title: "",
                          subtitle: "",
                          primaryButtonText: "",
                          secondaryButtonText: "",
                        }
                      )
                    }
                    aria-label="Ubah CTA Terakhir"
                    title="Ubah"
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Judul:</strong> {data.finalCtaSection?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.finalCtaSection?.subtitle}
                </p>
                <p>
                  <strong>Tombol Utama:</strong>{" "}
                  {data.finalCtaSection?.primaryButtonText}
                </p>
                <p>
                  <strong>Tombol Sekunder:</strong>{" "}
                  {data.finalCtaSection?.secondaryButtonText}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* BAGIAN */}
          <TabsContent value="sections" className="space-y-6">
            {/* About */}
            <Card className="hover:bg-gray-50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                  Bagian Tentang
                  <div className="flex gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setAbout(
                          data.about ?? {
                            title: "",
                            subtitle: "",
                            description: "",
                            image: "",
                          }
                        )
                      }
                      aria-label="Ubah Tentang"
                      title="Ubah"
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Judul:</strong> {data.about?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.about?.subtitle}
                </p>
                <p>
                  <strong>Deskripsi:</strong> {data.about?.description}
                </p>
                <div>
                  <strong>Pratinjau Gambar:</strong>
                  <div className="mt-2 h-32 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                    {data.about?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={data.about.image}
                        alt="About preview"
                        className="h-full w-auto object-cover"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">Tidak ada gambar</span>
                    )}
                  </div>
                </div>
                <div>
                  <strong>Statistik Tentang:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">
                    {stats?.map((ad, index) => (
                      <li key={index} className="flex items-center gap-2">
                        {ad.label}: {ad.value}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Property */}
            <Card className="hover:bg-gray-50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                  Bagian Properti
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setPropertySec(
                        data.property ?? {
                          title: "",
                          subtitle: "",
                          buttonText: "",
                        }
                      )
                    }
                    aria-label="Ubah Properti"
                    title="Ubah"
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Judul:</strong> {data.property?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.property?.subtitle}
                </p>
                <p>
                  <strong>Tombol:</strong> {data.property?.buttonText}
                </p>
              </CardContent>
            </Card>

            {/* Why */}
            <Card className="hover:bg-gray-50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                  Bagian Alasan
                  <div className="flex gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setWhy(
                          data.why ?? {
                            title: "",
                            subtitle: "",
                            image: "",
                          }
                        )
                      }
                      aria-label="Ubah Alasan"
                      title="Ubah"
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        setWhyItem({
                          whyId: data.why?.id,
                          icon: "🏠",
                          title: "",
                          description: "",
                        })
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white h-8 w-8 p-0"
                      aria-label="Tambah Alasan"
                      title="Tambah"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Judul:</strong> {data.why?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.why?.subtitle}
                </p>
                <p>
                  <strong>Gambar:</strong> {data.why?.image}
                </p>
                <div>
                  <strong>Data Alasan:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">
                    {data.why?.whyData?.map((wd) => (
                      <li key={wd.id} className="flex items-center gap-2">
                        {wd.icon} {wd.title} — {wd.description}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setWhyItem({
                              id: wd.id,
                              whyId: wd.whyId,
                              icon: wd.icon,
                              title: wd.title,
                              description: wd.description,
                            })
                          }
                        >
                          <Edit className="h-3 w-3" />
                        </Button>

                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="hover:bg-gray-50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                  Bagian CTA
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCta(
                        data.cta ?? {
                          title: "",
                          subtitle: "",
                          buttonText: "",
                        }
                      )
                    }
                    aria-label="Ubah CTA"
                    title="Ubah"
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Judul:</strong> {data.cta?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.cta?.subtitle}
                </p>
                <p>
                  <strong>Tombol:</strong> {data.cta?.buttonText}
                </p>
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="hover:bg-gray-50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                  Bagian Layanan
                  <div className="flex gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setServices(
                          data.service ?? {
                            title: "",
                            subtitle: "",
                          }
                        )
                      }
                      aria-label="Ubah Layanan"
                      title="Ubah"
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        setServiceItem({
                          servicesSectionId: data.service?.id,
                          icon: "🏘️",
                          title: "",
                          description: "",
                        })
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white h-8 w-8 p-0"
                      aria-label="Tambah Layanan"
                      title="Tambah"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Judul:</strong> {data.service?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.service?.subtitle}
                </p>
                <div>
                  <strong>Data Layanan:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">
                    {data.service?.serviceData?.map((sd) => (
                      <li key={sd.id} className="flex items-center gap-2">
                        {sd.icon} {sd.title} — {sd.description}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setServiceItem({
                              id: sd.id,
                              servicesSectionId: sd.servicesSectionId,
                              icon: sd.icon,
                              title: sd.title,
                              description: sd.description,
                            })
                          }
                        >
                          <Edit className="h-3 w-3" />
                        </Button>

                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Testimonials */}
            <Card className="hover:bg-gray-50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                  Bagian Testimoni
                  <div className="flex gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setTestimonials(
                          data.testimonial ?? { title: "", subtitle: "" }
                        )
                      }
                      aria-label="Ubah Judul Testimoni"
                      title="Ubah"
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        setTestimonialItem({
                          testimonialSectionId: data.testimonial?.id,
                          name: "",
                          role: "",
                          image: "",
                          rating: 5,
                          content: "",
                          urlVideo: "",
                        })
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white h-8 w-8 p-0"
                      aria-label="Tambah Testimoni"
                      title="Tambah"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Judul:</strong> {data.testimonial?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.testimonial?.subtitle}
                </p>
                <div>
                  <strong>Item:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">
                    {data.testimonial?.testimonialData?.map((t) => (
                      <li key={t.id} className="flex items-center gap-2">
                        {t.name} ({t.role}) — ★{t.rating} — {t.content}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setTestimonialItem({
                              id: t.id,
                              testimonialSectionId: t.testimonialSectionId,
                              name: t.name,
                              role: t.role,
                              image: t.image ?? "",
                              rating: t.rating ?? 5,
                              content: t.content,
                              urlVideo: t.urlVideo ?? "",
                            })
                          }
                        >
                          <Edit className="h-3 w-3" />
                        </Button>

                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Related Properties */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                  Bagian Properti Terkait
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setRelated(
                        data.relatedProperty ?? {
                          title: "",
                          subtitle: "",
                          buttonText: "",
                        }
                      )
                    }
                    aria-label="Ubah Properti Terkait"
                    title="Ubah"
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Judul:</strong> {data.relatedProperty?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.relatedProperty?.subtitle}
                </p>
                <p>
                  <strong>Tombol:</strong> {data.relatedProperty?.buttonText}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* HALAMAN PROPERTI */}
          <TabsContent value="property-page" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                  Bagian Halaman Properti
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setPropertyPage(
                        data.propertyPage ?? { title: "", subtitle: "" }
                      )
                    }
                    aria-label="Ubah Halaman Properti"
                    title="Ubah"
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Judul:</strong> {data.propertyPage?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.propertyPage?.subtitle}
                </p>
              </CardContent>
            </Card>
            {/* Daftar Properti */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                  Daftar Properti
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white h-8 w-8 p-0"
                    onClick={() =>
                      setPropertyItem({
                        name: "",
                        images: [],
                        address: "",
                        type: $Enums.PropertyType.RUMAH,
                        room: 0,
                        bath: 0,
                        sqft: 0,
                        price: 0,
                        rating: 0,
                        description: "",
                        features: [],
                        isAvailable: true,
                      })
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                {!(data.properties && data.properties.length) ? (
                  <p className="text-sm text-gray-600">
                    Belum ada data properti.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {propItems.map((p) => (
                      <div
                        key={p.id}
                        className="group rounded-2xl border border-gray-200/70 bg-white/80 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="bg-gray-100 overflow-hidden aspect-[16/9]">
                          {p.images?.[0] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                              Tidak ada gambar
                            </div>
                          )}
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex items-center justify-between gap-3">
                            <h4 className="font-semibold leading-tight text-gray-900 text-[15px]">
                              {p.name}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className={`hidden sm:inline px-2 py-0.5 rounded text-xs ${p.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                {p.isAvailable ? "Tersedia" : "Tidak Tersedia"}
                              </span>
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-600">Tersedia</span>
                                <Switch
                                  checked={!!p.isAvailable}
                                  onCheckedChange={(checked) => {
                                    // Cek kelengkapan data yang diwajibkan oleh API upsert
                                    const hasRequiredStrings =
                                      !!p.name && !!p.address && !!p.description && !!p.pdf;
                                    const hasImages = Array.isArray(p.images) && p.images.length > 0;
                                    const hasNumbers =
                                      typeof p.room === "number" &&
                                      typeof p.bath === "number" &&
                                      typeof p.sqft === "number" &&
                                      typeof p.price === "number" &&
                                      typeof p.rating === "number";

                                    if (!hasRequiredStrings || !hasImages || !hasNumbers || !p.type) {
                                      alert("Lengkapi data properti (nama, pdf, gambar, alamat, deskripsi, angka, tipe) sebelum mengubah status.");
                                      return;
                                    }

                                    mPropertyItem.mutate({
                                      id: p.id,
                                      name: p.name,
                                      images: p.images,
                                      address: p.address,
                                      type: p.type,
                                      room: p.room,
                                      bath: p.bath,
                                      sqft: p.sqft,
                                      price: p.price,
                                      rating: p.rating,
                                      description: p.description,
                                      features: p.features || [],
                                      isAvailable: checked,
                                      pdf: p.pdf,
                                    });
                                  }}
                                  className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300"
                                />
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 truncate">{p.address}</p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-700">
                            <Badge className="border-0 bg-indigo-50 text-indigo-700">{convertToTitleCase(p.type)}</Badge>
                            <Badge className="border-0 bg-emerald-50 text-emerald-700">{p.room} Kamar</Badge>
                            <Badge className="border-0 bg-teal-50 text-teal-700">{p.bath} K. Mandi</Badge>
                            <Badge className="border-0 bg-amber-50 text-amber-700">{p.sqft} sqft</Badge>
                            <Badge className="border-0 bg-rose-50 text-rose-700">{convertToIDR(p.price)}</Badge>
                            <Badge className="border-0 bg-purple-50 text-purple-700">★ {p.rating}</Badge>
                          </div>
                          {p.features?.length ? (
                            <p className="text-xs text-gray-600 line-clamp-2">
                              <span className="font-medium">Fitur:</span>{" "}
                              {p.features.join(", ")}
                            </p>
                          ) : null}
                          <div className="flex gap-2 pt-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setPropertyItem({ ...p })}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Ubah
                            </Button>

                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              {data.properties && data.properties.length ? (
                <div className="flex items-center justify-between px-4 pb-4 text-sm text-gray-600">
                  <div>
                    Menampilkan {propStart + 1}-{Math.min(propEnd, propTotal)} dari {propTotal}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPropertyListPage((p) => Math.max(1, p - 1))}
                      disabled={propCurrentPage === 1}
                    >
                      Prev
                    </Button>
                    <span>
                      {propCurrentPage} / {propTotalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPropertyListPage((p) => Math.min(propTotalPages, p + 1))
                      }
                      disabled={propCurrentPage === propTotalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              ) : null}
            </Card>
          </TabsContent>

          {/* MEREK */}
          <TabsContent value="branding" className="space-y-6">
            {/* Logo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                  Informasi Logo
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setLogo(
                        data.logo ?? {
                          name: "",
                          logo: "",
                          alt: "",
                        }
                      )
                    }
                    aria-label="Ubah Logo"
                    title="Ubah"
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Nama:</strong> {data.logo?.name}
                </p>
                <div>
                  <strong>Pratinjau Logo:</strong>
                  <div className="mt-2 h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                    {data.logo?.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={data.logo.logo}
                        alt={data.logo?.alt || "Logo"}
                        className="h-full w-auto object-contain"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">Tidak ada logo</span>
                    )}
                  </div>
                </div>
                <p>
                  <strong>Teks Alt:</strong> {data.logo?.alt}
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                  Informasi Kontak
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setContact(
                        data.contact ?? { address: "", phone: "", email: "" }
                      )
                    }
                    aria-label="Ubah Kontak"
                    title="Ubah"
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Alamat:</strong> {data.contact?.address}
                </p>
                <p>
                  <strong>Telepon:</strong> {data.contact?.phone}
                </p>
                <p>
                  <strong>Email:</strong> {data.contact?.email}
                </p>
              </CardContent>
            </Card>

            {/* Copyright */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                  Informasi Hak Cipta
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCopyright(data.copyright ?? { text: "" })}
                    aria-label="Ubah Hak Cipta"
                    title="Ubah"
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                <p>
                  <strong>Teks:</strong> {data.copyright?.text}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SOSIAL */}
          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                  Tautan Media Sosial
                  <Button
                    onClick={() =>
                      setSocialItem({
                        rootId: data.id,
                        icon: "FACEBOOK",
                        href: "",
                        label: "",
                      })
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white h-8 w-8 p-0"
                    aria-label="Tambah Tautan Sosial"
                    title="Tambah"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.socialMedia?.map((s) => (
                  <div
                    key={s.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">
                        {s.label}
                        <span className="ml-2 text-xs text-gray-500 align-middle">{s.icon}</span>
                      </p>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-blue-600 hover:underline break-all sm:truncate sm:max-w-[420px] inline-block"
                      >
                        {s.href}
                      </a>
                    </div>
                    <div className="flex gap-2 sm:self-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setSocialItem({
                            id: s.id,
                            rootId: s.rootId,
                            icon: s.icon,
                            href: s.href,
                            label: s.label,
                          })
                        }
                        aria-label="Ubah Tautan"
                        title="Ubah"
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ==================== MODALS ==================== */}

      {/* Hero */}
      {hero && (
        <Modal title="Ubah Hero" onClose={() => setHero(null)}>
          <Field label="Judul">
            <Input
              value={hero.title}
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
              placeholder="Contoh: Temukan Villa Impian Anda"
              required
              disabled={mHero.isPending}
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={4}
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              placeholder="Deskripsi singkat hero..."
              required
              disabled={mHero.isPending}
            />
          </Field>
          <Field label="Teks Tombol">
            <Input
              value={hero.buttonText}
              onChange={(e) => setHero({ ...hero, buttonText: e.target.value })}
              placeholder="Contoh: Lihat Properti"
              required
              disabled={mHero.isPending}
            />
          </Field>
          <Field label="Gambar Latar">
            <FileUpload
              value={hero.image || ""}
              onChange={(v) => setHero({ ...hero, image: v })}
              accept="image/*"
            />
          </Field>
          <Actions
            saving={mHero.isPending}
            onSave={() => mHero.mutate({ id: data.hero?.id, ...hero })}
            onCancel={() => setHero(null)}
          />
        </Modal>
      )}

      {/* About */}
      {about && (
        <Modal title="Ubah Tentang" onClose={() => setAbout(null)}>
          <Field label="Judul">
            <Input
              value={about.title}
              onChange={(e) => setAbout({ ...about, title: e.target.value })}
              placeholder="Contoh: Tentang Bliss Villas"
              required
              disabled={mAbout.isPending}
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={3}
              value={about.subtitle}
              onChange={(e) => setAbout({ ...about, subtitle: e.target.value })}
              placeholder="Subjudul singkat..."
              required
              disabled={mAbout.isPending}
            />
          </Field>
          <Field label="Deskripsi">
            <Textarea
              rows={6}
              value={about.description}
              onChange={(e) =>
                setAbout({ ...about, description: e.target.value })
              }
              placeholder="Ceritakan tentang brand Anda..."
              required
              disabled={mAbout.isPending}
            />
          </Field>
          <Field label="Gambar">
            <FileUpload
              value={about.image || ""}
              onChange={(v) => setAbout({ ...about, image: v })}
            />
          </Field>
          <Actions
            saving={mAbout.isPending}
            onSave={() => mAbout.mutate({ id: data.about?.id, ...about })}
            onCancel={() => setAbout(null)}
          />
        </Modal>
      )}

      {/* AboutData item */}
      {aboutItem && (
        <Modal title={aboutItem.id ? "Ubah Statistik" : "Tambah Statistik"} onClose={() => setAboutItem(null)}>
          <Field label="Label">
            <Input
              value={aboutItem.label}
              onChange={(e) =>
                setAboutItem({ ...aboutItem, label: e.target.value })
              }
              placeholder="Contoh: Unit Terjual"
              required
              disabled={mAboutData.isPending}
            />
          </Field>
          <Field label="Nilai">
            <Input
              value={aboutItem.value}
              onChange={(e) => {
                // Only allow numbers and symbols
                const value = e.target.value;
                if (/^[0-9+\-*\/%()\[\]{}.,;:!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(value) || value === '') {
                  setAboutItem({ ...aboutItem, value });
                }
              }}
              onKeyPress={(e) => {
                // Prevent non-numeric and non-symbol characters
                const char = e.key;
                if (!/^[0-9+\-*\/%()\[\]{}.,;:!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]$/.test(char)) {
                  e.preventDefault();
                }
              }}
              placeholder="Contoh: 20+"
              required
              disabled={mAboutData.isPending}
            />
          </Field>
          <Actions
            saving={mAboutData.isPending}
            onSave={() =>
              mAboutData.mutate({
                id: aboutItem.id,
                aboutId: aboutItem.aboutId ?? data.about?.id,
                label: aboutItem.label,
                value: aboutItem.value,
              })
            }
            onCancel={() => setAboutItem(null)}
            onDelete={aboutItem.id ? () => {
              if (confirm("Hapus item ini?")) {
                dAboutData.mutate({ id: aboutItem.id! });
                setAboutItem(null);
              }
            } : undefined}
          />
        </Modal>
      )}

      {/* Property Section */}
      {propertySec && (
        <Modal title="Ubah Bagian Properti" onClose={() => setPropertySec(null)}>
          <Field label="Judul">
            <Input
              value={propertySec.title}
              onChange={(e) =>
                setPropertySec({ ...propertySec, title: e.target.value })
              }
              placeholder="Contoh: Properti Unggulan"
              required
              disabled={mProperty.isPending}
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={3}
              value={propertySec.subtitle}
              onChange={(e) =>
                setPropertySec({ ...propertySec, subtitle: e.target.value })
              }
              placeholder="Subjudul singkat..."
              required
              disabled={mProperty.isPending}
            />
          </Field>
          <Field label="Teks Tombol">
            <Input
              value={propertySec.buttonText}
              onChange={(e) =>
                setPropertySec({ ...propertySec, buttonText: e.target.value })
              }
              placeholder="Contoh: Lihat Semua Properti"
              required
              disabled={mProperty.isPending}
            />
          </Field>
          <Actions
            saving={mProperty.isPending}
            onSave={() =>
              mProperty.mutate({ id: data.property?.id, ...propertySec })
            }
            onCancel={() => setPropertySec(null)}
          />
        </Modal>
      )}

      {/* Why */}
      {why && (
        <Modal title="Ubah Bagian Alasan" onClose={() => setWhy(null)}>
          <Field label="Judul">
            <Input
              value={why.title}
              onChange={(e) => setWhy({ ...why, title: e.target.value })}
              placeholder="Contoh: Kenapa Memilih Kami"
              required
              disabled={mWhy.isPending}
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={3}
              value={why.subtitle}
              onChange={(e) => setWhy({ ...why, subtitle: e.target.value })}
              placeholder="Subjudul singkat..."
              required
              disabled={mWhy.isPending}
            />
          </Field>
          <Field label="Gambar">
            <FileUpload
              value={why.image || ""}
              onChange={(v) => setWhy({ ...why, image: v })}
              accept="image/*"
            />
          </Field>
          <Actions
            saving={mWhy.isPending}
            onSave={() => mWhy.mutate({ id: data.why?.id, ...why })}
            onCancel={() => setWhy(null)}
          />
        </Modal>
      )}

      {/* WhyData item */}
      {whyItem && (
        <Modal title={whyItem.id ? "Ubah Alasan" : "Tambah Alasan"} onClose={() => setWhyItem(null)}>
          <Field label="Ikon (emoji/teks)">
            <Input
              value={whyItem.icon}
              onChange={(e) => setWhyItem({ ...whyItem, icon: e.target.value })}
              placeholder="Contoh: 🏠"
              required
              disabled={mWhyData.isPending}
            />
          </Field>
          <Field label="Judul">
            <Input
              value={whyItem.title}
              onChange={(e) =>
                setWhyItem({ ...whyItem, title: e.target.value })
              }
              placeholder="Contoh: Lokasi Strategis"
              required
              disabled={mWhyData.isPending}
            />
          </Field>
          <Field label="Deskripsi">
            <Textarea
              rows={4}
              value={whyItem.description}
              onChange={(e) =>
                setWhyItem({ ...whyItem, description: e.target.value })
              }
              placeholder="Jelaskan keunggulan ini..."
              required
              disabled={mWhyData.isPending}
            />
          </Field>
          <Actions
            saving={mWhyData.isPending}
            onSave={() =>
              mWhyData.mutate({
                id: whyItem.id,
                whyId: whyItem.whyId ?? data.why?.id,
                icon: whyItem.icon,
                title: whyItem.title,
                description: whyItem.description,
              })
            }
            onCancel={() => setWhyItem(null)}
            onDelete={whyItem.id ? () => {
              if (confirm("Hapus reason ini?")) {
                dWhyData.mutate({ id: whyItem.id! });
                setWhyItem(null);
              }
            } : undefined}
          />
        </Modal>
      )}

      {/* CTA */}
      {cta && (
        <Modal title="Ubah CTA" onClose={() => setCta(null)}>
          <Field label="Judul">
            <Input
              value={cta.title}
              onChange={(e) => setCta({ ...cta, title: e.target.value })}
              placeholder="Contoh: Siap Booking Sekarang?"
              required
              disabled={mCTA.isPending}
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={3}
              value={cta.subtitle}
              onChange={(e) => setCta({ ...cta, subtitle: e.target.value })}
              placeholder="Subjudul singkat..."
              required
              disabled={mCTA.isPending}
            />
          </Field>
          <Field label="Teks Tombol">
            <Input
              value={cta.buttonText}
              onChange={(e) => setCta({ ...cta, buttonText: e.target.value })}
              placeholder="Contoh: Hubungi Kami"
              required
              disabled={mCTA.isPending}
            />
          </Field>
          <Actions
            saving={mCTA.isPending}
            onSave={() => mCTA.mutate({ id: data.cta?.id, ...cta })}
            onCancel={() => setCta(null)}
          />
        </Modal>
      )}

      {/* Services */}
      {services && (
        <Modal title="Ubah Layanan" onClose={() => setServices(null)}>
          <Field label="Judul">
            <Input
              value={services.title}
              onChange={(e) =>
                setServices({ ...services, title: e.target.value })
              }
              placeholder="Contoh: Layanan Kami"
              required
              disabled={mServices.isPending}
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={3}
              value={services.subtitle}
              onChange={(e) =>
                setServices({ ...services, subtitle: e.target.value })
              }
              placeholder="Subjudul singkat..."
              required
              disabled={mServices.isPending}
            />
          </Field>
          <Actions
            saving={mServices.isPending}
            onSave={() =>
              mServices.mutate({ id: data.service?.id, ...services })
            }
            onCancel={() => setServices(null)}
          />
        </Modal>
      )}

      {/* ServiceData item */}
      {serviceItem && (
        <Modal title={serviceItem.id ? "Ubah Layanan" : "Tambah Layanan"} onClose={() => setServiceItem(null)}>
          <Field label="Ikon (emoji/teks)">
            <Input
              value={serviceItem.icon}
              onChange={(e) =>
                setServiceItem({ ...serviceItem, icon: e.target.value })
              }
              placeholder="Contoh: 🛎️"
              required
              disabled={mServiceData.isPending}
            />
          </Field>
          <Field label="Judul">
            <Input
              value={serviceItem.title}
              onChange={(e) =>
                setServiceItem({ ...serviceItem, title: e.target.value })
              }
              placeholder="Contoh: Concierge"
              required
              disabled={mServiceData.isPending}
            />
          </Field>
          <Field label="Deskripsi">
            <Textarea
              rows={4}
              value={serviceItem.description}
              onChange={(e) =>
                setServiceItem({
                  ...serviceItem,
                  description: e.target.value,
                })
              }
              placeholder="Jelaskan layanan ini..."
              required
              disabled={mServiceData.isPending}
            />
          </Field>
          <Actions
            saving={mServiceData.isPending}
            onSave={() =>
              mServiceData.mutate({
                id: serviceItem.id,
                servicesSectionId:
                  serviceItem.servicesSectionId ?? data.service?.id,
                icon: serviceItem.icon,
                title: serviceItem.title,
                description: serviceItem.description,
              })
            }
            onCancel={() => setServiceItem(null)}
            onDelete={serviceItem.id ? () => {
              if (confirm("Hapus service ini?")) {
                dServiceData.mutate({ id: serviceItem.id! });
                setServiceItem(null);
              }
            } : undefined}
          />
        </Modal>
      )}

      {/* Testimonials headline */}
      {testimonials && (
        <Modal title="Ubah Judul Testimoni" onClose={() => setTestimonials(null)}>
          <Field label="Judul">
            <Input
              value={testimonials.title}
              onChange={(e) =>
                setTestimonials({ ...testimonials, title: e.target.value })
              }
              placeholder="Contoh: Apa Kata Mereka"
              required
              disabled={mTestimonials.isPending}
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={3}
              value={testimonials.subtitle}
              onChange={(e) =>
                setTestimonials({ ...testimonials, subtitle: e.target.value })
              }
              placeholder="Subjudul singkat..."
              required
              disabled={mTestimonials.isPending}
            />
          </Field>
          <Actions
            saving={mTestimonials.isPending}
            onSave={() =>
              mTestimonials.mutate({
                id: data.testimonial?.id,
                ...testimonials,
              })
            }
            onCancel={() => setTestimonials(null)}
          />
        </Modal>
      )}

      {/* TestimonialData item */}
      {testimonialItem && (
        <Modal
          title={testimonialItem.id ? "Ubah Testimoni" : "Tambah Testimoni"}
          onClose={() => setTestimonialItem(null)}
        >
          <Field label="Nama">
            <Input
              value={testimonialItem.name}
              onChange={(e) =>
                setTestimonialItem({ ...testimonialItem, name: e.target.value })
              }
              placeholder="Contoh: Budi Santoso"
              disabled={mTestimonialData.isPending}
            />
          </Field>
          <Field label="Peran">
            <Input
              value={testimonialItem.role}
              onChange={(e) =>
                setTestimonialItem({ ...testimonialItem, role: e.target.value })
              }
              placeholder="Contoh: Tamu"
              disabled={mTestimonialData.isPending}
            />
          </Field>
          <Field label="Penilaian (1–5)">
            <Input
              type="number"
              min={1}
              max={5}
              value={testimonialItem.rating}
              onChange={(e) =>
                setTestimonialItem({
                  ...testimonialItem,
                  rating: Number(e.target.value) || 5,
                })
              }
              inputMode="numeric"
              placeholder="1 - 5"
              required
              disabled={mTestimonialData.isPending}
            />
          </Field>
          <Field label="Konten">
            <Textarea
              rows={4}
              value={testimonialItem.content}
              onChange={(e) =>
                setTestimonialItem({
                  ...testimonialItem,
                  content: e.target.value,
                })
              }
              placeholder="Tulis testimoni singkat dari tamu..."
              required
              disabled={mTestimonialData.isPending}
            />
          </Field>
          <Field label="Gambar (opsional)">
            <FileUpload
              value={testimonialItem.image || ""}
              onChange={(v) =>
                setTestimonialItem({ ...testimonialItem, image: v })
              }
              accept="image/*"
            />
          </Field>
          <Field label="URL YouTube (opsional)">
            <Input
              value={testimonialItem.urlVideo || ""}
              onChange={(e) =>
                setTestimonialItem({
                  ...testimonialItem,
                  urlVideo: e.target.value,
                })
              }
              placeholder="Contoh: https://www.youtube.com/watch?v=abc123 atau https://youtube.com/shorts/abc123"
              disabled={mTestimonialData.isPending}
            />
            <p className="text-xs text-gray-500 mt-1">
              Mendukung: YouTube Watch, YouTube Shorts, youtu.be, dan embed URLs
            </p>
            {testimonialItem.urlVideo && !isValidYouTubeUrl(testimonialItem.urlVideo) && (
              <p className="text-xs text-red-500 mt-1">
                ⚠️ URL YouTube tidak valid. Pastikan format URL benar.
              </p>
            )}
          </Field>
          <Actions
            saving={mTestimonialData.isPending}
            onSave={() =>
              mTestimonialData.mutate({
                id: testimonialItem.id,
                testimonialSectionId:
                  testimonialItem.testimonialSectionId ?? data.testimonial?.id,
                name: testimonialItem.name,
                role: testimonialItem.role,
                image: testimonialItem.image || null,
                rating: testimonialItem.rating,
                content: testimonialItem.content,
                urlVideo: testimonialItem.urlVideo || null,
              })
            }
            onCancel={() => setTestimonialItem(null)}
            onDelete={testimonialItem.id ? () => {
              if (confirm("Hapus testimonial ini?")) {
                dTestimonialData.mutate({ id: testimonialItem.id! });
              }
            } : undefined}
          />
        </Modal>
      )}

      {/* Related */}
      {related && (
        <Modal title="Ubah Bagian Properti Terkait" onClose={() => setRelated(null)}>
          <Field label="Judul">
            <Input
              value={related.title}
              onChange={(e) =>
                setRelated({ ...related, title: e.target.value })
              }
              placeholder="Contoh: Properti Lain yang Mungkin Anda Sukai"
              required
              disabled={mRelated.isPending}
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={3}
              value={related.subtitle}
              onChange={(e) =>
                setRelated({ ...related, subtitle: e.target.value })
              }
              placeholder="Subjudul singkat..."
              required
              disabled={mRelated.isPending}
            />
          </Field>
          <Field label="Teks Tombol">
            <Input
              value={related.buttonText}
              onChange={(e) =>
                setRelated({ ...related, buttonText: e.target.value })
              }
              placeholder="Contoh: Lihat Semua"
              required
              disabled={mRelated.isPending}
            />
          </Field>
          <Actions
            saving={mRelated.isPending}
            onSave={() =>
              mRelated.mutate({ id: data.relatedProperty?.id, ...related })
            }
            onCancel={() => setRelated(null)}
          />
        </Modal>
      )}

      {/* Final CTA */}
      {finalCta && (
        <Modal title="Ubah CTA Terakhir" onClose={() => setFinalCta(null)}>
          <Field label="Judul">
            <Input
              value={finalCta.title}
              onChange={(e) =>
                setFinalCta({ ...finalCta, title: e.target.value })
              }
              placeholder="Contoh: Siap Menginap di Bliss Villas?"
              required
              disabled={mFinalCTA.isPending}
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={3}
              value={finalCta.subtitle}
              onChange={(e) =>
                setFinalCta({ ...finalCta, subtitle: e.target.value })
              }
              placeholder="Subjudul singkat..."
              required
              disabled={mFinalCTA.isPending}
            />
          </Field>
          <Field label="Tombol Utama">
            <Input
              value={finalCta.primaryButtonText}
              onChange={(e) =>
                setFinalCta({
                  ...finalCta,
                  primaryButtonText: e.target.value,
                })
              }
              placeholder="Contoh: Lihat Properti"
              required
              disabled={mFinalCTA.isPending}
            />
          </Field>
          <Field label="Tombol Sekunder">
            <Input
              value={finalCta.secondaryButtonText}
              onChange={(e) =>
                setFinalCta({
                  ...finalCta,
                  secondaryButtonText: e.target.value,
                })
              }
              placeholder="Contoh: Hubungi Kami"
              required
              disabled={mFinalCTA.isPending}
            />
          </Field>
          <Actions
            saving={mFinalCTA.isPending}
            onSave={() =>
              mFinalCTA.mutate({ id: data.finalCtaSection?.id, ...finalCta })
            }
            onCancel={() => setFinalCta(null)}
          />
        </Modal>
      )}

      {/* Property Page */}
      {propertyPage && (
        <Modal title="Ubah Bagian Halaman Properti" onClose={() => setPropertyPage(null)}>
          <Field label="Judul">
            <Input
              value={propertyPage.title}
              onChange={(e) =>
                setPropertyPage({ ...propertyPage, title: e.target.value })
              }
              placeholder="Contoh: Semua Properti"
              required
              disabled={mPropertyPage.isPending}
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={3}
              value={propertyPage.subtitle}
              onChange={(e) =>
                setPropertyPage({ ...propertyPage, subtitle: e.target.value })
              }
              placeholder="Subjudul singkat..."
              required
              disabled={mPropertyPage.isPending}
            />
          </Field>
          <Field label="CTA Title">
            <Input
              value={propertyPage.ctaTitle}
              onChange={(e) =>
                setPropertyPage({ ...propertyPage, ctaTitle: e.target.value })
              }
              placeholder="Contoh: Butuh Bantuan?"
              required
              disabled={mPropertyPage.isPending}
            />
          </Field>
          <Field label="CTA Subtitle">
            <Textarea
              rows={3}
              value={propertyPage.ctaSubtitle}
              onChange={(e) =>
                setPropertyPage({
                  ...propertyPage,
                  ctaSubtitle: e.target.value,
                })
              }
              placeholder="Jelaskan CTA ini..."
              required
              disabled={mPropertyPage.isPending}
            />
          </Field>
          <Field label="CTA Button Text">
            <Input
              value={propertyPage.ctaButtonText}
              onChange={(e) =>
                setPropertyPage({
                  ...propertyPage,
                  ctaButtonText: e.target.value,
                })
              }
              placeholder="Contoh: Hubungi Kami"
              required
              disabled={mPropertyPage.isPending}
            />
          </Field>
          <Actions
            saving={mPropertyPage.isPending}
            onSave={() =>
              mPropertyPage.mutate({
                id: data.propertyPage?.id,
                ...propertyPage,
              })
            }
            onCancel={() => setPropertyPage(null)}
          />
        </Modal>
      )}

      {/* Logo */}
      {logo && (
        <Modal title="Ubah Logo" onClose={() => setLogo(null)}>
          <Field label="Nama">
            <Input
              value={logo.name}
              onChange={(e) => setLogo({ ...logo, name: e.target.value })}
              placeholder="Contoh: Bliss Villas"
              required
              disabled={mLogo.isPending}
            />
          </Field>
          <Field label="URL Logo">
            <FileUpload
              value={logo.logo || ""}
              onChange={(v) => setLogo({ ...logo, logo: v })}
              accept="image/*"
            />
          </Field>
          <Field label="Teks Alt">
            <Input
              value={logo.alt}
              onChange={(e) => setLogo({ ...logo, alt: e.target.value })}
              placeholder="Contoh: Logo Bliss Villas"
              required
              disabled={mLogo.isPending}
            />
          </Field>
          <Actions
            saving={mLogo.isPending}
            onSave={() => mLogo.mutate({ id: data.logo?.id, ...logo })}
            onCancel={() => setLogo(null)}
          />
        </Modal>
      )}

      {/* Contact */}
      {contact && (
        <Modal title="Ubah Kontak" onClose={() => setContact(null)}>
          <Field label="Alamat">
            <Textarea
              rows={3}
              value={contact.address}
              onChange={(e) =>
                setContact({ ...contact, address: e.target.value })
              }
              placeholder="Contoh: Jl. Kaliurang Km 7, Yogyakarta"
              required
              disabled={mContact.isPending}
            />
          </Field>
          <Field label="Telepon">
            <Input
              value={contact.phone}
              onChange={(e) => {
                // Only allow numbers
                const value = e.target.value;
                if (/^[0-9]*$/.test(value) || value === '') {
                  setContact({ ...contact, phone: value });
                }
              }}
              onKeyPress={(e) => {
                // Prevent non-numeric characters
                const char = e.key;
                if (!/^[0-9]$/.test(char)) {
                  e.preventDefault();
                }
              }}
              placeholder="Contoh: 62812xxxxxxx"
              inputMode="tel"
              required
              disabled={mContact.isPending}
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              value={contact.email}
              onChange={(e) =>
                setContact({ ...contact, email: e.target.value })
              }
              placeholder="you@example.com"
              required
              disabled={mContact.isPending}
            />
          </Field>
          <Actions
            saving={mContact.isPending}
            onSave={() => mContact.mutate({ id: data.contact?.id, ...contact })}
            onCancel={() => setContact(null)}
          />
        </Modal>
      )}

      {/* Copyright */}
      {copyright && (
        <Modal title="Ubah Hak Cipta" onClose={() => setCopyright(null)}>
          <Field label="Teks">
            <Input
              value={copyright.text}
              onChange={(e) =>
                setCopyright({ ...copyright, text: e.target.value })
              }
              placeholder="Contoh: © 2025 Bliss Villas. All rights reserved."
              required
              disabled={mCopyright.isPending}
            />
          </Field>
          <Actions
            saving={mCopyright.isPending}
            onSave={() =>
              mCopyright.mutate({ id: data.copyright?.id, ...copyright })
            }
            onCancel={() => setCopyright(null)}
          />
        </Modal>
      )}

      {/* Property Item */}
      {propertyItem && (
        <Modal title={propertyItem.id ? "Ubah Properti" : "Tambah Properti"} onClose={() => setPropertyItem(null)}>
          {/* Basic Information Section */}
          <div className="space-y-5">
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Informasi Dasar</h3>
              <div className="space-y-4">
                <Field label="Nama Properti *">
                  <Input
                    value={propertyItem.name || ""}
                    onChange={(e) =>
                      setPropertyItem({ ...propertyItem, name: e.target.value })
                    }
                    placeholder="Contoh: Bliss Villa Malioboro"
                    required
                    disabled={mPropertyItem.isPending}
                  />
                </Field>

                <Field label="Alamat *">
                  <Textarea
                    rows={2}
                    value={propertyItem.address || ""}
                    onChange={(e) =>
                      setPropertyItem({ ...propertyItem, address: e.target.value })
                    }
                    placeholder="Contoh: Jl. Kaliurang Km 7, Yogyakarta"
                    required
                    disabled={mPropertyItem.isPending}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Tipe Properti *">
                    <select
                      className="w-full border rounded-lg px-3 py-2 bg-white text-sm disabled:bg-gray-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={propertyItem.type || $Enums.PropertyType.RUMAH}
                      onChange={(e) =>
                        setPropertyItem({
                          ...propertyItem,
                          type: e.target.value as $Enums.PropertyType,
                        })
                      }
                      disabled={mPropertyItem.isPending}
                    >
                      {Object.values($Enums.PropertyType).map((t) => (
                        <option key={t} value={t}>
                          {convertToTitleCase(t)}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Status Ketersediaan">
                    <div className="flex items-center space-x-3 pt-2">
                      <Switch
                        checked={!!propertyItem.isAvailable}
                        onCheckedChange={(checked) =>
                          setPropertyItem({ ...propertyItem, isAvailable: checked })
                        }
                        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300 disabled:opacity-50"
                        disabled={mPropertyItem.isPending}
                      />
                      <span className="text-sm text-gray-600">
                        {propertyItem.isAvailable ? "Tersedia" : "Tidak Tersedia"}
                      </span>
                    </div>
                  </Field>
                </div>
              </div>
            </div>

            {/* Specifications Section */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Spesifikasi Properti</h3>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Jumlah Kamar *">
                  <Input
                    type="text"
                    inputMode="numeric"
                    min={0}
                    value={propertyItem.room === undefined ? "" : String(propertyItem.room)}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "");
                      const noLeading = raw.replace(/^0+(?=\d)/, "");
                      setPropertyItem({
                        ...propertyItem,
                        room: noLeading === "" ? undefined : parseInt(noLeading, 10),
                      });
                    }}
                    placeholder="0"
                    required
                    disabled={mPropertyItem.isPending}
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </Field>
                <Field label="Jumlah Kamar Mandi *">
                  <Input
                    type="text"
                    inputMode="numeric"
                    min={0}
                    value={propertyItem.bath === undefined ? "" : String(propertyItem.bath)}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "");
                      const noLeading = raw.replace(/^0+(?=\d)/, "");
                      setPropertyItem({
                        ...propertyItem,
                        bath: noLeading === "" ? undefined : parseInt(noLeading, 10),
                      });
                    }}
                    placeholder="0"
                    required
                    disabled={mPropertyItem.isPending}
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </Field>
                <Field label="Luas (sqft)">
                  <Input
                    type="text"
                    inputMode="numeric"
                    min={0}
                    value={propertyItem.sqft === undefined ? "" : String(propertyItem.sqft)}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "");
                      const noLeading = raw.replace(/^0+(?=\d)/, "");
                      setPropertyItem({
                        ...propertyItem,
                        sqft: noLeading === "" ? undefined : parseInt(noLeading, 10),
                      });
                    }}
                    placeholder="0"
                    disabled={mPropertyItem.isPending}
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </Field>
                <Field label="Rating (0–5)">
                  <Input
                    type="number"
                    min={0}
                    max={5}
                    step={0.1}
                    value={propertyItem.rating ?? ""}
                    onChange={(e) =>
                      setPropertyItem({
                        ...propertyItem,
                        rating:
                          e.target.value === ""
                            ? undefined
                            : parseFloat(e.target.value),
                      })
                    }
                    inputMode="decimal"
                    placeholder="Contoh: 4.8"
                    disabled={mPropertyItem.isPending}
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </Field>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Informasi Harga</h3>
              <Field label="Harga (Rp) *">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">Rp</span>
                  <Input
                    type="text"
                    inputMode="numeric"
                    min={0}
                    value={propertyItem.price === undefined ? "" : new Intl.NumberFormat("id-ID").format(propertyItem.price)}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "");
                      const noLeading = digits.replace(/^0+(?=\d)/, "");
                      setPropertyItem({
                        ...propertyItem,
                        price: noLeading === "" ? undefined : parseInt(noLeading, 10),
                      });
                    }}
                    placeholder="Contoh: 1.500.000"
                    required
                    disabled={mPropertyItem.isPending}
                    className="pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Masukkan angka tanpa titik atau koma</p>
              </Field>
            </div>

            {/* Media Section */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Media & Dokumen</h3>
              <div className="space-y-4">
                <Field label="Katalog PDF *">
                  <div className="space-y-3">
                    <FileUpload
                      value={propertyItem.pdf || ""}
                      onChange={(v) => setPropertyItem({ ...propertyItem, pdf: v })}
                      accept="application/pdf"
                    />
                    {propertyItem.pdf && (
                      <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-blue-900 truncate">
                            📄 Katalog PDF
                          </p>
                          <p className="text-xs text-blue-600 truncate">
                            {propertyItem.pdf}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(propertyItem.pdf, '_blank')}
                          className="flex-shrink-0 border-blue-300 text-blue-700 hover:bg-blue-50"
                          disabled={mPropertyItem.isPending}
                        >
                          <FileIcon className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    )}
                  </div>
                </Field>

                <Field label="Galeri Gambar *">
                  <div className="space-y-2">
                    <MultiFileUpload
                      value={propertyItem.images || []}
                      onChange={(arr) =>
                        setPropertyItem({ ...propertyItem, images: arr })
                      }
                      accept="image/*"
                      maxSizeMB={5}
                      maxCount={12}
                    />
                    <p className="text-xs text-gray-500">
                      Upload minimal 1 gambar. Maksimal 12 gambar, 5MB per gambar.
                    </p>
                  </div>
                </Field>
              </div>
            </div>

            {/* Features Section */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Fitur & Fasilitas</h3>
              <Field label="Fitur Properti">
                <TagInput
                  value={propertyItem.features || []}
                  placeholder="Tulis fitur, tekan Enter atau koma untuk memisahkan"
                  onChange={(arr) =>
                    setPropertyItem({ ...propertyItem, features: arr })
                  }
                  disabled={mPropertyItem.isPending}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Contoh: Kolam Renang, WiFi, AC, Dapur, Garasi
                </p>
              </Field>
            </div>

            {/* Description Section */}
            <div className="pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Deskripsi Detail</h3>
              <Field label="Deskripsi Properti *">
                <Textarea
                  rows={6}
                  value={propertyItem.description || ""}
                  onChange={(e) =>
                    setPropertyItem({
                      ...propertyItem,
                      description: e.target.value,
                    })
                  }
                  placeholder="Jelaskan detail properti, lokasi strategis, fasilitas terdekat, dan keunggulan lainnya..."
                  disabled={mPropertyItem.isPending}
                  className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimal 50 karakter. Jelaskan dengan detail untuk menarik minat calon pembeli.
                </p>
              </Field>
            </div>
          </div>

          <Actions
            saving={mPropertyItem.isPending}
            onSave={() =>
              mPropertyItem.mutate({
                id: propertyItem.id,
                name: propertyItem.name,
                images: propertyItem.images,
                address: propertyItem.address,
                type: propertyItem.type,
                room: propertyItem.room,
                bath: propertyItem.bath,
                sqft: propertyItem.sqft,
                price: propertyItem.price,
                rating: propertyItem.rating,
                description: propertyItem.description,
                features: propertyItem.features,
                isAvailable: !!propertyItem.isAvailable,
                pdf: propertyItem.pdf,
              })
            }
            onCancel={() => setPropertyItem(null)}
            onDelete={propertyItem.id ? () => {
              if (confirm("Hapus properti ini?")) {
                dPropertyItem.mutate({ id: propertyItem.id! });
                setPropertyItem(null);
              }
            } : undefined}
          />
        </Modal>
      )}

      {/* Social item */}
      {socialItem && (
        <Modal
          title={socialItem.id ? "Ubah Tautan Sosial" : "Tambah Tautan Sosial"}
          onClose={() => setSocialItem(null)}
        >
          <Field label="Ikon">
            <select
              className="w-full border rounded px-3 py-2 bg-white text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              value={socialItem.icon}
              onChange={(e) =>
                setSocialItem({
                  ...socialItem,
                  icon: e.target.value as $Enums.SocialMediaIcon,
                })
              }
              required
              disabled={mSocial.isPending}
            >
              {Object.values($Enums.SocialMediaIcon).map((opt) => (
                <option key={opt} value={opt}>
                  {opt[0].toUpperCase() + opt.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Label">
            <Input
              value={socialItem.label}
              onChange={(e) =>
                setSocialItem({ ...socialItem, label: e.target.value })
              }
              placeholder="Contoh: Instagram"
              required
              disabled={mSocial.isPending}
            />
          </Field>
          <Field label="URL">
            <Input
              value={socialItem.href}
              onChange={(e) =>
                setSocialItem({ ...socialItem, href: e.target.value })
              }
              placeholder="https://instagram.com/username"
              type="url"
              required
              disabled={mSocial.isPending}
            />
          </Field>
          <Actions
            saving={mSocial.isPending}
            onSave={() =>
              mSocial.mutate({
                id: socialItem.id,
                rootId: socialItem.rootId ?? data.id,
                icon: socialItem.icon,
                label: socialItem.label,
                href: socialItem.href,
              })
            }
            onCancel={() => setSocialItem(null)}
            onDelete={socialItem.id ? () => {
              if (confirm("Hapus social link ini?")) {
                dSocial.mutate({ id: socialItem.id! });
                setSocialItem(null);
              }
            } : undefined}
          />
        </Modal>
      )}
    </div>
  );
};

/* ---------------------- Small UI primitives ---------------------- */
function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide rounded-2xl border border-gray-200 shadow-2xl bg-white/95">
        <CardHeader className="sticky top-0 z-10 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg font-semibold leading-6 text-gray-900">{title}</CardTitle>
            <button
              type="button"
              aria-label="Tutup"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 p-6 overflow-y-auto scrollbar-hide">{children}</CardContent>
      </Card>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-[13px] font-medium text-gray-700">{label}</Label>
      {children}
    </div>
  );
}

function Actions({
  saving,
  onSave,
  onCancel,
  onDelete,
}: {
  saving?: boolean;
  onSave: () => void;
  onCancel: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="flex items-center justify-end gap-2 pt-2 border-t mt-2">
      {onDelete ? (
        <Button
          variant="destructive"
          onClick={onDelete}
          disabled={saving}
          className="h-9 px-4"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Hapus
        </Button>
      ) : null}
      <Button
        onClick={onSave}
        disabled={saving}
        className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Save className="h-4 w-4 mr-2" />
        {saving ? "Menyimpan..." : "Simpan"}
      </Button>
    </div>
  );
}

function TagInput({
  value,
  onChange,
  placeholder,
  disabled,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [text, setText] = useState("");

  const add = (raw: string) => {
    if (disabled) return;
    const parts = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!parts.length) return;
    const set = new Set([...(value || []), ...parts]);
    onChange(Array.from(set));
    setText("");
  };

  const remove = (idx: number) => {
    if (disabled) return;
    const arr = [...value];
    arr.splice(idx, 1);
    onChange(arr);
  };

  return (
    <div className="rounded border p-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {value?.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
          >
            {t}
            <button
              type="button"
              className="text-blue-700/70 hover:text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => remove(i)}
              aria-label={`Hapus ${t}`}
              disabled={disabled}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <Input
        value={text}
        placeholder={placeholder || "Ketik lalu Enter"}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add(text);
          }
        }}
        onBlur={() => {
          if (text.trim()) add(text);
        }}
        disabled={disabled}
      />
    </div>
  );
}

export default withAuth(AdminPage);
