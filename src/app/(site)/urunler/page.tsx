import { Metadata } from "next";
import { cache } from "react";
import { client, cachedFetch } from "@/sanity/lib/client";
import {
  productsPageQuery,
  productListQuery,
  productCategoriesQuery,
  brandListQuery,
} from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductsPage, Product, ProductCategory, Brand } from "@/types";

const getProductsPageData = cache(
  (): Promise<ProductsPage> =>
    client.fetch<ProductsPage>(productsPageQuery, {}, { next: { tags: ["productsPage"] } })
);

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getProductsPageData();
  return buildMetadata({
    title: pageData?.heroTitle || pageData?.pageTitle || "Ürünler",
    description: pageData?.heroSubtitle || pageData?.pageSubtitle || "ER YAPI banyo, ısıtma, soğutma ve tesisat ürün kataloğu.",
    canonicalPath: "/urunler",
    pageSeo: pageData?.seo,
  });
}

export default async function ProductsCatalogPage() {
  const [products, categories, brands, pageData] = await Promise.all([
    cachedFetch<Product[]>(productListQuery, {}, { next: { tags: ["product:list"] } }),
    cachedFetch<ProductCategory[]>(productCategoriesQuery, {}, { next: { tags: ["product:categories"] } }),
    cachedFetch<Brand[]>(brandListQuery, {}, { next: { tags: ["product:categories"] } }),
    getProductsPageData(),
  ]);

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-16">
      {/* Page Hero */}
      <PageHero
        title={pageData?.heroTitle || pageData?.pageTitle || "Ürünler"}
        subtitle={
          pageData?.heroSubtitle ||
          pageData?.pageSubtitle ||
          "Isıtma, soğutma, banyo ve tesisat ürünlerini marka ve kategoriye göre inceleyin."
        }
        backgroundImage={pageData?.heroImage}
      />

      <div className="container mx-auto px-4">
        {/* Marka & Kategori Özet Barı */}
        {(categories?.length > 0 || brands?.length > 0) && (
          <FadeIn className="mb-10 p-6 rounded-xl border bg-muted/30">
            <div className="flex flex-wrap items-center justify-between gap-6">
              {brands?.length > 0 && (
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Markalar:</span>
                  {brands.map((brand) => (
                    <span
                      key={brand._id}
                      className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-background border text-foreground"
                    >
                      {brand.name}
                    </span>
                  ))}
                </div>
              )}
              {categories?.length > 0 && (
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Kategoriler:</span>
                  {categories.map((cat) => (
                    <span
                      key={cat._id}
                      className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground"
                    >
                      {cat.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
        )}

        {/* Ürün Listesi */}
        {products && products.length > 0 ? (
          <AnimateGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: Product) => (
              <Link key={product.slug?.current} href={`/urunler/${product.slug?.current}`} className="group block">
                <article className="border rounded-xl overflow-hidden bg-card hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                  {/* Görsel */}
                  <div className="relative aspect-[4/3] bg-muted/40 overflow-hidden">
                    {product.mainImage ? (
                      <SanityImage
                        image={product.mainImage}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                        Görsel Yok
                      </div>
                    )}
                    {product.brand?.name && (
                      <div className="absolute top-3 left-3 bg-background/90 backdrop-blur text-foreground text-xs font-semibold px-2.5 py-1 rounded border shadow-sm">
                        {product.brand.name}
                      </div>
                    )}
                  </div>

                  {/* Detaylar */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      {product.category?.title && (
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                          {product.category.title}
                        </p>
                      )}
                      <h2 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {product.title}
                      </h2>
                      {product.productCode && (
                        <p className="text-xs text-muted-foreground font-mono mb-3">
                          Kod: {product.productCode}
                        </p>
                      )}
                      {product.shortDescription && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {product.shortDescription}
                        </p>
                      )}
                    </div>
                    <div className="pt-4 border-t border-border/50">
                      <span className="text-primary font-semibold text-sm tracking-wider group-hover:underline underline-offset-4 flex items-center">
                        Ürünü İncele & Bilgi Al
                        <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </AnimateGroup>
        ) : (
          <FadeIn>
            <div className="text-center py-20 border rounded-xl bg-muted/20 px-4">
              <h3 className="text-xl font-bold mb-2">
                {pageData?.emptyStateMessage || "Ürünler Çok Yakında Eklenecek"}
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                GPD, E.C.A. ve SEREL ürünlerimizin güncel kataloğu hazırlanmaktadır. İhtiyacınız olan ürünler için doğrudan mağazamızla iletişime geçebilirsiniz.
              </p>
              <Button render={<Link href="/iletisim" />}>
                İletişime Geçin
              </Button>
            </div>
          </FadeIn>
        )}

        {/* CTA Section */}
        <FadeIn className="mt-16 md:mt-24 p-8 md:p-12 rounded-xl bg-surface border text-center max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {pageData?.contactCtaTitle || "Fiyat ve Stok Bilgisi İçin İletişime Geçin"}
          </h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            {pageData?.contactCtaDescription ||
              "Listelenen tüm ürünlerde güncel stok durumu, avantajlı fiyat teklifleri ve teknik bilgi almak için Malatya Tecde'deki mağazamızla iletişime geçebilirsiniz."}
          </p>
          <Button size="lg" render={<Link href="/iletisim" />}>
            {pageData?.contactCtaButtonText || "Fiyat & Stok Bilgisi Al"}
          </Button>
        </FadeIn>
      </div>
    </div>
  );
}
