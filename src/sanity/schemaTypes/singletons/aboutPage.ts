import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "Hakkımızda Sayfası",
  type: "document",
  initialValue: {
    heroTitle: "Hakkımızda",
    heroSubtitle: "Malatya Tecde'deki mağazamızda GPD, E.C.A. ve SEREL markalarının kaliteli banyo, ısıtma ve tesisat ürünlerini sergiliyor, malzeme uzmanlığıyla hizmet veriyoruz.",
    pageTitle: "ER YAPI — Güven ve Kalitenin Adresi",
    pageSubtitle: "Banyo, ısıtma ve tesisat çözümlerinde lider markaları tek çatı altında buluşturuyoruz.",
    body: [
      {
        _type: "block",
        _key: "b1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "ER YAPI olarak Malatya Tecde'deki showroomumuzda GPD, E.C.A. ve SEREL gibi sektörün öncü markalarının ürünlerini kullanıcılarımızla buluşturuyoruz. Banyo armatürlerinden duş sistemlerine, kombi ve radyatörlerden tesisat malzemelerine kadar geniş ürün yelpazemizle hem ev sahiplerine hem de sektör profesyonellerine güvenilir çözümler sunuyoruz."
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
            text: "Mağazamızda sergilenen tüm ürünlerde malzeme kalitesi, doğru teknik bilgi ve satış sonrası müşteri memnuniyeti temel önceliğimizdir. İhtiyacınıza uygun doğru ürünü seçmeniz için uzman kadromuzla mağazamızda sizleri ağırlamaktan memnuniyet duyarız."
          }
        ]
      }
    ]
  },
  groups: [
    { name: "hero", title: "Page Hero Bölümü" },
    { name: "content", title: "Sayfa İçeriği" },
    { name: "seo", title: "SEO Ayarları" },
  ],
  fields: [
    // Page Hero Group
    defineField({ name: "heroTitle", title: "Hero Başlık", type: "string", group: "hero", description: "Sayfa üst kısmında duracak ana başlık. Boş bırakılırsa Sayfa Başlığı kullanılır." }),
    defineField({ name: "heroSubtitle", title: "Hero Alt Başlık / Kısa Açıklama", type: "text", rows: 2, group: "hero", description: "Sayfa üst kısmında duracak kısa açıklama yazısı." }),
    defineField({
      name: "heroImage",
      title: "Hero Arka Plan Görseli",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
      description: "Hero arka plan resmi. Yüklenmezse şık bir degrade renk arka planı kullanılır."
    }),
    // Content Group
    defineField({ name: "pageTitle", title: "Sayfa Başlığı", type: "string", group: "content", validation: (Rule) => Rule.required() }),
    defineField({ name: "pageSubtitle", title: "Giriş Alt Başlığı", type: "text", rows: 2, group: "content" }),
    defineField({ name: "body", title: "Detaylı İçerik", type: "array", of: [{ type: "block" }], group: "content" }),
    defineField({
      name: "mainImage",
      title: "Ana Görsel (Yandaki Resim)",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
    }),
    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
