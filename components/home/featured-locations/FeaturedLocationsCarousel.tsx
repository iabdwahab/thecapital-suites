"use client";

import { useRef, useState } from "react";
import Link from "next/link";
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
    images: Record<string, string | false>;
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
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const activeLocation = featuredLocationsList.find(
    (location) => location.id === activeLocationId,
  );

  const imagesList = activeLocation
    ? Object.values(activeLocation.acf.images).filter(
        (image): image is string => image !== false,
      )
    : [];

  const updateNavState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

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
              {imagesList.map((image, index) => (
                <SwiperSlide key={index}>
                  <Link
                    href={`/suites-units/${activeLocation?.id}`}
                    className="block h-60 rounded-xl overflow-hidden relative group"
                  >
                    <Image
                      src={image || "/home-hero-image.jpg"}
                      alt={activeLocation?.acf.title ?? "Featured Locations"}
                      width={1200}
                      height={800}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                </SwiperSlide>
              ))}
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
      ) : (
        <p className="text-center text-lg text-white py-30">
          لا يوجد صور متاحة للموقع الآن.
        </p>
      )}
    </>
  );
}
