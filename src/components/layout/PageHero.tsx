import Image from "next/image";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { SanityImage as SanityImageType } from "@/types";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: SanityImageType;
  breadcrumbItems?: BreadcrumbItem[];
  className?: string;
}

export function PageHero({
  title,
  subtitle,
  backgroundImage,
  breadcrumbItems,
  className = "",
}: PageHeroProps) {
  const hasSanityBg = !!backgroundImage?.asset;

  return (
    <section className={`relative overflow-hidden py-20 md:py-28 bg-slate-950 text-white ${className}`}>
      {/* Arka Plan Görseli & Şık Degrade Karartma Katmanı */}
      <div className="absolute inset-0 z-0">
        {hasSanityBg ? (
          <SanityImage
            image={backgroundImage!}
            fill
            sizes="100vw"
            quality={85}
            className="object-cover"
            priority
          />
        ) : (
          <Image
            src="/images/hero-bg-default.png"
            alt="ER YAPI Arka Plan"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover object-center"
            priority
          />
        )}
        {/* Karartma ve yumuşak degrade katmanı — metinlerin mükemmel okunmasını sağlar */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-950/60 backdrop-blur-[1px]" />
      </div>

      {/* İçerik */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl">
          <FadeIn direction="up" duration={0.6}>
            {/* Breadcrumb Bağlantıları */}
            <Breadcrumbs
              items={breadcrumbItems}
              className="mb-6 text-white/70 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white font-medium"
            />

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 font-heading text-white drop-shadow-sm leading-tight">
              {title}
            </h1>

            {subtitle && (
              <p className="text-lg md:text-xl font-normal leading-relaxed text-white/85 max-w-2xl drop-shadow-xs">
                {subtitle}
              </p>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
