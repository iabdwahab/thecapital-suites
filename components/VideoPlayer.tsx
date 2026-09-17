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

      {/* ألوان Plyr بتتحدد عن طريق CSS custom properties — بنظبطها هنا عشان تتماشى
          مع لون الموقع (#BFA045) بدل الأزرق الافتراضي */}
      <style jsx global>{`
        .plyr-fixed-height {
          --plyr-color-main: #bfa045;
          --plyr-video-control-color: #ffffff;
          --plyr-video-control-color-hover: #0a0a0a;
          --plyr-video-control-background-hover: #bfa045;
          --plyr-audio-control-background-hover: #bfa045;
          --plyr-menu-background: #0a0a0a;
          --plyr-menu-color: #ffffff;
          --plyr-tooltip-background: #0a0a0a;
          --plyr-tooltip-color: #ffffff;
        }
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
