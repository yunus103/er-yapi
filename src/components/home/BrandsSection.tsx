import { FadeIn } from "@/components/ui/FadeIn";
import { Brand } from "@/types";
import { urlForImage } from "@/sanity/lib/image";

interface BrandsSectionProps {
  title?: string;
  subtitle?: string;
  brands?: Brand[];
}

export function BrandsSection({
  title = "Çalıştığımız Markalar",
  subtitle = "Sektörünün öncü ve güvenilir markalarının ürünlerini ER YAPI güvencesiyle sunuyoruz.",
  brands = [],
}: BrandsSectionProps) {
  const defaultBrands = [
    { name: "GPD", desc: "Armatür, Batarya ve Duş Sistemleri" },
    { name: "E.C.A.", desc: "Kombi, Klima ve Isıtma-Soğutma Çözümleri" },
    { name: "SEREL", desc: "Seramik, Vitrifiye ve Banyo Ekipmanları" },
  ];

  const brandItems = brands.length > 0 ? brands : defaultBrands;

  return (
    <section className="py-20 md:py-28 bg-muted/40 border-t border-border">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground uppercase mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {subtitle}
            </p>
          )}
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {brandItems.map((brand, i) => {
            const logoImage = (brand as Brand).logo;
            const logoUrl = logoImage?.asset?.url || (logoImage?.asset ? urlForImage(logoImage)?.url() : undefined);
            const brandName = (brand as Brand).name || (brand as { name?: string }).name || "";
            const brandDesc = (brand as Brand).description || (brand as { desc?: string }).desc || "";

            return (
              <div
                key={(brand as Brand)._id || i}
                className="p-8 md:p-10 rounded-2xl border bg-card text-center flex flex-col items-center justify-between min-h-[220px] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Logo */}
                <div className="h-28 w-full flex items-center justify-center p-3 mb-4">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={logoImage?.alt || brandName || "Marka Logosu"}
                      className="max-h-24 max-w-[85%] w-auto h-auto object-contain mx-auto group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="font-bold text-3xl tracking-wider text-foreground">
                      {brandName}
                    </span>
                  )}
                </div>

                {/* Açıklama */}
                {brandDesc && (
                  <p className="text-sm md:text-base text-muted-foreground font-medium leading-normal pt-4 border-t border-border/60 w-full">
                    {brandDesc}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
