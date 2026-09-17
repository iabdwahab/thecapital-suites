"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImageLightbox from "./ImageLightbox";

export default function FeaturedLocationsModal({
  open,
  onOpenChange,
  title,
  images,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  images: string[];
}) {
  // null = اللايتبوكس مقفول. رقم = مفتوح ومركّز على صورة معينة
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* dir="rtl" هنا عشان المحتوى جوه المودال يتماشى مع اتجاه باقي الموقع.
          shadcn الـ Dialog بيتعامل مع الـ portal وقفل السكرول والـ Escape تلقائيًا،
          فمش محتاجين نعمل أي حاجة من دول يدوي زي المرة اللي فاتت. */}
      <DialogContent
        dir="rtl"
        className="dark-scrollbar bg-[#0a0a0a]  border-white/10 text-white sm:max-w-[1100px] max-h-[85vh] overflow-y-auto"
      >
        {/* سكرول بار داكن بدل الافتراضي — يعتمد على الكلاس dark-scrollbar فوق */}
        <style jsx global>{`
          .dark-scrollbar {
            /* Firefox */
            scrollbar-width: thin;
            scrollbar-color: #333333 #0a0a0a;
          }
          .dark-scrollbar::-webkit-scrollbar {
            width: 10px;
          }
          .dark-scrollbar::-webkit-scrollbar-track {
            background: #0a0a0a;
          }
          .dark-scrollbar::-webkit-scrollbar-thumb {
            background-color: #333333;
            border-radius: 999px;
            border: 2px solid #0a0a0a;
          }
          .dark-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #444444;
          }
        `}</style>
        <DialogHeader className="mt-6">
          <DialogTitle className="text-2xl text-[#BFA045] font-thamnyah md:text-3xl font-semibold">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {images.map((src, index) => (
            <button
              key={`${index}-${src}`}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="rounded-xl overflow-hidden border border-white/10 relative cursor-pointer"
            >
              <Image
                src={src}
                alt={title}
                width={500}
                height={500}
                className="w-full h-56 object-cover"
              />
            </button>
          ))}
        </div>
      </DialogContent>

      <ImageLightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </Dialog>
  );
}
