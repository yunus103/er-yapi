import { defineField, defineType } from "sanity";
import { turkishSlugify } from "../../lib/slugify";

export const brandType = defineType({
  name: "brand",
  title: "Marka",
  type: "document",
  initialValue: {
    order: 0,
    featured: true,
  },
  fields: [
    defineField({ name: "name", title: "Marka Adı", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", slugify: turkishSlugify },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Marka Logosu",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    defineField({ name: "description", title: "Kısa Açıklama", type: "text", rows: 3 }),
    defineField({ name: "website", title: "Resmi Web Sitesi", type: "url" }),
    defineField({ name: "order", title: "Sıralama", type: "number", initialValue: 0 }),
    defineField({ name: "featured", title: "Ana Sayfada Göster", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
      subtitle: "website",
    },
  },
});
