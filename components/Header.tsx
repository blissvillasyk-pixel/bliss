"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useData } from "@/service/data";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { name: "Beranda", href: "#hero" },
  { name: "Tentang Kami", href: "#about" },
  { name: "Properti Kami", href: "#listings" },
  { name: "Testimoni", href: "#testimonials" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, isLoading } = useData();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState<string>("hero");

  const ids = useMemo(
    () => NAV_ITEMS.map((i) => i.href.slice(1)), // ["hero","about","listings","testimonials"]
    []
  );

  const scrollTo = (href: string) => {
    setIsMenuOpen(false);
    const id = href.replace("#", "");
    if (!isHome) {
      // kalau bukan di beranda, arahkan ke anchor di home
      window.location.href = `/#${id}`;
      return;
    }
    const el =
      document.getElementById(id) ||
      document.getElementById(`section-${id}`) ||
      document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Highlight nav saat section masuk viewport (hanya di beranda)
  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pilih elemen paling atas yang sedang terlihat
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        const top = visible[0];
        if (top?.target) {
          const id = top.target.id.replace(/^section-/, "");
          setActiveSection(id);
        }
      },
      {
        // dorong garis “aktif” sedikit ke bawah agar UX enak
        root: null,
        rootMargin: "0px 0px -55% 0px",
        threshold: [0.25, 0.5, 0.75],
      }
    );

    // observe semua target section (dukung id dengan/ tanpa prefix "section-")
    ids.forEach((id) => {
      const el =
        document.getElementById(id) || document.getElementById(`section-${id}`);
      if (el) observer.observe(el);
    });

    // initial hash (kalau user buka /#about langsung)
    const hash = window.location.hash.slice(1);
    if (hash && ids.includes(hash)) setActiveSection(hash);

    return () => observer.disconnect();
  }, [ids, isHome]);

  if (isLoading || !data) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={data?.logo?.logo || "/img/logo.png"}
              alt={data?.logo?.alt || "Logo"}
              width={96}
              height={40}
              className="h-10 w-auto object-contain object-center"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => {
              const id = item.href.slice(1);
              const active = isHome && activeSection === id;
              return isHome ? (
                <button
                  key={item.name}
                  onClick={() => scrollTo(item.href)}
                  className={cn(
                    "py-2 font-medium transition-colors duration-200 focus-visible:focus cursor-pointer",
                    active
                      ? "text-primary-600"
                      : "text-gray-700 hover:text-primary-600"
                  )}
                >
                  {item.name}
                </button>
              ) : (
                <Link href={`/${item.href}`} key={item.name}>
                  <span className="py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 cursor-pointer">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <Button
                variant="outline"
                className="border-primary-600 text-primary-600 hover:bg-primary-50 hover:border-primary-700 hover:text-primary-700 font-medium px-4 lg:px-6 focus-visible:focus"
                size="sm"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>

            <Link
              href={`https://wa.me/${data?.contact?.phone.replace(/-/g, "")}`}
              target="_blank"
              prefetch={false}
            >
              <Button
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 lg:px-6 focus-visible:focus"
                size="sm"
              >
                Contact Us
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus-visible:focus"
              onClick={() => setIsMenuOpen((s) => !s)}
              aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <nav className="max-w-screen-xl mx-auto px-4 py-4 space-y-3">
              {NAV_ITEMS.map((item, index) => {
                const id = item.href.slice(1);
                const active = isHome && activeSection === id;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {isHome ? (
                      <button
                        onClick={() => scrollTo(item.href)}
                        className={cn(
                          "block py-2 font-medium transition-colors duration-200 cursor-pointer",
                          active
                            ? "text-primary-600"
                            : "text-gray-700 hover:text-primary-600"
                        )}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        href={`/${item.href}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 cursor-pointer">
                          {item.name}
                        </span>
                      </Link>
                    )}
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.1 }}
              >
                <Link
                  href="/admin"
                  className="block py-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4 inline mr-2" />
                  Login
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
