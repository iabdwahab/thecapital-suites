"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Building2,
  ConciergeBell,
  Settings2,
  TrendingUp,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// حبيبات خفيفة (noise)
const noiseTexture = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
};

const features: Feature[] = [
  {
    icon: Settings2,
    title: "إدارة العمليات التشغيلية",
    description: "ندير العمليات التشغيلية اليومية للفنادق والمنتجعات.",
    image: "/services-section/1.jpg",
  },
  {
    icon: Building2,
    title: "إدارة الأصول والممتلكات",
    description:
      "نقدم خدمات إدارة الأصول والممتلكات لضمان استدامتها وزيادة قيمتها.",
    image: "/services-section/2.jpg",
  },
  {
    icon: Wrench,
    title: "الصيانة الوقائية وإدارة الجودة",
    description:
      "نقدم خدمات الصيانة الوقائية وإدارة الجودة لضمان عمل الأنظمة بشكل مثالي.",
    image: "/services-section/3.jpg",
  },
  {
    icon: TrendingUp,
    title: "تحسين الإيرادات وإدارة التكاليف",
    description:
      "نقوم بتحسين الإيرادات وإدارة التكاليف لضمان تحقيق أفضل النتائج الممكنة.",
    image: "/services-section/4.jpg",
  },
  {
    icon: ConciergeBell,
    title: "تصميم تجربة ضيافة راقية",
    description:
      "نقوم بتصميم تجربة ضيافة راقية لضمان رضا الضيوف وتعزيز سمعة العلامة التجارية.",
    image: "/services-section/5.jpg",
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      dir="rtl"
      className="relative isolate w-full overflow-hidden bg-linear-to-bl from-[#100d09] via-[#100d09]/90 to-[#100d09]/90 pt-16 pb-24 md:pt-24 md:pb-28"
    >
      {/* ===== طبقات الخلفية ===== */}

      {/* توهج ذهبي خلف العنوان */}
      <span className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[300px] w-[70%] max-w-[700px] -translate-x-1/2 rounded-full bg-[#bfa045]/15 blur-[120px]" />

      {/* توهج ذهبي خلف الصورة */}
      <span className="pointer-events-none absolute -left-20 top-1/2 -z-10 size-[520px] -translate-y-1/2 rounded-full bg-[#bfa045]/15 blur-[140px]" />

      {/* توهج خلف القائمة */}
      <span className="pointer-events-none absolute -right-40 bottom-0 -z-10 size-[400px] rounded-full bg-[#bfa045]/10 blur-[140px]" />

      {/* شبكة خطوط رفيعة */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.1] [background-image:linear-gradient(#C9A455_1px,transparent_1px),linear-gradient(90deg,#C9A455_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_100%)]" />

      {/* noise */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: noiseTexture }}
      />

      {/* خط علوي فقط — الخط السفلي يأتي من أعلى قسم القيم */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#C9A455]/40 to-transparent" />

      {/* ===== المحتوى ===== */}
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center md:mb-14">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#C9A455]/25 bg-[#C9A455]/10 px-4 py-1 text-xs text-[#E0BC78]">
            <span className="size-1.5 rounded-full bg-[#E0BC78]" />
            خدماتنا
          </span>
          <h2 className="bg-linear-to-b from-[#F5DFA8] to-[#BFA045] bg-clip-text text-3xl font-bold leading-tight text-transparent md:text-4xl">
            اكتشف ما نقدمه من خدمات
          </h2>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col-reverse gap-6 md:flex-row md:gap-8 lg:gap-16">
          {/* القائمة */}
          <div className="md:w-1/2 lg:w-2/5">
            <ul className="grid grid-cols-1 gap-3 md:flex md:flex-col md:gap-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = index === activeIndex;
                return (
                  <li key={feature.title}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "group relative flex w-full cursor-pointer overflow-hidden rounded-xl border px-4 py-3 text-start transition-all duration-300 md:px-5 md:py-4",
                        isActive
                          ? "border-[#C9A455]/30 bg-linear-to-l from-[#C9A455]/[0.12] to-white/[0.02] shadow-[0_10px_40px_-20px_rgba(201,164,85,0.5)]"
                          : "border-transparent hover:border-white/10 hover:bg-white/[0.03]",
                      )}
                    >
                      {/* شريط ذهبي على جانب البداية */}
                      <span
                        className={cn(
                          "absolute inset-y-3 start-0 w-[3px] rounded-full bg-linear-to-b from-[#F5DFA8] to-[#BFA045] transition-all duration-300",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                      />

                      <div className="flex w-full items-start gap-3 md:gap-4">
                        <div
                          className={cn(
                            "flex aspect-square w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-300 md:w-10",
                            isActive
                              ? "bg-linear-to-b from-[#E0BC78] to-[#BFA045] text-black shadow-[0_0_20px_rgba(224,188,120,0.35)]"
                              : "border border-white/10 bg-white/5 text-white/50 group-hover:text-[#E0BC78]",
                          )}
                        >
                          <Icon
                            className="size-4 md:size-5"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3
                            className={cn(
                              "mb-1 text-sm font-semibold transition-colors md:text-base lg:text-lg",
                              isActive
                                ? "text-[#E0BC78]"
                                : "text-white/50 group-hover:text-white/70",
                            )}
                          >
                            {feature.title}
                          </h3>
                          <p
                            className={cn(
                              "line-clamp-2 text-xs transition-all md:text-sm",
                              isActive ? "text-white/80" : "text-white/40",
                            )}
                          >
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* الصورة */}
          <div className="relative md:w-1/2 lg:w-3/5">
            <div className="relative">
              {/* زوايا ذهبية حول الإطار */}
              <span className="pointer-events-none absolute -right-3 -top-3 z-10 size-10 rounded-tr-2xl border-r-2 border-t-2 border-[#C9A455]/60" />
              <span className="pointer-events-none absolute -bottom-3 -left-3 z-10 size-10 rounded-bl-2xl border-b-2 border-l-2 border-[#C9A455]/60" />

              {/* إطار بحدود متدرجة */}
              <div className="rounded-2xl bg-linear-to-br from-[#C9A455]/50 via-white/10 to-[#C9A455]/20 p-px shadow-[0_30px_80px_-30px_rgba(201,164,85,0.45)]">
                <div className="overflow-hidden rounded-2xl">
                  <div className="relative aspect-4/5 max-h-[500px] w-full md:aspect-3/4 lg:aspect-4/5">
                    <div className="h-full overflow-hidden">
                      <div
                        className="flex h-full w-full transition-transform duration-700 ease-out"
                        style={{
                          transform: `translateX(${activeIndex * 100}%)`,
                        }}
                      >
                        {features.map((feature, index) => {
                          const Icon = feature.icon;
                          return (
                            <div
                              key={feature.title}
                              className="relative h-full w-full shrink-0 grow-0 basis-full overflow-hidden"
                            >
                              <Image
                                alt={feature.title}
                                src={feature.image}
                                fill
                                sizes="(min-width: 1024px) 60vw, (min-width: 768px) 50vw, 100vw"
                                className={cn(
                                  "object-cover object-center transition-transform duration-[1200ms]",
                                  index === activeIndex
                                    ? "scale-100"
                                    : "scale-110",
                                )}
                              />
                              {/* تظليل دافئ بلون البراند */}
                              <div className="absolute inset-0 bg-linear-to-t from-[#0b0906] via-[#0b0906]/30 to-transparent" />
                              <div className="absolute inset-0 bg-[#BFA045]/[0.06] mix-blend-color" />

                              <div className="absolute inset-x-0 bottom-0 p-6">
                                <div className="flex items-start gap-3">
                                  <div className="flex aspect-square w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-b from-[#E0BC78] to-[#BFA045] text-black">
                                    <Icon
                                      className="size-5"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="text-xl font-semibold text-white">
                                      {feature.title}
                                    </h3>
                                    <p className="mt-1 line-clamp-2 text-xs text-white/60">
                                      {feature.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* رقم الشريحة */}
                    <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs tabular-nums text-white/80 backdrop-blur">
                      {String(activeIndex + 1).padStart(2, "0")} /{" "}
                      {String(features.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* النقاط */}
            <div className="mt-5 flex justify-center gap-2">
              {features.map((feature, index) => (
                <button
                  key={feature.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`الانتقال إلى الشريحة ${index + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === activeIndex
                      ? "w-6 bg-[#BFA045]"
                      : "w-2 bg-white/20 hover:bg-white/40",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
