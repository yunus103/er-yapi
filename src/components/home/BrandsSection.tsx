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
    { name: "GPD", desc: "Armatür ve Duş Sistemleri" },
    { name: "E.C.A.", desc: "Kombi, Klima ve Tesisat Ürünleri" },
    { name: "SEREL", desc: "Seramik ve Vitrifiye Banyo Ürünleri" },
  ];

  const brandItems = brands.length > 0 ? brands : defaultBrands;

  return (
    <section className="py-16 md:py-20 bg-muted/40 border-t border-border">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{title}</h2>
          {subtitle && <p className="text-muted-foreground text-base">{subtitle}</p>}
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {brandItems.map((brand, i) => {
            const logoImage = (brand as Brand).logo;
            const logoUrl = logoImage?.asset?.url || (logoImage?.asset ? urlForImage(logoImage)?.url() : undefined);

            return (
              <div
                key={(brand as Brand)._id || i}
                className="p-6 rounded-xl border bg-card text-center flex flex-col items-center justify-between min-h-[190px] transition-all hover:shadow-md"
              >
                <div className="h-24 w-full flex items-center justify-center p-2 mb-2">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={logoImage?.alt || (brand as Brand).name || "Marka Logosu"}
                      className="max-h-20 max-w-[85%] w-auto h-auto object-contain mx-auto"
                    />
                  ) : (
                    <span className="font-bold text-2xl tracking-wider text-foreground">
                      {brand.name}
                    </span>
                  )}
                </div>
                {((brand as Brand).description || (brand as { desc?: string }).desc) && (
                  <p className="text-xs text-muted-foreground">
                    {(brand as Brand).description || (brand as { desc?: string }).desc}
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
