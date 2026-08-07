import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";
import { RiPhoneLine, RiStore2Line } from "react-icons/ri";

export function ContactCtaSection() {
  return (
    <section className="py-20 md:py-28 bg-foreground text-background">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <FadeIn direction="up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase mb-6 text-white leading-tight">
            Fiyat ve Stok Bilgisi İçin Mağazamıza Bekliyoruz
          </h2>

          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            GPD, E.C.A. ve SEREL ürünlerimizde güncel stok durumu, özel fiyat teklifleri ve teknik sorularınız için Malatya Tecde'deki mağazamızı ziyaret edebilir veya iletişim formumuz üzerinden bize ulaşabilirsiniz.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <Button
              size="lg"
              className="h-14 px-8 text-base md:text-lg font-semibold shadow-md"
              render={<Link href="/iletisim" />}
            >
              <RiPhoneLine className="mr-2.5 size-5" />
              İletişime Geçin
            </Button>
            <Button
              size="lg"
              className="h-14 px-8 text-base md:text-lg font-semibold bg-zinc-900 border border-zinc-700 text-white hover:bg-black hover:text-white shadow-md"
              render={<Link href="/urunler" />}
            >
              <RiStore2Line className="mr-2.5 size-5 text-primary" />
              Ürün Kataloğu
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
