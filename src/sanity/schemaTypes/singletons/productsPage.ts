import { defineField, defineType } from "sanity";

export const productsPageType = defineType({
  name: "productsPage",
  title: "Ürünler Sayfası",
  type: "document",
  initialValue: {
    heroTitle: "Ürünler",
    heroSubtitle: "Isıtma, soğutma, banyo ve tesisat ürünlerini marka ve kategoriye göre inceleyin.",
    pageTitle: "Ürün Kataloğu",
    pageSubtitle: "GPD, E.C.A. ve SEREL ürünlerini ER YAPI showroom güvencesiyle inceleyin.",
    searchPlaceholder: "Ürün adı veya kodu ile arayın...",
    emptyStateMessage: "Aradığınız kriterlere uygun ürün bulunamadı.",
    contactCtaTitle: "Fiyat ve Stok Bilgisi İçin İletişime Geçin",
    contactCtaDescription: "Listelenen tüm ürünlerde güncel stok durumu, fiyat avantajları ve teknik bilgi almak için mağazamızla iletişime geçebilirsiniz.",
    contactCtaButtonText: "Fiyat & Stok Bilgisi Al",
  },
  groups: [
    { name: "hero", title: "Page Hero Bölümü" },
    { name: "content", title: "Sayfa İçeriği" },
    { name: "seo", title: "SEO Ayarları" },
  ],
  fields: [
    // Hero Group
    defineField({ name: "heroTitle", title: "Hero Başlık", type: "string", group: "hero", initialValue: "Ürünler" }),
    defineField({ name: "heroSubtitle", title: "Hero Alt Başlık", type: "text", rows: 2, group: "hero", initialValue: "Isıtma, soğutma, banyo ve tesisat ürünlerini marka ve kategoriye göre inceleyin." }),
    defineField({
      name: "heroImage",
      title: "Hero Arka Plan Görseli",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    // Content Group
    defineField({ name: "pageTitle", title: "Sayfa Başlığı", type: "string", group: "content", initialValue: "Ürün Kataloğu" }),
    defineField({ name: "pageSubtitle", title: "Alt Başlık / Açıklama", type: "text", rows: 3, group: "content" }),
    defineField({ name: "searchPlaceholder", title: "Arama Çubuğu İpucu", type: "string", group: "content", initialValue: "Ürün adı veya kodu ile arayın..." }),
    defineField({ name: "emptyStateMessage", title: "Sonuç Bulunamadı Mesajı", type: "string", group: "content", initialValue: "Aradığınız kriterlere uygun ürün bulunamadı." }),
    defineField({ name: "contactCtaTitle", title: "İletişim CTA Başlığı", type: "string", group: "content", initialValue: "Fiyat ve Stok Bilgisi İçin İletişime Geçin" }),
    defineField({ name: "contactCtaDescription", title: "İletişim CTA Açıklaması", type: "text", rows: 2, group: "content" }),
    defineField({ name: "contactCtaButtonText", title: "İletişim Buton Metni", type: "string", group: "content", initialValue: "Fiyat & Stok Bilgisi Al" }),
    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
