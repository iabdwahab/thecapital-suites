"use client";

import { MapContainer, Marker, Tooltip, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLng } from "@/lib/district-coordinates";

// ماركر مخصص بلون الموقع (gold) بدل الأيقونة الزرقاء الافتراضية بتاعة Leaflet —
// نفس فكرة الـ redIcon في الكومبوننت اللي بعتهولي، بس بلون العلامة التجارية.
const goldIcon = new L.DivIcon({
  className: "custom-gold-marker",
  html: `<div style="
    width: 20px;
    height: 20px;
    background: #836e31;
    border: 2px solid #0a0a0a;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 1px 4px rgba(0,0,0,0.5);
  "></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 20],
  popupAnchor: [0, -20],
});

export default function LocationMap({
  center,
  zoom,
  label,
}: {
  center: LatLng;
  zoom: number;
  label: string;
}) {
  return (
    <div className="w-full relative z-0 h-96 rounded-2xl overflow-hidden border border-white/10">
      <MapContainer
        // key بيجبر الخريطة تتبني من جديد لما center يتغير، بدل ما تحاول pan تلقائي
        // ممكن يحصل فيه تعليق بصري مع Leaflet لو غيرت center من برا الكومبوننت.
        key={`${center[0]}-${center[1]}-${zoom}`}
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="dark-map w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} icon={goldIcon}>
          <Tooltip permanent direction="bottom" offset={[48, 0]}>
            {label}
          </Tooltip>
        </Marker>
      </MapContainer>

      {/* فلتر CSS بيحول التايلز العادية لشكل داكن، بدل ما تعتمد على tile server تاني
          (زي CartoDB) ممكن يبقى شكله غير متسق مع باقي التصميم. */}
      <style jsx global>{`
        .dark-map {
          background: #0a0a0a;
        }
        .dark-map .leaflet-tile-pane {
          filter: invert(1) hue-rotate(180deg) brightness(0.85) contrast(0.9)
            saturate(0.6);
        }
        .dark-map .leaflet-control-attribution {
          background: rgba(10, 10, 10, 0.7) !important;
          color: rgba(255, 255, 255, 0.5) !important;
        }
        .dark-map .leaflet-control-attribution a {
          color: rgba(255, 255, 255, 0.7) !important;
        }
        .dark-map .leaflet-control-zoom a {
          background: #1a1a1a !important;
          color: #fff !important;
          border-color: rgba(255, 255, 255, 0.15) !important;
        }
        .custom-gold-marker {
          background: transparent !important;
          border: none !important;
        }
        .dark-map .leaflet-tooltip {
          background: #1a1a1a;
          color: #e0bc78;
          border: 1px solid rgba(224, 188, 120, 0.4);
          font-weight: 600;
        }
        .dark-map .leaflet-tooltip:before {
          border-top-color: #1a1a1a;
        }
      `}</style>
    </div>
  );
}
