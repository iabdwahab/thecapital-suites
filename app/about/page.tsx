import CompanyProfileDownload from "@/components/about/CompanyProfileDownload";
import HeroSection from "@/components/about/HeroSection";
import ServicesSection from "@/components/about/ServicesSection";
import ValuesSection from "@/components/about/ValuesSection";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ValuesSection />

      <section className="relative isolate overflow-hidden py-16 text-center ">
        {/* توهج ذهبي خلف العنوان */}
        <span className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[260px] w-[70%] max-w-[700px] -translate-x-1/2 rounded-full bg-[#bfa045]/15 blur-[120px]" />

        {/* دوائر خافتة تنطلق من الأعلى */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] [background-image:repeating-radial-gradient(circle_at_50%_0%,#C9A455_0,#C9A455_1px,transparent_1px,transparent_44px)] [mask-image:radial-gradient(ellipse_60%_80%_at_50%_0%,black,transparent)]" />

        {/* خط ضوء علوي */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#C9A455]/40 to-transparent" />

        <div className="container mb-6">
          <h2 className="mb-4 bg-linear-to-b from-[#F5DFA8] to-[#C9A455] bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
            الاستدامة والمسؤولية المجتمعية
          </h2>
          <p className="mx-auto max-w-3xl font-light leading-8 text-[#A09080]">
            نؤمن أن الضيافة ليست مجرد خدمة، بل مسؤولية تجاه المجتمع والبيئة؛
            لذلك ندمج الاستدامة في كل خطوة:
            <br />
            من إدارة الموارد، إلى رفع الوعي البيئي وتبني مبادرات المسؤولية
            المجتمعية.
          </p>
        </div>
        <CompanyProfileDownload />
      </section>
    </>
  );
}
