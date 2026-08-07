"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import { Button } from "@/components/ui/button";
import {
  RiMenu3Line,
  RiCloseLine,
  RiArrowDownSLine,
  RiMapPinLine,
  RiPhoneLine,
  RiWhatsappLine,
} from "react-icons/ri";
import { cn } from "@/lib/utils";

import { SiteSettings, Navigation, NavItem } from "@/types";

function resolveHref(item: NavItem): string {
  return item.href || "#";
}

export function Header({ settings, navigation }: { settings: SiteSettings; navigation: Navigation }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const defaultLinks: NavItem[] = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Ürünler", href: "/urunler" },
    { label: "Hakkımızda", href: "/hakkimizda" },
  ];
  const links: NavItem[] = (navigation?.headerLinks && navigation.headerLinks.length > 0)
    ? navigation.headerLinks
    : defaultLinks;

  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  }, [pathname]);

  const isActive = (item: NavItem) => {
    const href = resolveHref(item);
    if (href === "/" && pathname !== "/") return false;
    return pathname.startsWith(href);
  };

  const contact = settings?.contactInfo;
  const phone = contact?.phone;
  const whatsapp = contact?.whatsappNumber;
  const address = contact?.address;

  return (
    <>
      {/* 1. Üst Bilgi Barı (Sayfa aşağı kaydırılınca doğal olarak yukarı kayıp kaybolur) */}
      {(address || phone || whatsapp) && (
        <div className="hidden lg:block bg-muted/60 border-b border-border/60 py-2.5 text-sm font-semibold text-foreground/80">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              {address && (
                <span className="inline-flex items-center gap-2">
                  <RiMapPinLine className="text-primary size-4" />
                  <span>{address}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-6">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <RiPhoneLine className="text-primary size-3.5" />
                  <span>{phone}</span>
                </a>
              )}
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                >
                  <RiWhatsappLine className="size-3.5" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Ana Sticky Header (Yalnızca bu kısım sabit kalır) */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-xs">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center group h-full">
            <div className="relative flex items-center justify-start transition-all duration-200 group-hover:scale-[1.01] active:scale-95 h-full py-3 max-w-[240px] sm:max-w-[320px] md:max-w-[420px]">
              {settings?.logo ? (
                <SanityImage
                  image={settings.logo}
                  width={600}
                  height={160}
                  fit="max"
                  className="h-full w-auto object-contain object-left"
                  priority
                />
              ) : (
                <span className="font-bold text-2xl tracking-tight leading-none text-foreground uppercase">
                  {settings?.siteName || "ER YAPI"}
                </span>
              )}
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((item, i) => (
              <DesktopNavItem key={i} item={item} active={isActive(item)} />
            ))}
          </nav>

          {/* Desktop Action */}
          <div className="hidden md:flex items-center gap-3">
            <Button size="lg" render={<Link href="/iletisim" />} className="h-11 px-6 text-base font-semibold">
              İletişim
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menüyü aç/kapat">
              {menuOpen ? <RiCloseLine size={26} /> : <RiMenu3Line size={26} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t md:hidden overflow-hidden bg-background"
            >
              <nav className="container mx-auto flex flex-col gap-3 px-4 py-6">
                {links.map((item, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <Link
                        href={resolveHref(item)}
                        className={cn(
                          "text-lg font-semibold py-2 transition-colors hover:text-primary uppercase tracking-wide",
                          isActive(item) ? "text-primary font-bold" : "text-foreground"
                        )}
                      >
                        {item.label}
                      </Link>
                    </div>
                  </div>
                ))}

                <div className="pt-4 mt-2 border-t flex flex-col gap-3">
                  <Button size="lg" render={<Link href="/iletisim" />} className="w-full h-12 text-base font-semibold">
                    İletişime Geçin
                  </Button>
                  {phone && (
                    <a
                      href={`tel:${phone}`}
                      className="flex items-center justify-center gap-2 text-base font-medium text-foreground py-2.5 border rounded-lg"
                    >
                      <RiPhoneLine className="text-primary size-5" />
                      <span>{phone}</span>
                    </a>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

function DesktopNavItem({ item, active }: { item: NavItem; active: boolean }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isSubActive = item.subLinks?.some(sub => pathname === resolveHref(sub));
  const reallyActive = active || isSubActive;

  if (!item.subLinks || item.subLinks.length === 0) {
    return (
      <Link
        href={resolveHref(item)}
        target={item.openInNewTab ? "_blank" : undefined}
        rel={item.openInNewTab ? "noopener noreferrer" : undefined}
        className={cn(
          "text-base font-medium uppercase tracking-wider transition-colors hover:text-primary py-2 border-b-2 border-transparent",
          reallyActive ? "text-primary font-semibold border-primary" : "text-foreground/80"
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={resolveHref(item)}
        className={cn(
          "flex items-center gap-1 text-base font-medium uppercase tracking-wider transition-colors hover:text-primary py-2 border-b-2 border-transparent",
          reallyActive ? "text-primary font-semibold border-primary" : "text-foreground/80"
        )}
      >
        {item.label}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <RiArrowDownSLine size={18} />
        </motion.span>
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full pt-2 min-w-[220px]"
          >
            <div className="bg-popover border rounded-xl shadow-xl p-2 overflow-hidden">
              {item.subLinks.map((sub, j) => {
                const subActive = pathname === resolveHref(sub);
                return (
                  <Link
                    key={j}
                    href={resolveHref(sub)}
                    target={sub.openInNewTab ? "_blank" : undefined}
                    rel={sub.openInNewTab ? "noopener noreferrer" : undefined}
                    className={cn(
                      "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors",
                      subActive ? "text-primary bg-primary/5" : "text-foreground/80"
                    )}
                  >
                    {sub.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
