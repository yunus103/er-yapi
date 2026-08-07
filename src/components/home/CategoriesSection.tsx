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

  return (
    <section className="py-16 md:py-24 bg-muted/30 border-y border-border/50">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{title}</h2>
          {subtitle && <p className="text-muted-foreground text-base md:text-lg">{subtitle}</p>}
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category._id || category.slug?.current} href={`/urunler?kategori=${category.slug?.current}`} className="group block">
              <div className="border rounded-xl p-6 md:p-8 bg-card hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between hover:-translate-y-1">
                {category.image && (
                  /* Dikey ürün fotoğraflarının (kombi, batarya, duş seti vb.) kesilmemesi için dikey oran ve contain kullanımı */
                  <div className="relative aspect-[1/1] rounded-lg overflow-hidden mb-6 bg-muted/20 border flex items-center justify-center p-2">
                    <SanityImage
                      image={category.image}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain group-hover:scale-105 transition-transform duration-500 p-2"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-2xl mb-3 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
                      {category.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center text-primary text-sm font-semibold group-hover:underline underline-offset-4 pt-2">
                  Kategoriyi İncele
                  <RiArrowRightLine className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
