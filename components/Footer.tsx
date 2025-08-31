"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useData } from "@/service/data";
import { $Enums } from "@prisma/client";
import { NAV_ITEMS } from "./Header";
import { usePathname } from "next/navigation";

/** 🔽 NEW: react-icons */
import type { IconType } from "react-icons";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPinterest,
  FaWhatsapp,
  FaTelegram,
  FaWeibo,
  FaGlobe,
} from "react-icons/fa";
import { SiTiktok, SiKakaotalk, SiLine, SiWechat } from "react-icons/si";
import { RiTwitterXFill } from "react-icons/ri";
import { converToReadablePhoneNumber } from "@/helper/formatter";

/** Tipe komponen icon yang dikembalikan */
type SocialIcon = IconType;

/** Map enum -> icon */
const ICON_MAP: Record<$Enums.SocialMediaIcon, SocialIcon> = {
  FACEBOOK: FaFacebook,
  TWITTER: FaTwitter, // twitter lama
  X: RiTwitterXFill, // twitter X
  INSTAGRAM: FaInstagram,
  LINKEDIN: FaLinkedin,
  YOUTUBE: FaYoutube,
  TIKTOK: SiTiktok,
  PINTEREST: FaPinterest,
  WEBSITE: FaGlobe,
  WHATSAPP: FaWhatsapp,
  TELEGRAM: FaTelegram,
  LINE: SiLine,
  KAKAO: SiKakaotalk,
  WECHAT: SiWechat,
  WEIBO: FaWeibo,
};

/** Fungsi util: fallback ke FaGlobe bila tak terpetakan */
const getSocialIcon = (platform: $Enums.SocialMediaIcon): SocialIcon =>
  ICON_MAP[platform] ?? FaGlobe;

export function Footer() {
  const { data, isLoading } = useData();
  const pathname = usePathname();

  const onClick = (href: string) => {
    if (pathname !== "/") window.location.href = "/#hero";
    else {
      const querySelector = document.querySelector(href);
      if (querySelector) querySelector.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading || !data) return null;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <AnimatedSection className="md:col-span-1">
              <div className="space-y-4">
                <Link href="/" className="flex items-center">
                  <Image
                    src={data?.logo?.logo || "/img/logo.png"}
                    alt={data?.logo?.alt || ""}
                    width={48}
                    height={48}
                    className="h-10 w-24 object-contain object-center"
                  />
                </Link>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {data?.copyright?.text}
                </p>
                <div className="flex space-x-3">
                  {data?.socialMedia.map((social) => {
                    const Icon = getSocialIcon(social.icon);
                    return (
                      <Button
                        key={social.id}
                        variant="outline"
                        size="sm"
                        className="w-9 h-9 p-0 rounded-lg border-gray-700 text-gray-400 hover:border-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-200"
                        asChild
                      >
                        <Link
                          href={social.href}
                          aria-label={social.label}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {/* react-icons support className */}
                          <Icon className="h-4 w-4" />
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>

            {/* Quick Links */}
            <AnimatedSection delay={0.1}>
              <div>
                <h3 className="text-lg font-bold text-white mb-4">
                  Tautan Cepat
                </h3>
                <ul className="space-y-2">
                  {NAV_ITEMS.map((link, index) => (
                    <li key={index}>
                      <button
                        onClick={() => onClick(link.href)}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm cursor-pointer"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Contact */}
            <AnimatedSection delay={0.2}>
              <div>
                <h3 className="text-lg font-bold text-white mb-4">
                  Hubungi Kami
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-400 text-sm">
                    {data?.contact?.address}
                  </p>
                  <p
                    className="text-gray-400 text-sm cursor-pointer"
                    onClick={() => {
                      window.open(
                        `https://wa.me/${data?.contact?.phone}`,
                        "_blank"
                      );
                    }}
                  >
                    {converToReadablePhoneNumber(data?.contact?.phone || "")}
                  </p>
                  <p
                    className="text-gray-400 text-sm cursor-pointer"
                    onClick={() => {
                      window.open(`mailto:${data?.contact?.email}`, "_blank");
                    }}
                  >
                    {data?.contact?.email}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">{data?.copyright?.text}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
