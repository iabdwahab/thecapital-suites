"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

type FeaturedLocation = {
  id: number;
  acf: {
    title: string;
    images: {
      image_1: string | false;
      image_2: string | false;
      image_3: string | false;
      image_4: string | false;
      image_5: string | false;
      image_6: string | false;
      image_7: string | false;
      image_8: string | false;
      image_9: string | false;
      image_10: string | false;
    };
  };
};

export default function FeaturedLocationsCarousel({
  featuredLocationsList,
}: {
  featuredLocationsList: FeaturedLocation[];
}) {
  const [activeLocationId, setActiveLocationId] = useState<number | null>(
    featuredLocationsList[0]?.id ?? null,
  );
  const swiperRef = useRef<SwiperType | null>(null);

  const activeLocation = featuredLocationsList.find(
    (location) => location.id === activeLocationId,
  );

  const imagesList = activeLocation
    ? Object.values(activeLocation.acf.images).filter(
        (image): image is string => image !== false,
      )
    : [];

  return (
    <>
      {/* Filter buttons */}
      <div className="bg-[#3d29003b] w-fit mx-auto border border-[#3D2900] p-3 md:p-2 rounded-xl md:rounded-full flex flex-wrap justify-center items-center gap-2">
        {featuredLocationsList.map((location) => (
          <button
            key={location.id}
            onClick={() => setActiveLocationId(location.id)}
            className={`cursor-pointer border border-[#3D2900] font-medium text-lg px-6 py-2 rounded-full transition-opacity ${
              activeLocationId === location.id
                ? "bg-[#C8AD6A] text-[#0B0800]"
                : "bg-transparent text-white hover:opacity-80"
            }`}
          >
            {location.acf.title}
          </button>
        ))}
      </div>

      {imagesList.length != 0 ? (
        <>
          {/* Swiper carousel */}

          <div className="mt-10 cursor-grabbing">
            <Swiper
              modules={[Navigation]}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {imagesList.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="h-60 rounded-xl overflow-hidden relative">
                    <Image
                      src={image || "/home-hero-image.jpg"}
                      alt="Featured Locations"
                      width={1200}
                      height={800}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Nav buttons */}
          <div className="flex justify-center gap-2 mt-10">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="border border-[#d9d9d92a] rounded-full p-3 cursor-pointer hover:opacity-80"
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
              className="border border-[#d9d9d92a] rounded-full p-3 cursor-pointer hover:opacity-80"
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
      ) : (
        <p className="text-center text-lg text-white py-30">
          لا يوجد صور متاحة للموقع الآن.
        </p>
      )}
    </>
  );
}
