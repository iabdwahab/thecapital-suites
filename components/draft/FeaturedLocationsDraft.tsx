"use client";

import { useMemo, useState } from "react";
import type { District } from "@/lib/wp-featured-locations";

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
      <label className="text-sm text-white/50 mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none w-full bg-black border border-white/15 text-white text-lg rounded-xl p-3 pl-10 transition-colors focus:outline-none focus:border-gold disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
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

export default function FeaturedLocationsDraft({
  districts,
}: {
  districts: District[];
}) {
  const [city, setCity] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [unitKey, setUnitKey] = useState("");

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

  const showGallery = Boolean(selectedUnit && selectedUnit.images.length > 0);

  return (
    <section className="font-thamnyah" dir="rtl">
      <h2 className="font-black text-5xl leading-[60px] text-center bg-gradient-to-l from-white to-80% to-[#bdbdbd] bg-clip-text text-transparent my-10">
        مواقعنـــــا المميـــــزة
      </h2>

      {/* شريط التصفية */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10 shadow-lg max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      <div className="max-w-6xl mx-auto">
        {showGallery && selectedUnit && selectedDistrict ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gold">
                {selectedUnit.label} - {selectedDistrict.name}
              </h3>
              <span className="bg-gold/20 text-gold py-1 px-4 rounded-full text-sm">
                متاح للحجز
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedUnit.images.map((src) => (
                <div
                  key={src}
                  className="rounded-2xl overflow-hidden border border-white/10 relative group"
                >
                  <img
                    src={src}
                    alt={`${selectedUnit.label} - ${selectedDistrict.name}`}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button className="bg-gold hover:bg-gold-dark text-black font-bold py-3 px-8 rounded-xl transition-colors shadow-[0_0_15px_rgba(193,154,107,0.3)]">
                احجز هذه الوحدة الآن
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-white/40 py-20 border-2 border-dashed border-white/10 rounded-2xl">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-white/25"
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
    </section>
  );
}
