import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Ana Sayfa",
  type: "document",
  initialValue: {
    heroTitle: "Banyo, Isıtma ve Tesisat Ürünleri Tek Adreste.",
    heroSubtitle: "GPD, E.C.A. ve SEREL markalarının kaliteli ve güvenilir ürünlerini ER YAPI mağazamızda inceleyin.",
    heroCtaLabel: "Ürünleri İncele",
    categoriesTitle: "Ürün Gruplarımız",
    categoriesSubtitle: "İhtiyacınıza uygun ısıtma, banyo ve tesisat çözümleri.",
    productsTitle: "Öne Çıkan Ürünler",
    productsSubtitle: "GPD, E.C.A. ve SEREL'in öne çıkan banyo, kombi, klima ve armatür çözümleri.",
    brandsTitle: "Çalıştığımız Markalar",
    brandsSubtitle: "Sektörünün lider markaları GPD, E.C.A. ve SEREL yetkili satıcısı.",
    aboutTrustCards: [
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
    ],
  },
  groups: [
    { name: "hero", title: "Hero Bölümü" },
    { name: "about", title: "Mağaza & Hakkımızda" },
    { name: "categories", title: "Ürün Kategorileri" },
    { name: "products", title: "Öne Çıkan Ürünler" },
    { name: "brands", title: "Markalar Bölümü" },
    { name: "blog", title: "Blog Önizleme" },
    { name: "seo", title: "SEO Ayarları" },
  ],
  fields: [
    // Hero Group
    defineField({ name: "heroTitle", title: "Hero Başlık", type: "string", group: "hero", validation: (Rule) => Rule.required() }),
    defineField({ name: "heroSubtitle", title: "Hero Alt Başlık", type: "text", rows: 3, group: "hero" }),
    defineField({
      name: "heroImage",
      title: "Hero Görseli",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    defineField({ name: "heroCtaLabel", title: "Hero Buton Metni", type: "string", group: "hero" }),
    defineField({
      name: "heroCtaLink",
      title: "Hero Buton Linki",
      type: "string",
      group: "hero",
      initialValue: "/urunler",
      description: "Örn: /urunler veya /iletisim",
    }),

    // Categories Group
    defineField({ name: "categoriesTitle", title: "Kategori Bölüm Başlığı", type: "string", group: "categories", initialValue: "Ürün Gruplarımız" }),
    defineField({ name: "categoriesSubtitle", title: "Kategori Bölüm Alt Başlığı", type: "text", rows: 2, group: "categories" }),
    defineField({
      name: "featuredCategories",
      title: "Öne Çıkan Kategoriler",
      type: "array",
      group: "categories",
      of: [{ type: "reference", to: [{ type: "productCategory" }] }],
    }),

    // Products Group
    defineField({ name: "productsTitle", title: "Ürünler Bölüm Başlığı", type: "string", group: "products", initialValue: "Öne Çıkan Ürünler" }),
    defineField({ name: "productsSubtitle", title: "Ürünler Bölüm Alt Başlığı", type: "text", rows: 2, group: "products" }),
    defineField({
      name: "featuredProducts",
      title: "Öne Çıkan Ürünler Seçimi",
      description: "Ana sayfada vitrine çıkarılacak ürünleri seçin ve sıralayın.",
      type: "array",
      group: "products",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),

    // Brands Group
    defineField({ name: "brandsTitle", title: "Markalar Bölüm Başlığı", type: "string", group: "brands", initialValue: "Çalıştığımız Markalar" }),
    defineField({ name: "brandsSubtitle", title: "Markalar Bölüm Alt Başlığı", type: "text", rows: 2, group: "brands" }),
    defineField({
      name: "featuredBrands",
      title: "Gösterilecek Markalar",
      type: "array",
      group: "brands",
      of: [{ type: "reference", to: [{ type: "brand" }] }],
    }),

    // About Group
    defineField({ name: "aboutTitle", title: "Mağaza Bölüm Başlığı", type: "string", group: "about", initialValue: "ER YAPI Mağazamız" }),
    defineField({ name: "aboutSubtitle", title: "Mağaza Alt Başlığı", type: "text", rows: 2, group: "about" }),
    defineField({ name: "aboutText", title: "Mağaza Tanıtım Yazısı", type: "array", of: [{ type: "block" }], group: "about" }),
    defineField({
      name: "aboutTrustCards",
      title: "Güven Vurgu Kartları (3 Adet)",
      description: "Mağaza tanıtımının altında sergilenecek 3 adet vurgu kartı.",
      type: "array",
      group: "about",
      of: [
        {
          type: "object",
          name: "trustCard",
          title: "Güven Kartı",
          fields: [
            defineField({ name: "title", title: "Kart Başlığı", type: "string" }),
            defineField({ name: "desc", title: "Kart Açıklaması", type: "text", rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: "aboutImage",
      title: "Mağaza Görseli",
      type: "image",
      group: "about",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    defineField({ name: "aboutCtaLabel", title: "Buton Metni", type: "string", group: "about", initialValue: "Hakkımızda Detaylı Bilgi" }),
    defineField({ name: "aboutCtaLink", title: "Buton Linki", type: "string", group: "about", initialValue: "/hakkimizda" }),

    // Blog Preview Group
    defineField({ name: "blogTitle", title: "Blog Bölüm Başlığı", type: "string", group: "blog", initialValue: "Faydalı Bilgiler & Blog" }),
    defineField({ name: "blogSubtitle", title: "Blog Bölüm Alt Başlığı", type: "text", rows: 2, group: "blog" }),
    defineField({
      name: "featuredPosts",
      title: "Öne Çıkan Blog Yazıları",
      type: "array",
      group: "blog",
      of: [{ type: "reference", to: [{ type: "blogPost" }] }],
    }),

    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
