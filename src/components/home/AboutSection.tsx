/* eslint-disable @typescript-eslint/no-explicit-any */
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { RichText } from "@/components/ui/RichText";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SanityImage as SanityImageType, AboutTrustCard } from "@/types";
import { RiShieldCheckLine, RiStackLine, RiCustomerService2Line, RiMapPinLine } from "react-icons/ri";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  text?: any[];
  trustCards?: AboutTrustCard[];
  image?: SanityImageType;
  ctaLabel?: string;
  ctaLink?: string;
}

export function AboutSection({
  title,
  text,
  trustCards,
  image,
  ctaLabel,
  ctaLink,
}: AboutSectionProps) {
  const displayTitle = title || "ER YAPI Mağazamız";
  const displayCtaLabel = ctaLabel || "Hakkımızda Detaylı Bilgi";
  const displayCtaLink = ctaLink || "/hakkimizda";

  const defaultTrustCards: AboutTrustCard[] = [
    {
      title: "Orijinal Marka Garantisi",
      desc: "GPD, E.C.A. ve SEREL markalarının %100 orijinal ve garantili ürünlerini sunuyoruz.",
    },
    {
      title: "Geniş Mağaza Stoku",
      desc: "İnşaat ve banyo yenileme projeleriniz için stoktan bekletmeden hızlı teslimat sağlıyoruz.",
    },
    {
      title: "Teknik Danışmanlık & Destek",
      desc: "Tesisat ve iklimlendirme projelerinizde doğru ürün seçimi için teknik ekibimizle yanınızdayız.",
    },
  ];

  const cardsToDisplay = trustCards && trustCards.length > 0 ? trustCards : defaultTrustCards;
  const iconsMap = [RiShieldCheckLine, RiStackLine, RiCustomerService2Line];

  return (
    <section className="py-20 md:py-28 overflow-hidden bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Sol Kolon: Kurumsal Anlatım & Vurgular */}
          <div className="lg:col-span-7 space-y-8">
            <FadeIn direction="up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase leading-tight">
                {displayTitle}
              </h2>
            </FadeIn>

            {text && text.length > 0 ? (
              <FadeIn delay={0.15}>
                <RichText value={text} className="text-muted-foreground text-base md:text-lg leading-relaxed" />
              </FadeIn>
            ) : (
              <FadeIn delay={0.15}>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Malatya Tecde'deki aydınlık mağazamızda armatür, banyo bataryaları, kombi, klima ve vitrifiye ürünlerini yerinde inceleyebilirsiniz. Uzman ekibimiz, projeniz için en doğru ve ekonomik çözümü belirlemenize yardımcı olur.
                </p>
              </FadeIn>
            )}

            {/* Sanity'den Dinamik Düzeltilebilir Güven Kartları */}
            <FadeIn delay={0.25} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {cardsToDisplay.map((item, idx) => {
                  const Icon = iconsMap[idx % iconsMap.length];
                  return (
                    <div key={idx} className="p-5 rounded-xl border bg-muted/30 flex flex-col gap-3">
                      <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <Icon className="size-6" />
                      </div>
                      <h4 className="font-bold text-base md:text-lg text-foreground leading-snug">{item.title}</h4>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </FadeIn>

            <FadeIn delay={0.3} className="pt-2">
              <Button size="lg" className="h-14 px-8 text-base md:text-lg font-semibold" render={<Link href={displayCtaLink} />}>
                {displayCtaLabel}
              </Button>
            </FadeIn>
          </div>

          {/* Sağ Kolon: Mağaza Fotoğrafı & Çerçeve */}
          {image && (
            <div className="lg:col-span-5 relative">
              <FadeIn direction="left" delay={0.3} className="relative">
                <div className="relative aspect-[5/3] rounded-2xl overflow-hidden shadow-2xl border border-border bg-card group">
                  <SanityImage
                    image={image}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Lokasyon Etiketi */}
                  <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-md p-4 rounded-xl border border-border/80 shadow-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <RiMapPinLine className="text-primary size-6" />
                      <div>
                        <p className="text-sm font-bold text-foreground">ER YAPI Mağazamız</p>
                        <p className="text-xs md:text-sm text-muted-foreground">Tecde, Yeşilyurt / Malatya</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
