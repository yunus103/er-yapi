import { defineField, defineType } from "sanity";
import { turkishSlugify } from "../../lib/slugify";

export const productCategoryType = defineType({
  name: "productCategory",
  title: "Ürün Kategorisi",
  type: "document",
  initialValue: {
    order: 0,
    isActive: true,
  },
  fields: [
    defineField({ name: "title", title: "Kategori Adı", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", slugify: turkishSlugify },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Üst Kategori",
      type: "reference",
      to: [{ type: "productCategory" }],
      description: "Ana kategori ise boş bırakın, alt kategori ise ait olduğu üst kategoriyi seçin.",
    }),
    defineField({ name: "description", title: "Kullanıcıya Görünür Açıklama", type: "text", rows: 3 }),
    defineField({
      name: "image",
      title: "Kategori Görseli",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    defineField({ name: "order", title: "Sıralama Önceliği", type: "number", initialValue: 0 }),
    defineField({ name: "isActive", title: "Aktif", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "parent.title",
      media: "image",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle: subtitle ? `Üst Kategori: ${subtitle}` : "Ana Kategori",
        media,
      };
    },
  },
});
