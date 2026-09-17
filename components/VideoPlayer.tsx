"use client";

import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";

export default function VideoPlayer({ src }: { src: string }) {
  return (
    <div className="w-full h-64 plyr-fixed-height">
      <Plyr
        source={{
          type: "video",
          sources: [{ src, type: "video/mp4" }],
        }}
        options={{
          // مفيش autoplay خالص — المستخدم لازم يدوس Play بنفسه
          autoplay: false,
          muted: false,
          clickToPlay: true,
          controls: [
            "play-large",
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "fullscreen",
          ],
        }}
      />

      {/* Plyr بيعمل الـ aspect ratio بتقنية padding-bottom percentage (مش height عادي)،
          فلازم نلغي الـ padding ده ونجبر الفيديو ياخد position: absolute ويملأ
          الحاوية بالكامل، بدل ما نحاول بس نتحكم في height. */}
      <style jsx global>{`
        .plyr-fixed-height {
          position: relative;
        }
        .plyr-fixed-height .plyr,
        .plyr-fixed-height .plyr__video-wrapper {
          height: 100% !important;
          padding-bottom: 0 !important;
          aspect-ratio: unset !important;
        }
        .plyr-fixed-height video {
          position: absolute !important;
          inset: 0 !important;
          height: 100% !important;
          width: 100% !important;
          object-fit: cover !important;
        }
      `}</style>
    </div>
  );
}
