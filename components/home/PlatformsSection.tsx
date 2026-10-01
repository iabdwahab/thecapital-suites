import Image from "next/image";

export default async function PlatformsSection() {
  const platformsListRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/booking-platforms?_fields=id,acf&acf_format=standard`,
  );
  const platformsList: {
    id: number;
    acf: {
      title: string;
      platforms_list: {
        platform_1: string;
        platform_2: string;
        platform_3: string;
        platform_4: string;
        platform_5: string;
        platform_6: string;
        platform_7: string;
        platform_8: string;
      };
    };
  }[] = await platformsListRes.json();

  const sectionHeadingRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/section-info/175?_fields=id,acf&acf_format=standard`,
  );
  const sectionHeading: {
    id: number;
    acf: {
      title: string;
      description: string;
    };
  } = await sectionHeadingRes.json();

  return (
    <section className="relative isolate overflow-hidden bg-linear-to-b from-[#fbf8f1] via-white to-[#f7f1e3] py-24">
      {/* ===== طبقات الخلفية ===== */}

      {/* توهج ذهبي ناعم خلف العنوان */}
      <span className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[360px] w-[85%] max-w-[900px] -translate-x-1/2 rounded-full bg-[#E0BC78]/25 blur-[120px]" />

      {/* توهجات جانبية */}
      <span className="pointer-events-none absolute -left-40 bottom-0 -z-10 size-[420px] rounded-full bg-[#E0BC78]/20 blur-[140px]" />
      <span className="pointer-events-none absolute -right-40 top-1/4 -z-10 size-[380px] rounded-full bg-[#E0BC78]/15 blur-[140px]" />

      {/* شبكة خطوط ذهبية خافتة */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.7] [background-image:linear-gradient(#C9A455_1px,transparent_1px),linear-gradient(90deg,#C9A455_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_90%)]" />

      {/* اللوجو كعلامة مائية */}
      <Image
        src="/logo.png"
        alt=""
        aria-hidden
        width={668}
        height={566}
        className="pointer-events-none absolute -bottom-20 -left-20 -z-10 w-[380px] rotate-12 opacity-[0.05] md:w-[500px]"
      />

      {/* ===== المحتوى ===== */}
      <div className="container">
        <h2 className="mt-4 bg-linear-to-b from-[#C9A455] to-[#9a7a2e] bg-clip-text text-center text-3xl font-bold leading-[46px] text-transparent md:text-4xl">
          {sectionHeading.acf.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg font-light text-[#5a5245]">
          {sectionHeading.acf.description}
        </p>

        {/* الجدول — gap-px مع خلفية ذهبية = فواصل نظيفة في كل المقاسات */}
        <div className="mt-12 rounded-2xl bg-linear-to-b from-[#C9A455]/50 via-[#C9A455]/20 to-[#C9A455]/40 p-px shadow-[0_30px_80px_-40px_rgba(154,122,46,0.45)]">
          <div className="grid gap-px overflow-hidden rounded-2xl bg-[#C9A455]/20 md:grid-cols-2 lg:grid-cols-4">
            {platformsList.map((platform) => (
              <div
                key={platform.id}
                className="group relative bg-white/85 p-8 text-center backdrop-blur-sm transition duration-300 hover:bg-white md:p-10"
              >
                {/* خط ضوء علوي عند الـ hover */}
                <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-[#C9A455] to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                <h4 className="font-bold text-[#9a7a2e]">
                  {platform.acf.title}
                </h4>
                <span className="mx-auto mt-3 mb-5 block h-px w-12 bg-linear-to-r from-transparent via-[#C9A455] to-transparent" />

                <ul className="space-y-2.5 text-[#333333]">
                  {Object.values(platform.acf.platforms_list).map(
                    (platformName, index) =>
                      platformName && (
                        <li
                          key={index}
                          className="flex items-center justify-center gap-2"
                        >
                          <span className="size-1.5 shrink-0 rotate-45 bg-[#C9A455]" />
                          {platformName}
                        </li>
                      ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
