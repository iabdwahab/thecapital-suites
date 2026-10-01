"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { District } from "@/lib/wp-featured-locations";
import {
  DISTRICT_COORDINATES,
  CITY_COORDINATES,
  CITY_ZOOM,
  DISTRICT_ZOOM,
} from "@/lib/district-coordinates";
import Image from "next/image";
import Link from "next/link";
import FeaturedLocationsModal from "./FeaturedLocationsModal";
import ImageLightbox from "./ImageLightbox";

// Plyr بيلمس document وقت الـ import نفسه، فمينفعش يترندر على السيرفر خالص —
// لازم يتحمّل client-only بنفس طريقة LocationMap فوق.
const VideoPlayer = dynamic(() => import("@/components/VideoPlayer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-white/5 animate-pulse rounded-2xl" />
  ),
});

// الخريطة لازم تتحمل client-only لأن Leaflet بيستخدم window مباشرة.
// ssr: false بتمنع Next.js من محاولة يرندرها على السيرفر.
const LocationMap = dynamic(() => import("@/components/LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 rounded-2xl border border-[#C9A455]/20 bg-[#C9A455]/5 animate-pulse" />
  ),
});

// حبيبات خفيفة (noise)
const noiseTexture = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-[#A09080] mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none w-full bg-[#0d0b08] border border-[#C9A455]/20 text-[#F0E0C0] text-lg rounded-xl p-3 pl-10 transition-colors hover:border-[#C9A455]/40 focus:outline-none focus:border-[#E0BC78] focus:shadow-[0_0_0_3px_rgba(201,164,85,0.15)] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A455]/70"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

// ثابتة دلوقتي — لما تضيف مدن تانية في ووردبريس، تتحول لبيانات جايه من الـ API زي الأحياء
const CITIES = [{ value: "riyadh", label: "الرياض" }];

// عنصر واحد في الجاليري — ممكن يكون فيديو أو صورة، وبنميزهم عشان نعرف نرندر إيه
type MediaItem = { type: "video" | "image"; src: string };

export default function FeaturedLocationsDraft({
  districts,
}: {
  districts: District[];
}) {
  // "الرياض" مختارة تلقائيًا لأنها الخيار الوحيد المتاح دلوقتي في CITIES.
  // لو ضفت مدن تانية بعدين، شيل القيمة الافتراضية دي وخليها "" عشان المستخدم يختار بنفسه.
  const [city, setCity] = useState("riyadh");
  const [districtId, setDistrictId] = useState("");
  const [unitKey, setUnitKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // null = اللايتبوكس مقفول. رقم = مفتوح ومركّز على صورة معينة في visibleImages تحت
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const selectedCity = CITIES.find((c) => c.value === city);

  const selectedDistrict = useMemo(
    () => districts.find((d) => String(d.id) === districtId),
    [districts, districtId],
  );

  const selectedUnit = useMemo(
    () => selectedDistrict?.units.find((u) => u.key === unitKey),
    [selectedDistrict, unitKey],
  );

  const handleCityChange = (v: string) => {
    setCity(v);
    setDistrictId("");
    setUnitKey("");
  };

  const handleDistrictChange = (v: string) => {
    setDistrictId(v);
    setUnitKey("");
  };

  const galleryImages = selectedUnit ? selectedUnit.images : [];

  // الفيديو بقى تابع لنوع الوحدة نفسه (selectedUnit.video) مش للحي ككل —
  // كل نوع وحدة (استديو / غرفة وصالة / غرفتين وصالة) ليه فيديو خاص بيه في ووردبريس،
  // فبيتحط أول عنصر في الجاليري بتاعت النوع ده بس.
  const galleryMedia: MediaItem[] = [
    ...(selectedUnit?.video
      ? [{ type: "video" as const, src: selectedUnit.video }]
      : []),
    ...galleryImages.map((src) => ({ type: "image" as const, src })),
  ];

  const galleryTitle = selectedUnit
    ? `${selectedUnit.label} - ${selectedDistrict?.name}`
    : (selectedDistrict?.name ?? "");

  // بس الصور (من غير الفيديو) اللي ظاهرة فعليًا في الـ 6 كروت — اللايتبوكس بيتنقل بينهم بس
  const visibleImages = galleryMedia
    .slice(0, 6)
    .filter((item) => item.type === "image")
    .map((item) => item.src);

  const showGallery = Boolean(
    unitKey && selectedUnit && galleryMedia.length > 0,
  );
  const showMap = Boolean(!unitKey && (city || districtId));

  // الإحداثيات ثابتة دلوقتي (مش بتتجاب من geocoding)، فبنحسبها مباشرة بدل ما تتخزن في state.
  // لو الحي معندوش إحداثيات متسجلة في DISTRICT_COORDINATES، بيرجع لمركز المدينة كـ fallback.
  const mapCenter = selectedDistrict
    ? (DISTRICT_COORDINATES[selectedDistrict.name] ?? CITY_COORDINATES[city])
    : CITY_COORDINATES[city];

  const mapZoom = selectedDistrict ? DISTRICT_ZOOM : CITY_ZOOM;
  const mapLabel = selectedDistrict?.name ?? selectedCity?.label ?? "";

  const whatsappHref = useMemo(() => {
    const message = selectedUnit
      ? `أرغب في حجز وحدة "${selectedUnit.label}" في ${selectedDistrict?.name}`
      : `أرغب في الاستفسار عن الوحدات المتاحة في ${selectedDistrict?.name}`;

    return `https://wa.me/+966503070157?text=${encodeURIComponent(message)}`;
  }, [selectedDistrict, selectedUnit]);

  return (
    <section
      className="font-thamnyah relative isolate overflow-hidden bg-linear-to-b from-[#100d09] via-[#16120b] to-[#100d09] py-20"
      dir="rtl"
    >
      {/* ===== طبقات الخلفية ===== */}

      {/* توهج ذهبي خلف العنوان */}
      <span className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[380px] w-[85%] max-w-[900px] -translate-x-1/2 rounded-full bg-[#bfa045]/20 blur-[120px]" />

      {/* توهجات جانبية */}
      <span className="pointer-events-none absolute -left-32 top-1/3 -z-10 size-[420px] rounded-full bg-[#bfa045]/15 blur-[140px]" />
      <span className="pointer-events-none absolute -right-32 bottom-0 -z-10 size-[420px] rounded-full bg-[#bfa045]/15 blur-[140px]" />

      {/* شبكة خطوط رفيعة — نفس أسلوب قسم الخدمات */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.1] [background-image:linear-gradient(#C9A455_1px,transparent_1px),linear-gradient(90deg,#C9A455_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_100%)]" />

      {/* noise */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: noiseTexture }}
      />

      {/* خطوط فاصلة أعلى وأسفل */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#C9A455]/40 to-transparent" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-[#C9A455]/20 to-transparent" />

      {/* ===== المحتوى ===== */}
      <div className="container">
        <h2 className="font-black text-4xl md:text-5xl leading-[60px] text-center bg-linear-to-b from-[#F5DFA8] to-[#C9A455] bg-clip-text text-transparent my-10">
          مواقعنـــــا المميـــــزة
        </h2>

        {/* شريط التصفية — بحدود متدرجة */}
        <div className="max-w-6xl mx-auto mb-10 rounded-2xl bg-linear-to-b from-[#C9A455]/40 via-[#C9A455]/10 to-[#C9A455]/5 p-px shadow-[0_20px_60px_-30px_rgba(201,164,85,0.4)]">
          <div className="relative overflow-hidden rounded-2xl bg-[#100d09]/90 p-6 backdrop-blur-sm">
            {/* لمعة علوية */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-[#C9A455]/[0.07] to-transparent" />

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="المدينة"
                value={city}
                onChange={handleCityChange}
                options={CITIES}
                placeholder="اختر المدينة..."
              />
              <Select
                label="الحي"
                value={districtId}
                onChange={handleDistrictChange}
                options={districts.map((d) => ({
                  value: String(d.id),
                  label: d.name,
                }))}
                placeholder="اختر الحي..."
                disabled={!city}
              />
              <Select
                label="نوع الوحدة"
                value={unitKey}
                onChange={setUnitKey}
                options={
                  selectedDistrict?.units.map((u) => ({
                    value: u.key,
                    label: u.label,
                  })) ?? []
                }
                placeholder="اختر نوع الوحدة..."
                disabled={!selectedDistrict}
              />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {showGallery && selectedDistrict ? (
            <div>
              <div className="flex flex-wrap justify-between gap-4 items-center mb-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-semibold text-[#E0BC78]">
                    {galleryTitle}
                  </h3>
                  <span className="bg-linear-to-b from-[#E0BC78] to-[#BFA045] font-bold text-black mt-2 py-1 px-4 rounded-full text-sm">
                    متاح للحجز
                  </span>
                </div>

                {/* بدل ما كانت Link بتودّي لصفحة تفاصيل منفصلة، بقت زرار بيفتح المودال */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="cursor-pointer rounded-md border border-[#C9A455]/40 bg-[#C9A455]/10 px-4 py-3 font-bold text-[#E0BC78] transition duration-200 hover:bg-[#C9A455]/20"
                >
                  عرض المزيد من الصور
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(() => {
                  // عداد منفصل للصور بس (من غير الفيديو)، عشان نعرف نبعت للايتبوكس
                  // الـ index الصح جوه visibleImages، مش الـ index العام في galleryMedia
                  let imageCounter = -1;

                  return galleryMedia.slice(0, 6).map((item, index) => {
                    if (item.type === "image") imageCounter += 1;
                    const currentImageIndex = imageCounter;

                    return (
                      <div
                        key={`${index}-${item.src}`}
                        className="rounded-2xl overflow-hidden border border-[#C9A455]/20 relative group transition duration-300 hover:border-[#E0BC78]/50 hover:shadow-[0_20px_50px_-20px_rgba(201,164,85,0.35)]"
                      >
                        {item.type === "video" ? (
                          <VideoPlayer src={item.src} />
                        ) : (
                          <button
                            type="button"
                            onClick={() => setLightboxIndex(currentImageIndex)}
                            className="block w-full h-full cursor-pointer"
                          >
                            <Image
                              src={item.src}
                              alt={galleryTitle}
                              width={400}
                              height={400}
                              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                          </button>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>

              <div className="mt-8 text-center">
                <Link
                  href={whatsappHref}
                  className="font-alexandria inline-block bg-linear-to-b from-[#E0BC78] to-[#BFA045] text-black font-bold py-3 px-8 text-lg rounded-xl shadow-[0_10px_30px_-10px_rgba(224,188,120,0.5)] transition hover:shadow-[0_10px_40px_-8px_rgba(224,188,120,0.7)]"
                >
                  احجز هذه الوحدة الآن
                </Link>
              </div>
            </div>
          ) : showMap && mapCenter ? (
            <div>
              <h3 className="text-2xl font-semibold text-[#E0BC78] mb-6">
                {mapLabel}
              </h3>
              <div className="rounded-2xl bg-linear-to-b from-[#C9A455]/40 via-[#C9A455]/10 to-[#C9A455]/5 p-px">
                <div className="overflow-hidden rounded-2xl">
                  <LocationMap
                    center={mapCenter}
                    zoom={mapZoom}
                    label={mapLabel}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-[#A09080] py-20 border-2 border-dashed border-[#C9A455]/20 bg-[#C9A455]/[0.03] rounded-2xl">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-[#C9A455]/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <p className="text-lg">
                الرجاء إكمال الخيارات في الأعلى لعرض الوحدات المتاحة
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedUnit && (
        <FeaturedLocationsModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          title={galleryTitle}
          images={selectedUnit.images}
        />
      )}

      <ImageLightbox
        images={visibleImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </section>
  );
}
