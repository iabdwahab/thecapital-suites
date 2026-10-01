import MapLoader from "@/components/global/MapLoader";
import ContactForm from "@/components/home/ContactForm";

export default function page() {
  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-10 overflow-hidden bg-linear-to-b from-[#100d09] via-[#16120b] to-[#100d09] pt-40 pb-24"
    >
      {/* ===== طبقات الخلفية ===== */}

      {/* توهج خلف العنوان والخريطة */}
      <span className="pointer-events-none absolute -right-20 top-20 -z-10 size-[520px] rounded-full bg-[#bfa045]/20 blur-[140px]" />

      {/* توهج خلف النموذج */}
      <span className="pointer-events-none absolute -left-20 bottom-0 -z-10 size-[520px] rounded-full bg-[#bfa045]/15 blur-[140px]" />

      {/* توهج علوي عام */}
      <span className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[300px] w-[80%] max-w-[900px] -translate-x-1/2 rounded-full bg-[#bfa045]/10 blur-[120px]" />

      {/* شبكة خطوط رفيعة */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.1] [background-image:linear-gradient(#C9A455_1px,transparent_1px),linear-gradient(90deg,#C9A455_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_100%)]" />

      {/* ===== المحتوى ===== */}
      <div className="container grid gap-8 lg:grid-cols-[570px_1fr] lg:gap-10">
        <div>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9A455]/25 bg-[#C9A455]/10 px-4 py-1 text-xs text-[#E0BC78]">
            <span className="size-1.5 rotate-45 bg-[#E0BC78]" />
            نسعد بتواصلك
          </span>

          <h2 className="mb-8 bg-linear-to-b from-[#F5DFA8] to-[#C9A455] bg-clip-text text-5xl font-extrabold leading-[70px] text-transparent md:text-6xl">
            تواصل <br /> معنــــــــا
          </h2>

          {/* الخريطة — إطار بحدود متدرجة */}
          <div className="rounded-2xl bg-linear-to-b from-[#C9A455]/50 via-[#C9A455]/15 to-[#C9A455]/30 p-px shadow-[0_30px_80px_-30px_rgba(201,164,85,0.4)]">
            <div className="relative z-10 h-90 w-full overflow-hidden rounded-2xl">
              <MapLoader />
            </div>
          </div>
        </div>

        {/* النموذج داخل كارت بحدود متدرجة */}
        <div className="rounded-2xl bg-linear-to-b from-[#C9A455]/45 via-[#C9A455]/10 to-[#C9A455]/5 p-px shadow-[0_30px_80px_-30px_rgba(201,164,85,0.35)]">
          <div className="relative h-full overflow-hidden rounded-2xl bg-[#100d09]/90 p-6 backdrop-blur-sm md:p-10">
            {/* لمعة علوية */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[#C9A455]/[0.07] to-transparent" />
            <span className="pointer-events-none absolute inset-x-16 top-0 h-px bg-linear-to-r from-transparent via-[#E0BC78]/70 to-transparent" />

            {/* توهج داخلي يضيء خلفية النموذج */}
            <span className="pointer-events-none absolute -top-24 left-1/2 size-[420px] -translate-x-1/2 rounded-full bg-[#bfa045]/15 blur-[100px]" />

            <div className="relative">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
