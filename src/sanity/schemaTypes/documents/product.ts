import { defineField, defineType } from "sanity";
import { turkishSlugify } from "../../lib/slugify";

export const productType = defineType({
  name: "product",
  title: "Ürün",
  type: "document",
  initialValue: {
    featured: false,
    order: 0,
  },
  fields: [
    defineField({ name: "title", title: "Ürün Adı", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", slugify: turkishSlugify },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Marka",
      type: "reference",
      to: [{ type: "brand" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "reference",
      to: [{ type: "productCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "productCode", title: "Ürün / Stok Kodu", type: "string", description: "Örn: GPD-10123 veya ECA-KOM-01" }),
    defineField({ name: "series", title: "Seri / Koleksiyon", type: "string", description: "Örn: Solus Seri, Proteus Premix" }),
    defineField({ name: "shortDescription", title: "Kısa Açıklama", type: "text", rows: 3 }),
    defineField({
      name: "mainImage",
      title: "Ana Ürün Görseli",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Ürün Görsel Galerisi",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Detaylı Ürün Tanımı",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "specifications",
      title: "Teknik Özellikler",
      type: "array",
      of: [
        {
          type: "object",
          name: "specItem",
          title: "Özellik Satırı",
          fields: [
            defineField({ name: "key", title: "Özellik Adı", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "value", title: "Değer", type: "string", validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: "key", subtitle: "value" },
          },
        },
      ],
    }),
    defineField({
      name: "documents",
      title: "Katalog ve Dokümanlar",
      type: "array",
      of: [
        {
          type: "object",
          name: "docItem",
          title: "Doküman",
          fields: [
            defineField({ name: "title", title: "Doküman Başlığı", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "fileUrl", title: "Harici PDF/Doküman Bağlantısı", type: "url" }),
          ],
        },
      ],
    }),
    defineField({ name: "featured", title: "Öne Çıkan Ürün", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Sıralama Önceliği", type: "number", initialValue: 0 }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: {
      title: "title",
      brand: "brand.name",
      category: "category.title",
      media: "mainImage",
    },
    prepare(selection) {
      const { title, brand, category, media } = selection;
      const subtitle = [brand, category].filter(Boolean).join(" | ");
      return {
        title,
        subtitle: subtitle || "Marka & Kategori Seçilmedi",
        media,
      };
    },
  },
});
