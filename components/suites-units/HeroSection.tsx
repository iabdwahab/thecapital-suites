import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="min-h-screen py-20 flex flex-col justify-center relative">
      <span>
        <Image
          src="/home-hero-image.jpg"
          alt="Hero Image"
          width={4096}
          height={2736}
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
      </span>
      <span className="absolute left-0 top-0 w-full h-full bg-black/70 -z-10"></span>

      <div className="container text-center">
        <h1 className="text-3xl md:text-6xl font-extrabold text-[#F8F8F8] leading-[50px] md:leading-[80px]">
          فـــــلل الـــــربـــــوة الـــــفـــــاخـــــرة
        </h1>
        <p className="text-xl md:text-4xl font-extralight text-[#E7DECA] mt-4 max-w-4xl md:leading-[48px] mx-auto">
          مجموعة من الفلل الفاخرة المطلة على البحر بتصاميم معمارية فريدة
        </p>

        {/* <div className="mt-8 md:flex items-center gap-4 max-md:space-y-4">
          <Link
            href="#"
            className="bg-white w-full text-black rounded-md px-14 py-3 flex items-center justify-center gap-4 md:w-fit hover:opacity-80 duration-75"
          >
            <span>احجز الآن</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </span>
          </Link>
          <Link
            href="#"
            className="bg-transparent w-full text-white border border-white rounded-md px-10 py-3 flex items-center justify-center gap-4 md:w-fit hover:opacity-80 duration-75"
          >
            <span>تواصل معنا</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </span>
          </Link>
        </div> */}
      </div>

      <span className="absolute bottom-0 left-0 w-full h-20 -z-10 bg-linear-to-t from-black to-transparent"></span>
    </section>
  );
}
