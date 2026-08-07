import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SanityImage as SanityImageType, CtaLink } from "@/types";
import { RiStore2Line, RiMapPinLine } from "react-icons/ri";

interface HeroSectionProps {
  data: {
    heroImage?: SanityImageType;
    heroTitle?: string;
    heroSubtitle?: string;
    heroCtaLabel?: string;
    heroCtaLink?: CtaLink;
  };
}

export function resolveLink(linkData?: CtaLink) {
  if (!linkData) return "/urunler";
  if (typeof linkData === "string") return linkData;
  if (linkData.linkType === "manual") return linkData.manual || "/urunler";
  
  const ref = linkData.internal;
  if (!ref || !ref._type) return "/urunler";
  
  switch (ref._type) {
    case "product": return `/urunler/${ref.slug}`;
    case "project": return `/urunler/${ref.slug}`;
    case "service": return `/hizmetler/${ref.slug}`;
    case "blogPost": return `/blog/${ref.slug}`;
    case "aboutPage": return `/hakkimizda`;
    case "contactPage": return `/iletisim`;
    default: return "/urunler";
  }
}

export function HeroSection({ data }: HeroSectionProps) {
  const hasImage = Boolean(data?.heroImage?.asset);

  return (
    <section className={`relative min-h-[70vh] md:min-h-[80vh] flex items-center ${!hasImage ? "bg-muted/40 border-b border-border" : ""}`}>
      {hasImage && (
        <div className="absolute inset-0 z-0">
          <SanityImage
            image={data.heroImage!}
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-3xl">
          <FadeIn direction="up" duration={0.6}>
            {/* Lokasyon & Güven Veren Rozet */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider mb-6 border ${
              hasImage ? "bg-white/10 text-white border-white/20" : "bg-card text-foreground border-border"
            }`}>
              <RiMapPinLine className="text-primary size-3.5" />
              <span>Tecde, Yeşilyurt / Malatya</span>
            </div>

            {/* Dev Başlık - Barlow Condensed */}
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 uppercase ${
              hasImage ? "text-white" : "text-foreground"
            }`}>
              {data?.heroTitle || "Banyo, Isıtma ve Tesisat Ürünleri Tek Adreste."}
            </h1>

            {/* Açıklama */}
            <p className={`text-lg md:text-xl font-normal leading-relaxed mb-8 max-w-2xl ${
              hasImage ? "text-white/80" : "text-muted-foreground"
            }`}>
              {data?.heroSubtitle || "GPD, E.C.A. ve SEREL markalarının kaliteli ve güvenilir ürünlerini ER YAPI showroomunda inceleyin."}
            </p>

            {/* Butonlar */}
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" render={<Link href={resolveLink(data?.heroCtaLink)} />}>
                <RiStore2Line className="mr-2" />
                {data?.heroCtaLabel || "Ürün Kataloğunu İncele"}
              </Button>
              <Button size="lg" variant="outline" render={<Link href="/iletisim" />}>
                İletişime Geçin
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
