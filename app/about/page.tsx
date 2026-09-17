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

      <section className="container pb-20 pt-10 text-center">
        <h2 className="text-2xl mb-4 text-[#E0BC78]">
          الاستدامة والمسؤولية المجتمعية
        </h2>
        <p>
          نؤمن أن الضيافة ليست مجرد خدمة، بل مسؤولية تجاه المجتمع والبيئة؛ لذلك
          ندمج الاستدامة في كل خطوة:
          <br />
          من إدارة الموارد، إلى رفع الوعي البيئي وتبني مبادرات المسؤولية
          المجتمعية.
        </p>
      </section>
    </>
  );
}
