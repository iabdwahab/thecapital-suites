"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/global/Map"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "500px", width: "100%" }}>جاري تحميل الخريطة...</div>
  ),
});

export default Map;
