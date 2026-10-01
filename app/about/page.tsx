import CompanyProfileDownload from "@/components/about/CompanyProfileDownload";
import HeroSection from "@/components/about/HeroSection";
import ServicesSection from "@/components/about/ServicesSection";
import ValuesSection from "@/components/about/ValuesSection";

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ValuesSection />

      <section className="relative isolate overflow-hidden bg-linear-to-b from-[#100d09]/90 via-[#16120b] to-[#100d09] py-20 text-center">
        <span className="absolute top-0 left-0 w-full h-20 z-10 bg-linear-to-t from-transparent to-black"></span>

        {/* توهج ذهبي قوي خلف العنوان */}
        <span className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[380px] w-[85%] max-w-[900px] -translate-x-1/2 rounded-full bg-[#bfa045]/25 blur-[520px]" />

        {/* توهجات جانبية */}
        <span className="pointer-events-none absolute -left-32 bottom-0 -z-10 size-[380px] rounded-full bg-[#bfa045]/15 blur-[430px]" />
        <span className="pointer-events-none absolute -right-32 bottom-10 -z-10 size-[380px] rounded-full bg-[#bfa045]/15 blur-[430px]" />

        {/* دوائر تنطلق من الأعلى — أوضح وأوسع */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14] [background-image:repeating-radial-gradient(circle_at_50%_0%,#C9A455_0,#C9A455_1px,transparent_1px,transparent_44px)] [mask-image:radial-gradient(ellipse_80%_100%_at_50%_0%,black_20%,transparent)]" />

        {/* noise */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mb-8">
          <h2 className="mb-4 bg-linear-to-b from-[#F5DFA8] to-[#C9A455] bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
            الاستدامة والمسؤولية المجتمعية
          </h2>
          <p className="mx-auto max-w-3xl font-light leading-8 text-[#B5A590]">
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
