"use client";

import { useState } from "react";
import { SanityImage } from "@/components/ui/SanityImage";
import { SanityImage as SanityImageType } from "@/types";

interface ProductGalleryProps {
  mainImage?: SanityImageType;
  gallery?: SanityImageType[];
  title: string;
}

export function ProductGallery({ mainImage, gallery = [], title }: ProductGalleryProps) {
  // Sadece galeri alanından gelen görseller
  const galleryItems = gallery.filter(
    (img): img is SanityImageType => Boolean(img && img.asset)
  );

  const [activeImage, setActiveImage] = useState<SanityImageType | undefined>(
    mainImage?.asset ? mainImage : galleryItems[0]
  );

  const currentDisplayImage = activeImage || mainImage || galleryItems[0];

  if (!currentDisplayImage) {
    return (
      <div className="relative aspect-square rounded-2xl border bg-muted/20 flex items-center justify-center text-muted-foreground font-medium text-base">
        Görsel Bulunmuyor
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Ana Görsel Kutusu: Oran 1/1 (aspect-square) ve Resimler KESİLMEYECEK (object-contain p-6) */}
      <div className="relative aspect-square rounded-2xl bg-gradient-to-b from-muted/30 to-muted/10 border overflow-hidden shadow-sm flex items-center justify-center p-6 transition-all">
        <SanityImage
          key={currentDisplayImage.asset?._id || "main-img"}
          image={currentDisplayImage}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-6 transition-all duration-300"
          priority
        />
      </div>

      {/* Galeri Küçük Resimler (Sadece Galeri Alanından Gelen Resimler) */}
      {galleryItems.length > 0 && (
        <div className="grid grid-cols-5 gap-3">
          {galleryItems.map((img, idx) => {
            const isSelected = activeImage?.asset?._id === img.asset?._id;
            return (
              <button
                key={img.asset?._id || idx}
                onClick={() => setActiveImage(img)}
                className={`relative aspect-square rounded-xl overflow-hidden border bg-muted/20 p-1 transition-all cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-primary border-primary shadow-sm scale-105"
                    : "opacity-75 hover:opacity-100 hover:border-foreground/40"
                }`}
                title={`${title} - Galeri Görseli ${idx + 1}`}
              >
                <SanityImage
                  image={img}
                  fill
                  sizes="15vw"
                  className="object-contain p-1"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
