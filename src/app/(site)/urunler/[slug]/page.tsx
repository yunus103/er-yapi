import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { client, cachedFetch } from "@/sanity/lib/client";
import { productBySlugQuery, productSlugsQuery, productRelatedQuery } from "@/sanity/lib/queries";
import { buildMetadata, portableTextToPlainText } from "@/lib/seo";
import { SanityImage } from "@/components/ui/SanityImage";
import { RichText } from "@/components/ui/RichText";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { JsonLd, productJsonLd } from "@/components/seo/JsonLd";
import { Product } from "@/types";
import { RiPhoneLine, RiFileTextLine, RiCheckLine } from "react-icons/ri";

export async function generateStaticParams() {
  const products = await client.fetch<{ slug: string }[]>(productSlugsQuery);
  return products.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await client.fetch<Product>(productBySlugQuery, { slug });

  if (!product) return buildMetadata({ title: "Ürün Bulunamadı" });

  const description =
    product.shortDescription ||
    portableTextToPlainText(product.body) ||
    `${product.title} - ER YAPI Malatya showroom güvencesiyle.`;

  return buildMetadata({
    title: product.title,
    description,
    ogImage: product.mainImage,
    canonicalPath: `/urunler/${slug}`,
    pageSeo: product.seo,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await cachedFetch<Product>(
    productBySlugQuery,
    { slug },
    { next: { tags: [`product:detail:${slug}`] } }
  );

  if (!product) {
    notFound();
  }

  const relatedProducts = product.category?._id
    ? await cachedFetch<Product[]>(
        productRelatedQuery,
        { categoryId: product.category._id, currentProductId: product._id },
        { next: { tags: ["product:list"] } }
      )
    : [];

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Sol Kolon: Ürün Görseli & Galerisi */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border bg-muted/30">
              {product.mainImage ? (
                <SanityImage
                  image={product.mainImage}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Görsel Bulunmuyor
                </div>
              )}
            </div>

            {/* Galeri */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {product.gallery.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden border bg-muted/20">
                    <SanityImage image={img} fill sizes="25vw" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sağ Kolon: Ürün Detayları */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Marka ve Kategori Badge */}
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                {product.brand?.name && (
                  <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded">
                    {product.brand.name}
                  </span>
                )}
                {product.category?.title && (
                  <span className="bg-muted text-muted-foreground text-xs font-medium px-3 py-1 rounded">
                    {product.category.title}
                  </span>
                )}
                {product.productCode && (
                  <span className="text-xs text-muted-foreground font-mono">
                    Kod: {product.productCode}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                {product.title}
              </h1>

              {product.series && (
                <p className="text-sm text-muted-foreground mb-4">
                  Seri: <span className="font-semibold text-foreground">{product.series}</span>
                </p>
              )}

              {product.shortDescription && (
                <p className="text-base text-muted-foreground leading-relaxed mb-6 border-b pb-6">
                  {product.shortDescription}
                </p>
              )}

              {/* Fiyat/Stok Aksiyon Kutusu */}
              <div className="p-6 rounded-xl border bg-muted/40 space-y-4">
                <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                  <RiCheckLine className="text-primary size-5 shrink-0" />
                  <span>Mağaza Stok Durumu ve Fiyat Teklifi İçin İletişime Geçin</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="w-full sm:w-auto" render={<Link href="/iletisim" />}>
                    <RiPhoneLine className="mr-2" />
                    Fiyat & Stok Bilgisi Al
                  </Button>
                </div>
              </div>
            </div>

            {/* Dokümanlar */}
            {product.documents && product.documents.length > 0 && (
              <div className="border-t pt-6 space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                  Katalog & Teknik Dokümanlar
                </h3>
                <div className="space-y-2">
                  {product.documents.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.fileUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <RiFileTextLine />
                      {doc.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detaylı Açıklama & Teknik Özellikler */}
        <div className="mt-16 border-t pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {product.body && (
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-bold mb-6">Ürün Detayları</h2>
              <RichText value={product.body} />
            </div>
          )}

          {product.specifications && product.specifications.length > 0 && (
            <div className={product.body ? "lg:col-span-5" : "lg:col-span-12"}>
              <h2 className="text-2xl font-bold mb-6">Teknik Özellikler</h2>
              <div className="border rounded-xl overflow-hidden bg-card">
                <table className="w-full text-sm">
                  <tbody>
                    {product.specifications.map((spec, i) => (
                      <tr key={i} className="border-b last:border-b-0 odd:bg-muted/30">
                        <td className="px-4 py-3 font-semibold text-foreground w-1/2">{spec.key}</td>
                        <td className="px-4 py-3 text-muted-foreground w-1/2">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* İlgili Ürünler */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t pt-12">
            <h2 className="text-2xl font-bold mb-8">Benzer Ürünler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel: Product) => (
                <Link key={rel.slug.current} href={`/urunler/${rel.slug.current}`} className="group block">
                  <article className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-all">
                    <div className="relative aspect-[4/3] bg-muted/30 overflow-hidden">
                      {rel.mainImage && (
                        <SanityImage image={rel.mainImage} fill sizes="25vw" className="object-cover group-hover:scale-105 transition-transform" />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-base group-hover:text-primary transition-colors line-clamp-1">
                        {rel.title}
                      </h3>
                      {rel.brand?.name && (
                        <p className="text-xs text-muted-foreground mt-1">{rel.brand.name}</p>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
