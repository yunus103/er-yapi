import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { ContactPage as ContactPageType, SiteSettings } from "@/types";
import {
  RiMapPinLine,
  RiPhoneLine,
  RiMailLine,
  RiWhatsappLine,
  RiTimeLine,
} from "react-icons/ri";

interface ContactQueryResult {
  page?: ContactPageType;
  settings?: SiteSettings;
}

function getMapSrc(mapIframe?: string): string {
  if (!mapIframe) {
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12591.246287957797!2d38.2568!3d38.3392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x407636e053b1b6c7%3A0x6b4f74d0a5e8c1b8!2sTecde%2C%2044090%20Ye%C5%9Filyurt%2FMalatya!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str";
  }
  const match = mapIframe.match(/src=["']([^"']+)["']/);
  if (match && match[1]) {
    return match[1];
  }
  if (mapIframe.startsWith("http")) {
    return mapIframe;
  }
  return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12591.246287957797!2d38.2568!3d38.3392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x407636e053b1b6c7%3A0x6b4f74d0a5e8c1b8!2sTecde%2C%2044090%20Ye%C5%9Filyurt%2FMalatya!5e0!3m2!1str!2str";
}

export async function generateMetadata(): Promise<Metadata> {
  const result = await cachedFetch<ContactQueryResult>(
    contactPageQuery,
    {},
    { next: { tags: ["contact", "siteSettings"] } }
  );
  const page = result?.page;
  return buildMetadata({
    title: page?.heroTitle || page?.pageTitle || "İletişim",
    description: page?.heroSubtitle || page?.pageSubtitle || "ER YAPI Malatya Tecde showroomu iletişim bilgileri, telefon, harita ve adres.",
    canonicalPath: "/iletisim",
    pageSeo: page?.seo,
  });
}

export default async function ContactPage() {
  const result = await cachedFetch<ContactQueryResult>(
    contactPageQuery,
    {},
    { next: { tags: ["contact", "siteSettings"] } }
  );

  const page = result?.page;
  const settings = result?.settings;
  const contact = settings?.contactInfo;

  const address = contact?.address?.trim();
  const phone = contact?.phone?.trim();
  const email = contact?.email?.trim();
  const whatsapp = contact?.whatsappNumber?.trim();
  const mapSrc = contact?.mapIframe?.trim() ? getMapSrc(contact.mapIframe) : null;

  const hasAnyContactInfo = address || phone || email || whatsapp;

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-20">
      {/* Page Hero */}
      <PageHero
        title={page?.heroTitle || page?.pageTitle || "İletişim"}
        subtitle={
          page?.heroSubtitle ||
          page?.pageSubtitle ||
          "Fiyat teklifi, stok bilgisi veya sorularınız için mağazamızla iletişime geçin."
        }
        backgroundImage={page?.heroImage}
      />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Sol Kolon: İletişim Bilgileri Kartları & Harita */}
          <div className="lg:col-span-5 space-y-6">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground">
                Mağaza Bilgileri
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mt-2 leading-relaxed">
                Malatya Tecde'deki mağazamızı ziyaret edebilir veya doğrudan bizimle iletişime geçebilirsiniz.
              </p>
            </FadeIn>

            {/* Bilgi Kartları */}
            {hasAnyContactInfo && (
              <FadeIn delay={0.1} className="space-y-4">
                {/* Adres */}
                {address && (
                  <div className="p-6 rounded-2xl border bg-card flex items-start gap-4 shadow-xs">
                    <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <RiMapPinLine className="size-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-heading text-foreground">Mağaza Adresi</h3>
                      <p className="text-base text-muted-foreground mt-1 leading-relaxed">{address}</p>
                    </div>
                  </div>
                )}

                {/* Telefon */}
                {phone && (
                  <a
                    href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                    className="p-6 rounded-2xl border bg-card flex items-start gap-4 shadow-xs hover:border-primary/40 transition-colors group block"
                  >
                    <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <RiPhoneLine className="size-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-heading text-foreground group-hover:text-primary transition-colors">
                        Telefon
                      </h3>
                      <p className="text-base md:text-lg font-semibold text-foreground mt-1">{phone}</p>
                    </div>
                  </a>
                )}


                {/* E-posta */}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="p-6 rounded-2xl border bg-card flex items-start gap-4 shadow-xs hover:border-primary/40 transition-colors group block"
                  >
                    <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <RiMailLine className="size-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-heading text-foreground group-hover:text-primary transition-colors">
                        E-posta
                      </h3>
                      <p className="text-base text-muted-foreground mt-1">{email}</p>
                    </div>
                  </a>
                )}

                {/* Çalışma Saatleri */}
                <div className="p-6 rounded-2xl border bg-card flex items-start gap-4 shadow-xs">
                  <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <RiTimeLine className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-heading text-foreground">Çalışma Saatleri</h3>
                    <p className="text-base text-muted-foreground mt-1">Pazartesi – Cumartesi: 08:00 – 18:00</p>
                    <p className="text-sm font-medium text-muted-foreground/80 mt-1">Pazar: Kapalı</p>
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Google Harita Embed - Yalnızca Sanity'de mapIframe dolu ise render edilir */}
            {mapSrc && (
              <FadeIn delay={0.2} className="pt-2">
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-foreground uppercase tracking-wider font-heading">
                    Haritada Mağazamız
                  </h3>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border shadow-sm bg-muted">
                    <iframe
                      src={mapSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="ER YAPI Malatya Mağaza Konumu"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </FadeIn>
            )}
          </div>

          {/* Sağ Kolon: İletişim Formu */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <FadeIn delay={0.15}>
              <ContactForm
                formTitle={page?.formTitle}
                successMessage={page?.successMessage}
              />
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

