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
import { JsonLd, productJsonLd } from "@/components/seo/JsonLd";
import { ProductGallery } from "@/components/products/ProductGallery";
import { Product } from "@/types";
import { RiPhoneLine, RiFileTextLine, RiCheckLine, RiArrowRightLine } from "react-icons/ri";

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

  const breadcrumbItems = [
    { label: "Ürünler", href: "/urunler" },
    ...(product.category?.title
      ? [{ label: product.category.title, href: `/urunler` }]
      : []),
    { label: product.title, href: `/urunler/${slug}`, active: true },
  ];

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <div className="container mx-auto px-4 py-8 md:py-12 pb-20">
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sol Kolon: Ürün Görseli & Galerisi (Resimler Kesilmez) */}
          <div className="lg:col-span-6">
            <ProductGallery
              mainImage={product.mainImage}
              gallery={product.gallery}
              title={product.title}
            />
          </div>

          {/* Sağ Kolon: Ürün Detayları & Mağaza İletişim CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Marka ve Kategori Badge */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {product.brand?.name && (
                  <span className="bg-primary/10 text-primary text-sm font-bold px-3.5 py-1.5 rounded-xl border border-primary/20">
                    {product.brand.name}
                  </span>
                )}
                {product.category?.title && (
                  <span className="bg-muted text-muted-foreground text-sm font-semibold px-3.5 py-1.5 rounded-xl">
                    {product.category.title}
                  </span>
                )}
                {product.productCode && (
                  <span className="text-sm text-muted-foreground font-mono bg-background px-3 py-1.5 rounded-xl border">
                    Kod: {product.productCode}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 font-heading text-foreground">
                {product.title}
              </h1>

              {product.series && (
                <p className="text-base text-muted-foreground mb-4">
                  Seri: <span className="font-semibold text-foreground">{product.series}</span>
                </p>
              )}

              {product.shortDescription && (
                <p className="text-base text-muted-foreground leading-relaxed mb-6 border-b border-border/60 pb-6">
                  {product.shortDescription}
                </p>
              )}

              {/* Fiyat/Stok Aksiyon Kutusu */}
              <div className="p-6 rounded-2xl border bg-muted/30 space-y-4 shadow-sm">
                <div className="flex items-center gap-3 text-base text-foreground font-medium">
                  <RiCheckLine className="text-primary size-6 shrink-0" />
                  <span>Stok durumu ve özel fiyat teklifi için mağazamızla iletişime geçin.</span>
                </div>
                <div>
                  <Button size="lg" className="w-full sm:w-auto h-12 px-6 text-base font-semibold" render={<Link href="/iletisim" />}>
                    <RiPhoneLine className="mr-2.5 size-5" />
                    Fiyat & Stok Bilgisi Al
                  </Button>
                </div>
              </div>
            </div>

            {/* Katalog & Dokümanlar */}
            {product.documents && product.documents.length > 0 && (
              <div className="border-t border-border/60 pt-6 space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground font-heading">
                  Katalog & Teknik Dokümanlar
                </h3>
                <div className="space-y-2">
                  {product.documents.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.fileUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-base text-primary font-medium hover:underline p-3 rounded-xl bg-card border hover:bg-muted/50 transition-colors"
                    >
                      <RiFileTextLine className="size-5 shrink-0" />
                      <span>{doc.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detaylı Açıklama & Teknik Özellikler */}
        {(product.body || (product.specifications && product.specifications.length > 0)) && (
          <div className="mt-16 border-t border-border/60 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {product.body && (
              <div className={product.specifications && product.specifications.length > 0 ? "lg:col-span-7" : "lg:col-span-12"}>
                <h2 className="text-2xl font-bold mb-6 font-heading text-foreground">Ürün Detayları</h2>
                <div className="prose prose-neutral max-w-none">
                  <RichText value={product.body} />
                </div>
              </div>
            )}

            {product.specifications && product.specifications.length > 0 && (
              <div className={product.body ? "lg:col-span-5" : "lg:col-span-12"}>
                <h2 className="text-2xl font-bold mb-6 font-heading text-foreground">Teknik Özellikler</h2>
                <div className="border rounded-2xl overflow-hidden bg-card shadow-sm">
                  <table className="w-full text-base">
                    <tbody>
                      {product.specifications.map((spec, i) => (
                        <tr key={i} className="border-b last:border-b-0 odd:bg-muted/20">
                          <td className="px-4 py-3.5 font-semibold text-foreground w-1/2 border-r">{spec.key}</td>
                          <td className="px-4 py-3.5 text-muted-foreground w-1/2">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Benzer Ürünler (Resimler Kesilmeyecek) */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-border/60 pt-12 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-heading text-foreground">Benzer Ürünler</h2>
              <Link href="/urunler" className="text-base font-semibold text-primary hover:underline flex items-center gap-1">
                Tüm Ürünler <RiArrowRightLine />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel: Product) => (
                <Link key={rel.slug.current} href={`/urunler/${rel.slug.current}`} className="group block">
                  <article className="border rounded-2xl overflow-hidden bg-card hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                    {/* Görsel Kutusu: Oran 1/1 (aspect-square) ve Resimler kesilmeyecek */}
                    <div className="relative aspect-square bg-gradient-to-b from-muted/30 to-muted/10 overflow-hidden border-b flex items-center justify-center p-3">
                      {rel.mainImage ? (
                        <SanityImage
                          image={rel.mainImage}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-sm text-muted-foreground">Görsel Yok</div>
                      )}
                      {rel.brand?.name && (
                        <span className="absolute top-3 left-3 bg-background/95 text-foreground text-xs font-bold px-2.5 py-1 rounded-lg border shadow-xs">
                          {rel.brand.name}
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        {rel.category?.title && (
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                            {rel.category.title}
                          </span>
                        )}
                        <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {rel.title}
                        </h3>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border/50 text-sm font-semibold text-primary flex items-center justify-between">
                        <span>İncele</span>
                        <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
                      </div>
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

