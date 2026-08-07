import Link from "next/link";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaPinterest,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiMailLine, RiPhoneLine, RiMapPinLine, RiTimeLine, RiExternalLinkLine } from "react-icons/ri";
import { SanityImage } from "@/components/ui/SanityImage";

import { SiteSettings, Navigation } from "@/types";

type NavItem = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

type SocialLink = {
  platform: string;
  url: string;
};

const socialIconMap: Record<string, React.ElementType> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  twitter: FaXTwitter,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
};

function resolveHref(item: NavItem): string {
  return item.href || "#";
}

export function Footer({ settings, navigation }: { settings: SiteSettings; navigation: Navigation }) {
  const defaultFooterLinks: NavItem[] = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Ürünler", href: "/urunler" },
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "İletişim", href: "/iletisim" },
  ];
  const footerLinks: NavItem[] = (navigation?.footerLinks && navigation.footerLinks.length > 0)
    ? navigation.footerLinks
    : defaultFooterLinks;
  const socialLinks: SocialLink[] = (settings?.socialLinks || []).filter((s: SocialLink) => s.url);
  const contact = settings?.contactInfo;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card text-foreground">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Sütun 1: Logo & Mağaza Tanımı */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="relative flex items-center justify-start h-16 max-w-[280px]">
                {settings?.logo ? (
                  <SanityImage
                    image={settings.logo}
                    width={600}
                    height={160}
                    fit="max"
                    className="h-full w-auto object-contain object-left"
                  />
                ) : (
                  <span className="font-bold text-2xl tracking-tight leading-none text-foreground uppercase">
                    {settings?.siteName || "ER YAPI"}
                  </span>
                )}
              </div>
            </Link>

            <p className="text-base text-muted-foreground leading-relaxed">
              {settings?.siteTagline || "GPD, E.C.A. ve SEREL yetkili satıcı güvencesiyle Malatya Tecde'de banyo bataryaları, kombi, klima ve tesisat malzemelerinde kaliteli çözümler sunuyoruz."}
            </p>

            {/* Çalışma Saatleri */}
            <div className="p-4 rounded-xl border bg-muted/40 text-sm space-y-1.5 inline-block w-full">
              <p className="font-semibold text-foreground flex items-center gap-2">
                <RiTimeLine className="text-primary size-4" />
                <span>Çalışma Saatlerimiz</span>
              </p>
              <p className="text-xs md:text-sm text-muted-foreground pl-6">
                Hafta İçi & Cumartesi: 08:00 - 18:00 | Pazar: Kapalı
              </p>
            </div>
          </div>

          {/* Sütun 2: Hızlı Bağlantılar */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bold text-base uppercase tracking-wider text-foreground">Hızlı Bağlantılar</h4>
            <nav className="space-y-3">
              {footerLinks.map((item, i) => (
                <Link
                  key={i}
                  href={resolveHref(item)}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                  className="block text-base text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Sütun 3: Mağaza İletişim Bilgileri (Sanity siteSettings'den dinamik) */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="font-bold text-base uppercase tracking-wider text-foreground">Mağaza İletişim</h4>
            
            <div className="space-y-3 text-base">
              {contact?.address && (
                <div className="flex items-start gap-3 text-muted-foreground">
                  <RiMapPinLine className="shrink-0 text-primary size-5 mt-0.5" />
                  <div>
                    <p className="text-foreground font-semibold">ER YAPI Mağazamız</p>
                    <p className="text-sm md:text-base">{contact.address}</p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(contact.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs md:text-sm text-primary font-semibold hover:underline mt-1"
                    >
                      <span>Google Haritalarda Aç</span>
                      <RiExternalLinkLine className="size-3.5" />
                    </a>
                  </div>
                </div>
              )}

              {contact?.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  <RiPhoneLine className="shrink-0 text-primary size-5" />
                  <span>{contact.phone}</span>
                </a>
              )}

              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  <RiMailLine className="shrink-0 text-primary size-5" />
                  <span>{contact.email}</span>
                </a>
              )}
            </div>

            {/* Sosyal Medya */}
            {socialLinks.length > 0 && (
              <div className="pt-3 border-t">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Sosyal Medyada Biz</p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, i) => {
                    const Icon = socialIconMap[social.platform];
                    if (!Icon) return null;
                    return (
                      <a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.platform}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background text-muted-foreground hover:text-primary hover:border-primary transition-colors shadow-xs"
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Telif Barı (GPD/ECA/SEREL marka metin şeridi kaldırıldı) */}
        <div className="mt-16 border-t pt-8 flex items-center justify-between">
          <p className="text-sm md:text-base text-muted-foreground text-center md:text-left font-medium w-full">
            © {currentYear} {settings?.siteName || "ER YAPI"}. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
