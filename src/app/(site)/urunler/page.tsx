import { Metadata } from "next";
import { cache, Suspense } from "react";
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
import { ProductCatalogGrid } from "@/components/products/ProductCatalogGrid";
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
        {/* İstemci Tarafı Filtrelenebilir Ürün Kataloğu */}
        <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Katalog Yükleniyor...</div>}>
          <ProductCatalogGrid
            products={products || []}
            categories={categories || []}
            brands={brands || []}
            emptyStateMessage={pageData?.emptyStateMessage}
          />
        </Suspense>

        {/* CTA Section */}
        <FadeIn className="mt-16 md:mt-24 p-8 md:p-12 rounded-2xl bg-muted/40 border text-center max-w-4xl mx-auto shadow-sm">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 font-heading text-foreground">
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

