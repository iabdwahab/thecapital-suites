"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Bolt,
  Cloud,
  MessagesSquare,
  Star,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
};

const features: Feature[] = [
  {
    icon: Zap,
    title: "إدارة العمليات التشغيلية",
    description: "ندير العمليات التشغيلية اليومية للفنادق والمنتجعات.",
    image: "/services-section/1.jpg",
  },
  {
    icon: Star,
    title: "إدارة الأصول والممتلكات",
    description:
      "نقدم خدمات إدارة الأصول والممتلكات لضمان استدامتها وزيادة قيمتها.",
    image: "/services-section/2.jpg",
  },
  {
    icon: Bolt,
    title: "الصيانة الوقائية وإدارة الجودة.",
    description:
      "نقدم خدمات الصيانة الوقائية وإدارة الجودة لضمان عمل الأنظمة بشكل مثالي.",
    image: "/services-section/3.jpg",
  },
  {
    icon: MessagesSquare,
    title: "تحسين الإيرادات وإدارة التكاليف",
    description:
      "نقوم بتحسين الإيرادات وإدارة التكاليف لضمان تحقيق أفضل النتائج الممكنة.",
    image: "/services-section/4.jpg",
  },
  {
    icon: MessagesSquare,
    title: "تصميم تجربة ضيافة راقية",
    description:
      "نقوم بتصميم تجربة ضيافة راقية لضمان رضا الضيوف وتعزيز سمعة العلامة التجارية.",
    image: "/services-section/5.jpg",
  },
];

export default function ServicesSection() {
  // Fast Performance (third item) is selected by default, matching this design's markup
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <section
      dir="rtl"
      className="w-full py-12 md:py-24 lg:py-20 bg-black relative"
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-8 text-center md:mb-12">
          <h2 className="text-3xl leading-tight font-bold md:text-4xl lg:text-4xl text-[#BFA045]">
            اكتشف ما نقدمه من خدمات
          </h2>
          {/* <p className="mx-auto  max-w-2xl text-sm text-white mt-2 md:text-base">
            منصتنا تجمع بين مزايا قوية وتصميم أنيق لمساعدتك على إنجاز المزيد
            وتحقيق أهدافك.
          </p> */}
        </div>

        <div className="mx-auto flex max-w-6xl flex-col-reverse gap-6 md:flex-row md:gap-8 lg:gap-16">
          {/* Feature list (click to switch the active slide) */}
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
                        "group relative flex w-full cursor-pointer rounded-xl border px-4 py-3 text-start transition-all duration-300 md:px-5 md:py-4",
                        isActive
                          ? "border-white/10 bg-white/5 shadow-sm"
                          : "border-transparent hover:border-white/10 hover:bg-white/[0.03]",
                      )}
                    >
                      <div className="flex w-full items-start gap-3 md:gap-4">
                        <div
                          className={cn(
                            "flex aspect-square w-9 shrink-0 items-center justify-center rounded-lg transition-colors md:w-10",
                            isActive
                              ? "bg-[#BFA045] text-black"
                              : "bg-white/10 text-white/50",
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
                              isActive ? "text-[#BFA045]" : "text-white/50",
                            )}
                          >
                            {feature.title}
                          </h3>

                          <p
                            className={cn(
                              `line-clamp-2 text-xs transition-all md:text-sm lg:text-sm`,
                              isActive ? "text-white" : "text-white/50",
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

          {/* Image carousel, synced with the active list item */}
          <div className="relative md:w-1/2 lg:w-3/5">
            <div className="overflow-hidden rounded-xl border border-white/10 shadow-sm">
              <div className="relative aspect-4/5 max-h-[500px] w-full md:aspect-3/4 lg:aspect-4/5">
                <div className="h-full overflow-hidden">
                  <div
                    className="flex h-full w-full transition-transform duration-500"
                    style={{ transform: `translateX(${activeIndex * 100}%)` }}
                  >
                    {features.map((feature) => {
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
                            className="object-cover object-center"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                            <div className="flex items-start gap-3">
                              <div className="flex aspect-square w-10 shrink-0 items-center justify-center rounded-lg bg-[#BFA045] text-black">
                                <Icon className="size-5" aria-hidden="true" />
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold text-white">
                                  {feature.title}
                                </h3>
                                <p className="mt-1 line-clamp-2 text-xs text-white/50">
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
              </div>
            </div>

            {/* Dot indicators */}
            <div className="mt-5 flex justify-center gap-2">
              {features.map((feature, index) => (
                <button
                  key={feature.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`الانتقال إلى الشريحة ${index + 1}`}
                  className={cn(
                    "size-2 rounded-full transition-all",
                    index === activeIndex
                      ? "w-6 bg-[#BFA045]"
                      : "bg-white/20 hover:bg-white/40",
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
