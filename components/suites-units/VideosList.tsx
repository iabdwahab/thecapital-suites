"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export default function VideosList({
  videos,
}: {
  videos: Record<string, string | false>;
}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const videosList = Object.values(videos).filter(
    (video): video is string => video !== false,
  );

  const updateNavState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  if (videosList.length === 0) return null;

  return (
    <section className="py-12 container">
      <h2 className="text-[40px]">فيديوهات من خدماتنا</h2>

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
          {videosList.map((video, index) => (
            <SwiperSlide key={video + index}>
              <VideoCard src={video} />
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
    </section>
  );
}

function VideoCard({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative  aspect-video rounded-xl overflow-hidden bg-black">
      {isPlaying ? (
        <video
          src={src}
          controls
          autoPlay
          className="w-full h-full object-cover"
        />
      ) : (
        <button
          onClick={() => setIsPlaying(true)}
          aria-label="تشغيل الفيديو"
          className="group absolute inset-0 w-full h-full cursor-pointer"
        >
          <video
            src={src}
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
          />

          <span className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/90 group-hover:scale-110 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="w-7 h-7 ml-1"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
