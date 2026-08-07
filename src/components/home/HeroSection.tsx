import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SanityImage as SanityImageType, CtaLink } from "@/types";
import { RiStore2Line, RiPhoneLine } from "react-icons/ri";

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
    <section className={`relative min-h-[calc(100vh-140px)] md:min-h-[calc(100vh-100px)] flex items-center justify-center py-20 md:py-28 ${
      !hasImage ? "bg-muted/40 border-b border-border" : ""
    }`}>
      {/* Background Image & Overlay */}
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/60" />
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <FadeIn direction="up" duration={0.6}>
            {/* Dev Başlık - Barlow Condensed */}
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 uppercase leading-[1.08] ${
              hasImage ? "text-white drop-shadow-sm" : "text-foreground"
            }`}>
              {data?.heroTitle || "Banyo, Isıtma ve Tesisat Ürünleri Tek Adreste."}
            </h1>

            {/* Açıklama */}
            <p className={`text-lg sm:text-xl md:text-2xl font-normal leading-relaxed mb-10 max-w-3xl mx-auto ${
              hasImage ? "text-white/90" : "text-muted-foreground"
            }`}>
              {data?.heroSubtitle || "GPD, E.C.A. ve SEREL markalarının kaliteli ve güvenilir ürünlerini ER YAPI güvencesiyle yerinde inceleyin."}
            </p>

            {/* Butonlar - İkincil buton okunaklı ve yüksek kontrastlı */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="h-14 px-8 text-base md:text-lg font-semibold shadow-md"
                render={<Link href={resolveLink(data?.heroCtaLink)} />}
              >
                <RiStore2Line className="mr-2.5 size-5" />
                {data?.heroCtaLabel || "Ürün Kataloğunu İncele"}
              </Button>

              <Button
                size="lg"
                className={`h-14 px-8 text-base md:text-lg font-semibold shadow-md ${
                  hasImage
                    ? "bg-zinc-900 border border-zinc-700 text-white hover:bg-black hover:text-white"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                render={<Link href="/iletisim" />}
              >
                <RiPhoneLine className="mr-2.5 size-5 text-primary" />
                İletişime Geçin
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
