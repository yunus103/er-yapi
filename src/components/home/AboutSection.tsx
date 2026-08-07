/* eslint-disable @typescript-eslint/no-explicit-any */
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { RichText } from "@/components/ui/RichText";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SanityImage as SanityImageType } from "@/types";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  text?: any[];
  image?: SanityImageType;
  ctaLabel?: string;
  ctaLink?: string;
}

export function AboutSection({
  title,
  subtitle,
  text,
  image,
  ctaLabel,
  ctaLink,
}: AboutSectionProps) {
  const displayTitle = title || "ER YAPI Showroom";
  const displayCtaLabel = ctaLabel || "Hakkımızda";
  const displayCtaLink = ctaLink || "/hakkimizda";

  return (
    <section className="py-20 md:py-28 overflow-hidden bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Sol Kolon: Metinler */}
          <div className="lg:col-span-7 space-y-6">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground uppercase">
                {displayTitle}
              </h2>
              {subtitle && (
                <p className="text-lg text-muted-foreground mt-2 font-medium">
                  {subtitle}
                </p>
              )}
            </FadeIn>

            {text && text.length > 0 ? (
              <FadeIn delay={0.15}>
                <RichText value={text} className="text-muted-foreground" />
              </FadeIn>
            ) : (
              <FadeIn delay={0.15}>
                <p className="text-muted-foreground leading-relaxed">
                  Malatya Tecde'deki aydınlık mağazamızda GPD armatür ve duş sistemleri, E.C.A. kombi ve iklimlendirme çözümleri ile SEREL banyo ürünlerini yakından inceleyebilirsiniz. Uzman ekibimiz ve geniş ürün stokuyla projenize en uygun teknik çözümleri sunuyoruz.
                </p>
              </FadeIn>
            )}

            <FadeIn delay={0.25} className="pt-4">
              <Button size="lg" render={<Link href={displayCtaLink} />}>
                {displayCtaLabel}
              </Button>
            </FadeIn>
          </div>

          {/* Sağ Kolon: Görsel */}
          {image && (
            <div className="lg:col-span-5 relative">
              <FadeIn direction="left" delay={0.3} className="relative">
                <div className="relative aspect-[5/3] rounded-xl overflow-hidden shadow-lg border bg-card">
                  <SanityImage
                    image={image}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </FadeIn>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
