import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import {
  homePageQuery,
  productFallbackQuery,
  productCategoriesQuery,
  brandListQuery,
  blogFallbackQuery,
} from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { BrandsSection } from "@/components/home/BrandsSection";
import { BlogSection } from "@/components/home/BlogSection";
import { ContactCtaSection } from "@/components/home/ContactCtaSection";
import { HomePage as HomePageType, Product, ProductCategory, Brand, BlogPost } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const data = await cachedFetch<HomePageType>(homePageQuery, {}, { next: { tags: ["home", "home:featured"] } });
  return buildMetadata({
    canonicalPath: "/",
    pageSeo: data?.seo,
  });
}

export default async function HomePage() {
  const data = await cachedFetch<HomePageType>(homePageQuery, {}, { next: { tags: ["home", "home:featured"] } });

  const needsFallbackProducts = !data?.featuredProducts || data.featuredProducts.length === 0;
  const needsCategories = !data?.featuredCategories || data.featuredCategories.length === 0;
  const needsBrands = !data?.featuredBrands || data.featuredBrands.length === 0;
  const needsFallbackPosts = !data?.featuredPosts || data.featuredPosts.length === 0;

  const [fallbackProducts, allCategories, allBrands, fallbackPosts] = await Promise.all([
    needsFallbackProducts
      ? cachedFetch<Product[]>(productFallbackQuery, {}, { next: { tags: ["product:list"] } })
      : Promise.resolve([]),
    needsCategories
      ? cachedFetch<ProductCategory[]>(productCategoriesQuery, {}, { next: { tags: ["product:categories"] } })
      : Promise.resolve([]),
    needsBrands
      ? cachedFetch<Brand[]>(brandListQuery, {}, { next: { tags: ["product:categories"] } })
      : Promise.resolve([]),
    needsFallbackPosts
      ? cachedFetch<BlogPost[]>(blogFallbackQuery, {}, { next: { tags: ["blog:list", "blog:categories"] } })
      : Promise.resolve([]),
  ]);

  const productsToDisplay = data?.featuredProducts && data.featuredProducts.length > 0
    ? data.featuredProducts
    : fallbackProducts;

  const categoriesToDisplay = data?.featuredCategories && data.featuredCategories.length > 0
    ? data.featuredCategories
    : allCategories;

  const brandsToDisplay = data?.featuredBrands && data.featuredBrands.length > 0
    ? data.featuredBrands
    : allBrands;

  const postsToDisplay = data?.featuredPosts && data.featuredPosts.length > 0
    ? data.featuredPosts
    : fallbackPosts;

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <HeroSection data={data} />

      {/* 2. Ürün Kategorileri */}
      <CategoriesSection
        title={data?.categoriesTitle}
        subtitle={data?.categoriesSubtitle}
        categories={categoriesToDisplay}
      />

      {/* 3. Öne Çıkan Ürünler */}
      <ProductsSection
        title={data?.productsTitle}
        subtitle={data?.productsSubtitle}
        products={productsToDisplay}
      />

      {/* 4. Markalar Bölümü (GPD, E.C.A., SEREL) */}
      <BrandsSection
        title={data?.brandsTitle}
        subtitle={data?.brandsSubtitle}
        brands={brandsToDisplay}
      />

      {/* 5. Showroom & Hakkımızda */}
      <AboutSection
        title={data?.aboutTitle}
        subtitle={data?.aboutSubtitle}
        text={data?.aboutText}
        image={data?.aboutImage}
        ctaLabel={data?.aboutCtaLabel}
        ctaLink={data?.aboutCtaLink}
      />

      {/* 6. İletişim & Stok/Fiyat CTA Panosu */}
      <ContactCtaSection />
    </div>
  );
}
