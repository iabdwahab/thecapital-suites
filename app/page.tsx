import MapLoader from "@/components/global/MapLoader";
import ContactForm from "@/components/home/ContactForm";
import FeaturedLocations from "@/components/home/featured-locations/FeaturedLocations";
import FeaturesSection from "@/components/home/FeaturesSection";
import StudyRequestForm from "@/components/StudyRequestForm";
import HeroSection from "@/components/home/HeroSection";
import PlatformsSection from "@/components/home/PlatformsSection";
import PropertyOwnersSection from "@/components/home/PropertyOwnersSection";
import WhyusSection from "@/components/home/WhyusSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedLocations />
      <WhyusSection />
      <PropertyOwnersSection />
      <FeaturesSection />
      <PlatformsSection />
      {/* <section
        id="contact"
        className="container py-20 grid lg:grid-cols-[570px_1fr] gap-4 scroll-mt-10"
      >
        <div>
          <h2 className="text-[#E0BC78] mb-8 text-6xl font-extrabold leading-[70px]">
            تواصل <br /> معنــــــــا
          </h2>

          <div className="w-full h-90 rounded-2xl overflow-hidden z-10 relative">
            <MapLoader /> */}
      {/* <iframe
              src={
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d927791.1826067893!2d45.63954355802078!3d24.72055203332265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2seg!4v1761863338612!5m2!1sen!2seg"
              }
              allowFullScreen={undefined}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-card-radius border-secondary-light h-full w-full border shadow-sm"
            ></iframe> */}
      {/* </div>
        </div>
        <ContactForm /> */}
      {/* <StudyRequestForm /> */}
      {/* </section> */}
    </>
  );
}
