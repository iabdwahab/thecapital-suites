"use client";

import { useEffect, useState } from "react";
import { MapContainer, Marker, Tooltip, TileLayer } from "react-leaflet";
import L from "leaflet";

type Location = {
  name: string;
  position: [number, number];
};

const locations: Location[] = [
  { name: "حطين", position: [24.7579556, 46.6145058] },
  { name: "القيروان", position: [24.8278961, 46.594696] },
  { name: "العارض", position: [24.8908749, 46.6038971] },
  { name: "الملز", position: [24.6628451, 46.7243154] },
  { name: "الرمال", position: [24.8483795, 46.825007] },
];

// Custom red marker (no external image files needed).
const redIcon = new L.DivIcon({
  className: "custom-red-marker",
  html: `<div style="
    width: 20px;
    height: 20px;
    background: #735f26;
    border: 2px solid #0a0a0a;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 1px 4px rgba(0,0,0,0.5);
  "></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 20],
  popupAnchor: [0, -20],
});

export default function Map() {
  const [isWindow, setIsWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsWindow(true);
    }
  }, []);

  if (!isWindow) return null;

  return (
    <MapContainer
      // center={[24.79, 46.68]}
      center={[24.6725, 46.6725]}
      zoom={10}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
      className="dark-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc) => (
        <Marker key={loc.name} position={loc.position} icon={redIcon}>
          <Tooltip permanent direction="bottom" offset={[48, 0]}>
            {loc.name}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
