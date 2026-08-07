/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Global TypeScript interfaces for Sanity documents and models.
 * Ensures strict typing, autocomplete, and zero warnings in IDE.
 */

export interface SanityImage {
  asset: {
    _ref?: string;
    _id?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
  alt?: string;
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface SanitySlug {
  current: string;
  _type?: "slug";
}

export interface BlogCategory {
  _id: string;
  title: string;
  slug: SanitySlug;
}

export interface BlogPost {
  _id?: string;
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  publishedAt?: string;
  category?: BlogCategory;
  mainImage?: SanityImage;
  body?: any[];
  seoTags?: string[];
  seo?: SeoSettings;
}

export interface Brand {
  _id: string;
  name: string;
  slug: SanitySlug;
  logo?: SanityImage;
  description?: string;
  website?: string;
  order?: number;
  featured?: boolean;
}

export interface ProductCategory {
  _id: string;
  title: string;
  slug: SanitySlug;
  parent?: {
    _id: string;
    title: string;
    slug: SanitySlug;
  };
  description?: string;
  image?: SanityImage;
  order?: number;
  isActive?: boolean;
}

export interface ProductSpecItem {
  key: string;
  value: string;
}

export interface ProductDocItem {
  title: string;
  fileUrl?: string;
}

export interface Product {
  _id?: string;
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug: SanitySlug;
  brand?: Brand;
  category?: ProductCategory;
  productCode?: string;
  series?: string;
  shortDescription?: string;
  mainImage?: SanityImage;
  gallery?: SanityImage[];
  body?: any[];
  specifications?: ProductSpecItem[];
  documents?: ProductDocItem[];
  featured?: boolean;
  order?: number;
  seo?: SeoSettings;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  whatsappNumber?: string;
  mapIframe?: string;
}

export interface SiteSettings {
  siteName: string;
  siteTagline?: string;
  logo?: SanityImage;
  logoHeight?: number;
  favicon?: { asset: { url: string } };
  contactInfo?: ContactInfo;
  socialLinks?: SocialLink[];
  gaId?: string;
  gtmId?: string;
  googleSearchConsoleId?: string;
  defaultSeo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  defaultOgImage?: SanityImage;
}

export interface NavItem {
  label: string;
  href: string;
  openInNewTab?: boolean;
  subLinks?: NavItem[];
}

export interface Navigation {
  headerLinks?: NavItem[];
  footerLinks?: NavItem[];
}

export interface Service {
  _id?: string;
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug: SanitySlug;
  mainImage?: SanityImage;
  body?: any[];
  seo?: SeoSettings;
}

export interface Project {
  _id?: string;
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug: SanitySlug;
  mainImage?: SanityImage;
  body?: any[];
  seo?: SeoSettings;
}

export interface CtaLink {
  linkType: "internal" | "manual";
  manual?: string;
  internal?: {
    _type: string;
    slug?: string;
  };
}

export interface SeoSettings {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  shareTitle?: string;
  shareDescription?: string;
  shareGraphic?: SanityImage;
}

export interface BasePage {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: SanityImage;
  seo?: SeoSettings;
}

export interface AboutPage extends BasePage {
  pageTitle: string;
  pageSubtitle?: string;
  body?: any[];
  mainImage?: SanityImage;
}

export interface ContactPage extends BasePage {
  pageTitle: string;
  pageSubtitle?: string;
  formTitle?: string;
  successMessage?: string;
}

export interface InnerPageWithCta extends BasePage {
  pageTitle: string;
  pageSubtitle?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

export interface ProductsPage extends BasePage {
  pageTitle: string;
  pageSubtitle?: string;
  searchPlaceholder?: string;
  emptyStateMessage?: string;
  contactCtaTitle?: string;
  contactCtaDescription?: string;
  contactCtaButtonText?: string;
}

export type BlogPage = InnerPageWithCta;
export type ServicesPage = InnerPageWithCta;
export type ProjectsPage = InnerPageWithCta;

export interface HomePage {
  heroTitle: string;
  heroSubtitle?: string;
  heroImage?: SanityImage;
  heroCtaLabel?: string;
  heroCtaLink?: CtaLink;
  aboutTitle?: string;
  aboutSubtitle?: string;
  aboutText?: any[];
  aboutImage?: SanityImage;
  aboutCtaLabel?: string;
  aboutCtaLink?: string;
  categoriesTitle?: string;
  categoriesSubtitle?: string;
  featuredCategories?: ProductCategory[];
  productsTitle?: string;
  productsSubtitle?: string;
  featuredProducts?: Product[];
  brandsTitle?: string;
  brandsSubtitle?: string;
  featuredBrands?: Brand[];
  blogTitle?: string;
  blogSubtitle?: string;
  featuredPosts?: BlogPost[];
  seo?: SeoSettings;
}
