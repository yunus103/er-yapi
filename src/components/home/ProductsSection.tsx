import Link from "next/link";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { RiArrowRightLine } from "react-icons/ri";

interface ProductsSectionProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
}

export function ProductsSection({
  title = "Öne Çıkan Ürünlerimiz",
  subtitle = "Mağazamızda sergilenen yüksek kaliteli banyo, ısıtma ve tesisat ürünlerinden seçkiler.",
  products = [],
}: ProductsSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <FadeIn className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground uppercase mb-3">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {subtitle}
              </p>
            )}
          </FadeIn>

          <FadeIn direction="left" className="shrink-0">
            <Button size="lg" variant="outline" className="h-13 px-7 text-base font-semibold border-border" render={<Link href="/urunler" />}>
              <span>Tüm Ürün Kataloğu</span>
              <RiArrowRightLine className="ml-2 size-4 text-primary" />
            </Button>
          </FadeIn>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link key={product._id || product.slug?.current} href={`/urunler/${product.slug?.current}`} className="group block">
              <article className="border rounded-2xl overflow-hidden bg-card hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                {/* Görsel Kutusu */}
                <div className="relative aspect-[1/1] bg-muted/20 border-b overflow-hidden flex items-center justify-center p-4">
                  {product.mainImage ? (
                    <SanityImage
                      image={product.mainImage}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      Görsel Bulunmuyor
                    </div>
                  )}

                  {/* Marka Rozeti */}
                  {product.brand?.name && (
                    <div className="absolute top-4 left-4 bg-background/95 backdrop-blur text-foreground text-sm font-bold px-3 py-1.5 rounded-lg border border-border shadow-xs">
                      {product.brand.name}
                    </div>
                  )}
                </div>

                {/* İçerik */}
                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    {product.category?.title && (
                      <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">
                        {product.category.title}
                      </p>
                    )}
                    <h3 className="font-bold text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {product.title}
                    </h3>
                    {product.productCode && (
                      <p className="text-sm font-mono text-muted-foreground mt-2">
                        Kod: <span className="font-semibold text-foreground">{product.productCode}</span>
                      </p>
                    )}
                    {product.shortDescription && (
                      <p className="text-base text-muted-foreground line-clamp-2 mt-3 leading-relaxed">
                        {product.shortDescription}
                      </p>
                    )}
                  </div>

                  {/* Alt Buton Alanı */}
                  <div className="pt-4 border-t border-border/60 flex items-center justify-between text-primary font-semibold text-base">
                    <span>Ürünü İncele & Stok Sor</span>
                    <RiArrowRightLine className="group-hover:translate-x-1.5 transition-transform size-5" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
