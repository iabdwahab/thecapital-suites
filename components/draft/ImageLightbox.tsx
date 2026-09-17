"use client";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ImageLightbox({
  images,
  index,
  onClose,
}: {
  images: string[];
  // null = مقفول. أي رقم = مفتوح ومركّز على الصورة دي
  index: number | null;
  onClose: () => void;
}) {
  return (
    <Lightbox
      open={index !== null}
      index={index ?? 0}
      close={onClose}
      slides={images.map((src) => ({ src }))}
      // ألوان بسيطة تتماشى مع الثيم الداكن — الخلفية نفسها سودا شبه شفافة افتراضيًا،
      // فمش محتاجين override كتير هنا
      styles={{
        container: { backgroundColor: "rgba(0, 0, 0, 0.92)" },
      }}
    />
  );
}
