import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";
import { RiPhoneLine, RiMapPinLine } from "react-icons/ri";

export function ContactCtaSection() {
  return (
    <section className="py-20 md:py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <FadeIn direction="up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-white/20 text-xs uppercase tracking-wider font-semibold mb-6 text-white/80">
            <RiMapPinLine className="text-primary size-4" />
            <span>Tecde, Yeşilyurt / Malatya</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase mb-4 text-white">
            Fiyat ve Stok Bilgisi İçin Mağazamıza Bekliyoruz
          </h2>

          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            GPD, E.C.A. ve SEREL ürünlerimizde güncel stok durumu, özel fiyat teklifleri ve teknik sorularınız için Malatya Tecde'deki showroomumuzu ziyaret edebilir veya iletişim formumuz üzerinden bize ulaşabilirsiniz.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" render={<Link href="/iletisim" />}>
              <RiPhoneLine className="mr-2 size-5" />
              İletişime Geçin
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="border border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              render={<Link href="/urunler" />}
            >
              Ürün Kataloğu
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
