"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export default function ImageSlider({
  images,
}: {
  images: Record<
    string,
    | {
        url: string;
      }
    | false
  >;
}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const imagesList = Object.values(images).filter(
    (image): image is { url: string } => image !== false,
  );

  const updateNavState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  if (imagesList.length === 0) {
    return <p className="py-20 text-center">عذرًا، لا توجد صور متاحة.</p>;
  }

  return (
    <>
      <div className="mt-10 cursor-grabbing">
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateNavState(swiper);
          }}
          noSwiping={true}
          onSlideChange={updateNavState}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {imagesList.map((image, index) => {
            const slideContent = (
              <Image
                src={image.url || "/home-hero-image.jpg"}
                alt="Image"
                width={1200}
                height={800}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            );

            return (
              <SwiperSlide key={index}>
                <span className="block h-60 rounded-xl overflow-hidden relative group">
                  {slideContent}
                </span>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Nav buttons */}
      <div className="flex justify-center gap-2 mt-10">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={isBeginning}
          className="border border-[#d9d9d92a] rounded-full p-3 cursor-pointer hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:opacity-30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          disabled={isEnd}
          className="border border-[#d9d9d92a] rounded-full p-3 cursor-pointer hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:opacity-30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
