"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* dir="rtl" هنا عشان المحتوى جوه المودال يتماشى مع اتجاه باقي الموقع.
          shadcn الـ Dialog بيتعامل مع الـ portal وقفل السكرول والـ Escape تلقائيًا،
          فمش محتاجين نعمل أي حاجة من دول يدوي زي المرة اللي فاتت. */}
      <DialogContent
        dir="rtl"
        className="bg-[#0a0a0a]  border-white/10 text-white sm:max-w-[1100px] max-h-[85vh] overflow-y-auto"
      >
        <DialogHeader className="mt-6">
          <DialogTitle className="text-2xl text-[#BFA045] font-thamnyah md:text-3xl font-semibold">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {images.map((src, index) => (
            <div
              key={`${index}-${src}`}
              className="rounded-xl overflow-hidden border border-white/10 relative"
            >
              <Image
                src={src}
                alt={title}
                width={500}
                height={500}
                className="w-full h-56 object-cover"
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
