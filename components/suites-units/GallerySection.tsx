"use client";

import Image from "next/image";
import { useState } from "react";

export default function GallerySection({
  images,
}: {
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
}) {
  const [imagesIndexes] = useState<number[]>([0, 1, 2]);

  const imagesList = Object.values(images).filter((image) => image !== false);

  return (
    <section className="container py-10 grid md:grid-cols-[300px_1fr] gap-6">
      <div className="rounded-md overflow-hidden hidden md:block">
        <Image
          src={imagesList[imagesIndexes[0]] || "/images/placeholder.jpg"}
          alt="Image 1"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-[48px] font-bold">
            صور حقيقية <br /> من خدماتنــــــا
          </h2>

          <div
            className={`flex items-center gap-2 ${imagesList.length <= 3 ? "hidden" : ""}`}
          >
            <button
              // onClick={() => }
              // disabled={isBeginning}
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
              // onClick={() => swiperRef.current?.slideNext()}
              // disabled={isEnd}
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
        </div>

        <div className="rounded-md overflow-hidden block md:hidden mt-6">
          <Image
            src={imagesList[imagesIndexes[0]] || "/images/placeholder.jpg"}
            alt="Image 1"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="rounded-md overflow-hidden">
            <Image
              src={imagesList[imagesIndexes[1]] || "/images/placeholder.jpg"}
              alt="Image 1"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-md overflow-hidden">
            <Image
              src={imagesList[imagesIndexes[2]] || "/images/placeholder.jpg"}
              alt="Image 1"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
