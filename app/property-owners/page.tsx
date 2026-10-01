import HeroSection from "@/components/property-owners/HeroSection";
import PropertyOwnersSection from "@/components/property-owners/PropertyOwnersSection";
import StudyRequestForm from "@/components/StudyRequestForm";
import { Headset, ShieldCheck } from "lucide-react";

const perks = [
  {
    icon: Headset,
    title: "دعم فني مخصص",
    description: "فريقنا متواجد للرد على استفساراتكم.",
  },
  {
    icon: ShieldCheck,
    title: "سرية تامة",
    description: "بياناتك محمية ولن يتم مشاركتها.",
  },
];

export default function PropertyOwnersPage() {
  return (
    <>
      <HeroSection />

      <PropertyOwnersSection />

      <section className="relative isolate overflow-hidden bg-linear-to-b from-[#100d09] via-[#16120b] to-[#100d09] py-16 text-white lg:py-24">
        {/* ===== طبقات الخلفية ===== */}

        {/* توهج رئيسي خلف النموذج */}
        <span className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[85%] max-w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bfa045]/15 blur-[140px]" />

        {/* توهجات جانبية */}
        <span className="pointer-events-none absolute -right-40 top-0 -z-10 size-[420px] rounded-full bg-[#bfa045]/15 blur-[140px]" />
        <span className="pointer-events-none absolute -left-40 bottom-0 -z-10 size-[420px] rounded-full bg-[#bfa045]/15 blur-[140px]" />

        {/* شبكة خطوط رفيعة */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.1] [background-image:linear-gradient(#C9A455_1px,transparent_1px),linear-gradient(90deg,#C9A455_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_100%)]" />

        {/* خط فاصل علوي بين القسم الفاتح والداكن */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#C9A455]/60 to-transparent" />

        {/* ===== المحتوى ===== */}
        <div className="container">
          {/* الكارت — حدود متدرجة */}
          <div className="rounded-2xl bg-linear-to-b from-[#C9A455]/45 via-[#C9A455]/10 to-[#C9A455]/5 p-px shadow-[0_30px_80px_-30px_rgba(201,164,85,0.35)]">
            <div className="relative overflow-hidden rounded-2xl bg-[#100d09]/90 p-6 backdrop-blur-sm md:p-10 lg:grid lg:grid-cols-[480px_1fr] lg:gap-10">
              {/* لمعة علوية */}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[#C9A455]/[0.07] to-transparent" />
              <span className="pointer-events-none absolute inset-x-16 top-0 h-px bg-linear-to-r from-transparent via-[#E0BC78]/70 to-transparent" />

              {/* العمود النصي */}
              <div className="relative pt-2 lg:pt-6">
                <h2 className="bg-linear-to-b from-[#F5DFA8] to-[#C9A455] bg-clip-text text-3xl font-bold text-transparent">
                  نموذج دراسة المبنى
                </h2>
                <p className="mt-6 font-light leading-8 text-[#B5A590]">
                  املأ النموذج التالي ببياناتك وتفاصيل عقارك، وسيقوم فريقنا
                  المختص بالتواصل معك في أقرب وقت لدراسة المبنى من حيث الإيرادات
                  والمصروفات المتوقعة.
                </p>

                <div className="mt-10 flex flex-col gap-4">
                  {perks.map(({ icon: Icon, title, description }) => (
                    <div
                      key={title}
                      className="flex items-center gap-4 rounded-xl border border-[#C9A455]/15 bg-[#C9A455]/[0.04] p-4"
                    >
                      <div className="grid size-12 shrink-0 place-items-center rounded-xl border border-[#C9A455]/30 bg-[#C9A455]/10 text-[#E0BC78] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                        <Icon className="size-6" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-[#F0E0C0]">
                          {title}
                        </h4>
                        <p className="text-sm text-[#A09080]">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* النموذج */}
              <div
                id="study-request-form"
                className="relative scroll-mt-40 max-lg:mt-10"
              >
                <StudyRequestForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
