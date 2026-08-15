import Image from "next/image";
import Link from "next/link";

export default async function WhyusSection() {
  const whyusListRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/whyus-section?_fields=id,acf&acf_format=standard`,
  );
  const whyusList: {
    id: number;
    acf: {
      title: string;
      description: string;
      icon: string | false;
    };
  }[] = await whyusListRes.json();

  return (
    <section className="py-20 relative overflow-hidden">
      <Image
        src="/whyus-background.jpg"
        alt="Why Us Background"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover -z-10 opacity-20"
      />

      {/* <span className="absolute w-full h-20 top-0 left-0 bg-linear-to-b from-black to-transparent -z-10"></span> */}

      <span className="absolute  w-full h-1/2 blur-[140px] bg-[#FFAA00] opacity-20 -z-10"></span>
      <span className="absolute left-0 bottom-0  w-full h-1/2  -z-10 bg-linear-to-t from-black via-black to-transparent"></span>

      <Image
        src="/whyus-section-lines-pattern.svg"
        alt="Lines Pattern"
        width={1440}
        height={643}
        className="absolute w-full h-full left-0 bottom-0 z-10 "
      />

      <div className="container">
        <Image
          src="/logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="mx-auto mb-10 w-30"
        />

        <h2 className="font-thamnyah max-w-4xl leading-[60px] mx-auto text-center font-black text-4xl md:text-5xl  bg-linear-to-l from-white to-80% to-[#bdbdbd] bg-clip-text text-transparent">
          خيارك المميز في المملكة للضـيافـــــة المتميـــــزة وإدارة الأصول
          الفندقية
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-20 gap-10 lg:gap-20">
          {whyusList.map((item) => (
            <div className="flex gap-4">
              <div>
                <Image
                  src="/whyus-icon.svg"
                  alt="Why Us Icon"
                  width={100}
                  height={100}
                  className="w-10 h-10"
                />
              </div>
              <div>
                <h3 className="font-thamnyah font-medium text-3xl">
                  {item.acf.title}
                </h3>
                <p className="font-alexandria font-light text-lg mt-3">
                  {item.acf.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/booking"
          className="bg-white text-lg mx-auto mt-15 flex items-center rounded-lg gap-2 w-fit text-black py-2 px-14"
        >
          <span>احجز الآن</span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
