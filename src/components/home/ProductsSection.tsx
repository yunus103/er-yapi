import Link from "next/link";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";

interface ProductsSectionProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
}

export function ProductsSection({
  title = "Öne Çıkan Ürünler",
  subtitle = "GPD, E.C.A. ve SEREL'in kalitesini ER YAPI showroom güvencesiyle keşfedin.",
  products = [],
}: ProductsSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{title}</h2>
            {subtitle && <p className="text-muted-foreground text-base md:text-lg">{subtitle}</p>}
          </div>
          <Button variant="outline" render={<Link href="/urunler" />}>
            Tüm Ürünleri Gör →
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link key={product._id || product.slug?.current} href={`/urunler/${product.slug?.current}`} className="group block">
              <article className="border rounded-xl overflow-hidden bg-card hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                <div className="relative aspect-[1/1] bg-muted/40 overflow-hidden">
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
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    {product.category?.title && (
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        {product.category.title}
                      </p>
                    )}
                    <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    {product.productCode && (
                      <p className="text-xs text-muted-foreground font-mono mb-3">
                        Kod: {product.productCode}
                      </p>
                    )}
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <span className="text-primary font-semibold text-sm tracking-wider flex items-center group-hover:underline underline-offset-4">
                      İncele & Bilgi Al
                      <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </span>
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
