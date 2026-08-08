import Link from "next/link";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProductCategory } from "@/types";
import { RiArrowRightLine } from "react-icons/ri";

interface CategoriesSectionProps {
  title?: string;
  subtitle?: string;
  categories?: ProductCategory[];
}

export function CategoriesSection({
  title = "Ürün Gruplarımız",
  subtitle = "İhtiyacınıza uygun ısıtma, banyo ve tesisat çözümleri.",
  categories = [],
}: CategoriesSectionProps) {
  if (!categories || categories.length === 0) return null;

  const gridColsClass =
    categories.length === 1
      ? "grid-cols-1 max-w-md mx-auto"
      : categories.length === 2
      ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
      : categories.length === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="py-16 md:py-24 bg-muted/30 border-y border-border/50">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 font-heading text-foreground">{title}</h2>
          {subtitle && <p className="text-muted-foreground text-base md:text-lg">{subtitle}</p>}
        </FadeIn>

        <div className={`grid ${gridColsClass} gap-6 md:gap-8`}>
          {categories.map((category) => (
            <Link key={category._id || category.slug?.current} href={`/urunler?kategori=${category.slug?.current}`} className="group block">
              <div className="border rounded-2xl p-6 bg-card hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full flex flex-col justify-between hover:-translate-y-1">
                {category.image && (
                  /* Dikey ürün fotoğraflarının kesilmemesi için 1:1 kare oran ve contain kullanımı */
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-6 bg-muted/20 border flex items-center justify-center p-3">
                    <SanityImage
                      image={category.image}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain group-hover:scale-105 transition-transform duration-500 p-2"
                    />
                  </div>
                )}
                <div className="flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-xl md:text-2xl mb-2 font-heading text-foreground group-hover:text-primary transition-colors leading-tight">
                      {category.title}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center text-primary text-sm font-semibold group-hover:underline underline-offset-4 pt-2 border-t border-border/50">
                    <span>Kategoriyi İncele</span>
                    <RiArrowRightLine className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
