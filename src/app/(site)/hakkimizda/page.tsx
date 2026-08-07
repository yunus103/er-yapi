import { Metadata } from "next";
import Link from "next/link";
import { cachedFetch } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { RichText } from "@/components/ui/RichText";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { AboutPage as AboutPageType } from "@/types";
import { RiShieldCheckLine, RiToolsLine, RiStore2Line, RiArrowRightLine } from "react-icons/ri";

export async function generateMetadata(): Promise<Metadata> {
  const data = await cachedFetch<AboutPageType>(aboutPageQuery, {}, { next: { tags: ["about"] } });
  return buildMetadata({
    title: data?.heroTitle || data?.pageTitle || "Hakkımızda",
    description: data?.heroSubtitle || data?.pageSubtitle || "ER YAPI banyo, ısıtma ve tesisat malzemelerinde GPD, E.C.A. ve SEREL güvencesini Malatya'da sunar.",
    canonicalPath: "/hakkimizda",
    pageSeo: data?.seo,
  });
}

export default async function AboutPage() {
  const data = await cachedFetch<AboutPageType>(aboutPageQuery, {}, { next: { tags: ["about"] } });

  const defaultTitle = "ER YAPI — Güven ve Kalitenin Adresi";
  const defaultSubtitle = "Banyo, ısıtma ve tesisat çözümlerinde lider markaları Malatya Tecde'deki showroomumuzda buluşturuyoruz.";

  const defaultBody = [
    {
      _type: "block",
      _key: "b1",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "s1",
          text: "ER YAPI olarak Malatya Tecde'deki mağazamızda GPD, E.C.A. ve SEREL gibi sektörün öncü markalarının ürünlerini kullanıcılarımızla buluşturuyoruz. Banyo bataryalarından ankastre duş sistemlerine, kombi ve radyatörlerden tesisat malzemelerine kadar geniş ürün yelpazemizle hem ev sahiplerine hem de usta ve profesyonellere güvenilir çözümler sunuyoruz."
        }
      ]
    },
    {
      _type: "block",
      _key: "b2",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "s2",
          text: "Mağazamızda sergilenen tüm ürünlerde malzeme kalitesi, doğru teknik bilgi ve satış sonrası destek temel önceliğimizdir. İhtiyacınıza uygun doğru ürünü seçmeniz için uzman kadromuzla Malatya showroomumuzda sizleri ağırlamaktan memnuniyet duyarız."
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-20">
      {/* Page Hero */}
      <PageHero
        title={data?.heroTitle || data?.pageTitle || "Hakkımızda"}
        subtitle={
          data?.heroSubtitle ||
          data?.pageSubtitle ||
          "Malatya Tecde'deki mağazamızda GPD, E.C.A. ve SEREL markalarının kaliteli banyo, ısıtma ve tesisat ürünlerini sergiliyoruz."
        }
        backgroundImage={data?.heroImage}
      />

      <div className="container mx-auto px-4">
        {/* Ana Hikaye & Görsel Alanı */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Sol Kolon: Metin İçeriği */}
          <div className="lg:col-span-7 space-y-6">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading text-foreground">
                {data?.pageTitle || defaultTitle}
              </h2>
              <p className="text-lg text-primary font-medium mt-3 leading-relaxed">
                {data?.pageSubtitle || defaultSubtitle}
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="prose prose-neutral max-w-none text-base text-muted-foreground leading-relaxed">
                <RichText value={data?.body || defaultBody} />
              </div>
            </FadeIn>
          </div>

          {/* Sağ Kolon: Mağaza / Showroom Görseli */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <FadeIn direction="left" delay={0.2}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border bg-card group">
                {data?.mainImage ? (
                  <SanityImage
                    image={data.mainImage}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted/40 p-8 flex flex-col justify-between">
                    <div>
                      <span className="text-sm font-bold uppercase tracking-wider text-primary font-heading">
                        Showroom Atmosferi
                      </span>
                      <h3 className="text-2xl font-bold font-heading text-foreground mt-2">
                        ER YAPI Malatya
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        Tecde mahallesindeki aydınlık ve düzenli mağazamızda GPD, E.C.A. ve SEREL teşhir ürünlerimizi yakından inceleyebilirsiniz.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-border/60">
                      <span className="text-sm font-semibold text-foreground">Tecde, Yeşilyurt / Malatya</span>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Kurumsal Hizmet Standartlarımız (Gerçek Değerler) */}
        <FadeIn className="pt-8 border-t border-border/60">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold font-heading text-foreground">
              Çalışma Anlayışımız
            </h3>
            <p className="text-base text-muted-foreground mt-2">
              Sadece ürün satmıyor, ihtiyacınıza en uygun malzeme ve teknik çözümü sağlıyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="p-6 rounded-2xl border bg-card space-y-3 shadow-xs hover:border-primary/30 transition-colors">
              <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <RiShieldCheckLine className="size-6" />
              </div>
              <h4 className="text-xl font-bold font-heading text-foreground">Orijinal Marka Güvencesi</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                GPD, E.C.A. ve SEREL yetkili bayisi olarak yalnızca orijinal ve üretici garantili ürünler sunuyoruz.
              </p>
            </div>

            <div className="p-6 rounded-2xl border bg-card space-y-3 shadow-xs hover:border-primary/30 transition-colors">
              <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <RiToolsLine className="size-6" />
              </div>
              <h4 className="text-xl font-bold font-heading text-foreground">Doğru Teknik Danışmanlık</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tesisat ölçüleri, montaj detayları ve ürün uyumluluğu konusunda uzman desteği sağlıyoruz.
              </p>
            </div>

            <div className="p-6 rounded-2xl border bg-card space-y-3 shadow-xs hover:border-primary/30 transition-colors">
              <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <RiStore2Line className="size-6" />
              </div>
              <h4 className="text-xl font-bold font-heading text-foreground">Canlı Showroom Teşhiri</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Malatya Tecde'deki mağazamızda armatür ve banyo gruplarını dokunarak ve canlı inceleyebilirsiniz.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Ürün Kataloğu CTA */}
        <FadeIn className="mt-16 md:mt-24 p-8 md:p-12 rounded-2xl bg-muted/40 border text-center max-w-4xl mx-auto shadow-sm">
          <h3 className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-4">
            Ürün Kataloğumuzu İnceleyin
          </h3>
          <p className="text-base text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            Kombi, klima, armatür, duş sistemleri ve tesisat ürünlerimizin detaylarını incelemek için kataloğumuzu ziyaret edebilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-12 px-7 text-base font-semibold" render={<Link href="/urunler" />}>
              <span>Ürün Kataloğuna Git</span>
              <RiArrowRightLine className="ml-2 size-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-7 text-base font-semibold" render={<Link href="/iletisim" />}>
              <span>İletişime Geçin</span>
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

