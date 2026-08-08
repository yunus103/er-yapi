"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import { SanityImage as SanityImageType } from "@/types";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

interface ProductGalleryProps {
  mainImage?: SanityImageType;
  gallery?: SanityImageType[];
  title: string;
}

export function ProductGallery({ mainImage, gallery = [], title }: ProductGalleryProps) {
  // Tüm geçerli görselleri (Kapak + Galeri) mükerrer olmadan tek dizide topla
  const allImages = useMemo(() => {
    const list: SanityImageType[] = [];
    const seenIds = new Set<string>();

    if (mainImage?.asset) {
      const id = mainImage.asset._id || mainImage.asset._ref;
      if (id) {
        list.push(mainImage);
        seenIds.add(id);
      }
    }

    if (Array.isArray(gallery)) {
      for (const img of gallery) {
        if (img?.asset) {
          const id = img.asset._id || img.asset._ref;
          if (id && !seenIds.has(id)) {
            list.push(img);
            seenIds.add(id);
          }
        }
      }
    }

    return list;
  }, [mainImage, gallery]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const hasMultipleImages = allImages.length > 1;
  const currentImage = allImages[currentIndex] || mainImage || gallery[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -40) {
      handleNext();
    } else if (info.offset.x > 40) {
      handlePrev();
    }
  };

  if (!currentImage) {
    return (
      <div className="relative aspect-square rounded-2xl border bg-muted/20 flex items-center justify-center text-muted-foreground font-medium text-base">
        Görsel Bulunmuyor
      </div>
    );
  }

  return (
    <div className="space-y-4 select-none">
      {/* Ana Görsel Kutusu: 1/1 Oran, Oklar ve Drag / Swipe ile Fotoğraf Değiştirme */}
      <div className="relative aspect-square rounded-2xl bg-gradient-to-b from-muted/30 to-muted/10 border overflow-hidden shadow-sm flex items-center justify-center p-6 transition-all group">
        {/* Fotoğraf Sayacı Rozeti */}
        {hasMultipleImages && (
          <div className="absolute top-4 right-4 z-20 bg-background/80 backdrop-blur text-foreground text-xs font-semibold px-3 py-1 rounded-full border shadow-sm">
            {currentIndex + 1} / {allImages.length}
          </div>
        )}

        {/* Sol Ok Butonu */}
        {hasMultipleImages && (
          <button
            onClick={handlePrev}
            aria-label="Önceki Görsel"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 size-11 rounded-full bg-background/85 hover:bg-background border shadow-md backdrop-blur text-foreground flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <RiArrowLeftSLine className="size-7" />
          </button>
        )}

        {/* Sağ Ok Butonu */}
        {hasMultipleImages && (
          <button
            onClick={handleNext}
            aria-label="Sonraki Görsel"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 size-11 rounded-full bg-background/85 hover:bg-background border shadow-md backdrop-blur text-foreground flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <RiArrowRightSLine className="size-7" />
          </button>
        )}

        {/* Kaydırılabilir / Drag Edilebilir Ana Görsel */}
        <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
          <motion.div
            key={currentImage.asset?._id || currentIndex}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            drag={hasMultipleImages ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="w-full h-full relative flex items-center justify-center"
          >
            <SanityImage
              image={currentImage}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6 pointer-events-none"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Galeri Küçük Resimler (Thumbnails) */}
      {hasMultipleImages && (
        <div className="grid grid-cols-5 gap-3">
          {allImages.map((img, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={img.asset?._id || idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative aspect-square rounded-xl overflow-hidden border bg-muted/20 p-1 transition-all cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-primary border-primary shadow-sm scale-105 opacity-100"
                    : "opacity-70 hover:opacity-100 hover:border-foreground/40"
                }`}
                title={`${title} - Görsel ${idx + 1}`}
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
