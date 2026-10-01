import Image from "next/image";

// نمط معيّنات ذهبي (SVG مُضمّن)
const diamondPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M24 0L48 24L24 48L0 24Z' fill='none' stroke='%23c9a455' stroke-width='1'/%3E%3C/svg%3E")`;

// حبيبات خفيفة (noise)
const noiseTexture = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default async function FeaturesSection() {
  const featuresListRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/dealing-features?_fields=id,acf&acf_format=standard`,
  );
  const featuresList: {
    id: number;
    acf: {
      icon: string;
      title: string;
      description: string;
    };
  }[] = await featuresListRes.json();

  const sectionHeadingRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/section-info/174?_fields=id,acf&acf_format=standard`,
  );
  const sectionHeading: {
    id: number;
    acf: {
      title: string;
      description: string;
    };
  } = await sectionHeadingRes.json();

  return (
    <section className="relative isolate overflow-hidden bg-linear-to-b from-[#100d09] via-[#16120b] to-[#100d09] py-24">
      {/* ===== طبقات الخلفية ===== */}

      {/* توهج ذهبي رئيسي خلف العنوان */}
      <span className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[90%] max-w-[900px] -translate-x-1/2 rounded-full bg-[#bfa045]/20 blur-[120px]" />

      {/* توهجات جانبية */}
      <span className="pointer-events-none absolute -left-40 bottom-0 -z-10 size-[420px] rounded-full bg-[#bfa045]/15 blur-[140px]" />
      <span className="pointer-events-none absolute -right-40 top-1/3 -z-10 size-[420px] rounded-full bg-[#bfa045]/15 blur-[140px]" />

      {/* نمط المعيّنات */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.1] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_100%)]"
        style={{ backgroundImage: diamondPattern, backgroundSize: "48px 48px" }}
      />

      {/* اللوجو كعلامة مائية كبيرة */}
      <Image
        src="/logo.png"
        alt=""
        aria-hidden
        width={668}
        height={566}
        className="pointer-events-none absolute -bottom-24 -right-24 -z-10 w-[420px] -rotate-12 opacity-[0.03] md:w-[560px]"
      />

      {/* noise */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: noiseTexture }}
      />

      {/* خط فاصل سفلي — العلوي يأتي من قسم المواقع فوقه */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-[#C9A455]/20 to-transparent" />

      {/* ===== المحتوى ===== */}
      <div className="container">
        <div>
          <Image
            src="/logo.png"
            alt="Logo"
            width={668}
            height={566}
            className="mx-auto h-25 w-25 object-contain drop-shadow-[0_0_25px_rgba(224,188,120,0.35)]"
          />
          <h2 className="mt-2 bg-linear-to-b from-[#F5DFA8] to-[#C9A455] bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl">
            {sectionHeading.acf.title}
          </h2>
          <p className="mt-2 text-center text-lg font-light text-[#A09080]">
            {sectionHeading.acf.description}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuresList.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.acf.icon}
              title={feature.acf.title}
              description={feature.acf.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    // الغلاف الخارجي = حدود متدرجة (gradient border) بسُمك 1px
    <div className="group relative rounded-2xl bg-linear-to-b from-[#C9A455]/45 via-[#C9A455]/10 to-[#C9A455]/5 p-px transition duration-300 hover:-translate-y-1 hover:from-[#E0BC78]/80 hover:shadow-[0_20px_50px_-20px_rgba(201,164,85,0.35)]">
      <div className="relative flex h-full flex-col items-center overflow-hidden rounded-2xl bg-[#100d09]/90 p-8 text-center backdrop-blur-sm">
        {/* لمعة خفيفة من الأعلى */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#C9A455]/[0.07] to-transparent" />

        {/* خط ضوء علوي عند الـ hover */}
        <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-[#E0BC78] to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        {/* توهج داخلي عند الـ hover */}
        <span className="pointer-events-none absolute -top-16 left-1/2 size-40 -translate-x-1/2 rounded-full bg-[#ffa600]/20 opacity-0 blur-3xl transition duration-300 group-hover:opacity-100" />

        {/* الأيقونة داخل badge */}
        <div className="relative grid size-14 place-items-center rounded-xl border border-[#C9A455]/30 bg-[#C9A455]/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 group-hover:border-[#E0BC78]/60 group-hover:bg-[#C9A455]/15">
          <Image
            src={icon || "/feature-placeholder.svg"}
            alt={title}
            width={28}
            height={28}
            className="size-7 object-contain"
          />
        </div>

        <h3 className="relative mt-5 text-lg font-semibold text-[#F0E0C0]">
          {title}
        </h3>
        <p className="relative mt-2 font-light leading-7 text-[#8a7a62]">
          {description}
        </p>
      </div>
    </div>
  );
}
