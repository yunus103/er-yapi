"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { Button } from "@/components/ui/button";
import { Product, ProductCategory, Brand } from "@/types";
import { RiSearchLine, RiCloseLine, RiFilter3Line, RiArrowRightLine } from "react-icons/ri";

interface ProductCatalogGridProps {
  products: Product[];
  categories: ProductCategory[];
  brands: Brand[];
  emptyStateMessage?: string;
}

export function ProductCatalogGrid({
  products = [],
  categories = [],
  brands = [],
  emptyStateMessage = "Ürünler Çok Yakında Eklenecek",
}: ProductCatalogGridProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrandSlug, setSelectedBrandSlug] = useState<string | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);

  // URL'deki query parametrelerini (kategori & marka) oku ve filtre durumuna eşitle
  useEffect(() => {
    const kategoriParam = searchParams.get("kategori");
    const markaParam = searchParams.get("marka");

    if (kategoriParam) {
      setSelectedCategorySlug(kategoriParam);
    }
    if (markaParam) {
      setSelectedBrandSlug(markaParam);
    }
  }, [searchParams]);

  // URL query parametresini güncelleyen yardımcı fonksiyon
  const updateUrlParams = (key: "kategori" | "marka", value: string | null) => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  };

  const handleSelectBrand = (slug: string | null) => {
    setSelectedBrandSlug(slug);
    updateUrlParams("marka", slug);
  };

  const handleSelectCategory = (slug: string | null) => {
    setSelectedCategorySlug(slug);
    updateUrlParams("kategori", slug);
  };

  // Filtreleme mantığı
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Arama sorgusu (Ürün adı veya Ürün kodu)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLocaleLowerCase("tr-TR");
        const titleMatch = product.title?.toLocaleLowerCase("tr-TR").includes(query);
        const codeMatch = product.productCode?.toLocaleLowerCase("tr-TR").includes(query);
        const seriesMatch = product.series?.toLocaleLowerCase("tr-TR").includes(query);
        if (!titleMatch && !codeMatch && !seriesMatch) return false;
      }

      // 2. Marka filtresi
      if (selectedBrandSlug) {
        if (product.brand?.slug?.current !== selectedBrandSlug) return false;
      }

      // 3. Kategori filtresi
      if (selectedCategorySlug) {
        const productCatSlug = product.category?.slug?.current;
        const parentCatSlug = product.category?.parent?.slug?.current;
        if (productCatSlug !== selectedCategorySlug && parentCatSlug !== selectedCategorySlug) {
          return false;
        }
      }

      return true;
    });
  }, [products, searchQuery, selectedBrandSlug, selectedCategorySlug]);

  const hasActiveFilters = searchQuery.trim() !== "" || selectedBrandSlug !== null || selectedCategorySlug !== null;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedBrandSlug(null);
    setSelectedCategorySlug(null);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  return (
    <div className="space-y-8">
      {/* İstemci Tarafı Filtreleme ve Arama Paneli */}
      <FadeIn className="rounded-2xl border bg-card/60 p-5 md:p-6 shadow-sm backdrop-blur-sm space-y-6">
        {/* Üst Bar: Arama ve İstatistik */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ürün adı, serisi veya ürün kodu arayın..."
              className="w-full pl-11 pr-10 py-2.5 bg-background border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                title="Aramayı Temizle"
              >
                <RiCloseLine className="size-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 text-sm text-muted-foreground font-medium">
            <span className="bg-muted px-3.5 py-1.5 rounded-lg border">
              Toplam <strong className="text-foreground font-semibold">{filteredProducts.length}</strong> ürün
            </span>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-primary hover:underline flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RiCloseLine className="size-4" />
                Filtreleri Temizle
              </button>
            )}
          </div>
        </div>

        {/* Alt Bar: Markalar ve Kategoriler */}
        <div className="space-y-4 pt-4 border-t border-border/50">
          {/* Marka Butonları */}
          {brands.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm uppercase tracking-wider font-bold text-muted-foreground mr-1 flex items-center gap-1">
                <RiFilter3Line className="size-4" /> Marka:
              </span>
              <button
                onClick={() => handleSelectBrand(null)}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  selectedBrandSlug === null
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background border text-foreground hover:bg-muted"
                }`}
              >
                Tüm Markalar
              </button>
              {brands.map((brand) => {
                const isSelected = selectedBrandSlug === brand.slug?.current;
                return (
                  <button
                    key={brand._id}
                    onClick={() => handleSelectBrand(isSelected ? null : (brand.slug?.current || null))}
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-background border text-foreground hover:bg-muted"
                    }`}
                  >
                    {brand.name}
                  </button>
                );
              })}
            </div>
          )}

          {/* Kategori Butonları */}
          {categories.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm uppercase tracking-wider font-bold text-muted-foreground mr-1">
                Kategori:
              </span>
              <button
                onClick={() => handleSelectCategory(null)}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  selectedCategorySlug === null
                    ? "bg-foreground text-background shadow-sm"
                    : "bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                Tüm Kategoriler
              </button>
              {categories.map((cat) => {
                const isSelected = selectedCategorySlug === cat.slug?.current;
                return (
                  <button
                    key={cat._id}
                    onClick={() => handleSelectCategory(isSelected ? null : (cat.slug?.current || null))}
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "bg-foreground text-background shadow-sm"
                        : "bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {cat.title}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </FadeIn>

      {/* Ürün Listesi VEYA Boş Durum */}
      {filteredProducts.length > 0 ? (
        <AnimateGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product: Product) => (
            <Link
              key={product.slug?.current || product._id}
              href={`/urunler/${product.slug?.current}`}
              className="group block"
            >
              <article className="border rounded-2xl overflow-hidden bg-card hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                {/* Görsel Kutusu: Oran 1/1 (aspect-square) ve Resimler KESİLMEYECEK (object-contain p-4) */}
                <div className="relative aspect-square bg-gradient-to-b from-muted/30 to-muted/10 overflow-hidden border-b flex items-center justify-center p-4">
                  {product.mainImage ? (
                    <SanityImage
                      image={product.mainImage}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm font-medium">
                      Görsel Yok
                    </div>
                  )}

                  {/* Marka Badge */}
                  {product.brand?.name && (
                    <div className="absolute top-3 left-3 bg-background/95 backdrop-blur text-foreground text-sm font-bold px-3 py-1.5 rounded-lg border shadow-sm tracking-wide">
                      {product.brand.name}
                    </div>
                  )}
                </div>

                {/* Ürün Detayları */}
                <div className="p-5 md:p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    {product.category?.title && (
                      <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                        {product.category.title}
                      </span>
                    )}
                    <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {product.title}
                    </h2>
                    {product.series && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Seri: <span className="font-semibold text-foreground">{product.series}</span>
                      </p>
                    )}
                    {product.productCode && (
                      <p className="text-sm text-muted-foreground font-mono mt-1">
                        Kod: {product.productCode}
                      </p>
                    )}
                    {product.shortDescription && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-3 leading-relaxed">
                        {product.shortDescription}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-border/60">
                    <span className="text-primary font-semibold text-sm tracking-wider group-hover:underline underline-offset-4 flex items-center">
                      Ürünü İncele & Bilgi Al
                      <RiArrowRightLine className="ml-1.5 size-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </AnimateGroup>
      ) : hasActiveFilters ? (
        /* Filtre Sonucu Boş Durumu */
        <FadeIn>
          <div className="text-center py-16 border rounded-2xl bg-card p-8 max-w-lg mx-auto space-y-4 shadow-sm">
            <h3 className="text-xl font-bold text-foreground">Aramanıza Uygun Ürün Bulunamadı</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Seçtiğiniz filtreler veya arama terimi ile eşleşen ürün kalmadı. Filtreleri sıfırlayarak tüm kataloğumuzu inceleyebilirsiniz.
            </p>
            <Button onClick={handleResetFilters} variant="outline" className="mt-2">
              Filtreleri Sıfırla
            </Button>
          </div>
        </FadeIn>
      ) : (
        /* Sanity Ürün Yoksa Boş Durum */
        <FadeIn>
          <div className="text-center py-20 border rounded-2xl bg-muted/20 px-6 max-w-xl mx-auto space-y-4">
            <h3 className="text-2xl font-bold text-foreground font-heading">
              {emptyStateMessage}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              GPD, E.C.A. ve SEREL ürünlerimizin güncel kataloğu hazırlanmaktadır. İhtiyacınız olan ürünler için doğrudan Malatya showroomumuzla iletişime geçebilirsiniz.
            </p>
            <Button render={<Link href="/iletisim" />}>
              İletişime Geçin
            </Button>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
