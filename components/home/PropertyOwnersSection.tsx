import Link from "next/link";
import Image from "next/image";

export default async function PropertyOwnersSection() {
  const sectionHeadingRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/section-info/176?_fields=id,acf&acf_format=standard`,
  );
  const sectionHeading: {
    id: 176;
    acf: {
      title: string;
      description: string;
      badge: string;
      link_1: {
        text: string;
        href: string;
      };
      link_2: {
        text: string;
        href: string;
      };
    };
  } = await sectionHeadingRes.json();

  return (
    <section className="relative isolate overflow-hidden bg-linear-to-b from-[#f7f1e3] via-white to-[#fbf8f1] py-24">
      {/* ===== طبقات الخلفية ===== */}

      {/* توهج ذهبي ناعم في المنتصف */}
      <span className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[360px] w-[85%] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E0BC78]/25 blur-[120px]" />

      {/* توهجات جانبية */}
      <span className="pointer-events-none absolute -right-40 bottom-0 -z-10 size-[420px] rounded-full bg-[#E0BC78]/20 blur-[140px]" />
      <span className="pointer-events-none absolute -left-40 top-0 -z-10 size-[380px] rounded-full bg-[#E0BC78]/15 blur-[140px]" />

      {/* شبكة خطوط ذهبية — نفس قسم المنصات */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.7] [background-image:linear-gradient(#C9A455_1px,transparent_1px),linear-gradient(90deg,#C9A455_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_90%)]" />

      {/* اللوجو كعلامة مائية — في الركن المقابل لقسم المنصات */}
      <Image
        src="/logo.png"
        alt=""
        aria-hidden
        width={668}
        height={566}
        className="pointer-events-none absolute -bottom-20 -right-20 -z-10 w-[380px] -rotate-12 opacity-[0.05] md:w-[500px]"
      />

      {/* ===== المحتوى ===== */}
      <div className="container">
        {/* <span className="mx-auto mb-2 flex w-fit items-center gap-2 rounded-full border border-[#C9A455]/40 bg-white/70 px-4 py-1 text-sm text-[#9a7a2e]">
          <span className="size-1.5 rotate-45 bg-[#C9A455]" />
          {sectionHeading.acf.badge}
        </span> */}

        <h2 className="mx-auto mt-4 max-w-2xl bg-linear-to-b from-[#C9A455] to-[#9a7a2e] bg-clip-text text-center text-3xl font-bold leading-[46px] text-transparent md:text-4xl">
          {sectionHeading.acf.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg font-light text-[#5a5245]">
          {sectionHeading.acf.description}
        </p>

        <div className="mt-10 items-center justify-center gap-4 max-md:space-y-3 md:flex md:flex-wrap">
          <Link
            href={sectionHeading.acf.link_1?.href || "/contact"}
            className="block rounded-xl border border-[#A8883A] bg-linear-to-b from-[#E0BC78] to-[#BFA045] px-10 py-4 text-center font-bold text-[#1A1208] shadow-[0_10px_30px_-10px_rgba(154,122,46,0.6)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_-8px_rgba(154,122,46,0.7)]"
          >
            {sectionHeading.acf.link_1?.text}
          </Link>
          {/* <Link
            href={sectionHeading.acf.link_2?.href || "/contact"}
            className="block rounded-xl border border-[#C9A455] bg-white/70 px-10 py-4 text-center font-bold text-[#9a7a2e] backdrop-blur-sm transition duration-300 hover:bg-white"
          >
            {sectionHeading.acf.link_2?.text}
          </Link> */}
        </div>
      </div>
    </section>
  );
}
