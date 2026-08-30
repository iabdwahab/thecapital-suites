"use client";

import { useState } from "react";

export default function VideosList({
  videos,
}: {
  videos: Record<string, string | false>;
}) {
  const videosList = Object.values(videos).filter(
    (video): video is string => video !== false,
  );

  return (
    <>
      {videosList.length > 0 && (
        <section className="py-12 container">
          <h2 className="text-[48px] font-bold">فيديوهات من خدماتنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {videosList.map((video, index) => (
              <VideoCard key={video + index} src={video} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
function VideoCard({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative border aspect-video rounded-xl overflow-hidden bg-black">
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
